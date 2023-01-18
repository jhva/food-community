const cors = require("cors");
const express = require("express");
const rootRouter = require("./routes");
const bodyParser = require("body-parser");
const { corsConfig } = require("./constant");
const cookieParser = require("cookie-parser");
const { sessions } = require("./constant/databaseSet");
//세션 기능은 passport 모듈이 알아서 사용
const app = express();

require("dotenv").config();
require("./redis/index");
app.set("port", process.env.PORT);

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(cors(corsConfig));
app.use(sessions);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// 라우터
app.use("/", rootRouter);

app.use((req, res, next) => {
  res.status(404).json({ msg: "Page Not Found" });
  next(err);
});
app.use((req, res) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, OPTIONS, DELETE, GET"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Origin",
    // "http://localhost:3000"
    "https://web-food-community-front-1ih8d2glczugkpe.gksl2.cloudtype.app"
  ); // 특정 도메인
});
// 에러가 발생한 경우 처리
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};

  res.status(err.status || 500).json({ msg: "server error" });
});

const SERVER = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 열림");
});

require("./socket")(SERVER);
