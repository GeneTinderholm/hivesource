var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const user = req.user;
  res.render('welcome/index', {user});
});

module.exports = router;

