const router = require("express").Router();
const {auth} = require("../middlewares/auth")

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { validateCardBody } = require("../middlewares/Validation");

// CRUD

// Create
router.post("/", validateCardBody, auth, createItem); 
// post("/items");

// Read
router.get("/", getItems);
// get("/items");

// Update
router.put("/:itemId/likes", auth, likeItem);

router.delete("/:itemId/likes", auth, dislikeItem);

//  delete("/items/:itemId");

// Delete
router.delete("/:itemId", auth, deleteItem);

module.exports = router;
