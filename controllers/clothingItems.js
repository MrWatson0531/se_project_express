const clothingItem = require("../models/clothingItem");
const { DEFAULT, NOT_FOUND, BAD_REQUEST } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      statusCode: if (err.name === "ValidationError") {
        res.status({BAD_REQUEST}).send({message: "Create Item Failed" })
      }else{
        res.status({DEFAULT}).send({})
      }
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res.status({ DEFAULT }).send({ message: "Get Items Failed" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if(err.statusCode === 404){
        return res.status({NOT_FOUND}).send({ message: "Unable to complete request" });
      }else{
      res.status({ DEFAULT }).send({ message: "Delete Items Failed" });
}});
};

const likeItem = (req, res) =>
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === 404) {
        return res.status({NOT_FOUND}).send({ message: "Get User Failed", err });
      }else if(err.name === "CastError"){
        return res.status({BAD_REQUEST}).send({message: "Invalid data"})
      }
      res.status({ DEFAULT }).send({ message: "Like Items Failed" });
    });

const dislikeItem = (req, res) =>
  clothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }.then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === 400) {
        return res.status({BAD_REQUEST}).send({ message: "dislike Items Failed", err });
      }else if(err.name === "CastError"){
        return res.status({BAD_REQUEST}).send({message: "Invalid data"})
      }
      res.status({ DEFAULT }).send({ message: "Like Items Failed" });
    }
  ));

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
