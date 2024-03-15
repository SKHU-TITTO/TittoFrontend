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
  selectedSenderId: number | null;
  onSelectedSenderIdChange: (senderId: number | null) => void;
}

const ContentMessage = ({
  selectedSenderId,
  onSelectedSenderIdChange,
}: ContentMessageProps) => {
  const [messages, setMessages] = useState<MessageDetail[]>([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (selectedSenderId !== null) {
      fetchMessages(selectedSenderId);
    }
  }, [selectedSenderId]);

  const fetchMessages = async (senderId: number) => {
    try {
      const response = await axios.get(
        `https://titto.store/message/${senderId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data;
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <MainContentMessage>
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className="item">
            <div className="top">
              <h3
                style={{
                  color:
                    message.senderId === userStore.getUser()?.id
                      ? "#05bcbc"
                      : "#ffc900",
                }}
              >
                {message.senderNickname}
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
