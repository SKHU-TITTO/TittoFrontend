import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

type NumberSelectorProps = {
  id: string;
  page: number;
  pages: number;
  filter: string;
};

const NumberSelector = ({ id, page, pages, filter }: NumberSelectorProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page, filter]);

  const handleArrowClick = (increment: number) => {
    const newPage = currentPage + increment;
    if (newPage >= 1 && newPage <= pages) {
      setCurrentPage(newPage);
      navigate(`/board/lists/${id}/${newPage}${filter ? `?${filter}` : ""}`);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`/board/lists/${id}/${pageNumber}${filter ? `?${filter}` : ""}`);
  };

  const renderPageNumbers = () => {
    const maxDisplayedPages = 5;
    const currentPageGroup = Math.floor((currentPage - 1) / 5);
    const startPage = currentPageGroup * maxDisplayedPages + 1;
    const endPage = Math.min(startPage + maxDisplayedPages - 1, pages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <NumberSelect>
      <ArrowDiv onClick={() => handleArrowClick(-1)}>
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
      <ArrowDiv onClick={() => handleArrowClick(1)}>
        <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
      </ArrowDiv>
    </NumberSelect>
  );
};

export default NumberSelector;

const NumberSelect = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NumDiv = styled.div`
  line-height: 2em;
  display: flex;
`;

const NumSpan = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 5px;
  margin-right: 5px;

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

  &:hover {
    cursor: pointer;
  }
`;
