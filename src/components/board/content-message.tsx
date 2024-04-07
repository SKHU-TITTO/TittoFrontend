import React, { useState, useEffect } from "react";
import styled from "styled-components";
import userStore from "../../stores/UserStore";
import axios from "axios";

export type MessageDetail = {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  sentAt: string;
  receiverNickname: string;
  senderNickname: string;
};

interface ContentMessageProps {
  selectedId: number | null;
  onSelectedIdChange: (senderId: number | null) => void;
  message: MessageDetail[];
}

const ContentMessage = ({
  selectedId,
  onSelectedIdChange,
  message,
}: ContentMessageProps) => {
  const [messages, setMessages] = useState<MessageDetail[]>([]);
  const accessToken = localStorage.getItem("accessToken");
  const userId = userStore.getUser()?.id;

  useEffect(() => {
    if (selectedId !== null) {
      fetchMessages(selectedId);
    }
  }, [selectedId]);

  const fetchMessages = async (id: number) => {
    try {
      const response = await axios.get(`https://titto.store/message/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      setMessages(data);
    } catch (error) {}
  };

  return (
    <MainContentMessage>
      {message.length > 0 ? (
        message.map((message) => (
          <div key={message.id} className="item">
            <div className="top">
              <h3
                style={{
                  color: userId === message.senderId ? "#05bcbc" : "#ffc900",
                }}
              >
                {userId === message.senderId ? "나" : message.senderNickname}
              </h3>
              <time>{new Date(message.sentAt).toLocaleString("ko-KR")}</time>
            </div>
            <div className="bottom">
              <p>{message.content}</p>
            </div>
          </div>
        ))
      ) : (
        <NoMessages>메시지가 없습니다.</NoMessages>
      )}
    </MainContentMessage>
  );
};

const MainContentMessage = styled.div`
  .item {
    padding: 15px;
    border-bottom: 1px solid #ccc;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h3 {
    margin: 0;
    font-weight: bold;
  }

  time {
    margin: 0;
    color: #bababa;
  }

  .bottom {
    margin-top: 20px;
  }
  margin-bottom: 30px;
`;

const NoMessages = styled.p`
  margin: 20px;
  font-size: 20px;
  color: #666;
  text-align: center;
`;

export default ContentMessage;
