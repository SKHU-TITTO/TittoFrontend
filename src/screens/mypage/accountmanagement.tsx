import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserInfo } from "../board/postView";

export type UserSignfo = {
  department: string;
  studentNo: string;
  nickname: string;
  name: string;
};

const AccountManagementContent = () => {
  const navigate = useNavigate();
  const [isEditing, setEditing] = useState(false);
  const [userMyfo, setMyInfo] = useState<UserInfo>({
    name: "",
    profileImg: "",
    lv: 1,
    id: "",
    email: "",
  });
  const [userSignfo, setSignInfo] = useState<UserSignfo>({
    name: "",
    nickname: "",
    studentNo: "",
    department: "SOFTWARE",
  });
  const [isCheckNick, setIsCheckNick] = useState(false);
  const [isCheckStudentNo, setIsCheckStudentNo] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const [studentNoError, setStudentNoError] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [errorcolor, setErrorcolor] = useState("red");
  const handleEditClick = () => {
    setEditing((prevEditing) => !prevEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "nickname") {
      setSignInfo({ ...userSignfo, nickname: value });
    } else if (id === "studentNo") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 9) {
        setSignInfo({ ...userSignfo, studentNo: onlyNums });
      }
    } else if (id === "name") {
      setMyInfo({ ...userMyfo, name: value });
    }
  };
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

  const handleNicknameCheck = async () => {
    try {
      const res = await axios.get("https://titto.store/user/check/nickname", {
        //ㅇㅇ
        params: {
          nickname: userSignfo.nickname,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json;charset=UTF-8",
        },
      });
      if (res.status === 200) {
        setNicknameError("사용 가능한 닉네임입니다.");
        setErrorcolor("green");
        setIsCheckNick(true);
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
      } else {
        setNicknameError("서버 에러가 발생했습니다.");
      }
    }
  };

  const handleStudentNoCheck = async () => {
    try {
      const res = await axios.get("https://titto.store/user/check/studentNo", {
        params: {
          studentNo: userSignfo.studentNo,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json;charset=UTF-8",
        },
      });
      if (res.status === 200) {
        setStudentNoError("사용 가능한 학번입니다.");
        setIsCheckStudentNo(true);
        setErrorcolor("green");
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        setStudentNoError("이미 사용 중인 학번입니다.");
      } else {
        setStudentNoError("서버 에러가 발생했습니다.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userSignfo.nickname || !userSignfo.studentNo) {
      alert("모든 입력란을 채워주세요.");
      return;
    }
    if (userSignfo.nickname.length === 0 || userSignfo.studentNo.length !== 9) {
      alert("닉네임과 학번을 올바르게 입력해주세요.");
      alert("학번은 9글자입니다.");
      return;
    }
    if (!isCheckNick === true || isCheckNick === null) {
      alert("닉네임 중복확인을 해주세요.");
    } else if (!isCheckStudentNo === true || isCheckStudentNo === null) {
      alert("학번 중복확인을 해주세요.");
    } else {
      try {
        const res = await axios.put(
          "https://titto.store/user/signup",
          userSignfo,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          alert("저장되었습니다.");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadUserData();
    }
  }, [accessToken]);
  return (
    <>
      {isEditing ? (
        <>
          <p>계정 관리</p>
          <p className="subname">기본 정보</p>
          <EditAccountDiv onClick={(e) => e.stopPropagation()}>
            <img src={userMyfo.profileImg} alt="User-Profile" />

            <FormContainer onSubmit={handleSubmit}>
              <p className="subname">
                닉네임 <span style={{ color: "red" }}>*</span>
              </p>
              <InputContainer>
                <input
                  type="text"
                  id="nickname"
                  placeholder={userSignfo.nickname}
                  value={userSignfo.nickname}
                  onChange={handleChange}
                />
                <button
                  onClick={handleNicknameCheck}
                  type="button"
                  className="checkbtn"
                >
                  중복 확인
                </button>
              </InputContainer>
              <FormError color={errorcolor}>{nicknameError}</FormError>

              <p className="subname">
                학번 <span style={{ color: "red" }}>*</span>
              </p>
              <InputContainer>
                <input
                  type="text"
                  id="studentNo"
                  placeholder={userSignfo.studentNo}
                  value={userSignfo.studentNo}
                  onChange={handleChange}
                />
                <button
                  onClick={handleStudentNoCheck}
                  type="button"
                  className="checkbtn"
                >
                  중복 확인
                </button>
              </InputContainer>
              <FormError color={errorcolor}>{studentNoError}</FormError>

              <p className="subname">
                학과 <span style={{ color: "red" }}>*</span>
              </p>
              <SelectDepartMent
                name="department"
                value={userSignfo.department}
                onChange={(e) =>
                  setSignInfo({ ...userSignfo, department: e.target.value })
                }
              >
                <option value="HUMANITIES">인문융합콘텐츠</option>
                <option value="MANAGEMENT">경영</option>
                <option value="SOCIETY">사회융합</option>
                <option value="MEDIA_CONTENT">미디어콘텐츠융합</option>
                <option value="FUTURE_FUSION">미래융합</option>
                <option value="SOFTWARE">소프트웨어융합</option>
              </SelectDepartMent>
              <div className="btn-container">
                <button className="btn" type="submit">
                  저장
                </button>
                <button onClick={handleEditClick} className="btn">
                  취소
                </button>
              </div>
            </FormContainer>
          </EditAccountDiv>
        </>
      ) : (
        <>
          <AccountManagementDiv>
            <p>계정 관리</p>
            <p className="subname">기본 정보</p>
            <div className="ManagementContainer">
              <img src={userMyfo.profileImg} alt="User-Profile" />
              <p>{userMyfo.name}</p>
              <p className="subname">
                {userMyfo.email}
                <span className="icon">
                  <CheckCircleIcon style={{ color: "#3e68ff" }} />
                </span>
                <span>인증완료</span>
              </p>
              <div className="btncontainer">
                <button className="btn" onClick={handleEditClick}>
                  수정
                </button>
              </div>
            </div>
          </AccountManagementDiv>
          <AccountOauthDiv>
            <p>계정 연동</p>
            <div className="OauthContainer">
              <img src="/imgs/kakaoimg.png" alt="User-Profile" />
              <p>KaKao로 가입했어요</p>
            </div>
          </AccountOauthDiv>
          <AccountDeleteDiv>
            <p>계정 삭제</p>
            <div className="DeleteContainer">
              <p className="subname">계정 삭제 내용</p>
              <button className="btn" onClick={() => navigate("/")}>
                삭제
              </button>
            </div>
          </AccountDeleteDiv>
        </>
      )}
    </>
  );
};

const AccountManagementDiv = styled.div`
  & .ManagementContainer {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #bababa;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: relative;
    margin-bottom: 20px;
  }
  span {
    margin-left: 10px;
  }
`;

const AccountOauthDiv = styled.div`
  margin-top: 30px;

  & .OauthContainer {
    width: 100%;
    border: 1px solid #bababa;
    height: 100px;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }
  }
`;

const AccountDeleteDiv = styled.div`
  margin-top: 30px;
  & .DeleteContainer {
    width: 100%;
    border: 1px solid #bababa;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    text-align: left;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
`;

const EditAccountDiv = styled.div`
  padding: 20px;
  border: 1px solid #bababa;

  border-radius: 5px;
  text-align: center;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: relative;
    margin-bottom: 20px;
  }

  .btn-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .subname {
    color: black;
  }
`;

const InputContainer = styled.div`
  text-align: left;
  width: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    flex: 1;
    outline: 0;
    appearance: none;
    padding: 10px;
    border: 1px solid #bababa;
    border-radius: 5px;
    background-color: #fbfbfd;
    font-size: 14px;
    height: 50px;
    margin-right: 10px;
  }

  .checkbtn {
    height: 50px;
    width: 100px;
    border-radius: 5px;
    background-color: #3e68ff;
    color: white;
    cursor: pointer;
    font-size: 14px;
    box-shadow: none;
    border: none;
    outline: none;
  }
`;

const FormContainer = styled.form`
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
`;

const FormError = styled.div`
  font-size: 14px;
  color: ${(props) => props.color || "red"};
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SelectDepartMent = styled.select`
  padding: 10px;
  font-size: 16px;
  width: 30%;
  border: 1px solid #bababa;
  border-radius: 7px;
  cursor: pointer;
  outline: none;

  option {
    background-color: #fff;
    color: #333;
  }
`;

export default AccountManagementContent;
