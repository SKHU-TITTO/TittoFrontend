import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import userStore from "../stores/UserStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const levelStandard = [100, 300, 600, 1000];
  const fetchData = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const refData = {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken: refreshToken,
        };

        const raw = JSON.stringify(refData);

        const res = await axios.post("https://titto.store/oauth/refresh", raw, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        });

        localStorage.setItem("accessToken", res.data.accessToken);

        const userInfo = await axios.get("https://titto.store/user/info", {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
        });

        userStore.setUser({
          nickname: userInfo.data.nickname,
          email: userInfo.data.email,
          socialType: userInfo.data.socialType,
          profileImg: userInfo.data.profileImg,
          currentExperience: userInfo.data.currentExperience,
          totalExperience: userInfo.data.totalExperience,
          id: userInfo.data.id,
          level: userInfo.data.level,
        });
        checkLevelAndUpdate(userInfo.data.totalExperience, userInfo.data.level);

        setIsLogin(true);

        if (userInfo.data.nickname === null) {
          navigate(`/login/sign_up/${userStore.user?.id}`);
        }
      } else {
        setIsLogin(false);
        navigate("/login/sign_in");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLogin(false);
      navigate("/login/sign_in");
    }
  };

  const checkLevelAndUpdate = async (currentExp: number, userLevel: number) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = userStore.getUser()?.id;

    const levelStandard = [100, 200, 300, 400]; // 레벨 업 기준

    for (let i = 1; i <= levelStandard.length; i++) {
      if (currentExp > levelStandard[i - 1] && userLevel === i) {
        await updateUserLevel(userId, accessToken);
      }
    }
  };

  const updateUserLevel = async (
    userId: number | undefined,
    accessToken: string | null
  ) => {
    if (userId && accessToken) {
      await axios.get(
        `https://titto.store/user/level/update?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLogin]);

  if (isLogin === null) {
    return null;
  } else if (isLogin === false) {
    navigate("/login/sign_in");

    return null;
  } else {
    return <>{children}</>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
