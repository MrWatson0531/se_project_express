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
        return res.status(BAD_REQUEST).send({ message: "Validation Error" });
      }
      if (err.code === 11000) {
        return res.status(CONFLICT).send({ message: "user already exists" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "Unable to complete request" });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Failed to get user" });
      } else if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid Data" });
      }
      return res.status(DEFAULT).send({ message: "Get user Failed" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "The email and password fields are required" });
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
        return res
          .status(NOT_AUTHORIZED)
          .send({ message: "email or password are incorrect" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid Data" });
      }
      return res.status(DEFAULT).send({ message: "Login Failed" });
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
        return res.status(NOT_FOUND).send({ message: "user not found" });
      }
      if (err.name === "ValidationError") {
        console.error(err);
        return res.status(BAD_REQUEST).send({ message: "Invalid Data" });
      }
      return res.status(DEFAULT).send({ messsage: "Failed to update user" });
    });
};
module.exports = { createUser, getCurrentUser, login, updateUser };
