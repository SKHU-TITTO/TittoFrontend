import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #3e68ff;
`;
const WelcomeTitle = styled.div`
  text-align: left;
  p:nth-child(1) {
    font-size: 32px;
    color: #c6c6c6;
    font-weight: bold;
    margin: 10px 0 0 0;
  }
  p:nth-child(2) {
    font-size: 48px;
    font-weight: bold;
    color: #3e68ff;
    margin: 0;
  }
  .back {
    margin-top: 30px;
    width: 100%;
    text-align: center;
    color: white;
    background-color: #3e68ff;
    border-radius: 5px;
    padding: 20px;
    &:hover {
      background-color: #7391ff;
    }
  }
`;
const Container = styled.div`
  width: 500px;
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <WelcomeTitle>
          <p>더 나은 캠퍼스 라이프.</p>
          <p>TITTO</p>
          <br />
          <br />
          <span style={{ color: "red" }}>존재하지 않는 페이지 입니다!</span>
          <div
            className="back"
            onClick={() => {
              history.back();
            }}
          >
            {" "}
            돌아가기
          </div>
        </WelcomeTitle>
      </Container>
    </Wrapper>
  );
};

export default NotFound;
