const BadReqestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const clothingItem = require("../models/clothingItem");
const { DEFAULT, NOT_FOUND, BAD_REQUEST, FORBIDDEN } = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadReqestError("Create Item Failed"))
        //res.status(BAD_REQUEST).send({ message: "Create Item Failed" });
      }
      //return res.status(DEFAULT).send({ message: "Failed to create Item" });
      return next(err)
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      return next(err);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return next(new ForbiddenError("User not authorized"));
      }
      return item
        .deleteOne()
        .then(() => res.status(200).send({ message: "successfully deleted" }));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Clothing Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadReqestError("Failed to delete item"));
      }
      next(err);
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
        return next(new NotFoundError("Like item failed"));
      } else if (err.name === "CastError") {
        return next(new BadReqestError("Invalid data"));
      }
      return next(err);
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
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Like item failed"));
      } else if (error.name === "CastError") {
        return next(new BadReqestError("Invalid data"));
      }
      return next(err);
    });

module.exports = { createItem, getItems, deleteItem, likeItem, dislikeItem };
