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
  res.render("users/login");
}

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .select("+password")
    .exec(function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/");
        // return next(Error("Invalid Credentials"));
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          req.logIn(user, function (err) {
            if (err) return next(err);
            return res.redirect("/");
          });
        } else {
          // could change to redirect back to form with error message
          return next(Error("Invalid Credentials"));
        }
      });
    });
}

function signupForm(req, res) {
  res.render("users/signup");
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
  req.session.destroy(function (err) {
    req.user = null;
    res.redirect("/");
  });
}
