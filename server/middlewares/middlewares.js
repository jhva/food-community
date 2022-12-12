const jwt = require("jsonwebtoken");
const RateLimit = require("express-rate-limit");

exports.isLoggedIn = (req, res, next) => {
  //로그인 되어 있으면 다음 라우터 처리를 수행하고 그렇지 않으면 에러 발생
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인이 필요합니다");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  //로그인 되어 있지 않았다면 다음으로 넘어가고 그렇지 않으면 리다이렉트
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    //토큰 여부 확인
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    //인증ㅅ겅공시 다음작업 수행
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰 유효시간이 만료되었습니다",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "무슨 토큰이고 이게 없다 이런토큰",
    });
  }
};

///사용량 제한을 위한 미들웨어

exports.apiLimiter = RateLimit({
  windowMs: 60 * 1000, //1분,
  max: 10, // 1분안에 10번이상못함
  delayMs: 0,
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: "1분 단위로 요청을 해야함여",
    });
  },
});
