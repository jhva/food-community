const { ERROR } = require("../../error");
const Recruit = require("../../models/recruits");
const { RES } = require("../../response");

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Recruit.destroy({ where: { id } });
    RES(200, "success", res);
  } catch (e) {
    ERROR(500, "server err", res, e);
  }
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
