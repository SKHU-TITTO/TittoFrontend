import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export type TitleType = {
  rank: number;
  profile: string;
  userId: number;
  nickname: string;
  lv: number;
  studentNo: number;
  totalExperience: number;
  department: string;
};

const TitleRank = ({
  rank,
  profile,
  userId,
  nickname,
  lv,
  studentNo,
  totalExperience,
  department,
}: TitleType) => {
  const navigate = useNavigate();
  return (
    <TitleWrapper
      onClick={() => {
        navigate(`/mypage/users/${userId}/profile`);
      }}
    >
      <td>{rank}</td>
      <td>
        <div>
          <span>
            <img src={"/imgs/logo2.png"} alt="" />
          </span>
          <dl>
            <dt>{nickname}</dt>
            <dd>
              {studentNo} | {department}
            </dd>
          </dl>
        </div>
      </td>
      <td>{lv}</td>
      <td>{totalExperience}</td>
    </TitleWrapper>
  );
};

export default TitleRank;

const TitleWrapper = styled.tr`
  cursor: pointer;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
  td {
    padding: 5px;
    vertical-align: middle;
    text-align: center;
    &:first-child {
      width: 10%;
      font-weight: bold;
    }
    &:last-child {
      width: 20%;
      font-size: 0.9em;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
      }
      span {
        font-weight: bold;
      }
      dl {
        margin: 0;
        dt {
          margin: 0;
        }
        dd {
          margin: 0;
          font-size: 0.9em;
          color: #666;
        }
      }
    }
  }
`;
