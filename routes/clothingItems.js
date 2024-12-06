const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// CRUD

// Create
router.post("/", createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

// Delete
router.delete("/:itemId", deleteItem);

module.exports = router;
