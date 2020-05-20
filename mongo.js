var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

class Ntdatabase {
    constructor() {
        this.apiStartTime = new Date().getTime();
        this.db_con, this.timer;
        this.db_url = process.env.DATABASE_URI;
        this.database_name = process.env.DATABASE_NAME;
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
}