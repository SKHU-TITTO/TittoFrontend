import { useEffect } from "react";
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

const TittoCategory = () => {
  const navigate = useNavigate();

  return (
    <CategoryWrapper>
      <CategoryTitle
        onClick={() => {
          window.location.href = "/board/lists/titto/1";
        }}
      >
        전체보기
      </CategoryTitle>
      <CategorySelect
        onClick={() => {
          window.location.href = "/board/lists/titto/1/?category=STUDY";
        }}
      >
        스터디만만 보기
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          window.location.href = "/board/lists/titto/1/?category=MENTOR";
        }}
      >
        멘토만 보기
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          window.location.href = "/board/lists/titto/1/?category=MENTEE";
        }}
      >
        멘티만 보기
      </CategorySelect>
      <CategorySelect
        onClick={() => {
          window.location.href = "/board/lists/titto/1/?category=UHWOOLLEAM";
        }}
      >
        어울림만 보기
      </CategorySelect>
    </CategoryWrapper>
  );
};

export default TittoCategory;
