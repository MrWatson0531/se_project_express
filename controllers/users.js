const User = require("../models/user");
const { DEFAULT, NOT_FOUND, BAD_REQUEST } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.messaghe });
      }
      return res.status(500).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "") {
        //   return res.status(400).send({ message: err.messaghe });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteUser = (req, res) => {
  const { userId } = req.param;

  User.findByIdAndDelete(userId)
    .orFail()
    .then((user) => res.status(204).send(user))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Delete User Failed", err });
    });
};
module.exports = { getUsers, createUser, getUser, deleteUser };
