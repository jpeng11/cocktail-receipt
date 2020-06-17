const cocktailSeed = require("../config/drinks");
const Cocktail = require("../models/cocktail");

module.exports = {
  seed,
  seedSuccess,
};

function seedSuccess(req, res, next) {
  res.render("success");
}

async function seed(req, res, next) {
  await Cocktail.deleteMany({});
  Cocktail.insertMany(cocktailSeed.drinks)
    .then((drinks) => {
      console.log(drinks.length + " cocktails inserted");
      res.redirect("/seed/success");
    })
    .catch((err) => next(err));
}
