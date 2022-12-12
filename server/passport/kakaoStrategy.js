const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../models/user");
const passport = require("passport");

require("dotenv").config();

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_JAVASCRIPT_KEY, // 카카오 로그인에서 발급받은 REST API 키
        callbackURL: "http://localhost:3000/auth", // 카카오 로그인 Redirect URI 경로
      },

      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const exUser = await User.findOne({
            where: { oauthId: profile.id, provider: "kakao" },
          });
          if (exUser) {
            done(null, exUser); // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              nickname: profile.displayName,
              oauthId: profile.id,
              accessToken: accessToken,
              refreshToken: refreshToken,
              provider: "kakao",
            });
            done(null, newUser); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

/**
 * 클라이언트가 카카오로부터 발급받은 access token을 서버에 전달하고, 서버는 그것을 다시 카카오에 검증 요청한다.
 *  카카오 서버는 자기가 클라이언트에게 부여한 토큰과 서버로부터 받은 토큰이 같을 경우 사용자 정보를 내준다.
이것이 우리가 흔히 알고 있는 소셜 로그인의 동작 방식이다. 이렇게 사용자 
정보를 받은 서버는 데이터베이스에 저장하고, JWT token을 클라이언트에게 제공한다.
 JWT가 무엇인지는 예전에 작성한 인증 관련 포스팅에서 설명하고 있다.
 */
