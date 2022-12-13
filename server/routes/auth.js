const controllers = require("../controller");
const router = require("express").Router();
//이메일 중복검사
// router.post("/check-email", controllers.checkEmail);

// //닉네임 중복검사
// router.post("/check-nickname", controllers.checkNickname);

// // 회원가입
router.post("/signup", controllers.signup);

router.post("/login", controllers.login);
router.post("/logout", controllers.logout);
// router.get("/test", controllers.test);

//카카오 로그인

// router.post("/auth/kakao/callback", controllers.kakaocallback);

// //네이버 로그인
// router.post("/naver-login", controllers.naverlogin);

module.exports = router;
