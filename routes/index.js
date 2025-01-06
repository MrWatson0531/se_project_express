const router = require("express").Router();
const app = require ("../app");
const { NOT_FOUND } = require("../utils/errors");

const clothingItem = require("./clothingItems");
const userRouter = require("./users");

const login = require("../controllers/users");
const createUser = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItem);

app.post('/signin', login);
app.post('/signup', createUser);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
