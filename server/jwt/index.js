require("dotenv").config();

const { sign, verify } = require("jsonwebtoken");

//토큰 검사 필요
module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_TOKEN, {
      expiresIn: "1h",
      algorithm: "HS256", // 해싱 알고리즘
      issuer: "kjh", // 발행자
    });
  },
  refresh: () => {
    return sign({}, process.env.REFRESH_TOKEN, {
      // refresh token은 payload 없이 발급
      algorithm: "HS256",
      expiresIn: "14d",
    });
  },
  isAuthorization: (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split("Bearer ")[1];
      //Bearer
      console.log(req.headers);
      try {
        req.authId = verify(token, process.env.ACCESS_TOKEN).id;
        next();
      } catch (e) {
        if (e.name === "TokenExpiredError") {
          return res.status(419).json({
            code: 419,
            msg: "토큰이 만료되었습니다. 로그인 을 다시 시도해주세요",
          });
        }
        //유효하지 않을경우

        return res.status(401).json({
          code: 401,
          msg: "유효하지 않은 토큰입니다.",
        });
      }
    } else {
      res.status(401).json({ msg: "권한이 없습니다.", code: 401 });
    }
  },
};
