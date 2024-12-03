const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem
} = require("../controllers/clothingItems");

//CRUD

//Create
router.post("/", createItem);

//Read
router.get("/", getItems);

//Update
router.put("/items/:itemId/likes", likeItem);

router.delete("/items/:itemId/likes")

//Delete
router.delete("/:itemId", deleteItem);



module.exports = router;
