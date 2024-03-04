import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostView from "../screens/board/postView";
import AnswerView from "../screens/board/anserView";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const FormScreen = () => {
  const { boardId, page } = useParams();

  const renderForm = (boardId: string | undefined) => {
    if (!boardId) {
      return <div>게시판 ID가 없습니다.</div>;
    }

    switch (boardId) {
      case "titto":
        return <PostView />;
      case "qna":
        return <AnswerView />;
      default:
        return <div>존재하지 않는 게시판입니다.</div>;
    }
  };

  return <Wrapper>{renderForm(boardId)}</Wrapper>;
};

export default FormScreen;
