const User = require("../../models/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  const { username, email, phoneNumber, nickname, password, isMarketing } =
    req.body;
  try {
    const hash = await bcrypt.hash(password, 10);

    await User.create({
      email,
      username,
      phoneNumber,
      nickname,
      password: hash,
      isMarketing,
    });

    res.status(200).json({
      status: 200,
      msg: "signUp success",
    });
  } catch (e) {
    console.log(e);
  }
};
