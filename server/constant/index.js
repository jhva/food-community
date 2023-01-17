require("dotenv").config();

let passportConfig = {
  usernameField: "email",
  passwordField: "password",
};

let corsConfig = {
  origin: process.env.CORS,
  methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],

  credentials: true, //client에서도 withCredentials=true 설정해야 함
};

module.exports = { passportConfig, corsConfig };
