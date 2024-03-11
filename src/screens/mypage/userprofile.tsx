import styled from "styled-components";
import HBoarddetail from "../../components/home/board-detail";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "../../stores/UserStore";
import NewMessagePopup from "../../components/board/postmsg";
import CategorySelector from "./../../components/board/category-selector";
import WriteDetail from "../../components/board/mywrite-detail";
import WriteAnswerDetail from "../../components/board/writeanswer-detail";

// 유저 정보 타입 정의
export type UserProfileInfo = {
  userId: number;
  profile: string;
  name: string;
  nickname: string;
  studentNo: string;
  department: string;
  oneLineIntro: string;
  selfIntro: string;
  badges: string[];
  totalExperience: number;
  currentExperience: number;
  countAnswer: number;
  countAccept: number;
  level: number;
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
export type ChosePost = {
  matchingPostId: string;
  title: string;
  user: {
    nickname: string;
    id: number;
  };
  createDate: string;
  status: string;
  content: string;
  viewCount: number;
  reviewCount: number;
};

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const [userProfo, setProInfo] = useState<UserProfileInfo>({
    userId: 0,
    profile: "",
    name: "",
    nickname: "",
    studentNo: "",
    department: "",
    oneLineIntro: "",
    selfIntro: "",
    badges: [],
    totalExperience: 0,
    currentExperience: 0,
    countAnswer: 0,
    countAccept: 0,
    level: 0,
  }); // 프로필 유저 정보
  const [max, setMax] = useState(0);

  const levelStandard = [100, 300, 600, 1000];

  const checkNextLevel = (totalExp: number, userLevel: number) => {
    switch (userLevel) {
      case 1:
        return levelStandard[0] - totalExp;
      case 2:
        return levelStandard[1] - totalExp;
      case 3:
        return levelStandard[2] - totalExp;
      case 4:
        return levelStandard[3] - totalExp;
      default:
        return 0;
    }
  };

  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const openSendMessagePopup = () => {
    setIsSendingMessage(true);
  };

  const closeSendMessagePopup = () => {
    setIsSendingMessage(false);
  };

  const acceptanceRate =
    userProfo.countAnswer > 0
      ? (userProfo.countAccept / userProfo.countAnswer) * 100
      : 0;

  const fetchUserPosts = async (userId: string | undefined) => {
    try {
      const response = await axios.get(
        `https://titto.store/user/posts/${userId}`,
        {
          params: {
            userId: userId,
          },

          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserPosts(response.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const fetchUserAnswers = async (userId: string | undefined) => {
    try {
      const response = await axios.get(
        `https://titto.store/user/answers/${userId}`,
        {
          params: {
            userId: userId,
          },

          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserAnswers(response.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    fetchUserPosts(userId);
    fetchUserAnswers(userId);
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://titto.store/user/profile`, {
          params: {
            userId: userId,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setProInfo(response.data);
        const maxValue = checkNextLevel(
          response.data.totalExperience,
          response.data.level
        );
        setMax(maxValue);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <>
      <UserProfileWrapper>
        <UserProfileMainContainer>
          <UserProfileMainProfileContainer>
            <img src={userProfo.profile} alt="User-Profile"></img>
            <UserProfileMainTextContainer>
              <h1>{userProfo.nickname}</h1>
              <h2>LV.{userProfo.level}</h2>
              <p>{userProfo.studentNo}</p>
              <p>{changeDepartment(userProfo.department)}</p>
            </UserProfileMainTextContainer>
          </UserProfileMainProfileContainer>

          <UserProfileMainIntroduceContainer>
            <UserProfileMainIntroduceTopContainer>
              <h1
                dangerouslySetInnerHTML={{ __html: userProfo.oneLineIntro }}
              />
              <p dangerouslySetInnerHTML={{ __html: userProfo.selfIntro }} />
            </UserProfileMainIntroduceTopContainer>
            <UserProfileMainIntroduceBottomContainer>
              <h1>보유 뱃지</h1>
              <img src="/imgs/bg.png" alt="User-Profile"></img>
              <img src="/imgs/bg.png" alt="User-Profile"></img>
            </UserProfileMainIntroduceBottomContainer>
          </UserProfileMainIntroduceContainer>

          <UserProfileMainLevelContainer>
            <div>
              <p>다음 레벨까지</p>
              <h1>
                {max}
                내공남았어요.
              </h1>
              <progress
                className="gage"
                value={levelStandard[userProfo.level - 1] - max}
                max={levelStandard[userProfo.level - 1]}
              ></progress>
              <p>답변한 글 수</p>
              <h1>총 {userProfo.countAnswer}개 답변했어요.</h1>
              <p>채택된 글 수</p>
              <h1>총 {userProfo.countAccept}개 채택됐어요.</h1>
            </div>
            <p>채택률</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>{acceptanceRate.toFixed(1)}%</h1>
              {userStore.getUser()?.id !== userProfo.userId && (
                <div className="btn" onClick={openSendMessagePopup}>
                  쪽지 보내기
                </div>
              )}

              {isSendingMessage && (
                <NewMessagePopup
                  onSend={() => {}}
                  onCancel={closeSendMessagePopup}
                  defaultReceiverNickname={userProfo.nickname}
                />
              )}
            </div>
          </UserProfileMainLevelContainer>
        </UserProfileMainContainer>

        <UserProfileSubContainer>
          <UserProfileStudyContainer>
            <p className="wirteanswer">답변한 글</p>
            <UserProfileAcceptInner>
              {userAnswers.map(
                (
                  answer: {
                    department: string;
                    questionTitle: string;
                    content: string;
                  },
                  index
                ) => (
                  <WriteAnswerDetail
                    key={index}
                    department={answer.department}
                    title={answer.questionTitle}
                    detail={answer.content}
                  />
                )
              )}
            </UserProfileAcceptInner>
          </UserProfileStudyContainer>
          <UserProfileWritePostContainer>
            <p className="writepost">작성한 글</p>
            <UserProfileWritePostInner>
              <div className="post">
                {Array.isArray(userPosts) &&
                  userPosts.map(
                    (
                      post: {
                        category: string;
                        department: string;
                        title: string;
                        content: string;
                        viewCount: number;
                        reviewCount: number;
                        answerCount: number;
                      },
                      index
                    ) => (
                      <WriteDetail
                        key={index}
                        category={post.category}
                        department={post.department}
                        title={post.title}
                        detail={post.content}
                        view={post.viewCount}
                        comment={post.reviewCount}
                        answerCount={post.answerCount}
                      />
                    )
                  )}
              </div>
            </UserProfileWritePostInner>
          </UserProfileWritePostContainer>
        </UserProfileSubContainer>
      </UserProfileWrapper>
    </>
  );
};

const UserProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const UserProfileMainContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
`;

const UserProfileMainProfileContainer = styled.div`
  flex: 2.5;
  background-color: #f5f5f5;
  border-radius: 10px 0 0 10px;
  border: 3px solid #3e68ff;
  border-right: none;
  padding: 20px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: relative;
  }
`;

const UserProfileMainTextContainer = styled.div`
  padding: 20px;
  text-align: left;

  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #3e68ff;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const UserProfileMainIntroduceContainer = styled.div`
  border: 3px solid #ccc;
  border-right: none;
  border-left: none;
  padding: 20px;
  text-align: left;
  flex: 4.5;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const UserProfileMainIntroduceTopContainer = styled.div`
  margin-bottom: 40px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    height: 20px;
  }

  p {
    font-size: 16 px;
    overflow-y: auto;
    font-weight: semi-bold;
    height: 100px;
  }
`;

const UserProfileMainIntroduceBottomContainer = styled.div`
  img {
    margin: 5px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: relative;
  }
`;

const UserProfileMainLevelContainer = styled.div`
  border-radius: 0 10px 10px 0;
  border: 3px solid #ccc;
  border-left: 2px solid #ccc;
  flex: 3;

  padding: 20px;
  text-align: left;

  progress {
    width: 300px;
    height: 10px;
    background-color: #ccc;
    overflow: hidden;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 40px;
  }
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

  .gage {
    width: 100%;
    height: 10px;
    border-radius: 10px;
    margin-bottom: 20px;
    color: #3e68ff;
  }
`;
const UserProfileSubContainer = styled.div`
  text-align: left;
  display: flex;
  flex: 1;
  margin-top: 20px;
`;

const UserProfileStudyContainer = styled.div`
  border: 2px solid #ccc;

  border-radius: 10px;

  margin-right: 20px;
  flex: 2.6;
  .wirteanswer {
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const UserProfileWritePostContainer = styled.div`
  flex: 7.4;
  border: 2px solid #ccc;
  border-radius: 10px;
  .writepost {
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
const UserProfileWritePostInner = styled.div`
  padding: 20px;
  height: 800px;
  overflow-y: auto;
`;

const UserProfileAcceptInner = styled.div`
  height: 800px;
  overflow-y: auto;
  padding: 10px;
`;
export default UserProfile;
