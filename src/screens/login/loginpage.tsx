import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
      console.log("엑세스 토큰:", kakaoAccessToken);
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/login/oauth2/code/kakao") {
      handleKakaoCallback();
    }
  }, []);

  return (
    <LoginPageWrapper>
      <LoginForm>
        <LoginMainTitle>
          <p>TITTO</p>
          <p>더 나은 캠퍼스 라이프</p>

          {/* <p>환영합니다.</p> */}
        </LoginMainTitle>

        <LoginTitleContainer>
          {/* <LoginTitle>
            <span>다음으로 로그인</span>
            <hr />
          </LoginTitle> */}
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
  );
};

export default LoginPage;

const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
    45deg,
    rgba(66, 183, 245, 0.8) 0%,
    rgba(66, 245, 189, 0.4) 100%
  );
`;

const LoginForm = styled.form`
  width: 500px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
`;

const LoginMainTitle = styled.div`
  text-align: center;
  margin-top: 30px;
  p:nth-child(1) {
    font-size: 64px;
    font-weight: bold;
    color: #3e68ff;
    margin-bottom: 20px;
  }

  p:nth-child(2) {
    font-size: 32px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: bold;
    margin: 10px 0px 0px 10px;
    margin-bottom: 20px;
  }
  p:nth-child(3) {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: bold;
    margin: 10px 0px 0px 0px;
  }
`;

const LoginTitleContainer = styled.div`
  margin: 20px auto 0;
  padding: 20px 28px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 0px;
`;

// const LoginTitle = styled.div`
//   text-align: center;
//   margin-bottom: 20px;

//   span {
//     color: rgba(0, 0, 0, 0.6);
//     font-size: 18px;
//     font-weight: bold;
//   }

//   hr {
//     border: 1px solid rgba(0, 0, 0, 0.6);
//     margin: 8px 0;
//     margin-bottom: 20px;
//   }
// `;

const LoginBtnContainer = styled.div`
  .kakao {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;

    margin: 0 auto;
    border-radius: 12px;
    border: 1px solid #fae100;
    background-color: #fae100;
    margin-bottom: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    img {
      height: 60px;
      margin-right: 15px;
    }
  }

  button {
    height: 60px;
    padding: 13px 0;
    background-color: #fae100;
    justify-content: center;
    border: none;
    font-weight: bold;
    color: black;
    cursor: pointer;
    transition: background-color 0.3s ease;

    span {
      font-size: 18px;
      margin-left: 40px;
      text-align: center;
    }
  }
`;
