import { SetStateAction, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MyPageCategory from "../../components/board/mypage-category";
import AccountManagementContent from "./accountmanagement";
import ProfileManagementContent from "./profilesmanagement";

const MyProfile = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    setSelectedCategory("계정 관리");
  }, []);

  const handleCategoryChange = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
  };
  const navigate = useNavigate();

  return (
    <MyProfileWrapper>
      <CategoryDiv>
        <MyPageCategory onCategoryChange={handleCategoryChange} />
      </CategoryDiv>

      <MainDiv>
        {selectedCategory === "계정 관리" && <AccountManagementContent />}
        {selectedCategory === "프로필 관리" && <ProfileManagementContent />}
      </MainDiv>
    </MyProfileWrapper>
  );
};

export default MyProfile;

const MyProfileWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
`;

const CategoryDiv = styled.div`
  width: 20%;
`;

const MainDiv = styled.div`
  width: 80%;
  text-align: left;
  margin-left: 30px;
  height: 100%;
  p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  & .subname {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #bababa;
  }
  .btncontainer {
    display: flex;
    justify-content: flex-end;

    width: 100%;
    margin-top: 10px;
  }

  .btn {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    text-align: center;
    line-height: 2em;
    border: none;
    background-color: #3e68ff;
    color: white;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
  }
`;
