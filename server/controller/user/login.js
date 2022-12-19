const { generateAccessToken, refresh } = require("../../jwt/jwt");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    const password_valid = bcrypt.compare(password, user.password);
    if (password_valid) {
      let accesstoken = generateAccessToken(
        { email: user.email },
        process.env.ACCESS_TOKEN
      );
      let refreshtoken = refresh();

      return res.status(200).json({
        status: 200,
        msg: "success",
        data: [user],
        accessToken: accesstoken,
        refreshToken: refreshtoken,
      });
    } else {
      res.status(400).json({ error: "비밀번호가 맞지않습니다" });
    }
  } else {
    res.status(404).json({ error: "해당 유저가 존재하지 않습니다." });
  }
};
