const Comment = require("../../models/comment");
const { ERROR } = require("../../error");

module.exports = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { content } = req.body;

    await Comment.create({
      BoardId: boardId,
      UserId: req.authId,
      content,
    });
    return res.status(200).json({
      msg: "comment created successfully",
      status: 200,
    });
  } catch (err) {
    console.error(err);
    ERROR(500, err, res);
  }
};
