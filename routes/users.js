const router = require("express").Router();
const {} = require("../controllers/users");

router.get("/users");

router.get("/users/me");

router.post("/users");

router.patch("/users/me");

module.exports = router;
