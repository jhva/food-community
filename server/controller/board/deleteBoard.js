const { ERROR } = require("../../error");
const Board = require("../../models/board");
module.exports = async (req, res, next) => {
  const { id } = req.params;
  await Board.destroy({
    where: {
      id,
    },
  })
    .then(() => {
      return res.status(200).json({
        msg: "content delete success",
        status: 200,
      });
    })
    .catch((err) => {
      console.log(err, "board delete err");
      ERROR(500, err, res);
    });
};
