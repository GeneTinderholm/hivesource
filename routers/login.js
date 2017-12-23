var express = require('express');
var router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("users/login");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

module.exports = router;
