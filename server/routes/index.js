const router = require("express").Router();
const authRouter = require("./auth");
const boardRouter = require("./board");

router.use("/user", authRouter);
router.use("/board", boardRouter);

module.exports = router;
