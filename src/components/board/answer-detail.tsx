import styled from "styled-components";
import userStore from "../../stores/UserStore";
import { AnswerInfo } from "../../screens/board/anserView";
import axios from "axios";
import { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #bababa;
  border-radius: 5px;
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

const AnserDetail = (answer: AnswerInfo) => {
  const [isModify, setIsModify] = useState(false);
  const [content, setContent] = useState(answer.content);
  const navigate = useNavigate();
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "underline"],
        ],
      },
    };
  }, []);
  const answerdelete = () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      axios
        .delete(`https://titto.store/answers/${answer.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Accept: "application/json;charset=UTF-8",
          },
        })
        .then((res) => {
          window.location.reload();
        });
    }
  };

  const answerSelection = () => {
    console.table(answer);

    const confirm = window.confirm(
      "정말 채택하시겠습니까? 채택하면 다른 답변은 채택할 수 없습니다."
    );
    if (confirm) {
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
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };

  const handleModify = () => {
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
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <Wrapper>
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
          {userStore.getUser()?.id === Number(answer.authorId) ? (
            <div>
              <button
                className="modify"
                onClick={() => {
                  setIsModify(!isModify);
                }}
              >
                수정
              </button>
              <button onClick={answerdelete}>삭제</button>
            </div>
          ) : (
            <div></div>
          )}
          {answer.isEditable && !answer.isSolved ? (
            <div>
              <button onClick={answerSelection}>채택</button>
            </div>
          ) : (
            <div></div>
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
          <button
            onClick={() => {
              handleModify();
            }}
          >
            수정하기
          </button>
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

export default AnserDetail;
