require("dotenv").config();

const JWT = require("jsonwebtoken");

const accessToken = (email) => {
  return JWT.sign({ email }, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
    algorithm: "HS256", // 해싱 알고리즘
    issuer: "kjh", // 발행자
  });
};
const refreshToken = (email) => {
  return JWT.sign({ email }, process.env.REFRESH_TOKEN, {
    expiresIn: "3 days",
    algorithm: "HS256", // 해싱 알고리즘
    issuer: "kjh", // 발행자
  });
};

//토큰 검사 필요
module.exports = {
  accessToken,
  refreshToken,
};
