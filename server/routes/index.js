const router = require("express").Router();
const authRouter = require("./auth");
const boardRouter = require("./board");
const comment = require("./comment");

router.use("/user", authRouter);
router.use("/board", boardRouter);
router.use("/comment", comment);

module.exports = router;
