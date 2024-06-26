import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [nickErrorColor, setNickErrorcolor] = useState("red");
  const [noErrorColor, setNoErrorColor] = useState("red");
  const [isCheckNick, setIsCheckNick] = useState(false);
  const [isCheckStudentNo, setIsCheckStudentNo] = useState(false);
  const [nickname, setNickname] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [studentNoError, setStudentNoError] = useState("");
  const [name, setName] = useState("");
  const [oneLineIntro, setOneLineIntro] = useState("");
  const [selfIntro, setSelfIntro] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  const handleNicknameCheck = async () => {
    if (!nickname.trim()) {
      setNicknameError("닉네임을 입력해주세요.");
      setNickErrorcolor("red");
      return;
    }

    try {
      const res = await axios.get("https://titto.store/user/check/nickname", {
        params: {
          nickname: nickname,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json;charset=UTF-8",
        },
      });
      if (res.status === 200) {
        setNicknameError("사용 가능한 닉네임입니다.");
        setNickErrorcolor("green");
        setIsCheckNick(true);
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        setNickErrorcolor("red");
      } else {
        setNicknameError("서버 에러가 발생했습니다.");
      }
    }
  };

  const handleStudentNoCheck = async () => {
    if (!studentNo.trim()) {
      setStudentNoError("학번을 입력해주세요.");
      setNoErrorColor("red");
      return;
    }

    try {
      const res = await axios.get("https://titto.store/user/check/studentNo", {
        params: {
          studentNo: studentNo,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json;charset=UTF-8",
        },
      });
      if (res.status === 200) {
        setStudentNoError("사용 가능한 학번입니다.");
        setIsCheckStudentNo(true);
        setNoErrorColor("green");
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        setStudentNoError("이미 사용 중인 학번입니다.");
        setNoErrorColor("red");
      } else {
        setStudentNoError("서버 에러가 발생했습니다.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "nickname") {
      if (value.length < 30) {
        setNickname(value);
      }
    } else if (id === "studentNo") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 9) {
        setStudentNo(onlyNums);
      }
    } else if (id === "name") {
      setName(value);
    }
  };

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
      .then((response) => {})
      .catch((error) => {});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !nickname || !studentNo || !oneLineIntro || !selfIntro) {
      Swal.fire({
        icon: "error",
        title: "모든 입력란을 채워주세요.",
        confirmButtonText: "확인",
      });
      return;
    }
    if (nickname.length === 0 || studentNo.length !== 9) {
      Swal.fire({
        icon: "error",
        title: "닉네임과 학번을 올바르게 입력해주세요.",
        text: "학번은 9글자입니다.",
        confirmButtonText: "확인",
      });
      return;
    }
    if (isCheckNick === false || isCheckNick === null) {
      Swal.fire({
        icon: "error",
        title: "닉네임 중복확인을 해주세요.",
        confirmButtonText: "확인",
      });
    } else if (isCheckStudentNo === false || isCheckStudentNo === null) {
      Swal.fire({
        icon: "error",
        title: "학번 중복확인을 해주세요.",
        confirmButtonText: "확인",
      });
    } else {
      try {
        const formData = new FormData(e.target as HTMLFormElement);
        const department = formData.get("department") as string;

        const res = await axios.put(
          "https://titto.store/user/signup",
          {
            name,
            nickname,
            studentNo,
            department,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "회원가입이 완료되었습니다.",
          confirmButtonText: "확인",
        });

        if (res.status === 200) {
          navigate("/login/welcome", { state: { nickname } });
          handleSaveProfile();
        }
      } catch (error: any) {
        if (error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "중복 오류",
            text: "중복된 곳을 확인해주세요.",
            confirmButtonText: "확인",
          });
        }
      }
    }
  };

  return (
    <BackgroundWrapper>
      <SignUpWrapper>
        <SignUpTitle>
          <p>더 나은 캠퍼스 라이프</p>
          <p>
            TITTO <span>회원가입</span>
          </p>
          <hr />
        </SignUpTitle>
        <SignUpForm onSubmit={handleSubmit}>
          <SignUpLabel>이름</SignUpLabel>
          <SignUpInputContainer>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력해주세요."
              onChange={handleChange}
              style={{ borderRadius: "7px" }}
              maxLength={20}
            />
          </SignUpInputContainer>
          <SignUpLabel>닉네임</SignUpLabel>
          <SignUpInputContainer>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              maxLength={20}
              onChange={handleChange}
            />
            <button type="button" onClick={handleNicknameCheck}>
              중복확인
            </button>
          </SignUpInputContainer>
          <SignUpError color={nickErrorColor}>{nicknameError}</SignUpError>
          <SignUpLabel>학번</SignUpLabel>
          <SignUpInputContainer>
            <input
              id="studentNo"
              type="text"
              placeholder="학번을 입력해주세요."
              value={studentNo}
              onChange={handleChange}
            />
            <button type="button" onClick={handleStudentNoCheck}>
              중복확인
            </button>
          </SignUpInputContainer>
          <SignUpError color={noErrorColor}>{studentNoError}</SignUpError>
          <SignUpLabel>한 줄 소개</SignUpLabel>
          <SignUpInputContainer>
            <input
              id="oneLineIntro"
              type="text"
              placeholder="한 줄 소개를 입력해주세요."
              value={oneLineIntro}
              maxLength={15}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setOneLineIntro(event.target.value)
              }
            />
          </SignUpInputContainer>
          <SignUpLabel>자기소개</SignUpLabel>
          <SignUpInputContainer>
            <input
              id="selfIntro"
              type="text"
              placeholder="자기소개를 입력해주세요."
              value={selfIntro}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSelfIntro(event.target.value)
              }
              maxLength={100}
            />
          </SignUpInputContainer>

          <SignUpLabel>소속</SignUpLabel>
          <SignUpSelect name="department">
            <option value="HUMANITIES">인문융합콘텐츠</option>
            <option value="MANAGEMENT">경영</option>
            <option value="SOCIETY">사회융합</option>
            <option value="MEDIA_CONTENT">미디어콘텐츠융합</option>
            <option value="FUTURE_FUSION">미래융합</option>
            <option value="SOFTWARE">소프트웨어융합</option>
          </SignUpSelect>
          <SignUpBtnContainer>
            <button
              type="submit"
              disabled={
                !isCheckNick || !isCheckStudentNo || !oneLineIntro || !selfIntro
              }
            >
              다음으로
            </button>
          </SignUpBtnContainer>
        </SignUpForm>
      </SignUpWrapper>
    </BackgroundWrapper>
  );
};

