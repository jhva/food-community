const { ERROR } = require("../../error");
const ChatMsg = require("../../models/chatMsg");
const { RES } = require("../../response");

module.exports = async (req, res, next) => {
  const { msg, RecruitId } = req.body;
  if (msg === null || RecruitId === null)
    return ERROR(400, "please all fields", res);
  try {
    await ChatMsg.create({
      msg,
      UserId: req.authId,
      RecruitId,
    });
    RES(200, "success", res);
  } catch (e) {
    ERROR(500, "SERVER ERROR", res);
  }
};
