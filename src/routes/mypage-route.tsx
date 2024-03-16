import { Routes, Route } from "react-router-dom";
import UserProfile from "../screens/mypage/userprofile";
import MyProfile from "../screens/mypage/myprofile";
import NotFound from "../screens/notfound";
import User1 from "../screens/user1";

const MyPageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyProfile />} />
        <Route path="users/:userId/profile" element={<UserProfile />} />
        <Route path="users/1/profile" element={<User1 />} />
      </Routes>
    </>
  );
};

export default MyPageRoutes;