export default SignUpPage;

const BackgroundWrapper = styled.div`
  background: linear-gradient(
    45deg,
    rgba(66, 183, 245, 0.8) 0%,
    rgba(66, 245, 189, 0.4) 100%
  );
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpWrapper = styled.div`
  background-color: #fff;
  border-radius: 15px;
  width: 80%;
  max-width: 800px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
`;

const SignUpTitle = styled.div`
  text-align: left;
  width: 80%;
  p:nth-child(1) {
    font-size: 32px;
    color: #c6c6c6;
    font-weight: bold;
    margin: 10px 0 0 0;
  }

  p:nth-child(2) {
    font-size: 48px;
    font-weight: bold;
    color: #3e68ff;
    margin: 0;

    span {
      color: black;
      font-size: 32px;
      font-weight: bold;
    }
  }

  hr {
    border: 1px solid #c6c6c6;
    margin: 20px auto;
    width: 100%;
  }
`;

const SignUpForm = styled.form`
  width: 90%;
  max-width: 600px;
`;

const SignUpInputContainer = styled.div`
  margin-bottom: 1vw;
  text-align: left;
  display: flex;
  height: auto;
  input {
    flex-grow: 1;
    appearance: none;
    border: 1px solid #bababa;
    cursor: pointer;
    border-radius: 7px 0 0 7px;
    outline: 0;
    padding: 1.1vw;
  }

  button {
    color: #fff;
    font-weight: bold;
    background-color: #3e68ff;
    height: auto;
    border: 1px solid #3e68ff;
    border-radius: 0 7px 7px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
`;

const SignUpBtnContainer = styled.div`
  width: 90%;
  max-width: 600px;
  text-align: center;

  button {
    font-size: 18px;
    height: 50px;
    color: #fff;
    width: 100%;
    font-weight: bold;
    background-color: #3e68ff;
    padding: 10px 20px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;

    &:disabled {
      background-color: #bababa;
      cursor: not-allowed;
      pointer-events: none;
    }

    &:not(:disabled):hover {
      background-color: #2e55d6;
    }
  }
`;

const SignUpLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SignUpSelect = styled.select`
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

const SignUpError = styled.div`
  font-size: 13px;
  color: ${(props) => props.color || "red"};
  font-weight: bold;
  margin-bottom: 20px;
`;
