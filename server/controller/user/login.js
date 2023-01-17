const { generateAccessToken, refresh } = require("../../jwt");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email.trim() } });
  if (user) {
    const password_valid = bcrypt.compare(password, user.password);
    if (password_valid) {
      let accesstoken = generateAccessToken(
        { email: user.email.trim(), nickname: user.nickname, id: user.id },
        process.env.ACCESS_TOKEN
      );
      let refreshtoken = refresh();

      let userfilter = {
        id: user.id,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
        nickname: user.nickname,
        priovider: user.priovider,
        accesstoken,
        refreshtoken,
      };
      return res
        .cookie("user", refreshtoken, { httpOnly: true })
        .status(200)
        .json({
          status: 200,
          msg: "login success",
          data: userfilter,
        });
    } else {
      return res.status(400).json({ msg: "비밀번호가 맞지않습니다" });
    }
  } else {
    return res.status(404).json({ msg: "해당 유저가 존재하지 않습니다." });
  }
};
