const { ERROR } = require("../../error");
const { generateAccessToken, refresh } = require("../../jwt");
const User = require("./../../models/user");

require("dotenv").config();

module.exports = async (req, res) => {
  const { username, phoneNumber, oauthId } = req.body;

  try {
    await User.update(
      {
        username,
        phoneNumber,
      },
      { where: { oauthId } }
    );
    const userdata = await User.findOne({ where: { oauthId } });
    console.log(userdata);
    let accesstoken = generateAccessToken(
      {
        email: userdata.email,
        nickname: userdata.nickname,
        id: userdata.id,
        oauthId: userdata.oauthId,
        oauth: "kakao",
      },
      process.env.ACCESS_TOKEN
    );
    let refreshtoken = refresh();
    let userfilter = {
      id: userdata?.id,
      email: userdata?.email,
      nickname: userdata?.nickname,
      username: userdata?.username,
      provider: userdata?.provider,
      oauthId: userdata?.oauthId,
      refreshtoken,
      accesstoken,
    };
    return res
      .cookie("user", refreshtoken, { httpOnly: true })
      .status(200)
      .json({
        status: 200,
        msg: "success",
        data: userfilter,
      });
  } catch (e) {
    console.log(e);
    ERROR(500, "server err", res, e);
  }
};
