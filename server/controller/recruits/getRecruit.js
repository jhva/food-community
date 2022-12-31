const { ERROR } = require("../../error");
const Recruit = require("../../models/recruits");
const AttendRecruit = require("../../models/attendRecruit");

module.exports = async (req, res, next) => {
  res.json({ msg: "true" });
};
