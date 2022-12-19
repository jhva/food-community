require("dotenv").config();

const { sign, verify } = require("jsonwebtoken");

//토큰 검사 필요
module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
      algorithm: "HS256", // 해싱 알고리즘
      issuer: "kjh", // 발행자
    });
  },
  refresh: () => {
    return sign({}, process.env.REFRESH_TOKEN, {
      // refresh token은 payload 없이 발급
      algorithm: "HS256",
      expiresIn: "2h",
    });
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie("jwt", accessToken);
  },
  isAuthorized: (req, res) => {
    let auth = req.headers.cookie;
    if (!auth) {
      return null;
    }

    let token = auth.split(" ")[0].split("=")[1];

    try {
      return verify(token, process.env.ACCESS_TOKEN);
    } catch (err) {
      console.log(err);
    }
  },
};
