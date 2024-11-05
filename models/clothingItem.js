const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  weather: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },

  owner: {
    type: String,
    required: true,
  },

  likes: {

  },

  createdAt:{}
});

module.exports = mongoose.model("item", clothingItemSchema);
