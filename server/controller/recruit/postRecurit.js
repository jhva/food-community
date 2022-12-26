const { ERROR } = require("../../error");
const Recruit = require("../../models/recruit");
const AttendRecruit = require('../../models/attendRecruit');

module.exports = async (req, res, next) => {
  try {
    const { title, maxinum, content, lat, lng } = req.body;

    const returnRecruitId = await Recruit.create({
      title,
      maxinum,
      content,
      lat,
      lng,
      UserId: req.authId,
    });

    if (returnRecruitId.id) {

      await AttendRecruit.create({
        UserId: req.authId,
        RecruitId: returnRecruitId.id
      })
      
    }




    res.status(200).json({
      code: 200,
      msg: "recruit start success",
    });
  } catch (e) {
    ERROR(500, e, res);
  }
};
