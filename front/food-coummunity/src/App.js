import "./App.css";
import KaKaoLogin from "react-kakao-login";
import api from "./api/api";
import { useEffect } from "react";
function App() {
  const CLIENT_ID = "";
  const REDIRECT_URI = "http://localhost:9000/api/auth/kakao";
  const token = "8648a2302516b79e60f6d5eb38ff430b";
  // 프런트엔드 리다이랙트 URI 예시
  // const REDIRECT_URI =  "http://localhost:3000/oauth/callback/kakao";

  // 백엔드 리다이랙트 URI 예시
  // const REDIRECT_URI =  "http://localhost:9000/kakao/code";
  const onClickKakaoLogin = async (e) => {
    let body = {
      access_token: e?.response?.access_token,
    };
    try {
      const data = await api.get("auth/test");
      console.log(data);

      console.log(data);

      // alert(data?.msg);
    } catch (e) {
      console.log("e", e);
      console.log("e.res", e.response);
    }
  };
  // useEffect(() => {
  //   onClickKakaoLogin();
  // });
  return (
    <div>
      <>
        <KaKaoLogin
          token={token}
          // onSuccess={onClickKakaoLogin}
          onFail={console.error}
          onLogout={(e) => {
            console.log("logout", e);
          }}
        >
          카카오 로그인하기
        </KaKaoLogin>
      </>
    </div>
  );
}

export default App;
