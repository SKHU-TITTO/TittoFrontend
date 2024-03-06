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

const TitleMessage = () => {
  const [activeMessageId, setActiveMessageId] = useState<number | null>(null);
  const [messages, setMessages] = useState<UserMsgInfo[]>([]);
  const accessToken = localStorage.getItem("accessToken");
  // const { senderId } = useParams();
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
      return <NoMessages>메시지가 없습니다.</NoMessages>;
    }

    const latestMessagesBySender: { [key: string]: UserMsgInfo } = {};

    messages.forEach((message) => {
      if (
        !latestMessagesBySender[message.senderNickname] ||
        new Date(message.sentAt) >
          new Date(latestMessagesBySender[message.senderNickname].sentAt)
      ) {
        latestMessagesBySender[message.senderNickname] = message;
      }
    });

    return Object.values(latestMessagesBySender).map((message) => (
      <div
        key={message.id}
        className={`items ${activeMessageId === message.id ? "active" : ""}`}
        onClick={() => toggleActive(message.id)}
      >
        <Link to={`/message/${message.senderId}`} className="item">
          <a
            href="#"
            className={`item ${activeMessageId === message.id ? "active" : ""}`}
          >
            <div className="top">
              <div className="left">
                <h3>{message.senderNickname}</h3>
              </div>
              <div className="right">
                <time>{new Date(message.sentAt).toLocaleString("ko-KR")}</time>
              </div>
            </div>

            <div className="bottom">
              <p className="text">{message.content}</p>
            </div>
          </a>
        </Link>
      </div>
    ));
  };

  const toggleActive = (messageId: number) => {
    setActiveMessageId(activeMessageId === messageId ? null : messageId);
  };

  return <MessageItems>{renderLatestMessageBySender()}</MessageItems>;
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
  time {
    color: #bababa;
    font-size: 14px;
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
const NoMessages = styled.p`
  margin: 20px;
  font-size: 20px;
  color: #666;
  text-align: center;
`;

export default TitleMessage;
