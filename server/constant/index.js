let passportConfig = {
  usernameField: "email",
  passwordField: "password",
};

let corsConfig = {
  origin: "*",

  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
};

module.exports = { passportConfig, corsConfig };
