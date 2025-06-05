const router = require("express").Router();
const clothingItem = require("./clothingItems");
const userRouter = require("./users");
const { auth } = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");
const { validateId, validateSignup, validateSignin } = require("../middlewares/Validation");
const NotFoundError = require("../errors/NotFoundError");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.post("/signin", auth, validateSignin, login);
router.post("/signup", auth, validateSignup, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Clothing Item not found"));
});

module.exports = router;
