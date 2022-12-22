const router = require("express").Router();
const controllers = require("../controller");
const { isAuthorization } = require("../jwt");
//이메일 중복검사
// router.post("/check-email", controllers.checkEmail);

// //닉네임 중복검사
// router.post("/check-nickname", controllers.checkNickname);

//회원가입
router.post("/login", controllers.login);
router.post("/signup", controllers.signup);
router.post("/logout", controllers.logout);

//카카오 로그인
router.get("/auth/kakao", controllers.authkakao);
router.post("/auth/kakao/callback", controllers.kakaocallback);
router.post("/test", controllers.test);
router.get("/test2", isAuthorization, controllers.test2);

// //네이버 로그인
// router.post("/naver-login", controllers.naverlogin);

//챗
// router.get("/chat", controllers.chat);


//board 

//recruit


module.exports = router;
