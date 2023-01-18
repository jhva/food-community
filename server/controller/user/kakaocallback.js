const axios = require("axios");
const { ERROR } = require("../../error");
const { generateAccessToken, refresh } = require("../../jwt");
const User = require("../../models/user");
require("dotenv").config();

const KAKAO_USER_INFO_URL = "";

module.exports = async (req, res) => {
  const { response } = req.body;
  const user = await axios.get(process.env.KAKAO_USER_INFO_URL, {
    headers: {
      Authorization: `Bearer ${response?.access_token}`,
      // redirect_uri: process.env.KAKAO_REACT_REDIRECT,
    },
  });
  const kakaoUserInfo = user?.data?.kakao_account;
  console.log(kakaoUserInfo);

  try {
    const existkakaoUser = await User.findOne({
      where: { oauthId: user?.data?.id },
    });
    console.log(existkakaoUser);

    if (existkakaoUser) {
      let accesstoken = generateAccessToken(
        {
          email: existkakaoUser?.email,
          nickname: existkakaoUser?.nickname,
          id: existkakaoUser?.id,
          oauth: "kakao",
          oauthId: existkakaoUser?.oauthId,
        },
        process.env.ACCESS_TOKEN
      );
      let refreshtoken = refresh();
      let userfilter = {
        id: existkakaoUser?.id,
        email: existkakaoUser?.email,
        nickname: existkakaoUser?.nickname,
        username: existkakaoUser?.username,
        provider: existkakaoUser?.provider,
        oauthId: existkakaoUser?.oauthId,
        refreshtoken,
        accesstoken,
      };
      return res
        .cookie("user", refreshtoken, { httpOnly: true })
        .status(200)
        .json({
          status: 200,
          msg: "kakao login success",
          data: userfilter,
        });
    } else {
      await User.create({
        email: kakaoUserInfo?.email,
        nickname: kakaoUserInfo?.profile?.nickname,
        phoneNumber: "wait",
        username: "wait",
        provider: "카카오 사용자",
        isMarketing: "Y",
        oauthId: String(user?.data.id),
      });
      return res.status(200).json({
        status: 200,
        msg: "kakao sign success",
        oauthId: user?.data.id,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "카카오 로그인 오류" });
  }
};
