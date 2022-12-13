const router = require("express").Router();
require("dotenv").config();

const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
const KAKAO_AUTH_REDIRECT_URL = `http://localhost:9000/auth/kakao/callback`;
module.exports = async (req, res) => {
  // 처음 이쪽으로 요청이 들어오고 이 부분에서 구글에 소셜 로그인 화면으로 이동하고
  // 소셜 로그인 화면에서는 redirect uri로 다시 이동
  return res.redirect(
    `${KAKAO_AUTH_URL}?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_AUTH_REDIRECT_URL}&response_type=code&prompt=none`
  );
};
