const { ERROR } = require("../../error");
const Recruit = require("../../models/recruits");
const AttendRecruit = require("../../models/attendRecruit");

module.exports = async (req, res, next) => {
  try {
    const recruits = await Recruit.findAll({});

    return res
      .status(200)
      .json({ msg: "recruits get success", code: 200, data: recruits });
  } catch (err) {
    console.error(err);
    ERROR(500, err, res);
  }
};
