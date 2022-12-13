module.exports = async (req, res, next) => {
  return res
    .cookie("secret", "")
    .status(200)
    .json({ status: 200, msg: "logout success" });
};
