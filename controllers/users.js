const User = require("../models/user");
const { DEFAULT, NOT_FOUND, BAD_REQUEST } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status({DEFAULT}).send({ message: "An error has occured on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status({BAD_REQUEST}).send({ message: "Invalid data" });
      }
      return res.status({NOT_FOUND}).send({ message: "Unable to complete request" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === 404) {
      return res.status({BAD_REQUEST}).send({ message: "Get User Failed", err });
    }else if(err.name === "CastError"){
      return res.status({BAD_REQUEST}).send({message: "Invalid data"})
    }else{
      return res.status({DEFAULT}).send({message: "An error has poccured on the server"})
    }});
};


module.exports = { getUsers, createUser, getUser };
