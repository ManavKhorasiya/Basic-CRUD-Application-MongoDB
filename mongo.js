var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

class Ntdatabase {
    constructor() {
        this.apiStartTime = new Date().getTime();
        this.db_con, this.timer;
        this.db_url = process.env.DATABASE_URI || "mongodb://localhost:27017/";
        this.database_name = process.env.DATABASE_NAME || "CRUD_basic";
        setImmediate(async () => {
            this.db_con = await this._createConnection();
        })
    }

    check_connection = () => {
        if(this.db_con != undefined) {
            clearInterval(this.timer);
            return true;
        }
        return false;
    }

    _createConnection = () => {
        return new Promise((resolve,reject) => {
            mongoose.connect(this.db_url + this.database_name, {useNewUrlParser : true, useUnifiedTopology : true}, function(e,db) {
                if(e) {
                    console.log(`error while creating connection : ${e}`);
                } else {
                    console.log(`connected successfully`);
                    resolve();
                }
            });
        })
    }

    insertIntoCollection = (model_name) => {
        return new Promise((resolve,reject) => {
            if(typeof model_name == 'object') {
                model_name.save((e, result) => {
                    if(!e) {
                        resolve(result);
                    }
                    else {
                        reject(e);
                    }
                });
            } else {
                reject({status : 104, message : "Invalid insert"});
            } 
        })
    }
    
}

let database = new Ntdatabase();
module.exports = database;