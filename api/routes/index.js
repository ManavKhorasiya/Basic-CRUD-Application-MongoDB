var express = require('express');
var router = express.Router();
var user = require('../controller/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', user.test);

router.post('/create_user' ,user.create_user ,function(req,res,next) {

});

router.post('/update_user', user.update_user, function(req,res,next) {

});

router.post('/read_user', user.read_user, function(req,res,next) {

});

router.get('/read_all_users', user.read_all_users, function(req,res,next) {

});

router.post('/delete_user', user.delete_user, function(req,res,next) {

});


module.exports = router;
