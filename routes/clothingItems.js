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
// post("/items");

// Read
router.get("/", getItems);
// get("/items");

// Update
router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

//  delete("/items/:itemId");

// Delete
router.delete("/:itemId", deleteItem);

module.exports = router;
