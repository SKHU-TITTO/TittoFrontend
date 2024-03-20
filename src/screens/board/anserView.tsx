import { useState, useEffect, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SmsIcon from "@mui/icons-material/Sms";
import ReactQuill from "react-quill";
import axios from "axios";
import userStore from "../../stores/UserStore";
import AnswerDeail from "../../components/board/answer-detail";
import LoadingScreen from "../../components/board/loadingscreen";

// 유저 정보 타입 정의
export type UserInfo = {
  name: string;
  profileImg: string;
  lv: number;
  id: string;
  email: string;
  department?: string;
};
export type AnswerInfo = {
  isEditable: boolean;
  isSolved: boolean;
  accepted: boolean;
  authorId: string;
  authorNickname: string;
  content: string;
  id: number;
  postId: number;
  profile: string;
  level: number;
  updateDate: string;
};

export type AnswerViewProps = {
  accepted: boolean;
  authorId: number;
  authorNickname: string;
  content: string;
  createDate: string;
  profile: string;
  id: number;
  sendExperience: number;
  department: string;
  level: number;
  title: string;
  status: string;
  viewCount: number;
  answerList: AnswerInfo[];
};

const changeDepartment = (department: string) => {
  switch (department) {
    case "HUMANITIES":
      return "인문융합콘텐츠";
    case "MANAGEMENT":
      return "경영";
    case "SOCIETY":
      return "사회융합";
    case "MEDIA_CONTENT":
      return "미디어콘텐츠융합";
    case "FUTURE_FUSION":
      return "미래융합";
    case "SOFTWARE":
      return "소프트웨어융합";
  }
};

const AnswerView = () => {
  const [view, setView] = useState<AnswerViewProps>({
    accepted: false,
    authorId: 0,
    authorNickname: "",
    sendExperience: 0,
    content: "",
    profile: "",
    createDate: "",
    id: 0,
    department: "",
    level: 0,
    title: "",
    status: "",
    viewCount: 0,
    answerList: [],
  });
  const { boardId = "default", postId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [reviewContent, setReviewContent] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 추가

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [["image"]],
      },
    };
  }, []);

  const handleAnswerSubmit = () => {
    axios
      .post(
        `https://titto.store/answers/create`,
        {
          questionId: postId,
          content: reviewContent,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json;charset=UTF-8",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeletePost = () => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      axios
        .delete(`https://titto.store/questions/${postId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json;charset=UTF-8",
          },
        })
        .then((response) => {
          alert("게시글이 성공적으로 삭제되었습니다.");
          navigate(`/board/lists/${boardId}/1`);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("채택된 글은 삭제가 불가능 합니다");
          }
        });
    }
  };
  const getPostData = async () => {
    try {
      setLoading(true); // 데이터를 가져오기 전에 로딩 상태를 true로 설정
      const response = await axios
        .get(`https://titto.store/questions/${postId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setView({
            id: res.data.id,
            title: res.data.title,
            profile: res.data.profile,
            content: res.data.content,
            sendExperience: res.data.sendExperience,
            authorId: res.data.authorId,
            authorNickname: res.data.authorNickname,
            createDate: new Date(res.data.createDate).toLocaleString("ko-KR"),
            department: res.data.department,
            level: res.data.level,
            status: res.data.status,
            viewCount: res.data.viewCount,
            accepted: res.data.accepted,
            answerList: res.data.answerList,
          });
          setLoading(false); // 데이터를 가져온 후에 로딩 상태를 false로 설정
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <LoadingScreen /> // 로딩 중일 때는 LoadingScreen을 표시
      ) : (
        <>
          <CategoryWrapper>
            <div className="categoryBox">
              {changeDepartment(view.department)}
            </div>
            <div className="categoryBox">{view.sendExperience}</div>
            <div className={view?.status == "UNSOLVED" ? "nSolve" : "Solve"}>
              {view?.status == "UNSOLVED" ? "미해결" : "해결"}
            </div>
          </CategoryWrapper>
          <TitleWrapper>{view?.title}.</TitleWrapper>
          <ProfileWrapper>
            <div className="profileBox">
              <img
                src={view.profile}
                alt="User-Profile"
                onClick={() =>
                  navigate(`/mypage/users/${view.authorId}/profile`)
                }
              />
              <div className="userdiv">
                <div className="nick">{view?.authorNickname}</div>
                <div className="lv">
                  LV.{view.level} | {view?.createDate}
                </div>
              </div>
            </div>
            {userStore.getUser()?.id === view.authorId ? (
              <div>
                <div>
                  <button
                    className="modify"
                    onClick={() => navigate(`/board/modify/qna/${postId}`)}
                  >
                    수정
                  </button>
                  <button onClick={handleDeletePost}>삭제</button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </ProfileWrapper>

          <DetailWrapper>
            <div
              className="detail"
              dangerouslySetInnerHTML={{ __html: view.content }}
            ></div>
          </DetailWrapper>
          <ViewWrapper>
            <div className="show-comment">
              <VisibilityIcon style={{ fontSize: "0.8em" }} /> {view.viewCount}{" "}
              <div style={{ display: "inline-block", width: "10px" }}> </div>
              <SmsIcon style={{ fontSize: "0.8em" }}></SmsIcon>{" "}
              {view.answerList.length}
            </div>
          </ViewWrapper>
          <CommentWrapper>
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>
              답변 {view.answerList.length}개
            </span>
          </CommentWrapper>
          {[...view.answerList]
            .sort((a, b) =>
              a.accepted === b.accepted ? 0 : a.accepted ? -1 : 1
            )
            .map((answer) => (
              <AnswerDeail
                key={answer.id}
                answer={answer}
                authorId={view.authorId}
                accepted={answer.accepted}
              />
            ))}
          {userStore.getUser()?.nickname === view.authorNickname ? (
            <div></div>
          ) : (
            <div>
              <QuillWrapper>
                <ReactQuill
                  modules={modules}
                  style={{ height: "200px" }}
                  value={reviewContent}
                  onChange={setReviewContent}
                ></ReactQuill>
              </QuillWrapper>
              <SubmitWrapper>
                <div className="btn" onClick={handleAnswerSubmit}>
                  등록
                </div>
              </SubmitWrapper>
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default AnswerView;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  text-align: left;
  padding-bottom: 30px;
`;

const CategoryWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  gap: 10px;
  .categoryBox {
    width: fit-content;
    padding: 10px;
    background-color: #3e68ff;
    border-radius: 5px;
    color: white;
  }
  .nSolve {
    width: fit-content;
    padding: 10px;
    border: 1px solid #bababa;
    border-radius: 5px;
    color: #bababa;
  }
  .Solve {
    width: fit-content;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    color: black;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  font-size: 25px;
  font-weight: bold;
  text-align: left;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
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
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  line-height: 1.5;

  .messageDiv {
    width: 10%;

    .msgBtn {
      margin: 0 auto;
      width: 90%;
      border: 2px solid #bababa;
      border-radius: 5px;
      padding: 10px;
      font-weight: bold;
      color: #bababa;

      &:hover {
        background-color: #bababa;
        color: white;
      }
    }
  }
  .detail {
    width: 88%;

    text-align: left;
  }
`;

const ViewWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  color: gray;
  text-align: left;
  .show-comment {
  }
`;

const CommentWrapper = styled.div`
  margin-top: 20px;
  padding-top: 30px;
  border-top: 2px solid #bababa;

  text-align: left;
`;

const QuillWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  text-align: left;
`;

const SubmitWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  justify-content: right;
  display: flex;
  .btn {
    width: 100px;
    height: 35px;
    border-radius: 5px;
    text-align: center;
    line-height: 2em;
    border: none;
    background-color: #3e68ff;
    color: white;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
  }
`;
