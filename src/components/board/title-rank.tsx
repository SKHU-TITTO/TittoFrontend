import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export type TitleType = {
  rank: number;
  profile: string;
  userId: number;
  nickname: string;
  lv: number;
  studentNo: string;
  totalExperience: number;
  department: string;
};
type TitleWrapperProps = {
  borderColor: string;
  fontSize: string;
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

  let borderColor;
  let color;
  let size;

  switch (rank) {
    case 1:
      borderColor = "#D5A11E";
      color = "#D5A11E";
      size = "2.0em";
      break;
    case 2:
      borderColor = "#A3A3A3";
      color = "#A3A3A3";
      size = "1.8em";
      break;
    case 3:
      borderColor = "#CD7F32";
      color = "#CD7F32";
      size = "1.6em";
      break;
    default:
      borderColor = "#f0f0f0";
      color = "black";
      size = "1.2em";
      break;
  }

  return (
    <TitleWrapper
      onClick={() => {
        navigate(`/mypage/users/${userId}/profile`);
      }}
      borderColor={borderColor}
      color={color}
      fontSize={size}
    >
      <td>{rank}</td>
      <td>
        <div>
          <span>
            <img src={profile} alt="" />
          </span>
          <div className="post">
            <dl>
              <dt>{nickname}</dt>
              <dd>
                <span>{studentNo}</span> | <span>{department}</span>
              </dd>
            </dl>
          </div>
        </div>
      </td>
      <td>LV.{lv}</td>
      <td>{totalExperience}</td>
    </TitleWrapper>
  );
};

export default TitleRank;

const TitleWrapper = styled.tr<TitleWrapperProps>`
  cursor: pointer;
  background-color: #f0f0f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: black;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  transition: background-color 0.2s ease;

  .post {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 200px;
  }

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
      font-size: ${({ fontSize }) => fontSize};
      color: ${({ color }) => color};
    }

    &:last-child {
      width: 20%;
      font-size: 0.9em;
    }

    div {
      display: flex;
      align-items: center;
      gap: 40px;

      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 3px solid ${({ borderColor }) => borderColor};
        object-fit: cover;
      }

      dl {
        margin: 0;

        dt {
          margin-bottom: 5px;
          font-size: 1.1em;
          font-weight: bold;
        }

        dd {
          margin: 0;
          font-size: 0.9em;
          color: #666;

          span {
            margin-right: 5px; /* 간격 조정 */
          }
        }
      }
    }
  }
`;
