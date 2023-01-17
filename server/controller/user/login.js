const { generateAccessToken, refresh } = require("../../jwt");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email.trim() } });
    const password_valid = await bcrypt.compare(password, user.password);
    if (user) {
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
      return res.status(400).json({ msg: "가입 된 사용자가 아닙니다" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "server err" });
  }
};
