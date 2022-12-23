const { ERROR } = require("../../error");
const Board = require("../../models/board");
module.exports = async (req, res, next) => {
  try {
    const boardFindAll = await Board.findAll();
    console.log(boardFindAll);
    return res
      .status(200)
      .json({ msg: "board get success", code: 200, data: boardFindAll });
  } catch (err) {
    console.error(err);
    ERROR(500);
  }
};
