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

  const handleSaveProfile = () => {
    // Swal.fire({
    //   icon: "info",
    //   title: "문의사항 전송",
    //   text: "문의사항을 전송하시겠습니까?",
    //   showCancelButton: true,
    //   confirmButtonText: "네, 전송합니다.",
    //   cancelButtonText: "아니요, 취소합니다.",
    //   reverseButtons: true,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    // axios
    //   .put(
    //     "https://titto.store/user/profile",
    //     {
    //       oneLineIntro,
    //       selfIntro,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //         "Content-Type": "application/json;charset=UTF-8",
    //       },
    //     }
    //   )
    //       .then((response) => {
    //         Swal.fire({
    //           icon: "success",
    //           title: "문의사항 전송 완료",
    //           text: "문의사항이 성공적으로 전송되었습니다.",
    //           confirmButtonText: "확인",
    //         }).then(() => {
    //           window.location.reload();
    //         });
    //       })
    //       .catch((error) => {
    //         console.error( error);
    //       });
    //   }
    // });
  };

  return (
    <>
      <QuestionsManagementDiv>
        <h2>문의사항</h2>
        <h2 className="subname">기본 정보</h2>
        <div className="ManagementContainer">
          <ManyLineDiv>
            <h2 className="subname">문의사항</h2>

            <QuillWrapper>
              <ReactQuill
                modules={modules}
                value={question}
                onChange={setQuestion}
                placeholder={"문의 사항을 입력하세요."}
                style={{ height: "200px" }}
              ></ReactQuill>
            </QuillWrapper>
          </ManyLineDiv>
          <div className="btncontainer">
            <button className="btn" onClick={handleSaveProfile}>
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
