const router = require("express").Router();
const clothingItem = require("./clothingItems");
const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const {
  validateSignup,
  validateSignin,
} = require("../middlewares/Validation");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.post("/signin", validateSignin, login);
router.post("/signup", validateSignup, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Clothing Item not found"));
});

module.exports = router;
