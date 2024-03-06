import { Routes, Route } from "react-router-dom";
import NotFound from "../screens/notfound";
import MessageBox from "../screens/message/messagebox";

const MessageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MessageBox />} />
      <Route path="/:id" element={<MessageBox />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MessageRoutes;
