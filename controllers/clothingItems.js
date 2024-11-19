const clothingItem = require("../models/clothingItem");

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
      res.status(500).send({ message: "Get Items Failed", err });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.param;
  const { imageUrl } = req.body;

  clothingItem
    .findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Update Items Failed", err });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.param;

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send(item))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Delete Items Failed", err });
    });
};

module.exports = { createItem, getItems, updateItem, deleteItem };
