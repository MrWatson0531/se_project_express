const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  DEFAULT,
  NOT_FOUND,
  BAD_REQUEST,
  CONFLICT,
  NOT_AUTHORIZED,
} = require("../utils/errors");
const BadReqestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const NotAuthorizedError = require("../errors/notAuthorizedError");

const JWT_SECRET = "Secret Password";

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    // .then(() => User.create({ name, avatar, email }))
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      res.status(201).send({
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      })
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadReqestError("Validation error"));
      }
      if (err.code === 409) {
        return next(new ConflictError("User already exists"));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not Found"));
      } else if (err.name === "CastError") {
        return next(new BadReqestError("User not found"));
      }
      return next(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadReqestError("Login failed"));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new NotAuthorizedError("User not authorized"));
      }
      if (err.name === "ValidationError") {
        return next(new BadReqestError("Login failed"));
      }
      return next(err);
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("user not found"));
      }
      if (err.name === "ValidationError") {
        console.error(err);
        return next(new BadReqestError("Failed to update user"));
      }
      return next(err);
    });
};
module.exports = { createUser, getCurrentUser, login, updateUser };
