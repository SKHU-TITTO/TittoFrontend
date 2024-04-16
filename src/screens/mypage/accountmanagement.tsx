import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserInfo } from "../board/postView";
import LoadingScreen from "../../components/board/loadingscreen";

export type UserSignInfo = {
  department: string;
  studentNo: string;
  nickname: string;
  name: string;
};

const AccountManagementContent = () => {
  const navigate = useNavigate();
  const [isEditing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userMyInfo, setMyInfo] = useState<UserInfo>({
    name: "",
    profileImg: "",
    lv: 1,
    id: "",
    email: "",
  });
  const [userSignInfo, setSignInfo] = useState<UserSignInfo>({
    name: "",
    nickname: "",
    studentNo: "",
    department: "SOFTWARE",
  });

  const [isCheckNick, setIsCheckNick] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [errorColor, setErrorColor] = useState("red");

  const handleEditClick = () => {
    if (isLoading) return;
    setEditing((prevEditing) => !prevEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "nickname") {
      setSignInfo({ ...userSignInfo, nickname: value });
    } else if (id === "studentNo") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 9) {
        setSignInfo({ ...userSignInfo, studentNo: onlyNums });
      }
    } else if (id === "name") {
      setMyInfo({ ...userMyInfo, name: value });
    }
  };

  const loadUserData = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const handleNicknameCheck = async () => {
    if (!userSignInfo.nickname.trim()) {
      setNicknameError("닉네임을 입력해주세요.");
      setErrorColor("red");
      return;
    }

    try {
      const res = await axios.get("https://titto.store/user/check/nickname", {
        params: {
          nickname: userSignInfo.nickname,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json;charset=UTF-8",
        },
      });
      if (res.status === 200) {
        setNicknameError("사용 가능한 닉네임입니다.");
        setErrorColor("green");
        setIsCheckNick(true);
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        setErrorColor("red");
      } else {
        setNicknameError("서버 에러가 발생했습니다.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    if (!isCheckNick) {
      Swal.fire({
        icon: "error",
        title: "입력 오류",
        text: "닉네임 중복을 통과해야합니다.",
        confirmButtonText: "확인",
      });
      setIsLoading(false);
      return;
    }

    if (!userSignInfo.nickname) {
      Swal.fire({
        icon: "error",
        title: "입력 오류",
        text: "닉네임을 입력해주세요.",
        confirmButtonText: "확인",
      });
      setIsLoading(false);
      return;
    }

    try {
      const updatedInfo: Partial<UserSignInfo> = {};

      if (userSignInfo.nickname !== "") {
        updatedInfo.nickname = userSignInfo.nickname;
      }

      const res = await axios.put(
        "https://titto.store/user/update",
        {
          newNickname: updatedInfo.nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        await loadUserData();
        Swal.fire({
          icon: "success",
          title: "저장 완료",
          text: "회원 정보가 성공적으로 저장되었습니다.",
          confirmButtonText: "확인",
        }).then(() => {
          setEditing(false);
          setIsCheckNick(false);
          setErrorColor("red");
          setNicknameError("");
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "중복 오류",
          text: "이미 사용 중인 닉네임입니다.",
          confirmButtonText: "확인",
        });
      } else {
      }
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (isLoading) return;
    setIsLoading(true);

    Swal.fire({
      title: "회원 탈퇴",
      text: "티토 회원 탈퇴하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네, 탈퇴합니다.",
      cancelButtonText: "아니요, 취소합니다.",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `https://titto.store/user/${userMyInfo.id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
              },
            }
          );

          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "회원 탈퇴 완료",
              text: "회원 탈퇴가 성공적으로 완료되었습니다.",
              confirmButtonText: "확인",
            }).then(() => {
              navigate("/login/sign_in");
            });
          }
        } catch (error) {}
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (accessToken) {
      loadUserData();
    }
  }, [accessToken]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {isEditing ? (
            <AccountManagementDiv>
              <p>계정 관리</p>
              <p className="subname">기본 정보</p>
              <EditAccountDiv onClick={(e) => e.stopPropagation()}>
                <img src={userMyInfo.profileImg} alt="User-Profile" />
                <FormContainer onSubmit={handleSubmit}>
                  <p className="subname">
                    닉네임 <span style={{ color: "red" }}>*</span>
                  </p>
                  <InputContainer>
                    <input
                      type="text"
                      id="nickname"
                      placeholder={userSignInfo.nickname}
                      value={userSignInfo.nickname}
                      onChange={handleChange}
                      maxLength={9}
                    />
                    <button
                      onClick={handleNicknameCheck}
                      type="button"
                      className="checkbtn"
                    >
                      중복 확인
                    </button>
                  </InputContainer>
                  <FormError color={errorColor}>{nicknameError}</FormError>

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
            </AccountManagementDiv>
          ) : (
            <>
              <AccountManagementDiv>
                <p className="p1">계정 관리</p>
                <p className="subname">기본 정보</p>
                <div className="ManagementContainer">
                  <img src={userMyInfo.profileImg} alt="User-Profile" />
                  <p>{userMyInfo.name}</p>
                  <p className="subname">
                    {userMyInfo.email}
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
                  <h1 className="etc">
                    계정 삭제 시 프로필 및 정보가 삭제 됩니다.
                  </h1>
                  <button className="btn" onClick={handleDeleteAccount}>
                    삭제
                  </button>
                </div>
              </AccountDeleteDiv>
            </>
          )}
        </>
      )}
    </>
  );
};

const AccountManagementDiv = styled.div`
  margin-top: 70px;
  & .ManagementContainer {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #bababa;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
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

  p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
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

  p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: inline-block;
  }

  .DeleteContainer {
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
  .etc {
    font-size: 20px;
    color: #bababa;
    text-align: left;
    font-weight: bold;
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

export default AccountManagementContent;
