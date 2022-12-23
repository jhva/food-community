const { ERROR } = require("../../error");
const Board = require("../../models/board");
module.exports = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(403).json({
      code: 403,
      msg: "title or contents is empty",
    });
  }
  await Board.create({
    title,
    content,
    UserId: req.authId,
  })
    .then(() => {
      return res.status(200).json({
        msg: "board created successfully",
        code: 200,
      });
    })
    .catch((err) => {
      console.log(err, "board create err");
      ERROR(500,err,res);
    });
};
