import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

type BoardUrl = {
  id: string;
  page: number;
  pages: number;
};

const NumberSelect = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NumDiv = styled.div`
  background-color: #e8eef2;
  line-height: 2em;
  display: flex;
`;

const NumSpan = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
  &.selected {
    background-color: black;
    color: white;
  }
`;

const ArrowDiv = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e8eef2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
`;

const NumberSelector = ({ id, page, pages }: BoardUrl) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(page);

  const handleArrowClick = (increment: number) => {
    const newPage = currentPage + increment;

    if (newPage >= 1 && newPage <= pages) {
      setCurrentPage(newPage);
      navigate(`/board/lists/${id}/${newPage}`);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`/board/lists/${id}/${pageNumber}`);
  };

  const renderPageNumbers = () => {
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const remainingPages = pages - startPage + 1;

    return Array.from(
      { length: Math.min(5, remainingPages) },
      (_, i) => startPage + i
    );
  };

  return (
    <NumberSelect>
      <ArrowDiv onClick={() => handleArrowClick(-5)}>
        <ArrowBackIosIcon style={{ fontSize: "13px" }} />
      </ArrowDiv>
      <NumDiv>
        {renderPageNumbers().map((pageNumber) => (
          <NumSpan
            key={pageNumber}
            className={pageNumber === currentPage ? "selected" : ""}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </NumSpan>
        ))}
      </NumDiv>
      <ArrowDiv onClick={() => handleArrowClick(5)}>
        <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
      </ArrowDiv>
    </NumberSelect>
  );
};

export default NumberSelector;
