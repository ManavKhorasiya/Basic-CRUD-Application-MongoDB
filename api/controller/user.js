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

module.exports = {
    test : test
}