const { ERROR } = require("../../error");
const Recruit = require("../../models/recruits");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  console.log("!@3");
  // try {
  //   await Recruit.destroy({
  //     where: {
  //       id,
  //     },
  //   });
  //   res.status(200).json({
  //     status: 200,
  //     msg: "delete recruit success",
  //   });
  // } catch (e) {
  //   ERROR(500, "server err", res, e);
  // }
};
