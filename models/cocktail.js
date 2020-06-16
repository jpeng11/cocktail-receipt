const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

var cocktailSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
  },
  ingredient: [
    {
      ingredient1: String,
      ingredient2: String,
      ingredient3: String,
      ingredient4: String,
      ingredient5: String,
      ingredient6: String,
      measure1: String,
      measure2: String,
      measure3: String,
      measure4: String,
      measure5: String,
      measure6: String,
    },
  ],
  drinkThumb: {
    type: String,
  },
  alcoholic: {
    type: Boolean,
  },
  glass: {
    type: String,
  },
});

module.exports = mongoose.model("Cocktail", cocktailSchema);
