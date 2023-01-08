const { ERROR } = require("../../error");
const Board = require("../../models/board");
const Comment = require("../../models/comment");
const User = require("../../models/user");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  await Board.findOne({
    where: { id },
    order: [[{ model: Comment }, "createdAt", "DESC"]],
    include: {
      model: Comment,
      include: { model: User, attributes: ["nickname"] },
    },
  })
    .then((data) => {
      return res
        .status(200)
        .json({ msg: "board detail success", code: 200, data: [data] });
      // console.log(data);
    })
    .catch((err) => {
      console.error(err);
      ERROR(500, err, res);
    });
};
