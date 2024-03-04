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
`;

const CategorySelector = () => {
  return (
    <CategoryWrapper>
      <CategoryTitle>전체보기</CategoryTitle>
      <CategorySelect>스터디만만 보기</CategorySelect>
      <CategorySelect>멘토만 보기</CategorySelect>
      <CategorySelect>멘티만 보기</CategorySelect>
      <CategorySelect>어울림만 보기</CategorySelect>
    </CategoryWrapper>
  );
};

export default CategorySelector;
