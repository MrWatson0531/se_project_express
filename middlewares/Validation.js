const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const { celebrate, Joi } = require("celebrate");
const { createItem } = require("../controllers/clothingItems");
const {
  updateUser,
  login,
  createUser,
  getCurrentUser,
} = require("../controllers/users");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      weather: Joi.string().required().enum("hot", "warm", "cold"),
      imageUrl: Joi.string().required(),
    }),
  }),
  createItem
);

router.patch(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string.required(),
      avatar: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      }),
    }),
  }),
  createUser
);

router.post(
  "/signin",
  celebrate({
    body: Joi.object.keys({
      email: Joi.string().email().required(),
      password: Joi.string.required(),
    }),
  }),
  login
);

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .valid("John", "Steve")
      .messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "string.empty": "The weather value must be selected",
    }),
  }),
});


module.exports.validateId = celebrate({
  params: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
