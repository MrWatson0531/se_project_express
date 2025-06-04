const router = require("express").Router();
const clothingItem = require("./clothingItems");
const userRouter = require("./users");
const { auth } = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");
const { validateId } = require("../middlewares/Validation");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.post("/signin", validateId, login);
router.post("/signup", auth, createUser);

router.use((req, res, err, next) => {
  next(new NotFoundError("Clothing Item not found"));
});

module.exports = router;
