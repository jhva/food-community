module.exports = async (req, res, next) => {
  return res
    .cookie("user", "")
    .status(200)
    .json({ status: 200, msg: "logout success" });
};
