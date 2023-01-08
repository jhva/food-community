const { ERROR } = require("../../error");
const Recruit = require("../../models/recruits");
const AttendRecruit = require("../../models/attendRecruit");

module.exports = async (req, res, next) => {
  const { title, maxinum, content, lat, lng } = req.body;
  if (
    title === undefined ||
    maxinum === undefined ||
    content === undefined ||
    lat === undefined ||
    lng === undefined
  ) {
    return ERROR(400, "모든 필드값을 입력해주세요", res);
  }

  const returnRecruitId = await Recruit.create({
    title,
    maxinum: Number(maxinum) + 1,
    content,
    lat,
    lng,
    UserId: req.authId,
  });
  if (returnRecruitId.id) {
    try {
      await AttendRecruit.create({
        UserId: req.authId,
        RecruitId: returnRecruitId.id,
      });
      res.status(200).json({
        status: 200,
        msg: "recruit start success",
        statusNumber: returnRecruitId.getDataValue("statusNumber"),
        maxinum: returnRecruitId.getDataValue("maxinum"),
      });
    } catch (e) {
      ERROR(500, "server err", res, e);
    }
  } else {
    ERROR(500, "server err", res, e);
  }
};
