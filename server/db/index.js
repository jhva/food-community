const { options } = require("../constant");
const { sequelize } = require("../models");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const dotenv = require("dotenv");
const express = require("express");

const app = express();

dotenv.config();

app.use(cookieParser(process.env.COOKIE_SECRET));
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

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
