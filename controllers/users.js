const passport = require("passport");
const User = require("../models/user");

module.exports = {
  loginForm,
  login,
  signupForm,
  signup,
  logout,
};

function loginForm(req, res) {
  res.render("users/login", {
    heading: "Please Login",
    postUrl: "/login",
    btnText: "Sign In",
  });
}

function login(req, res, next) {
  // or skip the strategy
  User.findOne({ email: req.body.email })
    .select("+password")
    .exec(function (err, user) {
      if (err) {
        // could change to redirect back to form with error message
        return next(err);
      }
      if (!user) {
        // could change to redirect back to form with error message
        return next(Error("Invalid Credentials"));
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          req.logIn(user, function (err) {
            if (err) return next(err);
            return res.redirect("/");
          });
        }
        // could change to redirect back to form with error message
        return next(Error("Invalid Credentials"));
      });
    });
}

function signupForm(req, res) {
  res.render("users/signup", {
    heading: "Please Sign Up",
    postUrl: "/signup",
    btnText: "Sign Up",
  });
}

async function signup(req, res, next) {
  // validate strong password
  let user = new User(req.body);
  try {
    user = await user.save();
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  } catch (err) {
    // Probably a duplicate email, could change to redirect back to form with error message
    next(err);
  }
}

function logout(req, res) {
  req.logout();
  res.redirect("/");
}
