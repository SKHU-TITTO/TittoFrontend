import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

interface NewMessageProps {
  onSend: (message: { content: string; receiverNickname: string }) => void;
  onCancel: () => void;
}

const NewMessagePopup: React.FC<NewMessageProps> = ({ onSend, onCancel }) => {
  const [content, setContent] = useState("");
  const [receiverNickname, setReceiverNickname] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const handleSend = async () => {
    try {
      const response = await axios.post(
        "https://titto.store/message/write",
        { content, receiverNickname },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Message sent successfully:", response.data);

      onCancel();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("닉네임을 확인해 주세요.");
    }
  };
  return (
    <>
      <PopupCover />
      <PopupContainer>
        <PopupContent>
          <h2>쪽지 보내기</h2>
          <label>보낼 닉네임</label>
          <input
            type="text"
            value={receiverNickname}
            placeholder={"닉네임을 입력하세요."}
            onChange={(e) => setReceiverNickname(e.target.value)}
          />
          <label>메시지 내용</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <ButtonContainer>
            <CancelButton onClick={onCancel}>취소</CancelButton>
            <SendButton onClick={handleSend}>전송</SendButton>
          </ButtonContainer>
        </PopupContent>
      </PopupContainer>
    </>
  );
};

const PopupCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1000;
`;

const PopupContent = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;

  h2 {
    font-size: 28px;
    color: #007bff;
    font-weight: bold;
    margin-bottom: 20px;
  }
  label {
    font-size: 18px;
    color: #bababa;
    font-weight: bold;
    margin-bottom: 20px;
  }
  input {
    margin-bottom: 20px;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #ccc;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
`;

export default NewMessagePopup;
