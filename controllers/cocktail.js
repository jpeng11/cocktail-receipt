const cocktailSeed = require("../config/drinks");
const Cocktail = require("../models/cocktail");

module.exports = {
  seed,
  seedSuccess,
  index,
  show,
  create,
  delete: removeOne,
  update,
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

function index(req, res) {
  Cocktail.find({}, function (err, data) {
    res.render("cocktails/index", {
      cocktails: data,
    });
  });
}

function show(req, res) {
  Cocktail.findById(req.params.id, function (err, cocktail) {
    if (err) return res.redirect("cocktails/index");
    res.render("cocktails/detail", { cocktail });
  });
}

/** Future plan:
 *  Create cocktail by fetch data from TheCocktailDB
 */
function create(req, res) {
  Cocktail.create({});
}

function removeOne(req, res) {
  Cocktail.findByIdAndRemove({});
}

function update(req, res) {
  Cocktail.findByIdAndUpdate({});
}
