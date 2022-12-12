const router = require("express").Router();
const passport = require("passport");
const UserController = require("../controller/auth");

//이메일 중복검사
router.post("/check-email", UserController.checkEmail);

//닉네임 중복검사
router.post("/check-nickname", UserController.checkNickname);

// // 회원가입
router.post("/signUp", UserController.signUp);

//로그인
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.post("/kakao-login", UserController.kakaoLogin);
//카카오 로그인
// router.get("/kakao", passport.authenticate("kakao", { state: "myStateValue" }));
// router.get("/oauth", passport.authenticate("kakao"), function (req, res) {
//   // 로그인 시작시 state 값을 받을 수 있음
//   res.send("state :" + req.query.state);
// });
//로그아웃
router.post("/logout");

module.exports = router;
