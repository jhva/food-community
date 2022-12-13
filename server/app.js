const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const rootRouter = require("./routes");
const bodyParser = require("body-parser");
const { corsConfig } = require("./constant");
const cookieParser = require("cookie-parser");
const { sessions } = require("./constant/databaseSet");

//세션 기능은 passport 모듈이 알아서 사용
const app = express();

dotenv.config();

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
// app.use("/api/auth", AuthRouter);
app.use("/", rootRouter);
app.use((req, res, next) => {
  res.status(404).json({ msg: "Page Not Found" });

  next(err);
});

// 에러가 발생한 경우 처리
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};

  res.status(err.status || 500).json({ msg: "server error" });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 열림");
});
