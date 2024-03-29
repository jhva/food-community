const Comment = require("../../models/comment");
const { ERROR } = require("../../error");

module.exports = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    await Comment.destroy({
      where: {
        id: commentId,
      },
    });
    return res.status(200).json({
      msg: "comment delete success",
      code: 200,
    });
  } catch (err) {
    console.error(err);
    ERROR(500, err, res);
  }
};
