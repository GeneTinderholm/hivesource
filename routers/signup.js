var express = require('express');
var router = express.Router();
const User = require("./../models/User");

router.get("/", (req, res) => {
  res.render("users/signup");
});

router.post("/", (req, res, next) => {
  const { username, password } = req.body;
  const user = new User({
    username,
    password
  });
  user.save((err, user) => {
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  });
});

module.exports = router;

