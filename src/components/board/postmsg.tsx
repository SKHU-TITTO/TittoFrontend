import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { MessageDetail } from "./content-message";
import Swal from "sweetalert2"; // SweetAlert2 라이브러리 추가

interface NewMessageProps {
  onCancel: () => void;
  defaultReceiverNickname: string;
  onMessageSent: (newMessage: MessageDetail) => void;
}

const NewMessagePopup: React.FC<NewMessageProps> = ({
  onCancel,
  defaultReceiverNickname,
  onMessageSent,
}) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const accessToken = localStorage.getItem("accessToken");

  const handleSend = async () => {
    // 메시지 유효성 검사
    if (!content.trim()) {
      Swal.fire("전송 실패", "메시지를 입력해주세요.", "error");
      return;
    }

    try {
      setLoading(true); // 로딩 시작

      const response = await axios.post(
        "https://titto.store/message/write",
        { content, receiverNickname: defaultReceiverNickname },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const newMessage = response.data;
      onMessageSent(newMessage);

      onCancel();

      Swal.fire("성공", "메시지를 전송했습니다.", "success");
      //전송 성공 후 3초 뒤 새로고침
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
      Swal.fire("전송 실패", "메시지 전송 중 오류가 발생했습니다.", "error");
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  return (
    <>
      <PopupCover />
      <PopupContainer>
        <PopupContent>
          <h2>쪽지 보내기</h2>
          <label>메시지 내용</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <ButtonContainer>
            <CancelButton onClick={onCancel}>취소</CancelButton>
            <SendButton onClick={handleSend} disabled={loading}>
              {loading ? "전송 중..." : "전송"}
            </SendButton>
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
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default NewMessagePopup;
