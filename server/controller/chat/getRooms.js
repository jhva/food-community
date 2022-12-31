const { where, col } = require("sequelize");
const { ERROR } = require("../../error");
const ChatMsg = require("../../models/chatMsg");
const Recruits = require("../../models/recruits");
const { RES } = require("../../response");
const AttendRecruit = require("../../models/attendRecruit");

module.exports = async (req, res, next) => {
  try {
    const myChatRooms = await Recruits.findAll({
      include: { model: AttendRecruit, where: { UserId: req.authId } },
      where: where(col("statusNumber"), col("maxinum")),
    });
    RES(200, "success", res, myChatRooms);
  } catch (e) {
    ERROR(500, "server error", res, e);
  }
  //   res.json({ msg: "true" });
};
