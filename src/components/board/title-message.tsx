import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import userStore from "../../stores/UserStore";

export type UserMsgInfo = {
  receiverNickname: string;
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

  const calculateTimeDifference = (sentAt: string | number | Date) => {
    const sentTime = new Date(sentAt).getTime();
    const currentTime = new Date().getTime();
    const differenceInMs = currentTime - sentTime;
    const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));

    if (differenceInHours === 0) {
      const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
      return `${differenceInMinutes}분 전`;
    } else {
      return `${differenceInHours}시간 전`;
    }
  };
  const fetchMessages = async () => {
    try {
      const response = await axios.get("https://titto.store/message/all", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      let data = response.data;
      data.sort(
        (
          a: { sentAt: string | number | Date },
          b: { sentAt: string | number | Date }
        ) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
      );
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (id: number) => {
    setClickedIndex(id);
  };

  const renderMessages = () => {
    if (messages.length === 0) {
      return <NoMessages>받은 메시지가 없습니다.</NoMessages>;
    }

    return messages.map((message, id) => (
      <div
        key={message.id}
        className={`items ${clickedIndex === id ? "active" : ""}`}
      >
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
            handleClick(id);
          }}
        >
          <div className="top">
            <div className="left">
              <h3>
                {userStore.getUser() &&
                userStore.getUser()?.id === message.receiverId
                  ? message.senderNickname
                  : message.receiverNickname}
                님과의 쪽지
              </h3>
            </div>
            <div className="right">
              <time>{calculateTimeDifference(message.sentAt)}</time>
            </div>
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
    cursor: pointer;
    height: 80px;
    vertical-align: middle;
    justify-content: center;
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
