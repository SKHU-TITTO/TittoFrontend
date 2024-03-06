import styled from "styled-components";
import { useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import TitleMessage from "./title-message";
import NewMessagePopup from "./postmsg";
import ContentMessage from "./content-message";

const MessageBox = () => {
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const openSendMessagePopup = () => {
    setIsSendingMessage(true);
  };

  const closeSendMessagePopup = () => {
    setIsSendingMessage(false);
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <UserMessageMainContainer>
      <UserMessageSub1Container>
        <UserMessageContainer>
          <h2>메시지 함</h2>
          <TitleMessage />
        </UserMessageContainer>
        <UserMessageSub2Container>
          <TitleArea>
            <h2>닉네임</h2>
            <IconsContainer>
              <TelegramIcon onClick={openSendMessagePopup} />
              <RefreshRoundedIcon onClick={handleRefresh} />
              <DeleteIcon />
            </IconsContainer>
          </TitleArea>
          <ContentMessage />
        </UserMessageSub2Container>
      </UserMessageSub1Container>
      {isSendingMessage && (
        <NewMessagePopup onSend={() => {}} onCancel={closeSendMessagePopup} />
      )}
    </UserMessageMainContainer>
  );
};

const UserMessageMainContainer = styled.div`
  height: 1000px;
`;

const UserMessageSub1Container = styled.div`
  text-align: left;
  display: flex;
  flex: 1;
  margin-top: 20px;
  height: 100%;
  h2 {
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const UserMessageContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 20px;
  flex: 3;
`;

const UserMessageSub2Container = styled.div`
  flex: 7;
  border: 1px solid #ccc;
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
