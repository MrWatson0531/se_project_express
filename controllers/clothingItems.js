const clothingItem = require("../models/clothingItem");
const { DEFAULT, NOT_FOUND, BAD_REQUEST, FORBIDDEN } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Create Item Failed" });
      }
      return res.status(DEFAULT).send({ message: "Failed to create Item" });
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((error) => {
      console.error(error);
      return res.status(DEFAULT).send({ message: "Get Items Failed" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res
          .status(FORBIDDEN)
          .send({ message: "User not authorized" });
      }
      return item
        .deleteOne()
        .then(() => res.status(200).send({ message: "successfully deleted" }));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Unable to complete request" });
      }
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res.status(DEFAULT).send({ message: "Get Items Failed" });
    });
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
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Get User Failed" });
      } else if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res.status(DEFAULT).send({ message: "Like Items Failed" });
    });

const dislikeItem = (req, res) =>
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "dislike Items Failed" });
      } else if (error.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data", error });
      }
      return res.status(DEFAULT).send({ message: "Like Items Failed" });
    });

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
