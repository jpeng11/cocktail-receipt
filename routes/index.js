var express = require("express");
var router = express.Router();
const passport = require("passport");
const cocktailCtrl = require("../controllers/cocktail");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/seed/cocktails", cocktailCtrl.seed);
router.get("/seed/success", cocktailCtrl.seedSuccess);

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

// OAuth logout route
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
