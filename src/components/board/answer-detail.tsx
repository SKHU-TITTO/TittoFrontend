import styled, { css } from "styled-components";
import userStore from "../../stores/UserStore";
import { AnswerInfo } from "../../screens/board/anserView";
import axios from "axios";
import { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AnswerDeail = ({
  answer,
  accepted,
  authorId,
  onAnswerUpdated,
  onAnswerDeleted,
}: {
  answer: AnswerInfo;
  accepted: boolean;
  authorId: number;
  onAnswerUpdated: () => void;
  onAnswerDeleted: () => void;
}) => {
  const [isModify, setIsModify] = useState(false);
  const [content, setContent] = useState(answer.content);
  const navigate = useNavigate();
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [["image"]],
      },
    };
  }, []);

  const answerdelete = () => {
    Swal.fire({
      title: "답변 삭제",
      text: "정말 삭제하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://titto.store/answers/${answer.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              Accept: "application/json;charset=UTF-8",
            },
          })
          .then(() => {
            onAnswerDeleted();
            Swal.fire("삭제", "댓글이 삭제되었습니다.", "success");
          })
          .catch((error) => {
            console.error("Error deleting answer:", error);
          });
      }
    });
  };

  const answerSelection = () => {
    Swal.fire({
      title: "답변 채택",
      text: "정말 채택하시겠습니까? 채택하면 다른 답변은 채택할 수 없습니다.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "채택",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://titto.store/answers/accept/${answer.id}?questionId=${answer.postId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                Accept: "application/json;charset=UTF-8",
              },
            }
          )
          .then((res) => {
            onAnswerUpdated();
          })
          .catch((err) => {
            Swal.fire({
              title: "채택 오류",
              text: "채택은 한 번만 가능합니다.",
              icon: "error",
            });
            console.error(err.response.data);
          });
      }
    });
  };
  const handleModify = () => {
    if (!isModify && !content.trim()) {
      Swal.fire({
        title: "내용을 입력해주세요",
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "답변 수정",
      text: "수정된 내용을 저장하시겠습니까?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "저장",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://titto.store/answers/${answer.id}`,
            {
              questionId: answer.postId,
              content: content,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                Accept: "application/json;charset=UTF-8",
              },
            }
          )
          .then(() => {
            onAnswerUpdated();
            Swal.fire("성공", "댓글이 수정되었습니다.", "success");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <Wrapper accepted={accepted}>
      <ProfileWrapper>
        <div className="profileBox">
          <img
            src={answer.profile}
            alt="User-Profile"
            onClick={() => navigate(`/mypage/users/${answer.authorId}/profile`)}
          />
          <div className="userdiv">
            <div className="nick">{answer.authorNickname}</div>
            <div className="lv">
              LV.{answer.level} |{" "}
              {new Date(answer.updateDate).toLocaleString("ko-KR")}
            </div>
          </div>
        </div>
        <div>
          {userStore.getUser()?.id === Number(answer.authorId) && (
            <div>
              {!accepted && (
                <button
                  className="modify"
                  onClick={() => setIsModify(!isModify)}
                >
                  수정
                </button>
              )}
              {!accepted && <button onClick={answerdelete}>삭제</button>}
            </div>
          )}
          {answer.accepted && <div className="ctanswer">채택된 답변</div>}

          {!answer.accepted && userStore.getUser()?.id === Number(authorId) && (
            <div>
              <button onClick={answerSelection}>채택</button>
            </div>
          )}
        </div>
      </ProfileWrapper>

      {isModify ? (
        <ModifyWrapper>
          <ReactQuill
            modules={modules}
            value={content}
            onChange={(c) => {
              setContent(c);
            }}
          ></ReactQuill>
          {!accepted && (
            <button
              onClick={() => {
                handleModify();
              }}
            >
              수정하기
            </button>
          )}
        </ModifyWrapper>
      ) : (
        <DetailWrapper>
          <div
            className="detail"
            dangerouslySetInnerHTML={{ __html: answer.content }}
          ></div>
        </DetailWrapper>
      )}
    </Wrapper>
  );
};
export default AnswerDeail;

const Wrapper = styled.div<{ accepted?: boolean }>`
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  border: 2px solid #bababa;
  border-radius: 5px;

  ${(props) =>
    props.accepted &&
    css`
      border: 2px solid #3e68ff;
    `}
`;
const ProfileWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  .profileBox {
    display: flex;
    text-align: left;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .userdiv {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      .nick {
        font-size: 20px;
        font-weight: bold;
      }
      .lv {
        font-size: 15px;
        color: #ccc;
      }
    }
  }

  .ctanswer {
    width: auto;
    padding: 10px 15px 10px 15px;
    border-radius: 5px;
    border: none;
    background-color: #3e68ff;
    color: white;
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
    display: inline-block;
  }

  button {
    width: 70px;
    height: 35px;
    border-radius: 5px;
    border: none;
    background-color: #3e68ff;
    color: white;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
  }
  .btnfix {
    background-color: #3e68ff;
    color: white;
    cursor: pointer;

    &:active {
      background-color: #8fa3ea;
    }
  }

  .modify {
    background-color: white;
    color: #bababa;
    border: 1px solid #bababa;
  }
`;

const DetailWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;

  img {
    max-width: 900px;
    max-height: 900px;
  }
`;

const ModifyWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
  button {
    margin-top: 10px;
    width: 100px;
    height: 40px;
    border: 1px solid #bababa;
    font-weight: bold;
    border-radius: 5px;
    background-color: #3e68ff;
    color: white;
    cursor: pointer;
  }
`;
