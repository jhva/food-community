const router = require("express").Router();
const controllers = require("../controller");
const { isAuthorization } = require("../jwt");

//일반 로그인
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

module.exports = router;
