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

const Slider1 = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ContentBox>
        <Title>티토 커뮤니티 이용 가이드</Title>
        <SubTitle>기본 정보</SubTitle>
        <DetailContent>
          <Header>1. 불건전한 콘텐츠 및 행위에 대한 제한</Header>
          <SubHeader>
            티토 커뮤니티는 사용자들이 안전하고 편안하게 이용할 수 있도록
            불건전한 콘텐츠 및 행위에 대한 제한을 두고 있습니다.
          </SubHeader>
          <Description>
            [1] 선정적인 콘텐츠 및 행위: 과도한 성적 노출 및 성희롱, 음란물 등의
            콘텐츠를 포함하여, 성적인 암시나 의도가 드러나는 행위를 금지합니다.
          </Description>
          <Description>
            [2] 혐오, 차별, 폭력적인 콘텐츠 및 행위: 혐오, 폭력 및 범죄, 신체에
            위해가 되는 자극적인 콘텐츠를 업로드하거나 간접적으로 조장 및
            선동하는 행위를 금지합니다.
          </Description>
          <Description>
            [3] 불법 행위 및 기타 행위: 서비스 운영 및 커뮤니티 환경을
            저해하거나 타인에게 피해를 주는 불법 행위를 금지합니다.
          </Description>
        </DetailContent>
        <DetailContent>
          <Header>2. 개인정보 보호</Header>
          <SubHeader>
            티토 커뮤니티는 서비스는 이용자의 소중한 개인정보를 보호하기 위해
            노력하고 개인정보 보호와 관련된 법령을 준수합니다.
          </SubHeader>
          <Description>
            [1] 콘텐츠 삭제 기준: 서비스 커뮤니티 가이드라인에 따라 개인정보
            침해를 처리하고 부적절한 콘텐츠를 삭제합니다. 개인정보란, 그 자체로
            개인을 식별할 수 있는 정보 뿐 아니라 다른 정보와 결합하여 개인을
            식별할 수 있는 정보까지 포함합니다.
          </Description>
          <Description>
            [2] 개인정보 예시: <br />- 본인확인 정보 (이름, 생년월일, 성별,
            주민등록번호 등) <br />- 연락처 (휴대전화번호, 유선 번호 등) <br />-
            주소 (거주지, 학교, 회사, 소속 단체 등) <br />- 금융 정보 (계좌,
            신용카드 번호, 비밀번호 등) <br />- 그 외 개인을 식별할 수 있는 정보
          </Description>
        </DetailContent>
        <DetailContent>
          <Header>3. 지식 재산권/초상권 보호</Header>
          <SubHeader>
            티토 커뮤니티는 지식재산권 및 초상권을 존중하며, 이를 위반하는
            행위를 금지합니다.
          </SubHeader>
          <Description>
            [1] 지식재산권: 타인의 지식재산권을 침해하거나 무단으로 사용하는
            행위를 금지합니다.
          </Description>
          <Description>
            [2] 초상권: 타인의 초상권을 침해하거나 무단으로 사용하는 행위를
            금지합니다.
            <br /> - 상대방 몰래 상대의 얼굴, 신체, 음성 등을 촬영하거나 이를 제
            3자에게 유포하는 행위
            <br /> - 특정인의 얼굴, 신체가 포함된 이미지/영상을 임의로
            가공하거나 수정하여 상대방에게 피해를 주는 행위
            <br />- 타인의저작권을 침해하거나 침해하려는 목적을 가진 콘텐츠를
            등록하는 행위
            <br />- 저작권이 있는 음원/이미지/영상 등을 저작권자의 허락 없이
            사용하는 행위 <br />- 저작권자의 동의를 받지 않고 저작물을
            훼손하거나 수정하는 행위
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

export default Slider1;
