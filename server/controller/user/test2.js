module.exports = async (req, res, next) => {
  res.status(200).json({ msg: "test2" });
};