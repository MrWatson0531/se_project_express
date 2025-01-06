const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

// const {} = require("../controllers/users");

router.get("/users/me", auth, getCurrentUser);

router.patch("/users/me", auth, updateUser);

module.exports = router;
