const { ERROR } = require("../../error");
const AttendRecruit = require("../../models/attendRecruit");
const Recruits = require("../../models/recruits");
const ChatRoom = require("../../models/chatroom");
const { RES } = require("../../response");
const { Op } = require("sequelize");

module.exports = async (req, res, next) => {
  const { isAttend, RecruitId, statusNumber } = req.body;
  const deninedMyUser = await Recruits.findAll({
    where: {
      UserId: req.authId,
    },
  });
  const duplicateUser = await AttendRecruit.findAll({
    where: {
      UserId: req.authId,
    },
  });
  const completedRecruitData = await Recruits.findAll({
    attributes: ["statusNumber", "maxinum"],
    where: {
      maxinum: { [Op.eq]: statusNumber },
    },
  });
  const data = await AttendRecruit.findAll({
    where: {
      RecruitId: RecruitId,
    },
  });
  if (deninedMyUser.length >= 1) {
    return ERROR(400, "그룹을 만든 사람은 참가 할 수 없습니다", res);
  }
  if (duplicateUser.length >= 1) {
    return ERROR(400, "참가는 한번만 가능합니다", res);
  }
  if (!completedRecruitData) {
    return ERROR(400, "참가 모집이 종료되었습니다", res);
  }

  try {
    if (isAttend == "Y") {
      await AttendRecruit.create({
        UserId: req.authId,
        RecruitId,
      });
      await Recruits.increment(
        { statusNumber: 1 },
        {
          where: {
            id: RecruitId,
          },
        }
      );
      if (completedRecruitData) {
        data.forEach((data) => {
          ChatRoom.bulkCreate([
            {
              RecruitId: data.RecruitId,
              UserId: data.UserId,
            },
          ]);
        });
        // await ChatRoom.bulkCreate([]);
      }
      return RES(200, "success", res);
    } else {
      return RES(400, "bad request", res);
    }
  } catch (e) {
    return ERROR(500, "server err", res, e);
  }
};
