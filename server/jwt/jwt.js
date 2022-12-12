require("dotenv").config();

const JWT = require("jsonwebtoken");

const accessToken = (email) => {
  return JWT.sign({ email }, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};
const refreshToken = (email) => {
  return JWT.sign({ email }, process.env.REFRESH_TOKEN, {
    expiresIn: "3 days",
  });
};
//토큰 검사 필요
module.exports = {
  accessToken,
  refreshToken,
};
