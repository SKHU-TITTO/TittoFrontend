import axios from "axios";
import { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import Swal from "sweetalert2";

const QuestionsContent = () => {
  const modules = useMemo(() => {
    return {
      toolbar: false,
    };
  }, []);
  const [question, setQuestion] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const handleSaveQuestion = () => {
    if (!question.trim()) {
      Swal.fire({
        icon: "error",
        title: "피드백 전송 실패",
        text: "피드백을 입력해주세요.",
        confirmButtonText: "확인",
      });
      return;
    }

    Swal.fire({
      icon: "info",
      title: "피드백 전송",
      text: "피드백을 전송하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네, 전송합니다.",
      cancelButtonText: "아니요, 취소합니다.",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `https://titto.store/feedbacks`,
            {
              content: question,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json;charset=UTF-8",
              },
            }
          )
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "피드백 전송 완료",
              text: "피드백이 성공적으로 전송되었습니다.",
              confirmButtonText: "확인",
            });
          })
          .catch((error) => {});
      }
    });
  };

  return (
    <>
      <QuestionsManagementDiv>
        <h2>피드백</h2>
        <h2 className="subname">
          피드백 내용은 며칠 이내로 이메일로 답장을 보내드립니다.
        </h2>
        <div className="ManagementContainer">
          <ManyLineDiv>
            <h2 className="subname">피드백</h2>

            <QuillWrapper>
              <ReactQuill
                modules={modules}
                value={question}
                onChange={setQuestion}
                placeholder={"피드백을 입력해주세요."}
                style={{ height: "200px" }}
              ></ReactQuill>
            </QuillWrapper>
          </ManyLineDiv>
          <div className="btncontainer">
            <button className="btn" onClick={handleSaveQuestion}>
              저장
            </button>
          </div>
        </div>
      </QuestionsManagementDiv>
    </>
  );
};

export default QuestionsContent;

const QuestionsManagementDiv = styled.div`
  margin-top: 70px;
  & .ManagementContainer {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #bababa;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20px;
    text-align: left;
    margin-top: 30px;
    display: flex;
    align-items: left;
    flex-direction: column;
  }
  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const ManyLineDiv = styled.div`
  margin-bottom: 30px;
`;

const QuillWrapper = styled.div`
  width: 100%;
  text-align: left;
`;
