const { ERROR } = require("../../error");
const Board = require("../../models/board");
const Comment = require("../../models/comment");
const User = require("../../models/user");
module.exports = async (req, res, next) => {
  try {
    const boardFindAll = await Board.findAll({
      order: [["createdAt", "DESC"]],
      include: [{ model: Comment }, { model: User, attributes: ["nickname"] }],
    });

    return res
      .status(200)
      .json({ msg: "board get success", code: 200, data: boardFindAll });
  } catch (err) {
    console.error(err);
    ERROR(500, err, res);
  }
};
