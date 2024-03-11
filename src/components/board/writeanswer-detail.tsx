import styled from "styled-components";
import { useEffect, useState } from "react";

export type MyWriteType = {
  department: string;
  title: string;
  detail: string;
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
  text-align: left;
  .cover {
    border-bottom: 2px solid #ccc;
    padding: 10px;
    color: #bababa;
  }
  .title {
    color: black;
    font-size: 20px;
  }

  .detail {
    font-size: 16px;
    color: #4d4d4d;
  }


    p {
      margin-right: 10px;
    }
  }
`;

const WriteAnswerDetail = ({ department, title, detail }: MyWriteType) => {
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
        <p className="category">{departmentToString(department)}</p>
        <br />
        <p className="title">{title}</p>
        <br />
        <p
          className="detail"
          dangerouslySetInnerHTML={{ __html: htmldetail }}
        ></p>
        <br />
      </div>
    </BoardWrapper>
  );
};

export default WriteAnswerDetail;
