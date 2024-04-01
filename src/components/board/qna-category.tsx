import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const QnaCategoty = () => {
  const navigate = useNavigate();
  return (
    <CategoryWrapper>
      <CategoryTitle>카테고리</CategoryTitle>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1");
        }}
      >
        전체보기
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=HUMANITIES");
        }}
      >
        인문융합 콘텐츠
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=MANAGEMENT");
        }}
      >
        경영
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=SOCIETY");
        }}
      >
        사회융합
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=MEDIA_CONTENT");
        }}
      >
        미디어콘텐츠융합
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=FUTURE_FUSION");
        }}
      >
        미래융합
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          navigate("/board/lists/qna/1/?category=SOFTWARE");
        }}
      >
        소프트웨어융합
      </CategorySelect>
    </CategoryWrapper>
  );
};

export default QnaCategoty;

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
