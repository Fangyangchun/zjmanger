var express = require('express');
var router = express.Router();
var filter = require('../util/filter');

router.get('/', function(req, res, next) {
  //res.render('index');
  res.redirect('/moongood');
});

router.get('/login', function(req, res, next) {
  res.render('login');
  // res.redirect('/moongood');
});

module.exports = router;
