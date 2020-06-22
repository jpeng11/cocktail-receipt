const cocktailSeed = require("../config/drinks");
const Cocktail = require("../models/cocktail");
const axios = require("axios");
const User = require("../models/user");

module.exports = {
  seed,
  seedSuccess,
  index,
  show,
  create,
  removeOne,
  update,
  addComment,
  deleteComment,
};

function seedSuccess(req, res, next) {
  res.render("success");
}

async function seed(req, res, next) {
  await Cocktail.deleteMany({});
  Cocktail.insertMany(cocktailSeed.drinks)
    .then((drinks) => {
      res.redirect("/cocktails/index");
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
async function create(req, res, next) {
  console.log(req.body);
  try {
    await Cocktail.create({
      name: req.body.name,
      alcoholic: req.body.alcoholic === "true" ? true : false,
      glass: req.body.glass,
      drinkThumb: req.body.drinkThumb,
      instruction: req.body.instruction,
      ingredient: req.body.measure.map((m, idx) => ({
        measure: m,
        ingredient: req.body.ingredient[idx],
      })),
    });
    res.redirect("/cocktails/index");
  } catch (error) {
    return next(error);
  }
}

function removeOne(req, res) {
  Cocktail.findByIdAndDelete(req.params.id, function (err, cocktail) {
    res.redirect("/cocktails/index");
  });
}

async function update(req, res, next) {
  try {
    await Cocktail.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        alcoholic: req.body.alcoholic === "true" ? true : false,
        glass: req.body.glass,
        drinkThumb: req.body.drinkThumb,
        instruction: req.body.instruction,
        ingredient: req.body.measure.map((m, idx) => ({
          measure: m,
          ingredient: req.body.ingredient[idx],
        })),
      },
    });
    res.redirect(`/cocktails/${req.params.id}`);
  } catch (error) {
    return next(error);
  }
}

async function addComment(req, res, next) {
  try {
    await Cocktail.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: { comment: req.body.comments, user: req.user.id } },
      },
      { useFindAndModify: false }
    );
    res.redirect(`/cocktails/${req.params.id}`, { user: req.user }, 200);
  } catch (error) {
    return next(error);
  }
}

function deleteComment(req, res, next) {
  console.log(req.body);
  try {
    Cocktail.findById(req.params.id).then((result) => {
      result.comments.pull(req.params.comment_id);
      result.save(function (err) {
        if (err) next(err);
        res.redirect(`/cocktails/${req.params.id}`);
      });
    });
  } catch (error) {
    next(error);
  }
}
