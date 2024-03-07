import React, { useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import TitleMessage from "./title-message";
import NewMessagePopup from "./postmsg";
import ContentMessage from "./content-message";
import styled from "styled-components";

const MessageBox = () => {
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [selectedSenderId, setSelectedSenderId] = useState<number | null>(null);
  const [selectedSenderNickname, setSelectedSenderNickname] = useState<
    string | null
  >(null);

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
              <DeleteIcon />
            </IconsContainer>
          </TitleArea>
          <ContentMessage selectedSenderId={selectedSenderId} />
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

  flex: 3;
`;

const UserMessageRightContainer = styled.div`
  flex: 7;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow-y: auto;
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
