const router = require("express").Router();
const authRouter = require("./auth");
// const app = express();

// // router.get("/abc", async (req, res, next) => {
// //   console.log("abc");
// // });

router.use("/user", authRouter);

module.exports = router;
