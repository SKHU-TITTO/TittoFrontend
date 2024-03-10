import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SmsIcon from "@mui/icons-material/Sms";
import { useEffect, useState } from "react";
import NumberSelector from "./number-selector";

export type MyWriteType = {
  category: string;
  department: string;
  title: string;
  detail: string;
  view?: number;
  comment?: number;
  answerCount?: number;
};

const categoryToString = (category: string) => {
  switch (category) {
    case "MENTOR":
      return "멘토찾아요";
    case "MENTEE":
      return "멘티찾아요";
    case "UHWOOLLEAM":
      return "어울려요";
    case "STUDY":
      return "스터디";
    default:
      return "기타";
  }
};

const departmentToString = (department: string) => {
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
      return "기타";
  }
};

const BoardWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  text-align: left;
  .cover {
    border-bottom: 2px solid #ccc;
    padding: 10px;
    color: #bababa;
  }
  .category {
    color: #3e68ff;
    font-weight: bold;
    font-size: 18px;
    display: flex;
  }
  .title {
    color: black;
    font-size: 20px;
  }

  .detail {
    font-size: 16px;
    color: #4d4d4d;
  }

  .show-comment {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #bababa;

    svg {
      font-size: 1.2em;
      margin-right: 5px;
    }

    p {
      margin-right: 10px;
    }
  }
`;
const CategoryDiv = styled.div`
  padding: 10px 20px 10px 20px;
  background-color: #3e68ff;

  font-size: 14px;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  width: 33%;
  height: 35px;
  display: flex;
  text-align: center;
  justify-content: center;
`;

const WriteDetail = ({
  category,
  department,
  title,
  detail,
  view,
  comment = 0,
  answerCount = 0,
}: MyWriteType) => {
  const [htmldetail, setDetail] = useState<string>("");

  useEffect(() => {
    if (detail.length > 50) {
      setDetail(detail.substring(0, 50) + "...");
    } else {
      setDetail(detail);
    }
  }, [detail]);

  return (
    <BoardWrapper>
      <div className="cover">
        <CategoryDiv>
          {department ? "질문있어요" : "티토찾아요"} |&nbsp;
          {department
            ? departmentToString(department)
            : categoryToString(category)}
        </CategoryDiv>
        <br />
        <p className="title">{title}</p>

        <p
          className="detail"
          dangerouslySetInnerHTML={{ __html: htmldetail }}
        />
        <br />
        <div className="show-comment">
          <VisibilityIcon />
          <p>{view}</p>
          <p>|</p>
          <SmsIcon />
          <p>{answerCount ? answerCount : comment}</p>
        </div>
      </div>
    </BoardWrapper>
  );
};

export default WriteDetail;
