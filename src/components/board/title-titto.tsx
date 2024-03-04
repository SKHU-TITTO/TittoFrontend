import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const TitleWrapper = styled.tr`
  height: 43px;
  border-bottom: 1px solid #bababa;

  &:hover {
    background-color: #bababa34;
  }

  td:nth-child(2) {
    text-align: left;
  }
  td:nth-child(4) {
    color: #bababa;
    font-weight: 400;
  }

  .search {
    border-radius: 5px;
    background-color: #8fa3ea;
    padding: 10px;
    color: white;
    font-size: 12px;
  }
  .end {
    border-radius: 5px;
    background-color: #3e68ff;
    color: white;
    padding: 10px;
    font-size: 12px;
  }
`;

export type TitleType = {
  title: string;
  author: string;
  date: string;
  postId: string;
  status: string;
};

const TittoTitle = ({ title, author, date, postId, status }: TitleType) => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  return (
    <TitleWrapper
      onClick={() => {
        navigate(`/board/view/${boardId}/${postId}`);
      }}
    >
      <td>
        <div className={status === "RECRUITING" ? "search" : "end"}>
          {status === "RECRUITING" ? "모집중" : "완료"}
        </div>
      </td>
      <td>{title}</td>
      <td>{author}</td>
      <td style={{ fontSize: "9px" }}>{date}</td>
    </TitleWrapper>
  );
};

export default TittoTitle;
