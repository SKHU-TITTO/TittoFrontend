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
  text-align: left;
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

  img {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    display: block;
  }
  table {
    border: 1px solid #bababa;
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;

    td,
    tr,
    th {
      border: 1px solid #bababa;
      padding: 5px;
      text-align: center;
      vertical-align: middle;
    }
    th {
      background-color: #3e68ff;
      color: white;
      font-weight: bold;
    }
  }
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
          <Description>
            <table>
              <thead>
                <tr>
                  <th>레벨</th>
                  <th>경험치(쌓은 내공)</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>LV.1</td>
                  <td>0</td>
                  <td>기본레벨</td>
                </tr>
                <tr>
                  <td>LV.2</td>
                  <td>100</td>
                  <td></td>
                </tr>
                <tr>
                  <td>LV.3</td>
                  <td>300</td>
                  <td></td>
                </tr>
                <tr>
                  <td>LV.4</td>
                  <td>600</td>
                  <td></td>
                </tr>
                <tr>
                  <td>LV.5</td>
                  <td>1000</td>
                  <td>만렙</td>
                </tr>
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>내공 획득 방법</th>
                  <th>획득 경험치</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>질문 게시글 답변</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>질문 게시글 채택</td>
                  <td>35 + 질문자가 건 내공</td>
                </tr>
              </tbody>
            </table>
          </Description>
        </DetailContent>
        <DetailContent>
          <Header>2. 뱃지 획득 조건</Header>

          <Description>
            <SubHeader> 1) 답변 개수 </SubHeader>
            <table>
              <thead>
                <tr>
                  <th>답변 개수</th>
                  <th>뱃지 종류</th>
                  <th>이미지</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>신입 답변러</td>
                  <td>
                    <img
                      src="/imgs/bg/NOVICE_RESPONDER.png"
                      alt="이미지_설명"
                    />
                  </td>
                </tr>
                <tr>
                  <td>2 ~ 5</td>
                  <td>초보 답변러</td>
                  <td>
                    <img
                      src="/imgs/bg/BEGINNER_RESPONDER.png"
                      alt="이미지_설명"
                    />
                  </td>
                </tr>
                <tr>
                  <td>6 ~ 10</td>
                  <td>견습 답변러</td>
                  <td>
                    <img
                      src="/imgs/bg/TRAINEE_RESPONDER.png"
                      alt="이미지_설명"
                    />
                  </td>
                </tr>
                <tr>
                  <td>11 ~ 20</td>
                  <td>프로 답변러</td>
                  <td>
                    <img
                      src="/imgs/bg/PROFESSIONAL_RESPONDER.png"
                      alt="이미지_설명"
                    />
                  </td>
                </tr>
                <tr>
                  <td>100</td>
                  <td>전문 답변러</td>
                  <td>
                    <img
                      src="/imgs/bg/EXPERT_RESPONDER.png"
                      alt="이미지_설명"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <SubHeader> 2) 채택 개수 </SubHeader>
            <table>
              <thead>
                <tr>
                  <th>채택 개수</th>
                  <th>뱃지 종류</th>
                  <th>이미지</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>신입 질문러</td>
                  <td>
                    <img src="/imgs/bg/NOVICE_INQUIRER.png" alt="이미지_설명" />
                  </td>
                </tr>
                <tr>
                  <td>2 ~ 5</td>
                  <td>초보 질문러</td>
                  <td>
                    <img
                      src="/imgs/bg/BEGINNER_INQUIRER.png"
                      alt="이미지_설명"
                    />
                  </td>
                </tr>
                <tr>
                  <td>6 ~ 10</td>
                  <td>견습 질문러</td>
                  <td>
                    <img
                      src="/imgs/bg/TRAINEE_INQUIRER.png"
                      alt="이미지_설명"
                    />
                  </td>
                </tr>
                <tr>
                  <td>11 ~ 20</td>
                  <td>프로 질문러</td>
                  <td>
                    <img
                      src="/imgs/bg/PROFESSIONAL_INQUIRER.png"
                      alt="이미지_설명"
                    />
                  </td>
                </tr>
                <tr>
                  <td>100</td>
                  <td>전문 질문러</td>
                  <td>
                    <img src="/imgs/bg/EXPERT_INQUIRER.png" alt="이미지_설명" />
                  </td>
                </tr>
              </tbody>
            </table>
            <SubHeader> 3) 받은 채택 개수 </SubHeader>
            <table>
              <thead>
                <tr>
                  <th>받은 채택 개수</th>
                  <th>뱃지 종류</th>
                  <th>이미지</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>신입 해결사</td>
                  <td>
                    <img src="/imgs/bg/NOVICE_SOLVER.png" alt="이미지_설명" />
                  </td>
                </tr>
                <tr>
                  <td>2 ~ 5</td>
                  <td>초보 해결사</td>
                  <td>
                    <img src="/imgs/bg/BEGINNER_SOLVER.png" alt="이미지_설명" />
                  </td>
                </tr>
                <tr>
                  <td>6 ~ 10</td>
                  <td>견습 해결사</td>
                  <td>
                    <img src="/imgs/bg/TRAINEE_SOLVER.png" alt="이미지_설명" />
                  </td>
                </tr>
                <tr>
                  <td>11 ~ 20</td>
                  <td>프로 해결사</td>
                  <td>
                    <img
                      src="/imgs/bg/PROFESSIONAL_SOLVER.png"
                      alt="이미지_설명"
                    />
                  </td>
                </tr>
                <tr>
                  <td>100</td>
                  <td>전문 해결사</td>
                  <td>
                    <img src="/imgs/bg/EXPERT_SOLVER.png" alt="이미지_설명" />
                  </td>
                </tr>
              </tbody>
            </table>
            <SubHeader> 4) 특별한 선물: 이스터 에그 🥚 </SubHeader>
            <Description>
              {" "}
              티토에는 더욱 특별한 선물이 있어요! 티토만의 숨겨진 이스터 에그
              뱃지가 준비되어 있답니다. <br /> 이스터 에그를 찾아가는 재미도
              놓치지 마세요. 함께 찾아보면서 즐거움을 더해요! 🎁✨{" "}
            </Description>
          </Description>
        </DetailContent>

        <div
          className="back"
          onClick={() => {
            history.back();
          }}
        >
          돌아가기
        </div>
      </ContentBox>
    </Wrapper>
  );
};

export default Slider3;
