var express = require('express');
var router = express.Router();
var user = require('../controller/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', user.test);

module.exports = router;
