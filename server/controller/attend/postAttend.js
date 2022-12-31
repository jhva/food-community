const AttendRecruit = require("../../models/attendRecruit");
const Recruits = require("../../models/recruits");
const ChatRoom = require("../../models/chatroom");
const { ERROR } = require("../../error");
const { RES } = require("../../response");

module.exports = async (req, res, next) => {
  const { isAttend, RecruitId, statusNumber, maxinum } = req.body;

  const myUser = await AttendRecruit.findOne({
    where: {
      UserId: req.authId,
      RecruitId,
    },
  });

  if (statusNumber === maxinum) {
    return ERROR(400, "인원이 모집이 종료 되었습니다.", res);
  }

  if (myUser) {
    return ERROR(400, "이미 참석하신 그룹입니다", res);
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
      if (maxinum === statusNumber + 1) {
        const data = await AttendRecruit.findAll({
          where: {
            RecruitId,
          },
        });
        data.forEach((data) => {
          ChatRoom.bulkCreate([
            {
              RecruitId: data.RecruitId,
              UserId: data.UserId,
            },
          ]);
        });
      }
      return RES(200, "success", res);
    } else {
      return RES(400, "bad request", res);
    }
  } catch (e) {
    return ERROR(500, "server err", res, e);
  }
};
