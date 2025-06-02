const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateId } = require("../middlewares/Validation");

// const {} = require("../controllers/users");

router.get("/me", auth, getCurrentUser);

router.patch("/me", validateId, auth, updateUser);

module.exports = router;
