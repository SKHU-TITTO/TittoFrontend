import { Routes, Route } from "react-router-dom";
import UserProfile from "../screens/mypage/userprofile";
import MyProfile from "../screens/mypage/myprofile";

const MyPageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyProfile />} />
        <Route path="users/:userId/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default MyPageRoutes;
