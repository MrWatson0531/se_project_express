const router = require("express").Router();
const {getUsers} = require("../controllers/users");

router.get("/users", () => console.log("GET users"));
router.get("/:userId", () => console.log("GET users by ID"));
router.get("/users", () => console.log("POST users"));

module.exports = router;
