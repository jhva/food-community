let passportConfig = {
  usernameField: "email",
  passwordField: "password",
};

let corsConfig = {
  origin: "https://port-0-food-server-1ih8d2glczugkpe.gksl2.cloudtype.app/", // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
};

module.exports = { passportConfig, corsConfig };
