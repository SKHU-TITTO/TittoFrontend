import React, { useState, useEffect } from "react";
import styled from "styled-components";

export type UserMsgInfo = {
  id: number;
  content: string;
  senderNickname: string;
  sentAt: string;
};

const TitleMessage = () => {
  const [activeMessageId, setActiveMessageId] = useState<number | null>(null);
  const [messages, setMessages] = useState<UserMsgInfo[]>([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("https://titto.store/message/all", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const renderLatestMessageBySender = () => {
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

export default TitleMessage;
