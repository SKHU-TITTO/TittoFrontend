import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactQuill from "react-quill";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { UserProfileInfo, badgeImageMap } from "./userprofile";
import userStore from "../../stores/UserStore";

const ProfileManagementContent = () => {
  const navigate = useNavigate();

  const [oneLineIntro, setOneLineIntro] = useState("");
  const [selfIntro, setSelfIntro] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const modules = useMemo(() => {
    return {
      toolbar: false,
    };
  }, []);
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
  const handleSaveProfile = () => {
    const accessToken = localStorage.getItem("accessToken");

    axios
      .put(
        "https://titto.store/user/profile",
        {
          oneLineIntro,
          selfIntro,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => {
        window.alert("프로필이 저장되었습니다.");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://titto.store/user/profile`, {
          params: {
            userId: userStore.getUser()?.id,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.badges) {
          const badgesArray = response.data.badges
            .replace("[", "")
            .replace("]", "")
            .split(", ")
            .map((badge: string) => badge.trim());
          response.data.badges = badgesArray;
        }
        setProInfo(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <>
      <ProfileManagementDiv>
        <h2>프로필 관리</h2>
        <h2 className="subname">기본 정보</h2>
        <div className="ManagementContainer">
          <OneLineDiv>
            <h2 className="subname">한줄 소개</h2>
            <QuillWrapper>
              <ReactQuill
                modules={modules}
                value={oneLineIntro}
                onChange={setOneLineIntro}
                placeholder={"한줄 소개를 입력하세요."}
                style={{
                  height: "65px",
                }}
              ></ReactQuill>
            </QuillWrapper>
          </OneLineDiv>
          <ManyLineDiv>
            <h2 className="subname">자기 소개글</h2>
            <QuillWrapper>
              <ReactQuill
                modules={modules}
                value={selfIntro}
                onChange={setSelfIntro}
                placeholder={"자기 소개글을 입력하세요."}
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
      </ProfileManagementDiv>
      <ProfileBadgeDiv>
        <div className="BadgeContainer">
          <h2 className="subname">획득 뱃지</h2>{" "}
          <div className="imgcnt">
            {userProfo.badges && userProfo.badges.length > 1 ? (
              userProfo.badges.map((badge: string) => (
                <img key={badge} src={badgeImageMap[badge]} alt="" />
              ))
            ) : (
              <h2>보유한 뱃지가 없습니다.</h2>
            )}
          </div>
        </div>
      </ProfileBadgeDiv>
    </>
  );
};

const ProfileManagementDiv = styled.div`
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

const ProfileBadgeDiv = styled.div`
  margin-top: 30px;

  & .BadgeContainer {
    width: 100%;
    border: 1px solid #bababa;
    height: 200px;
    border-radius: 5px;
    padding: 20px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 10%;
      margin-right: 20px;
      margin-top: 20px;
    }
  }
`;

const OneLineDiv = styled.div`
  margin-bottom: 50px;
`;

const ManyLineDiv = styled.div`
  margin-bottom: 30px;
`;

const QuillWrapper = styled.div`
  width: 100%;
  text-align: left;
`;

export default ProfileManagementContent;
