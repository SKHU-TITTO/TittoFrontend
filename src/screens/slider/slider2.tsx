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

const Slider2 = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ContentBox>
        <Title>게시판 이용 가이드</Title>
        <SubTitle>기본 정보</SubTitle>
        <DetailContent>
          <Header>1. 티토찾아요</Header>
          <SubHeader>
            티토 게시판은 멘토, 멘티, 스터디, 어울림을 할 사람들을 찾는
            게시판입니다.
          </SubHeader>
          <Description>
            티토찾아요 게시판은 멘토, 멘티, 스터디, 어울림을 할 사람들을 찾는
            게시판입니다. 여기서 당신의 멘토를 만나보세요! <br />이 게시판에서는
            멘토링, 스터디 파트너, 함께 공부할 사람 등을 찾을 수 있습니다.
            <br />
            1. 먼저 글쓰기를 누른 후, 원하는 카테고리를 선택합니다. <br />
            2. 제목과 내용을 작성합니다. <br />
            3. 글을 등록합니다. <br />
            4. 다른 사용자들이 당신의 글을 확인하고 답장을 남겨줄 수 있습니다.
            <br />
            5. 다른 사용자들의 글을 확인하고 답장을 남겨주세요!
            <br />
            6. 모집이 완료되면 글쓴이는 모집완료 버튼을 눌러주세요!
          </Description>
        </DetailContent>
        <DetailContent>
          <Header>2. 질문있어요</Header>
          <SubHeader>
            질문있어요 게시판은 여러분이 가지고 있는 궁금증을 해결할 수 있도록
            도와주는 곳입니다.
          </SubHeader>
          <Description>
            질문있어요 게시판은 여러분이 가지고 있는 궁금증을 해결할 수 있도록
            도와주는 곳입니다. 궁금한 점이 있다면 언제든지 질문해주세요! 다른
            사용자들과 함께 문제를 해결하고 지식을 공유할 수 있습니다.
            <br />
            1. 먼저 글쓰기를 누른 후, 원하는 카테고리와 내공을 선택합니다.
            <br />
            2. 제목과 내용을 작성합니다. <br />
            3. 글을 등록합니다. <br />
            4. 다른 사용자들이 당신의 글을 확인하고 답장을 남겨줄 수 있습니다.
            <br />
            5. 다른 사용자들의 글을 확인하고 답장을 남겨주세요!
            <br />
            6. 답변이 도움이 되었다면 채택 버튼을 눌러주세요!
            <br />
            7. 문제가 해결되었다면 해결완료 버튼을 눌러주세요!
            <br />
            <img src="/imgs/attachment.gif" />
          </Description>
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

export default Slider2;
