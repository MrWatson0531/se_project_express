const User = require("../models/user");
const { DEFAULT, NOT_FOUND, BAD_REQUEST } = require("../utils/errors");
const jwt = require("jsonwebtoken");
// const token = jwt.sign({ _id: User._id }, process.env.JWT_SECRET, {
//   expiresIn: "7d",
// });

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT)
        .send({ message: "An error has occured on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.create({ name, avatar, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "Unable to complete request" });
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.user;
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
  const { email, password } = req.params;
  User.findOne({ email }).select('+password')
  .then((user) => {
    // the password hash will be there, in the user object 
  })
    .orFail()
    .then((token) => res.status(200).send(token))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid Data" });
      }
      return res.status(DEFAULT).send({ message: "Login Failed" });
    });
};

const updateUser = (req, res) => {
  const {name, avatar} = req.params;
  User.findByIdAndUpdate(name, avatar)
  .orFail()
  .then((user) =>res.status(200).send(user))
  .catch((err) =>{
    if (err.name === "ValidationError"){
      return res.status(BAD_REQUEST).send({ message: "Invalid Data" });
    }
    return res.status(DEFAULT).send({ messsage: "Failed to update user"})
  });
};
module.exports = { getUsers, createUser, getCurrentUser, login, updateUser };
