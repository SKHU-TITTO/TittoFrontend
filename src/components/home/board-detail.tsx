import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SmsIcon from "@mui/icons-material/Sms";
import { useEffect, useState } from "react";

type HBoardType = {
  category: string;
  title: string;
  detail: string;
  view: number;
  comment: number;
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
  }
};

const BoardWrapper = styled.div`
  padding-top: 10px;
  width: 100%;
  color: #bababa;
  border-bottom: 2px solid #bababa;
  padding-bottom: 10px;

  .category {
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .title {
    color: black;
    font-size: 18px;
  }
  .detail {
    height: 30px;
    font-weight: 100;
    font-size: 13px;
    padding-top: 10px;
    padding-bottom: 5px;
    color: #4d4d4d;
  }
  span {
    display: inline-block;
  }
  .show-comment {
    font-size: 0.9em;
    color: #bababa;
  }
`;

const HBoardDetail = ({
  category,
  title,
  detail,
  view,
  comment,
}: HBoardType) => {
  const [htmldetail, setDetail] = useState<string>("");

  useEffect(() => {
    if (detail.length > 50) {
      setDetail(detail.substring(0, 50) + "...");
    } else {
      setDetail(detail);
    }
  });

  return (
    <BoardWrapper>
      <span className="category">{categoryToString(category)}</span>
      <br />
      <span className="title">{title}</span>
      <br />

      <div
        className="detail"
        dangerouslySetInnerHTML={{ __html: htmldetail }}
      ></div>
      <br />
      <div className="show-comment">
        <VisibilityIcon style={{ fontSize: "0.8em" }} /> {view}{" "}
        <div style={{ display: "inline-block", width: "10px" }}> </div>
        <SmsIcon style={{ fontSize: "0.8em" }}></SmsIcon> {comment}
      </div>
    </BoardWrapper>
  );
};

export default HBoardDetail;
