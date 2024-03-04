import { Routes, Route } from "react-router-dom";
import NotFound from "../screens/notfound";
import MessageBox from "../screens/message/messagebox";

const MessageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MessageBox />} />
      <Route path="/:id" element={<h1>해당 메세지함 내역 조회</h1>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MessageRoutes;
