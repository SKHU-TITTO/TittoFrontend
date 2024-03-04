import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border: 2px solid #bababa;
  border-radius: 5px;
  background-color: white;
`;

const ContentBox = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-top: 20px;

  .back {
    margin-top: 30px;
    width: 100%;
    text-align: center;
    color: white;
    background-color: #3e68ff;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    &:hover {
      background-color: #7391ff;
    }
  }
`;

const Title = styled.p`
  font-size: 32px;
  color: #3e68ff;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  font-size: 24px;
  color: #bababa;
  font-weight: bold;
  margin-bottom: 15px;
`;

const DetailContent = styled.div`
  margin-bottom: 30px;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SubHeader = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  text-align: left;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
  line-height: 1.5;
  text-align: left;
`;

const Slider3 = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ContentBox>
        <Title>레벨업 / 뱃지 기준 요건</Title>
        <SubTitle>기본 정보</SubTitle>
        <DetailContent>
          <Header>1. 레벨 업 조건</Header>
          <SubHeader></SubHeader>
          <Description></Description>
        </DetailContent>
        <DetailContent>
          <Header>2. 뱃지 획득 조건</Header>
          <SubHeader></SubHeader>
          <Description></Description>
        </DetailContent>

        <div
          className="back"
          onClick={() => {
            history.back();
          }}
        >
          {" "}
          돌아가기
        </div>
      </ContentBox>
    </Wrapper>
  );
};

export default Slider3;
