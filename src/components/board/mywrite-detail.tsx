import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SmsIcon from "@mui/icons-material/Sms";
import { useEffect, useState } from "react";

export type MyWriteType = {
  category: string;
  department: string;
  title: string;
  detail: string;
  view?: number;
  comment?: number;
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
    color: #444;
    font-weight: bold;
    font-size: 20px;
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

    svg {
      font-size: 1.2em;
      margin-right: 5px;
    }

    p {
      margin-right: 10px;
    }
  }
`;

const WriteDetail = ({
  category,
  department,
  title,
  detail,
  view,
  comment,
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
        <p className="category">
          {department
            ? departmentToString(department)
            : categoryToString(category)}
        </p>
        <br />
        <p className="title">{title}</p>
        <br />
        <p
          className="detail"
          dangerouslySetInnerHTML={{ __html: htmldetail }}
        ></p>
        <br />
        <div className="show-comment">
          <VisibilityIcon />
          <p>{view}</p>
          <p>|</p>
          <p>
            <SmsIcon /> {comment}
          </p>
        </div>
      </div>
    </BoardWrapper>
  );
};

export default WriteDetail;
