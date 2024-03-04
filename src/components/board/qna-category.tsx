import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CategoryWrapper = styled.div`
  width: 100%;
  border: 1px solid #bababa;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  text-align: left;
  .category-title {
    color: #325393;
    font-weight: bold;
  }

  .category-select {
    color: #bababa;
    font-weight: bold;
  }
`;

const CategoryTitle = styled.div`
  padding: 10px;
  color: #325393;
  font-weight: bold;
`;
const CategorySelect = styled.div`
  padding: 10px;
  color: #bababa;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: black;
  }
`;

const QnaCategoty = () => {
  const navigate = useNavigate();
  return (
    // 아래를 카테고리 선택 컴포넌트로 사용하면 됩니다.

    <CategoryWrapper>
      <CategoryTitle>카테고리</CategoryTitle>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1");
          window.location.reload();
        }}
      >
        전체보기
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=HUMANITIES");
          window.location.reload();
        }}
      >
        인문융합 콘텐츠
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=MANAGEMENT");
          window.location.reload();
        }}
      >
        경영
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=SOCIETY");
          window.location.reload();
        }}
      >
        사회융합
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=MEDIA_CONTENT");
          window.location.reload();
        }}
      >
        미디어콘텐츠융합
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=FUTURE_FUSION");
          window.location.reload();
        }}
      >
        미래융합
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=SOFTWARE");
          window.location.reload();
        }}
      >
        소프트웨어융합
      </CategorySelect>
    </CategoryWrapper>
  );
};

export default QnaCategoty;
