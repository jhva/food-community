require("dotenv").config();

const JWT = require("jsonwebtoken");

const accessToken = (id) => {
  return JWT.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};
const refreshToken = (id) => {
  return JWT.sign({ id }, process.env.REFRESH_TOKEN, {
    expiresIn: "3 days",
  });
};

module.exports = {
  accessToken,
  refreshToken,
};
