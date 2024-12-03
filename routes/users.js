const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
} = require("../controllers/users");

//CRUD

//Create
router.post("/", createUser);

//Read
router.get("/", getUsers);

//Update
router.put("/:userId", getUser);

//Delete
// router.delete("/:userId", deleteUser);

module.exports = router;
