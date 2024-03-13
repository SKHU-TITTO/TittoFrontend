import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoginForm = styled.form`
  width: 450px;
  margin: 0 auto;
`;

const LoginMainTitle = styled.div`
  text-align: center;
  p:nth-child(1) {
    font-size: 64px;
    font-weight: bold;
    color: #3e68ff;
    margin-bottom: 0px;
  }
  p:nth-child(2) {
    font-size: 32px;
    color: #c6c6c6;
    font-weight: bold;
    margin: 10px 0px 0px 0px;
  }
`;

const LoginTitleContainer = styled.div`
  margin: 30px auto 0;
  padding: 20px 28px;
  border: 1px solid #c6c6c6;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 5px 8px 0 rgba(68, 68, 68, 0.04);
  display: flex;
  flex-direction: column;
`;

const LoginTitle = styled.div`
  text-align: center;
  margin-bottom: 20px;
  span {
    color: #c6c6c6;
    font-size: 18px;
    font-weight: bold;
  }
  hr {
    border: 1px solid #c6c6c6;
    margin: 8px 0;
    margin-bottom: 20px;
  }
`;
const LoginBtnContainer = styled.div`
  .kakao {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 12px;
    border: 1px solid #fae100;
    background-color: #fae100;
    margin-bottom: 10px;

    img {
      height: 70px;
      margin-right: 10px;
      display: flex;
    }
  }

  button {
    height: 70px;
    padding: 13px 0;
    background-color: #fae100;
    justify-content: center;
    border: none;
    font-weight: bold;
    color: black;

    span {
      font-size: 18px;
      margin-left: 60px;
      text-align: center;
    }
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    try {
      window.location.href = KAKAO_AUTH_URL;
    } catch (err) {
      console.log(err);
    }
  };

  const handleKakaoCallback = async () => {
    const code = new URLSearchParams(window.location.search).get("code");

    try {
      const res = await axios.get(`https://titto.store/oauth/kakao`, {
        params: {
          code: code,
        },
      });

      const kakaoAccessToken = res.data.kakaoAccessToken;
      const kakaoRefreshToken = res.data.kakaoRefreshToken;
      console.log(
        "엑세스 토큰:",
        kakaoAccessToken,
        "리프레시 토큰:",
        kakaoRefreshToken
      );
      const dataraw = {
        kakaoAccessToken: kakaoAccessToken,
      };
      const raw = JSON.stringify(dataraw);

      const loginRes = await axios.post(
        "https://titto.store/oauth/kakao/login",
        raw,
        {
          headers: {
            Authorization: `Bearer ${kakaoAccessToken}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      if (loginRes.status === 200) {
        localStorage.setItem("accessToken", loginRes.data.accessToken);
        localStorage.setItem("refreshToken", loginRes.data.refreshToken);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      console.log("카카오 로그인 실패");
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/login/oauth2/code/kakao") {
      handleKakaoCallback();
    }
  }, []);

  return (
    <>
      <LoginPageWrapper>
        <LoginForm>
          <LoginMainTitle>
            <p>TITTO</p>
            <p>더 나은 캠퍼스 라이프.</p>
          </LoginMainTitle>

          <LoginTitleContainer>
            <LoginTitle>
              <span>다음으로 로그인</span>
              <hr />
            </LoginTitle>
            <LoginBtnContainer>
              <div className="kakao" onClick={handleKakaoLogin}>
                <img src="/imgs/kakaoimg.png" alt="kakao_logo" />
                <button type="button" className="btn_login_kakao">
                  <span>카카오 로그인</span>
                </button>
              </div>
            </LoginBtnContainer>
          </LoginTitleContainer>
        </LoginForm>
      </LoginPageWrapper>
    </>
  );
};

export default LoginPage;
