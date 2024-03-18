import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TitleRank from "../../components/board/title-rank";

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
`;

const BestRanking = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>순위</StyledTh>
            <StyledTh>유저 정보</StyledTh>
            <StyledTh>레벨</StyledTh>
            <StyledTh>내공</StyledTh>
          </tr>
        </thead>
        <tbody>
          <TitleRank
            rank={1}
            profile={""}
            userId={0}
            nickname={"하이"}
            lv={1}
            studentNo={201914127}
            totalExperience={500}
            department={"소프트웨어공학과"}
          />
          <TitleRank
            rank={2}
            profile={""}
            userId={0}
            nickname={"하이"}
            lv={1}
            studentNo={201914127}
            totalExperience={500}
            department={"소프트웨어공학과"}
          />
          <TitleRank
            rank={3}
            profile={""}
            userId={0}
            nickname={"하이"}
            lv={2}
            studentNo={201914127}
            totalExperience={500}
            department={"소프트웨어공학과"}
          />
          <TitleRank
            rank={4}
            profile={""}
            userId={0}
            nickname={"하이"}
            lv={1}
            studentNo={201914127}
            totalExperience={500}
            department={"소프트웨어공학과"}
          />
        </tbody>
      </StyledTable>
    </Wrapper>
  );
};

export default BestRanking;
