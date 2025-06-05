const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateUser } = require("../middlewares/Validation");

// const {} = require("../controllers/users");

router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, validateUser, updateUser);

module.exports = router;
