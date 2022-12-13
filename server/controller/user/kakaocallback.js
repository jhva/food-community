const router = require("express").Router();
const axios = require("axios");
const qs = require("qs");

require("dotenv").config();
module.exports = async (req, res) => {
  const { session, query } = req;
  const { code } = query;
  console.log(code);
  try {
    axios
      .post("https://kauth.kakao.com/oauth/token", null, {
        params: {
          grant_type: "authorization_code",
          client_id: "b363b5afcbfbfcefd27f66bc97e322f6",
          redirect_uri: "http://localhost:3000/auth/kakao/callback",
          code,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        return axios.get("https://kapi.kakao.com/v2/user/me", {
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

  //   try {
  //     //access토큰을 받기 위한 코드
  //     const token = await axios({
  //       //token
  //       method: "POST",
  //       url: "https://kauth.kakao.com/oauth/token",
  //       headers: {
  //         "content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //       },
  //       data: qs.stringify({
  //         grant_type: "authorization_code", //특정 스트링
  //         client_id: process.env.KAKAO_CLIENT_ID,
  //         client_secret: process.env.KAKAO_SECRECT_ID,
  //         redirectUri: "http://localhost:3000/auth/kakao/callback",
  //         code, //결과값을 반환했다. 안됐다.
  //       }), //객체를 string 으로 변환
  //     });

  //     res.status(200).json({ msg: "성공" });
  //   } catch (err) {
  //     console.log("====================================");
  //     console.log(err.data);
  //     console.log("====================================");
  //   }

  //   let user;
  //   try {
  //     console.log(token); //access정보를 가지고 또 요청해야 정보를 가져올 수 있음.
  //     user = await axios({
  //       method: "get",
  //       url: "https://kapi.kakao.com/v2/user/me",
  //       headers: {
  //         Authorization: `Bearer ${token.data.access_token}`,
  //       }, //헤더에 내용을 보고 보내주겠다.
  //     });
  //   } catch (e) {
  //     res.json(e.data);
  //   }
  //   console.log(user);

  //   req.session.kakao = user.data;
  //   //req.session = {['kakao'] : user.data};

  //   res.send("success");
};
function linkUser(session, provider, authData) {
  let result = false;
  if (session.authData) {
    if (session.authData[provider]) {
      // 이미 계정에 provider 가 연결되어 있는 경우
      return result;
    }

    session.authData[provider] = authData;
  } else {
    session.authData = {
      [provider]: authData,
    };
  }

  result = true;

  return result;
}
