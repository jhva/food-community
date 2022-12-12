const { refreshToken, accessToken } = require("../jwt/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");

async function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ code: 400, msg: "입력을 모두 완료해주세요" });
  }
  try {
    const isEqulsEmail = await User.findOne({ where: { email } });
    if (isEqulsEmail) {
      const isEqulsPw = await bcrypt.compare(password, isEqulsEmail.password);
      if (isEqulsPw) {
        return res
          .status(200)
          .json({ msg: "success", code: 200, data: isEqulsEmail });
      } else {
        return res.status(400).json({
          msg: "로그인 실패하였습니다",
          code: 400,
        });
      }
    } else {
      return res.status(400).json({
        msg: "등록된 이메일이 없습니다",
        code: 400,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

async function signUp(req, res, next) {
  const { email, phoneNumber, nickname, password, isMarketing } = req.body;
  try {
    let generateAccessTokens = accessToken(email);
    let generateRefreshToken = refreshToken(email);
    const hash = await bcrypt.hash(password, 10);

    await User.create({
      email,
      phoneNumber,
      nickname,
      password: hash,
      isMarketing,
      accessToken: generateAccessTokens,
      refreshToken: generateRefreshToken,
    });

    res.cookie("x_auth", generateAccessTokens).status(200).json({
      code: 200,
      msg: "signUp success",
    });
  } catch (e) {
    console.log(e);
  }
}
async function logout(req, res, next) {
  return res
    .cookie("x_auth", "")
    .status(200)
    .json({ code: 200, msg: "logout success" });
}
async function kakaoLogin(req, res, next) {
  console.log(req);
}
async function checkEmail(req, res, next) {}
async function checkNickname(req, res, next) {}

module.exports = {
  login,
  checkNickname,
  checkEmail,
  signUp,
  kakaoLogin,
  logout,
};
