const { ERROR } = require("../../error");
const Board = require("../../models/board");
module.exports = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;

  await Board.update(
    {
      title,
      content,
    },
    {
      where: {
        id,
      },
    }
  )
    .then(() => {
      res.status(200).json({
        msg: "board update successfully",
        code: 200,
      });
    })
    .catch((err) => {
      ERROR(500, err);
    });
};
