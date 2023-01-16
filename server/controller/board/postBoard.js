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
    await Board.create({
      title,
      content,
      UserId: req.authId,
    });
    // let datafilter = {
    //   title,
    //   content,
    //   UserId: req.authId,
    //   username,
    // };
    // await redisClient.lPush("asf", JSON.stringify(datafilter));

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
