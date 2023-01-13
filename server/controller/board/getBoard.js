const { ERROR } = require("../../error");
const Board = require("../../models/board");
const Comment = require("../../models/comment");
const User = require("../../models/user");
const { redisClient } = require("../../redis");

module.exports = async (req, res, next) => {
  // let value = await redisClient.v4.get("get-board");
  const boardFindAll = await Board.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: Comment }, { model: User, attributes: ["nickname"] }],
  });
  // let valueLen = JSON.parse(value)?.length;

  try {
    // if (valueLen) {
    //   res.status(200).json({
    //     msg: "board redis cache success",
    //     code: 200,
    //     data: JSON.parse(value),
    //   });
    //   return;
    // } else {
    //   await redisClient.set("get-board", JSON.stringify(boardFindAll));
    // }

    return res
      .status(200)
      .json({ msg: "board get success", code: 200, data: boardFindAll });
  } catch (err) {
    console.error(err);
    ERROR(500, err, res);
  }
};
