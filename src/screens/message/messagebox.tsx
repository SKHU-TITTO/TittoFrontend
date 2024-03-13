import React, { useState, useEffect } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import TitleMessage from "../../components/board/title-message";
import NewMessagePopup from "../../components/board/postmsg";
import ContentMessage, {
  MessageDetail,
} from "../../components/board/content-message";
import styled from "styled-components";
import axios from "axios";

const MessageBox = () => {
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [selectedSenderId, setSelectedSenderId] = useState<number | null>(null);
  const [selectedSenderNickname, setSelectedSenderNickname] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<MessageDetail[]>([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (selectedSenderId !== null) {
      fetchMessages(selectedSenderId);
    } else {
      setMessages([]);
    }
  }, [selectedSenderId]);
  const openSendMessagePopup = () => {
    setIsSendingMessage(true);
  };

  const closeSendMessagePopup = () => {
    setIsSendingMessage(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSelectMessage = (senderId: number, senderNickname: string) => {
    setSelectedSenderId(senderId);
    setSelectedSenderNickname(senderNickname);
  };

  const fetchMessages = async (senderId: number | null) => {
    try {
      if (senderId !== null) {
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
        setMessages(data.reverse());
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleDeleteMessage = async () => {
    try {
      if (selectedSenderId !== null) {
        const confirmDelete = window.confirm(
          "정말로 모든 메시지를 삭제하시겠습니까?"
        );
        if (confirmDelete) {
          await axios.put(
            `https://titto.store/message/delete-all/${selectedSenderId}`,
            null,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          window.location.reload();
          setMessages([]);
        }
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <UserMessageMainContainer>
      <UserMessageSubContainer>
        <UserMessageLeftContainer>
          <h2>쪽지함</h2>
          <TitleMessage onSelectMessage={handleSelectMessage} />
        </UserMessageLeftContainer>
        <UserMessageRightContainer>
          <TitleArea>
            <h2>대화 내용</h2>
            <IconsContainer>
              <TelegramIcon onClick={openSendMessagePopup} />
              <RefreshRoundedIcon onClick={handleRefresh} />
              <DeleteIcon onClick={handleDeleteMessage} />
            </IconsContainer>
          </TitleArea>

          <ContentMessage
            selectedSenderId={selectedSenderId}
            onSelectedSenderIdChange={setSelectedSenderId}
          />
        </UserMessageRightContainer>
      </UserMessageSubContainer>
      {isSendingMessage && (
        <NewMessagePopup
          onSend={() => {}}
          onCancel={closeSendMessagePopup}
          defaultReceiverNickname={selectedSenderNickname || ""}
        />
      )}
    </UserMessageMainContainer>
  );
};

const UserMessageMainContainer = styled.div`
  height: 1000px;
`;

const UserMessageSubContainer = styled.div`
  text-align: left;
  display: flex;
  flex: 1;
  margin-top: 20px;
  height: 100vh;

  h2 {
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const UserMessageLeftContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 20px;
  overflow-y: auto;
  flex: 3;
`;

const UserMessageRightContainer = styled.div`
  flex: 7;
  border: 1px solid #ccc;
  overflow-y: auto;
  border-radius: 10px;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 20px;
`;

export default MessageBox;
