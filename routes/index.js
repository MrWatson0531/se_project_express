const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");

const clothingItem = require("./clothingItems");
const userRouter = require("./users");

const {login, createUser} = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.post('/signin', login);
router.post('/signup', createUser);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
