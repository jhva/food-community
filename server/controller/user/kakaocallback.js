const router = require("express").Router();
const axios = require("axios");
const qs = require("qs");

require("dotenv").config();

const KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me";

module.exports = async (req, res) => {
  const { session, query } = req;
  const { code } = query;
  console.log(code);
  try {
    axios
      .post("https://kauth.kakao.com/oauth/token", null, {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_CLIENT_ID,
          redirect_uri: process.env.KAKAO_REACT_REDIRECT,
          code,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        return axios.get(KAKAO_USER_INFO_URL, {
          headers: { Authorization: `Bearer ${data.access_token}` },
        });
      })
      .then((data) => {
        console.log(data);
        res.status(200).json({ status: 200, data: [data.data] });
      });
  } catch (err) {
    res.status(500).json({ msg: "카카오 로그인 오류" });
  }
};
