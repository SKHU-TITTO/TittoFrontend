import styled from "styled-components";
import HBoarddetail from "../../components/home/board-detail";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "../../stores/UserStore";
import NewMessagePopup from "../message/postmsg";

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
  const accessToken = localStorage.getItem("accessToken");
  const [chooseList, setChooseList] = useState<ChosePost[]>([]);
  const [userProfo, setProInfo] = useState<UserProfileInfo>({
    userId: 1,
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

  const getChooseBoardList = async () => {
    try {
      const res = await axios.get(
        `https://titto.store/posts/${userId}/all?page=0`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const formattedPosts = res.data.content.slice(0, 3);
      setChooseList(formattedPosts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://titto.store/user/profile", {
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

    //getChooseBoardList();
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
              <img src="/imgs/UserProfile.png" alt="User-Profile"></img>
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
                />
              )}
            </div>
          </UserProfileMainLevelContainer>
        </UserProfileMainContainer>

        <UserProfileSubContainer>
          <UserProfileStudyContainer>
            <p>답변한 글</p>
            <UserProfileAcceptInner>
              {chooseList.map((post) => {
                return (
                  <HBoarddetail
                    key={post.matchingPostId}
                    category={"STUDY"}
                    title={post.title}
                    detail={post.content}
                    view={post.viewCount}
                    comment={post.reviewCount}
                  ></HBoarddetail>
                );
              })}
            </UserProfileAcceptInner>
          </UserProfileStudyContainer>
          <UserProfileWritePostContainer>
            <p>작성한 글</p>
            <UserProfileWritePostInner>
              <HBoarddetail
                category={"STUDY"}
                title="C++ 한솥밥 하실분구해요!"
                detail="안녕하세요, 혹시 C++한솥밥 하실 분 계신가요? 저는 저번학기 김학수 C++ 1등 으로 수...."
                view={41}
                comment={4}
              />
              <HBoarddetail
                category={"STUDY"}
                title="C++ 한솥밥 하실분구해요!"
                detail="안녕하세요, 혹시 C++한솥밥 하실 분 계신가요? 저는 저번학기 김학수 C++ 1등 으로 수...."
                view={41}
                comment={4}
              />
              <HBoarddetail
                category={"STUDY"}
                title="C++ 한솥밥 하실분구해요!"
                detail="안녕하세요, 혹시 C++한솥밥 하실 분 계신가요? 저는 저번학기 김학수 C++ 1등 으로 수...."
                view={41}
                comment={4}
              />{" "}
              <HBoarddetail
                category={"STUDY"}
                title="C++ 한솥밥 하실분구해요!"
                detail="안녕하세요, 혹시 C++한솥밥 하실 분 계신가요? 저는 저번학기 김학수 C++ 1등 으로 수...."
                view={41}
                comment={4}
              />
              <HBoarddetail
                category={"STUDY"}
                title="C++ 한솥밥 하실분구해요!"
                detail="안녕하세요, 혹시 C++한솥밥 하실 분 계신가요? 저는 저번학기 김학수 C++ 1등 으로 수...."
                view={41}
                comment={4}
              />
              <HBoarddetail
                category={"STUDY"}
                title="C++ 한솥밥 하실분구해요!"
                detail="안녕하세요, 혹시 C++한솥밥 하실 분 계신가요? 저는 저번학기 김학수 C++ 1등 으로 수...."
                view={41}
                comment={4}
              />
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
const Progress = styled.div`
  width: 300px;
  height: 10px;
  background-color: #ccc;
  overflow: hidden;
  margin-bottom: 20px;
`;
const Dealt = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3e68ff;
  transform: scaleX(0.3);
  transform-origin: left;
  transition: transform 0.3s ease;
`;
const UserProfileSubContainer = styled.div`
  text-align: left;
  display: flex;
  flex: 1;
  margin-top: 20px;

  p {
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const UserProfileStudyContainer = styled.div`
  border: 2px solid #ccc;
  border-radius: 10px;
  margin-right: 20px;
  flex: 2.6;
`;

const UserProfileWritePostContainer = styled.div`
  flex: 7.4;
  border: 2px solid #ccc;
  border-radius: 10px;
`;

const UserProfileWritePostInner = styled.div`
  padding: 20px;
`;

const UserProfileAcceptInner = styled.div`
  padding: 10px;
`;
export default UserProfile;
