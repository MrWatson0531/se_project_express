const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");

const clothingItem = require("./clothingItems");
const userRouter = require("./users");
const { auth } = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");
const { validateId, validateCardBody } = require("../middlewares/Validation");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", validateId, userRouter);
router.use("/items", validateCardBody, clothingItem);

router.post("/signin", auth, login);
router.post("/signup", auth, createUser);

router.use((req, res) => {
  if (err.name === "DocumentNotFoundError") {
    return next(new NotFoundError("Clothing Item not found"));
  }
});

module.exports = router;
