const { ERROR } = require("../../error");
const Board = require("../../models/board");

const { redisClient } = require("../../redis");

module.exports = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(403).json({
      code: 403,
      msg: "title or contents is empty",
    });
  }

  try {
    const data = await Board.create({
      title,
      content,
      UserId: req.authId,
    });
    // await redisClient.pSubscribe("channe*", (message, channel) => {
    //   console.log(message, channel, "post"); // 'message', 'channel'
    // });

    res.status(200).json({
      msg: "board created successfully",
      code: 200,
    });
  } catch (e) {
    console.log(err, "board create err");
    ERROR(500, err, res);
  }
};
//   const data = await Board.create({
//     title,
//     content,
//     UserId: req.authId,
//   });

//    redisClient.set("post-board",data);
//     .then(() => {
//       return res.status(200).json({
//         msg: "board created successfully",
//         code: 200,
//       });
//     })
//     .catch((err) => {
//       console.log(err, "board create err");
//       ERROR(500, err, res);
//     });
// };
