const router = require("express").Router();
const UserController = require("../controller/auth");

//이메일 중복검사
router.post("/check-email", UserController.checkEmail);

//닉네임 중복검사
router.post("/check-nickname", UserController.checkNickname);

// // 회원가입
router.get("/signUp", UserController.login);

//로그인
router.get("/login", UserController.login);

//로그아웃
router.post("/logout");

module.exports = router;
