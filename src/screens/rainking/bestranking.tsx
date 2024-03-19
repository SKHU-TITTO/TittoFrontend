import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TitleRank from "../../components/board/title-rank";
import axios from "axios";

export type UserRanking = {
  userId: number;
  profile: string;
  nickname: string;
  studentNo: string;
  department: string;
  totalExperience: number;
  level: number;
};
const changeDepartment = (department: string | undefined) => {
  if (!department) return "";

  switch (department) {
    case "HUMANITIES":
      return "인문융합콘텐츠";
    case "MANAGEMENT":
      return "경영";
    case "SOCIETY":
      return "사회융합";
    case "MEDIA_CONTENT":
      return "미디어콘텐츠융합";
    case "FUTURE_FUSION":
      return "미래융합";
    case "SOFTWARE":
      return "소프트웨어융합";
    default:
      return "";
  }
};
const BestRanking = () => {
  const navigate = useNavigate();
  const [userRankings, setUserRankings] = useState<UserRanking[]>([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get<UserRanking[]>(
          "https://titto.store/user/ranking",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserRankings(response.data);
      } catch (error) {
        console.error("Error fetching user rankings:", error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <Wrapper>
      <StyledTable>
        <thead>
          <StyledTr>
            <StyledTh>순위</StyledTh>
            <StyledTh>유저 정보</StyledTh>
            <StyledTh>레벨</StyledTh>
            <StyledTh>내공</StyledTh>
          </StyledTr>
        </thead>
        <tbody>
          {userRankings.map((user, index) => (
            <TitleRank
              key={user.userId}
              rank={index + 1}
              profile={user.profile}
              userId={user.userId}
              nickname={user.nickname}
              lv={user.level}
              studentNo={user.studentNo}
              totalExperience={user.totalExperience}
              department={changeDepartment(user.department as string)}
            />
          ))}
        </tbody>
      </StyledTable>
    </Wrapper>
  );
};

export default BestRanking;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  background-color: white;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledTh = styled.th`
  background-color: #3e68ff;
  padding: 10px;
  font-size: 20px;
  height: 50px;
  vertical-align: middle;
  text-align: center;
  font-weight: bold;
  color: white;
  &:first-child {
    width: 20%;
  }
  &:nth-child(2) {
    width: 50%;
  }
  &:nth-child(3) {
    width: 15%;
  }

  &:last-child {
    width: 15%;
  }
`;

const StyledTr = styled.tr`
  border-bottom: 1px solid #ccc;
`;
