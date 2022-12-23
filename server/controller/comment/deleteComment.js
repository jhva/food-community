const Comment = require("../../models/comment");
const { ERROR } = require("../../error");

module.exports = async (req, res, next) => {
  try {
    const { content } = req.body;
  } catch (err) {
    console.error(err);
    ERROR(500, err, res);
  }
};
