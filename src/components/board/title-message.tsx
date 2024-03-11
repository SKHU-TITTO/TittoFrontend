import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export type UserMsgInfo = {
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
  const [selectedMessage, setSelectedMessage] = useState<UserMsgInfo | null>(
    null
  );
  const [messages, setMessages] = useState<UserMsgInfo[]>([]);
  const [selectedSenderId, setSelectedSenderId] = useState<number | null>(null);
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
      console.error("Error fetching messages:", error);
    }
  };

  const renderLatestMessageBySender = () => {
    if (messages.length === 0) {
      return <NoMessages> 받은 메시지가 없습니다.</NoMessages>;
    }

    const latestMessagesBySender: { [key: string]: UserMsgInfo } = {};

    messages.forEach((message) => {
      if (
        !latestMessagesBySender[message.senderId] ||
        new Date(message.sentAt) >
          new Date(latestMessagesBySender[message.senderId].sentAt)
      ) {
        latestMessagesBySender[message.senderId] = message;
      }
    });

    return Object.values(latestMessagesBySender).map((message) => (
      <div
        key={message.id}
        className={`items ${selectedMessage === message ? "active" : ""}`}
      >
        <MessageLink
          to={`/message/${message.senderId}`}
          className="item"
          onClick={() => {
            onSelectMessage(message.senderId, message.senderNickname);
            setSelectedMessage(message);
            setSelectedSenderId(message.senderId);
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

  return <MessageItems>{renderLatestMessageBySender()}</MessageItems>;
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

  .items.active {
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
