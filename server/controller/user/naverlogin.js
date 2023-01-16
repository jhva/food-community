const axios = require("axios");
const { ERROR } = require("../../error");
const { generateAccessToken, refresh } = require("../../jwt");
const User = require("./../../models/user");
require("dotenv").config();

module.exports = async (req, res) => {
  const { accessToken, state } = req.body;

  const userData = await axios.get(process.env.NAVER_USER_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let accesstoken = generateAccessToken(
    {
      email: userData.data.response.email,
      nickname: userData.data.response.nickname,
      id: userData.data.response.id,
      oauth: "naver",
    },
    process.env.ACCESS_TOKEN
  );
  let refreshtoken = refresh();
  try {
    const user = await User.findOne({
      where: { oauthId: userData.data.response.id },
    });
    let userfilter = {
      id: user?.id,
      email: user?.email,
      nickname: user?.nickname,
      username: user?.username,
      provider: user?.provider,
      oauthId: user?.oauthId,
      refreshtoken,
      accesstoken,
    };
    if (user) {
      return res
        .cookie("user", refreshtoken, { httpOnly: true })
        .status(200)
        .json({
          status: 200,
          msg: "success",
          data: userfilter,
        });
      // ERROR(403, "존재하는 회원 입니다", res);
      // return;
    } else {
      await User.create({
        email: userData.data.response.email,
        phoneNumber: userData.data.response.mobile,
        nickname: userData.data.response.nickname,
        username: userData.data.response.name,
        provider: "네이버 사용자",
        isMarketing: "Y",
        oauthId: userData.data.response.id,
      });
      return res
        .cookie("user", refreshtoken, { httpOnly: true })
        .status(200)
        .json({
          status: 200,
          msg: "success",
          data: userfilter,
        });
    }
  } catch (e) {
    console.log(e);
    ERROR(500, "server err", res, e);
  }
};
