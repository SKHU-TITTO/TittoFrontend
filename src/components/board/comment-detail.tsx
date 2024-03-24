import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { UserInfo } from "../../screens/board/postView";
import ReactQuill from "react-quill";
import { values } from "mobx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export type CommentInfo = {
  profile: string;
  level: number;
  id: string;
  reviewId: number;
  reviewAuthor: string;
  content: string;
  updateDate: string;
  modify?: boolean;
  reviewAuthorId: number;
};

const CommentDetail = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const accessToken = localStorage.getItem("accessToken");
  const [isModify, setIsModify] = useState<boolean>(false);
  const modules = useMemo(() => {
    return {
      toolbar: false,
    };
  }, []);
  const navigate = useNavigate();
  const [userMyfo, setMyInfo] = useState<UserInfo>({
    name: "",
    profileImg: "",
    lv: 1,
    id: "",
    email: "",
  }); // 로그인 유저 정보

  useEffect(() => {
    fetchComments();
    loadUserData();
  }, [postId, accessToken]);

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
          lv: userData.lv,
          id: userData.id,
          email: userData.email,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://titto.store/matching-board-review/get/${postId}`,
        {
          headers: {
            accept: "application/json;charset=UTF-8",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.length > 0) {
        setComments(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteComment = async (reviewId: number, postId: number) => {
    const confirmResult = await Swal.fire({
      title: "정말 삭제하시겠습니까?",
      html: "<p>삭제한 데이터는 복구할 수 없습니다.</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (confirmResult.isConfirmed) {
      await axios
        .delete(
          `https://titto.store/matching-board-review/delete/${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json;charset=UTF-8",
            },
            data: {
              postId: postId,
              reviewId: reviewId,
            },
          }
        )
        .then((response: { status: number }) => {
          if (response.status === 200) {
            setComments((prevComments) =>
              prevComments.filter((comment) => comment.reviewId !== reviewId)
            );

            Swal.fire("성공", "댓글이 삭제되었습니다.", "success");
            window.location.reload();
          } else {
            Swal.fire(
              "실패",
              "댓글 삭제에 실패했습니다. 다시 시도해주세요.",
              "error"
            );
          }
        });
    } else if (confirmResult.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("취소", "댓글 삭제가 취소되었습니다.", "info");
    }
  };

  const handleReviewModify = async (
    reviewId: number,
    postId: number,
    content: string
  ) => {
    await axios
      .put(
        `https://titto.store/matching-board-review/update/${reviewId}`,
        {
          postId: postId,
          reviewId: reviewId,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => {
        setIsModify(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("댓글 수정 중 에러가 발생했습니다:", error);
      });
  };

  return (
    <>
      {comments.map((comment) => (
        <Wrapper key={comment.reviewId}>
          <ProfileWrapper>
            <div className="profileBox">
              <img
                src={comment.profile}
                alt="User-Profile"
                onClick={() =>
                  navigate(`/mypage/users/${comment.reviewAuthorId}/profile`)
                }
              />
              <div className="userdiv">
                <div className="nick">{comment.reviewAuthor}</div>
                <div className="lv">
                  LV.{comment.level} |{" "}
                  {new Date(comment.updateDate).toLocaleString("ko-KR")}
                </div>
              </div>
            </div>
            <div>
              {userMyfo.name === comment.reviewAuthor && (
                <div>
                  <button
                    className="modify"
                    onClick={() => {
                      comment.modify = !comment.modify;
                      setIsModify(!isModify);
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteComment(comment.reviewId, parseInt(postId))
                    }
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </ProfileWrapper>
          {comment.modify ? (
            <ModifyWrapper>
              <ReactQuill
                modules={modules}
                value={comment.content}
                onChange={(content) => {
                  comment.content = content;
                }}
              ></ReactQuill>
              <button
                onClick={() => {
                  handleReviewModify(
                    comment.reviewId,
                    parseInt(postId),
                    comment.content
                  );
                }}
              >
                수정하기
              </button>
            </ModifyWrapper>
          ) : (
            <DetailWrapper>
              <div
                className="detail"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              ></div>
            </DetailWrapper>
          )}
        </Wrapper>
      ))}
    </>
  );
};

export default CommentDetail;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  border: 2px solid #bababa;
  border-radius: 5px;
  padding: 10px;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  margin-top: 5px;
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
