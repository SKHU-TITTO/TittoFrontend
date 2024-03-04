import React, { useState } from "react";
import styled from "styled-components";

const TitleMessage = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <MessageItems>
      <div
        className={`items ${isActive ? "active" : ""}`}
        onClick={toggleActive}
      >
        <a href="#" className={`item ${isActive ? "active" : ""}`}>
          <div className="top">
            <div className="left">
              <h3>닉네임</h3>
            </div>
            <div className="right">
              <time>시간</time>
            </div>
          </div>

          <div className="bottom">
            <p className="text">미리보기</p>
          </div>
        </a>
      </div>
    </MessageItems>
  );
};

const MessageItems = styled.div`
  .items {
    padding: 15px;
    border-bottom: 1px solid #ccc;
    background-color: transparent;
    display: flex;
    flex-direction: column;
  }
  h3 {
    font-weight: bold;
  }

  .items.active {
    background-color: #3e68ff;
    color: #ffffff;
  }

  .item {
    text-decoration: none;
    color: inherit;
  }

  .item.active {
    background-color: #3e68ff;
    color: #ffffff;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bottom {
    margin-top: 20px;
  }
`;

export default TitleMessage;
