import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("https://titto.store/user/info", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setNickname(response.data.nickname || "");
      } catch (error) {}
    };

    fetchUserInfo();
  }, []);

  return (
    <BackgroundWrapper>
      <WelcomeWrapper>
        <WelcomeContainer>
          <WelcomeTitle>
            <p>더 나은 캠퍼스 라이프</p>
            <p>TITTO</p>
          </WelcomeTitle>
          <WelcomeSubTitle>
            <p>{nickname ? `${nickname}님 환영해요!` : ""}</p>
            <p>지식의 공유와 소통이 함께하는 곳, 티토입니다.</p>
          </WelcomeSubTitle>
          <WelcomeBtnContainer>
            <button onClick={() => navigate("/")}>시작하기</button>
          </WelcomeBtnContainer>
        </WelcomeContainer>
      </WelcomeWrapper>
    </BackgroundWrapper>
  );
};

export default WelcomePage;

const BackgroundWrapper = styled.div`
  background: linear-gradient(
    45deg,
    rgba(66, 183, 245, 0.8) 0%,
    rgba(66, 245, 189, 0.4) 100%
  );
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WelcomeWrapper = styled.div`
  width: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
  width: 600px;
  padding: 30px;
  height: 350px;
  position: relative;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
`;

const WelcomeTitle = styled.div`
  p:nth-child(1) {
    font-size: 32px;
    color: #c6c6c6;
    font-weight: bold;
    margin: 10px 0 0 0;
  }
  p:nth-child(2) {
    font-size: 50px;
    font-weight: bold;
    color: #3e68ff;
    margin: 0;
  }
`;

const WelcomeSubTitle = styled.div`
  margin-top: 30px;
  p {
    font-size: 24px;
    font-weight: bold;
    color: #c6c6c6;
    margin: 5px 0;
  }
`;

const WelcomeBtnContainer = styled.div`
  margin-top: 30px;
  button {
    font-size: 18px;
    color: #fff;
    width: 100%;
    font-weight: bold;
    background-color: #3e68ff;
    padding: 10px 20px;
    height: 50px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #2e55d6;
  }
`;
