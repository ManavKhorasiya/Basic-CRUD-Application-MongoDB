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
            }
        }
        else {
            return res.send({statusCode : 1 , statusMessage : "User already exist for this email" , data : {}});
        }
    } catch(error) {
        return res.send({statusCode : 1 , statusMessage : "Invalid user info" , data : error});
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
    create_user : create_user
}