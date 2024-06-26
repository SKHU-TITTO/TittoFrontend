import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  border: 2px solid #bababa;
  border-radius: 5px;
  background-color: white;
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

  img {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const ContentBox = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-top: 20px;
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
  text-align: left;
`;

const SubHeader = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: left;
`;

const Description = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
  line-height: 1.5;
  text-align: left;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background-color: #3e68ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #7391ff;
  }
`;

const Slider2 = () => {
  const [tab, setTab] = useState(1);
  return (
    <Wrapper>
      <ContentBox>
        <Title>게시판 이용 가이드</Title>
        <SubTitle>기본 정보</SubTitle>
        <ButtonWrapper>
          <Button onClick={() => setTab(1)}>티토찾아요</Button>
          <Button onClick={() => setTab(2)}>질문있어요</Button>
          <Button onClick={() => setTab(3)}>마이페이지</Button>
        </ButtonWrapper>
        {tab === 1 && (
          <DetailContent>
            <Header>1. 티토찾아요</Header>
            <SubHeader>
              티토 게시판은 멘토, 멘티, 스터디, 어울림을 할 사람들을 찾는
              게시판입니다.
            </SubHeader>
            <Description>
              여기서 당신의 멘토를 만나보세요! <br />이 게시판에서는 멘토링,
              스터디 파트너, 함께 공부할 사람 등을 찾을 수 있습니다.
              <br />
              1. 먼저 글쓰기를 누른 후, 원하는 카테고리를 선택합니다. <br />
              <img src="/imgs/slider/s2detail/titto/1.png" alt="image" />
              2. 제목과 내용을 작성합니다. <br />
              <img src="/imgs/slider/s2detail/titto/2.png" alt="image" />
              3. 글을 등록합니다. <br />
              <img src="/imgs/slider/s2detail/titto/3.png" alt="image" />
              4. 다른 사용자들이 당신의 글을 확인하고 답장을 남겨줄 수 있습니다.
              <br />
              <img src="/imgs/slider/s2detail/titto/4.png" alt="image" />
              5. 다른 사용자들의 글을 확인하고 답장을 남겨주세요!
              <br />
              <img src="/imgs/slider/s2detail/titto/5.png" alt="image" />
              6. 모집이 완료되면 글쓴이는 모집완료 버튼을 눌러주세요!
              <img src="/imgs/slider/s2detail/titto/6.png" alt="image" />
            </Description>
          </DetailContent>
        )}
        {tab === 2 && (
          <DetailContent>
            <Header>2. 질문있어요</Header>
            <SubHeader>
              질문있어요 게시판은 여러분이 가지고 있는 궁금증을 해결할 수 있도록
              도와주는 곳입니다.
            </SubHeader>
            <Description>
              궁금한 점이 있다면 언제든지 질문해주세요!
              <br /> 다른 사용자들과 함께 문제를 해결하고 지식을 공유할 수
              있습니다
              <br />
              <img src="/imgs/slider/s2detail/qna/1.png" alt="image" />
              <hr />
              1. 먼저 글쓰기를 누른 후, 원하는 카테고리와 티콩을 선택합니다.
              <br />
              2. 제목과 내용을 작성합니다. <br />
              <img src="/imgs/slider/s2detail/qna/2.png" alt="image" />
              3. 글을 등록합니다. <br />
              <img src="/imgs/slider/s2detail/qna/3.png" alt="image" />
              4. 다른 사용자들이 당신의 글을 확인하고 답장을 남겨줄 수 있습니다.
              <br />
              5. 다른 사용자들의 글을 확인하고 답변을 남겨주세요!
              <br />
              <img src="/imgs/slider/s2detail/qna/4.png" alt="image" />
              6. 답변이 도움이 되었다면 채택 버튼을 눌러주세요!
              <br />
              7. 문제가 해결되었다면 미해결에서 해결로 바뀝니다!
              <br />
              <img src="/imgs/slider/s2detail/qna/5.png" alt="image" />
              <br />
              <SubHeader>주의사항</SubHeader>
              <p>
                1. 질문 게시판에서 자신이 쓴 글에는 답변을 할 수 없습니다!{" "}
                <br />
                2. 질문 게시판에서는 답변을 채택할 수 있습니다. <br />
                3. 질문 게시판에서는 답변을 채택하면 답변한 유저에게 티콩이
                지급됩니다. <br />
                4. 채택이 완료되면 그 게시글은 삭제할 수 없습니다. <br />
                5. 채택은 한 번만 가능합니다. <br />
              </p>
            </Description>
          </DetailContent>
        )}
        {tab === 3 && (
          <DetailContent>
            <Header>3. 마이페이지</Header>
            <SubHeader>
              마이페이지는 유저의 정보를 확인하고 쪽지를 보낼 수 있는 곳입니다.
            </SubHeader>
            <Description>
              1. 게시글을 쓴 유저, 답변을 달은 유저에게 궁금한 점이 있다면,
              <br />
              유저 프로필에 들어가서 쪽지를 보낼 수 있습니다!
              <img src="/imgs/slider/s2detail/mypage/1.png" alt="image" />
              <br />
              2. 마이페이지에서는 내가 쓴 글, 내가 쓴 답변을 확인할 수 있습니다.
              <br />
              3. 유저프로필에 답변한 글은 티토게시판에 답변이 아닌 질문게시판의
              답변 내용만 보여집니다.
              <br />
              4. 마이페이지는 티콩, 레벨, 채택률, 보유 뱃지 등을 확인할 수
              있습니다.
              <br />
              5. 보유 뱃지는 티토에서 활동한 내역에 따라 지급됩니다.
              <img src="/imgs/slider/s2detail/mypage/2.png" alt="image" />
              6. 명예의전당에는 티콩이 가장 많은 상위 10명의 유저들이
              나타납니다.
              <img src="/imgs/slider/s2detail/mypage/ranking.png" alt="image" />
            </Description>
          </DetailContent>
        )}
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
