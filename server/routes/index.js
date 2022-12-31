const router = require("express").Router();

const recuritRouter = require("./recurit");
const commentRouter = require("./comment");
const attendRouter = require("./attend");
const boardRouter = require("./board");
const chatRouter = require("./chat");
const authRouter = require("./auth");

router.use("/user", authRouter);
router.use("/board", boardRouter);
router.use("/comment", commentRouter);
router.use("/recurit", recuritRouter);
router.use("/attend", attendRouter);
router.use("/chat", chatRouter);

module.exports = router;
