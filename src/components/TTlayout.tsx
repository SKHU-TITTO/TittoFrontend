import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MenuIcon from "@mui/icons-material/Menu";
import TTfooter from "./TTfooter";
import { UserInfo } from "../screens/board/postView";
import axios from "axios";
import LoadingScreen from "./board/loadingscreen";
import Swal from "sweetalert2";

const TTlayout = () => {
  const navigate = useNavigate();
  const [userMyfo, setMyInfo] = useState<UserInfo>({
    name: "",
    profileImg: "",
    lv: 0,
    id: "",
    email: "",
  });
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const togglePopup = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setPopupOpen((prevState) => !prevState);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const logout = () => {
    Swal.fire({
      title: "로그아웃",
      text: "로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            "https://titto.store/oauth/logout",
            {
              accessToken: accessToken,
              refreshToken: refreshToken,
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
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            Swal.fire("성공", "로그아웃 되었습니다!", "success");
            navigate("/login/sign_in");
          })
          .catch((error) => {});
      }
    });
  };

  useEffect(() => {
    const loadUserData = () => {
      axios
        .get("https://titto.store/user/info", {
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

        .catch((error) => {});
    };

    loadUserData();
  }, [accessToken]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isPopupOpen &&
        event.target &&
        !(event.target as Element).closest(".nav-profile")
      ) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <NavWrapper>
            <NavUl>
              <NavLi>
                <Link to="/">
                  <NavLogo>TITTO</NavLogo>
                </Link>
              </NavLi>
              <NavLi>
                <Link to="/board/lists/titto/1">티토찾아요 </Link>
              </NavLi>
              <NavLi>
                <Link to="/board/lists/qna/1">질문있어요 </Link>
              </NavLi>
              <NavLi>
                <Link to="/ranking">명예의 전당 </Link>
              </NavLi>

              <NavProfile>
                <MailOutlineIcon
                  style={{ fontSize: "30px" }}
                  onClick={() => navigate("/message")}
                />
                <NavImg
                  src={userMyfo.profileImg}
                  alt="/imgs/basicImg.png"
                  onClick={() =>
                    navigate(`/mypage/users/${userMyfo.id}/profile`)
                  }
                />

                <MenuIcon
                  style={{ fontSize: "30px" }}
                  onClick={(e: React.MouseEvent<SVGSVGElement>) =>
                    togglePopup(e)
                  }
                />
                {isPopupOpen && (
                  <PopupContainer>
                    <PopupContent>
                      <PopupProfile>{userMyfo.name}</PopupProfile>
                      <PopupMyPage onClick={() => navigate("/mypage")}>
                        마이페이지
                      </PopupMyPage>
                    </PopupContent>
                    <PopupLogout onClick={logout}>로그아웃</PopupLogout>
                  </PopupContainer>
                )}
              </NavProfile>
            </NavUl>
          </NavWrapper>
          <Container>
            <Outlet />
          </Container>
          <TTfooter />
        </>
      )}
    </>
  );
};

export default TTlayout;

const NavWrapper = styled.nav`
  width: 100%;
  background-color: #fff;
  height: 80px;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const NavUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  width: 1100px;
`;

const NavLi = styled.li`
  margin-left: 30px;
  display: flex;
  align-items: center;
  position: relative;

  &:first-child {
    margin-left: 0;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 16px;
    position: relative;

    &:after {
      content: "";
      display: block;
      height: 2px;
      width: 0;
      background: #3e68ff;
      transition: width 0.3s;
      position: absolute;
      bottom: -5px;
    }
  }

  &:not(:first-child):hover a:after {
    width: 100%;
  }
`;

const NavLogo = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #3e68ff;
`;

const NavProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
  margin-left: auto;
`;

const NavImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 1100px;
  text-align: center;
  min-height: 100vh;
`;

const PopupContainer = styled.div`
  position: absolute;
  top: 80%;
  left: -50%;
  width: 170px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const PopupProfile = styled.div`
  justify-content: center;
  font-size: 1em;
  font-weight: bold;
`;

const PopupMyPage = styled.div`
  color: #ccc;
  &:hover {
    color: black;
  }
`;

const PopupLogout = styled.div`
  justify-content: center;
  text-align: center;

  font-size: 15px;
  cursor: pointer;
  background-color: #3e68ff;
  color: #fff;
  padding: 15px;
  border-radius: 0 0 10px 10px;

  &:hover {
    background-color: #e61919;
  }
`;
