const { QueryTypes } = require("sequelize");
const { ERROR } = require("../../error");
const { sequelize } = require("../../models");
const Recruit = require("../../models/recruits");

module.exports = async (req, res, next) => {
  try {
    let cnt;
    const query =
      "select * from recruits where statusNumber not in(select maxinum  from recruits r)";

    const recruits = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return res
      .status(200)
      .json({ msg: "recruits get success", code: 200, data: recruits });
  } catch (err) {
    console.error(err);
    ERROR(500, err, res);
  }
};
