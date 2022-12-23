const { ERROR } = require("../../error");
const Board = require("../../models/board");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  await Board.findOne({ where: { id } })
    .then((data) => {
      return res
        .status(200)
        .json({ msg: "board detail success", code: 200, data: [data] });
      // console.log(data);
    })
    .catch((err) => {
      console.error(err);
      ERROR(500);
    });
};
