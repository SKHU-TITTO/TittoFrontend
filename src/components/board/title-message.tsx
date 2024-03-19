import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import userStore from "../../stores/UserStore";

export type UserMsgInfo = {
  receiverId: number;
  id: number;
  content: string;
  senderNickname: string;
  sentAt: string;
  senderId: number;
};

interface TitleMessageProps {
  onSelectMessage: (senderId: number, senderNickname: string) => void;
}

const TitleMessage = ({ onSelectMessage }: TitleMessageProps) => {
  const [messages, setMessages] = useState<UserMsgInfo[]>([]);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("https://titto.store/message/all", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = response.data;
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (index: number) => {
    setClickedIndex(index);
  };

  const renderMessages = () => {
    if (messages.length === 0) {
      return <NoMessages>받은 메시지가 없습니다.</NoMessages>;
    }

    return messages.map((message, index) => (
      <div
        key={message.id}
        className={`items ${index === clickedIndex ? "active" : ""}`}
      >
        {/* 서로 보낼 때 마다 리시버 센더가 달라지니 내 아이디랑 리시버 아이디가 같은지 판단, 리시버면 나에게 온건데
        그땐 senderId로 해서 링크이동, 반대면 receiverId로 해서 링크 이동 해야 같은 곳 userId로 링크가 이동 가능함 */}
        <MessageLink
          to={
            userStore.getUser() &&
            userStore.getUser()?.id === message.receiverId
              ? `/message/${message.senderId}`
              : `/message/${message.receiverId}`
          }
          className="item"
          onClick={() => {
            onSelectMessage(
              userStore.getUser() &&
                userStore.getUser()?.id === message.receiverId
                ? message.senderId
                : message.receiverId,
              message.senderNickname
            );
            handleClick(index);
          }}
        >
          <div className="top">
            <div className="left">
              <h3>{message.senderNickname}</h3>
            </div>
            <div className="right">
              <time>
                {new Date(message.sentAt).toLocaleDateString("ko-KR")}
              </time>
            </div>
          </div>
          <div className="bottom">
            <p className="text">{message.content}</p>
          </div>
        </MessageLink>
      </div>
    ));
  };

  return <MessageItems>{renderMessages()}</MessageItems>;
};

const MessageItems = styled.div`
  .items {
    border-bottom: 1px solid #ccc;
    background-color: transparent;
    display: flex;
    flex-direction: column;
  }
  h3 {
    font-weight: bold;
  }
  time {
    color: #bababa;
    font-size: 14px;
  }

  .item {
    text-decoration: none;
    color: inherit;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .items.active {
    background-color: #3e68ff;
    color: #ffffff;
  }

  .bottom {
    margin-top: 20px;
  }
`;

const MessageLink = styled(Link)`
  display: block;
  padding: 15px;
`;

const NoMessages = styled.p`
  margin: 20px;
  font-size: 20px;
  color: #666;
  text-align: center;
`;

export default TitleMessage;
