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

module.exports = router;
