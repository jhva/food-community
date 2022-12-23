const { ERROR } = require("../../error");
const Recruit = require("../../models/recruit");

module.exports = async (req, res, next) => {
  try {
    const { title, maxinum, content, lat, lng } = req.body;
    console.log(title, maxinum, content, lat, lng);
    await Recruit.findOrCreate({
      title,
      maxinum,
      content,
      lat,
      lng,
      UserId: req.authId,
    });
    res.status(200).json({
      code: 200,
      msg: "recruit start success",
    });
  } catch (e) {
    ERROR(500, e, res);
  }
};
