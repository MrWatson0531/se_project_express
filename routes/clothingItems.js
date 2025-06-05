const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { validateCardBody, validateId } = require("../middlewares/Validation");

// CRUD

// Create
router.post("/", auth, validateCardBody, createItem);
// post("/items");

// Read
router.get("/", getItems);
// get("/items");

// Update
router.put("/:itemId/likes", auth, validateId, likeItem);

router.delete("/:itemId/likes", auth, validateId, dislikeItem); //localhost:3001/items/1298312398129831283/likes 
// params = {itemId: 1298312398129831283}

//  delete("/items/:itemId");

// Delete
router.delete("/:itemId", auth, validateId, deleteItem);

module.exports = router;
