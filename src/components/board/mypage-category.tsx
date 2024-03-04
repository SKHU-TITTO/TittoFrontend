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

type MyPageCategoryProps = {
  onCategoryChange: (category: string) => void;
};

const MyPageCategory = ({ onCategoryChange }: MyPageCategoryProps) => {
  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
  };

  return (
    <CategoryWrapper>
      <CategoryTitle>내 정보 관리</CategoryTitle>
      <CategorySelect onClick={() => handleCategoryClick("계정 관리")}>
        계정 관리
      </CategorySelect>
      <CategorySelect onClick={() => handleCategoryClick("프로필 관리")}>
        프로필 관리
      </CategorySelect>
    </CategoryWrapper>
  );
};

export default MyPageCategory;
