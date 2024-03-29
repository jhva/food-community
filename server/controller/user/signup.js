const User = require("../../models/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  const { username, email, phoneNumber, nickname, password, isMarketing } =
    req.body;

  try {
    const isUserEmail = await User.findOne({ where: { email: email } });
    const isNickname = await User.findOne({ where: { nickname: nickname } });
    if (isUserEmail) {
      return res.status(400).json({
        status: 400,
        msg: "이미 등록된 이메일 입니다.",
      });
    } else if (isNickname) {
      return res.status(400).json({
        status: 400,
        msg: "이미 등록된 닉네임 입니다.",
      });
    } else {
      const hash = await bcrypt.hash(password, 10);

      await User.create({
        email: email.trim(),
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
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      msg: "server err",
      data: e,
    });
    console.log(e);
  }
};
