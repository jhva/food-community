const { where, col } = require("sequelize");
const { ERROR } = require("../../error");
const ChatMsg = require("../../models/chatMsg");
const { RES } = require("../../response");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const chatMsgList = await ChatMsg.findAll({ where: { RecruitId: id } });
    RES(200, "success", res, chatMsgList);
  } catch (e) {
    ERROR(500, "server error", res);
  }
  //   res.json({ msg: "true" });
};
