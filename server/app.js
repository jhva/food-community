const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");

const { sequelize } = require("./models");
const { options } = require("./constant");

const app = express();

dotenv.config();

app.set("port", process.env.PORT);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(options),
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));

//라우터
app.use("/auth", authRouter);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  err.status = 404;
  next(err);
});

//에러가 발생한 경우 처리
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  // res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 열림");
});
