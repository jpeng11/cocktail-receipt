const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    comment: String,
    user: String,
  },
  {
    timestamps: true,
  }
);

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
      measure: String,
      ingredient: String,
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
  comments: [commentSchema],
});

module.exports = mongoose.model("Cocktail", cocktailSchema);
