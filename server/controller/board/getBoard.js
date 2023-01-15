const { ERROR } = require("../../error");
const Board = require("../../models/board");
const Comment = require("../../models/comment");
const User = require("../../models/user");
const { redisClient } = require("../../redis");

module.exports = async (req, res, next) => {
  // let value = await redisClient.v4.get("daf");

  // let valueLen = JSON.parse(value)?.length;

  try {
    const boardFindAll = await Board.findAll({
      order: [["createdAt", "DESC"]],
      include: [{ model: Comment }, { model: User, attributes: ["nickname"] }],
    });

    // await redisClient.pSubscribe("newboard", (msg) => {
    //   console.log(msg, "123");
    // });
    // if (value) {
    //   res.status(200).json({
    //     msg: "board redis cache success",
    //     code: 200,
    //     data: [JSON.parse(value)],
    //   });
    // }
    //   await redisClient.set("get-board", JSON.stringify(boardFindAll));
    // }
    //================================================================
    // if (valueLen) {
    //   res.status(200).json({
    //     msg: "board redis cache success",
    //     code: 200,
    //     data: JSON.parse(value),
    //   });
    //   return;
    // } else {
    // await redisClient.setEx("get-board", 2000, JSON.stringify(boardFindAll));
    // }
    return res
      .status(200)
      .json({ msg: "board get success", code: 200, data: boardFindAll });
  } catch (err) {
    console.error(err);
    ERROR(500, err, res);
  }
};
