import { useState, useEffect, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SmsIcon from "@mui/icons-material/Sms";
import CommentDetail, {
  CommentInfo,
} from "../../components/board/comment-detail";
import ReactQuill from "react-quill";
import axios from "axios";

// 유저 정보 타입 정의
export type UserInfo = {
  name: string;
  profileImg: string;
  lv?: number;
  id?: number | string;
  level?: number;
  email: string;
  department?: string;
  matchingPostAuthorId?: number;
};

// 스타일드 컴포넌트들 정의
const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  text-align: left;
  padding-bottom: 30px;
`;

const CategoryWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  .categoryBox {
    width: fit-content;
    padding: 10px;
    background-color: #3e68ff;
    border-radius: 5px;
    color: white;
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

const PostView = () => {
  const [title, setTitles] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const { boardId = "default", postId } = useParams();
  const [view, setView] = useState(0);
  const [comment, setComment] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const [reviewContent, setReviewContent] = useState("");
  const [userMyfo, setMyInfo] = useState<UserInfo>({
    name: "",
    profileImg: "",
    lv: 1,
    id: "",
    email: "",
  }); // 로그인 유저 정보

  const [userWriteInfo, setWriteInfo] = useState<UserInfo>({
    name: "",
    profileImg: "",
    level: 1,
    lv: 1,
    matchingPostAuthorId: 0,
    email: "",
    id: 1,
  }); // 글 유저 정보

  interface statusMapping {
    RECRUITING: string;
    RECRUITMENT_COMPLETED: string;
  }
  const statusMapping: statusMapping = {
    RECRUITING: "모집 중",
    RECRUITMENT_COMPLETED: "완료",
  };

  interface CategoryMapping {
    STUDY: string;
    MENTOR: string;
    MENTEE: string;
    UHWOOLLEAM: string;
  }

  const categoryMapping: CategoryMapping = {
    STUDY: "스터디구해요",
    MENTOR: "멘토찾아요",
    MENTEE: "멘티찾아요",
    UHWOOLLEAM: "어울림찾아요",
  };

  const navigate = useNavigate();

  // Quill 에디터 모듈 정의
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "underline"],
        ],
      },
    };
  }, []);

  const loadUserData = () => {
    axios
      .get(`https://titto.store/user/info`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        const userData = response.data;
        setMyInfo({
          name: userData.nickname,
          profileImg: userData.profileImg,
          lv: 1,
          id: userData.id,
          email: userData.email,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const loadPostData = () => {
    axios
      .get(`https://titto.store/matching-post/get/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        const data = response.data;
        setTitles(data.title);
        setDetail(data.content);
        setCategory(data.category);
        setDate(new Date(data.updateDate).toLocaleString("ko-KR"));
        setView(data.viewCount);

        setComment(data.reviewCount);
        setStatus(data.status);
        setWriteInfo({
          name: data.authorNickName,
          profileImg: data.profile,
          level: data.level,
          id: "id",
          email: "email",
          matchingPostAuthorId: data.matchingPostAuthorId,
        });
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });
  };

  useEffect(() => {
    loadUserData();
    loadPostData();
  }, [accessToken, postId]);

  const handleReviewSubmit = () => {
    axios
      .post(
        `https://titto.store/matching-board-review/create`,
        {
          postId: postId,
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
      .then((response) => {
        loadPostData();
        setReviewContent("");

        window.location.reload(); // 일단..
      })
      .catch((error) => {
        // 요청이 실패한 경우
        console.error("리뷰 작성 중 에러가 발생했습니다:", error);
      });
  };

  const handleDeletePost = () => {
    // 확인 팝업 표시
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");

    // 사용자가 확인을 눌렀을 때만 삭제 요청을 보냄
    if (confirmDelete) {
      const matchingPostIdToDelete = postId;
      axios
        .delete(
          `https://titto.store/matching-post/delete/${matchingPostIdToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json;charset=UTF-8",
            },
          }
        )
        .then((response) => {
          navigate(`/board/lists/${boardId}/1`);
        })
        .catch((error) => {
          console.error("게시글 삭제 중 에러가 발생했습니다:", error);
        });
    }
  };

  const handleToggleStatus = () => {
    const newStatus =
      status === "RECRUITING" ? "RECRUITMENT_COMPLETED" : "RECRUITING";
    setStatus(newStatus);

    axios
      .put(
        `https://titto.store/matching-post/update/${postId}`,
        {
          category: category,
          title: title,
          content: reviewContent,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("상태 업데이트 중 에러가 발생했습니다:", error);
      });
  };

  return (
    <Wrapper>
      {/* 카테고리 표시 */}
      <CategoryWrapper>
        <div className="categoryBox">
          {categoryMapping[category as keyof CategoryMapping]}
        </div>
      </CategoryWrapper>
      {/* 제목 표시 */}
      <TitleWrapper>{title}</TitleWrapper>
      {/* 프로필 표시 */}
      <ProfileWrapper>
        <div className="profileBox">
          <img
            src={userWriteInfo.profileImg}
            alt="User-Profile"
            onClick={() =>
              navigate(
                `/mypage/users/${userWriteInfo.matchingPostAuthorId}/profile`
              )
            }
          />
          <div className="userdiv">
            <div className="nick">{userWriteInfo.name}</div>
            <div className="lv">
              LV.{userWriteInfo.level} | {date}
            </div>
          </div>
        </div>

        {/* 로그인한 유저와 글 작성자가 같을 경우 수정/삭제 버튼 표시 */}
        <div>
          {userMyfo.name &&
            userWriteInfo.name &&
            userMyfo.name === userWriteInfo.name && (
              <div>
                <button className="btnfix" onClick={handleToggleStatus}>
                  {statusMapping[status as keyof statusMapping]}
                </button>
                <button
                  className="modify"
                  onClick={() => navigate(`/board/modify/titto/${postId}`)}
                >
                  수정
                </button>
                <button onClick={handleDeletePost}>삭제</button>
              </div>
            )}
        </div>
      </ProfileWrapper>
      {/* 글 내용 표시 */}
      <DetailWrapper>
        <div
          className="detail"
          dangerouslySetInnerHTML={{ __html: detail }}
        ></div>
      </DetailWrapper>
      {/* 조회수, 댓글 수 표시 */}
      <ViewWrapper>
        <div className="show-comment">
          <VisibilityIcon style={{ fontSize: "0.8em" }} /> {view}{" "}
          <div style={{ display: "inline-block", width: "10px" }}> </div>
          <SmsIcon style={{ fontSize: "0.8em" }}></SmsIcon>
          {comment}
        </div>
      </ViewWrapper>
      {/* 댓글 표시 */}
      <CommentWrapper>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
          댓글 {comment}개
        </span>
      </CommentWrapper>
      <CommentDetail postId={postId || ""} />
      {/* Quill 에디터 표시 */}
      <QuillWrapper>
        <ReactQuill
          modules={modules}
          style={{ height: "200px" }}
          value={reviewContent}
          onChange={setReviewContent}
        ></ReactQuill>
      </QuillWrapper>
      {/* 등록 버튼 */}
      <SubmitWrapper>
        <div className="btn" onClick={handleReviewSubmit}>
          등록
        </div>
      </SubmitWrapper>
    </Wrapper>
  );
};

export default PostView;
