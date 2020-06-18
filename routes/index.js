var express = require("express");
var router = express.Router();
const passport = require("passport");

const cocktailCtrl = require("../controllers/cocktail");
const usersCtrl = require("../controllers/users");
const homeCtrl = require("../controllers/home");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/seed/cocktails", cocktailCtrl.seed);
router.get("/seed/success", cocktailCtrl.seedSuccess);

// Auth route
router.post("/login", usersCtrl.login);
router.post("/signup", usersCtrl.signup);
router.get("/logout", usersCtrl.logout);

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
