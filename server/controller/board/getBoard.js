const { ERROR } = require("../../error");
const Board = require("../../models/board");
const Comment = require("../../models/comment");
const User = require("../../models/user");
const { redisClient } = require("../../redis");

module.exports = async (req, res, next) => {
  // let redisLength = JSON.parse(redisgetData)?.length;
  // await redisClient.hGetAll("re", (err, data) => {
  //   console.log(JSON.stringify(data));
  //   res.status(200).json({
  //     msg: "board redis cache success",
  //     code: 200,
  //     data: [data],
  //   });
  // });
  // await redisClient.EXPIRE("asf", 5);
  // await redisClient.lRange("asf", 0, -1, (err, data) => {
  //   let dataFilter = [];
  //   data.forEach((i) => {
  //     dataFilter.push(JSON.parse(i));
  //   });

  //   console.log(dataFilter);
  //   res.status(200).json({
  //     msg: "board redis cache success",
  //     code: 200,
  //     data: dataFilter,
  //   });
  // });
  try {
    const boardFindAll = await Board.findAll({
      order: [["createdAt", "DESC"]],
      include: [{ model: Comment }, { model: User, attributes: ["nickname"] }],
    });
    // if (boardFindAll?.length > redisLength) {
    //   res.status(200).json({
    //     msg: "board get success",
    //     code: 200,
    //     data: boardFindAll,
    //   });
    //   await redisClient.set("get-board", JSON.stringify(boardFindAll));
    // } else {
    //   await redisClient.set("get-board", JSON.stringify(boardFindAll));
    //   res.status(200).json({
    //     msg: "board redis cache success",
    //     code: 200,
    //     data: redisgetData,
    //   });
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
