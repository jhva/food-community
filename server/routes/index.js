const router = require("express").Router();
const authRouter = require("./auth");
const boardRouter = require("./board");
const commentRouter = require("./comment");
const recuritRouter = require("./recurit");
const attendRouter = require("./attend");

router.use("/user", authRouter);
router.use("/board", boardRouter);
router.use("/comment", commentRouter);
router.use("/recurit", recuritRouter);
router.use("/attend", attendRouter);

module.exports = router;
