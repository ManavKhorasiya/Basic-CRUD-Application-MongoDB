var mongo = require('../../mongo');
var User = require('../../model/user.model');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

let test = function(req,res,next) {
    try {
        res.send('greetings from test conr=troller');
    } catch(e) {
        res.send('error');
    }
};

let create_user = async function(req,res,next) {
    let body = req.body;
    body.dateOfBirth =body.dateOfBirth.split("-").reverse().join("-");
    let alldata = new User(body);
    let start_time = new Date().getTime();
    try {
        let fields_tobe_verified = ['email','password'];
        let is_valid_data = await verifyUserData(fields_tobe_verified,body);
        if(is_valid_data) {
            let is_user_exist = await User.find({"email" : alldata.email});
            if(is_user_exist.length == 0) {
                alldata.password = bcrypt.hashSync(req.body.password,SALT_WORK_FACTOR);
                await mongo.insertIntoCollection(alldata);
                let user = {};
                let userData = await User.find({"email" : alldata.email});
                user.user = userData[0];
                return res.send({statusCode : 0 , statusMessage : "User inserted successfully" , data : user});
            } else {
                return res.send({statusCode : 1 , statusMessage : "User already exist for this email" , data : {}});
            }
        }
    } catch(error) {
        return res.send({statusCode : 1 , statusMessage : "Invalid user info" , data : error});
    }
}

let read_user = async function(req,res,next) {
    let body = req.body;
    try {
        let userData = await mongo.findFromCollection(User,body);
        if(userData.length !=0 ) {
            let user = {};
            user.user = userData[0];
            user.user.password = '';
            return res.send({statusCode : 0, statusMessage : "User read success" , data : user});
        } else {
            return res.send({statusCode : 1 , statusMessage : "User doesn't exist" , data : {}});
        }
    } catch(error) {
        return res.send({statusCode : 1 , statusMessage : "Invalid user info" , data : error});
    }
}

let read_all_users = async function(req,res,next) {
    try {
        let users = await mongo.findFromCollection(User);
        // console.log(users);
        let temp_arr = [];
        for(var i=0;i<users.length;i++) {
            temp_arr.push(users[i]);
        }
        // console.log(temp_arr);
        let user = {};
        user.user = temp_arr;
        return res.send({statusCode : 0, statusMessage : "User read success" , data : user});
    } catch(error) {
        return res.send({statusCode : 1 , statusMessage : "Invalid user info" , data : error});
    }
}

let delete_user = async function(req,res,next) {
    let body = req.body;
    try {
        let userData = await mongo.findFromCollection(User,body);
        if(userData.length !=0) {
            let user = {};
            user.user = userData[0];
            user.user.password = '';
            await mongo.deleteFromCollection(User,body);
            return res.send({statusCode : 0, statusMessage : "Deleted user" , data : user});
        } else {
            return res.send({statusCode : 1 , statusMessage : "User doesn't exist" , data : {}});
        }
    } catch(error) {
        return res.send({statusCode : 1 , statusMessage : "Invalid user info" , data : error});
    }
}

let update_user = async function(req,res,next) {
    let body = req.body;
    let update_obj = {};
    update_obj.email = body.email;
    try {
        let is_user_exist = await User.find({"email" : body.email});
        if(is_user_exist.length !== 0) {
            await mongo.updateCollection(User,update_obj, body);
            let user = {};
            var userData = await User.find({"email" : body.email});
            user.user = userData[0];
            user.user.password = '';
            return res.send({statusCode : 0 , statusMessage : "User updated successfully" , data : user});
        } else {
            console.log('inside else');
            return res.send({statusCode : 1, statusMessage : "No user exist for given email" , data : {}})
        }
    } catch(error) {
        console.log(error);
        return res.send({statusCode : 1,statusMessage : "Invalid info" , data : error});
    }
}

function verifyUserData(fields_tobe_verified,user_data_obj) {
    return new Promise((resolve,reject)=> {
        fields_tobe_verified.forEach(key => {
            if (user_data_obj.hasOwnProperty(key)) {
                if (user_data_obj[key] == undefined || user_data_obj[key] == null || user_data_obj[key] == '') {
                    reject({statusCode : 1 , statusMessage : `Invalid value for ${key} property.`});
                }
            } else {
                reject({statusCode : 1, statusMessage : `${key} not found.Please provide all the details required.`});
            }
        });
        resolve(true);
    });
}

module.exports = {
    test : test,
    create_user : create_user,
    update_user : update_user,
    read_user : read_user,
    read_all_users : read_all_users,
    delete_user : delete_user
}