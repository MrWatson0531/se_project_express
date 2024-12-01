const router = require("express").Router();
const { DEFAULT, NOT_FOUND, BAD_REQUEST } = require("../utils/errors");

const clothingItem = require("./clothingItems");
const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status({NOT_FOUND}).send({ message: "Router not found" });
});

module.exports = router;
