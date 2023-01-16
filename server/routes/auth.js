const router = require("express").Router();
const controllers = require("../controller");
const { isAuthorization } = require("../jwt");

//healthcheck
router.get("/healthcheck", controllers.authentication);

//일반 로그인
router.post("/login", controllers.login);
router.post("/signup", controllers.signup);
router.post("/logout", controllers.logout);

//카카오 로그인
// router.get("/auth/kakao-login", controllers.authkakao);
router.post("/auth/kakao-login", controllers.kakaoLogin);
router.patch("/auth/kakao-login-update", controllers.kakaoLoginUpdate);

// 네이버 로그인
router.post("/auth/naver-login", controllers.naverlogin);

router.get("/test2", isAuthorization, controllers.test2);
router.post("/test", controllers.test);

module.exports = router;
