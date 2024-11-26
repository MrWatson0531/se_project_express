const clothingItem = require("../models/clothingItem");
const { DEFAULT, NOT_FOUND, BAD_REQUEST } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => res.send(console.err));
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res.status({DEFAULT}).send({ message: "Get Items Failed", err });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      res.status({DEFAULT}).send({ message: "Delete Items Failed", err });
    });
};

const likeItem =(req, res) => {
  const {itemId} =req.params;

  clothingItem.findByIdAndUpdate(itemId).orFail().then((item) => res.status(200).send(item))
.catch((err) =>{
  console.error(err);
  res.status({DEFAULT}).send({message: "Like Items Failed", err });
});};

module.exports = { createItem, getItems, deleteItem, likeItem};
