import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./routes/protected-route";
import AccountRoute from "./routes/account-route";
import MyPageRoutes from "./routes/mypage-route";
import BoardRoutes from "./routes/board-route";
import MessageRoutes from "./routes/message-route";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import TTlayout from "./components/TTlayout";
import HomeScreen from "./screens/home-screen";
import LoginPage from "./screens/login/loginpage";
import SignUpPage from "./screens/login/signuppage";
import WelcomePage from "./screens/login/welcomepage";
import NotFound from "./screens/notfound";
import axios from "axios";
import SliderRoutes from "./routes/slider-route";

axios.defaults.withCredentials = true;

const Wrapper = styled.div`
  box-sizing: border-box;
  min-width: 1100px;
`;
const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;

  }
  body {
    
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <TTlayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <HomeScreen /> },
      { path: "mypage/*", element: <MyPageRoutes /> },
      { path: "message/*", element: <MessageRoutes /> },
      { path: "board/*", element: <BoardRoutes /> },
      { path: "slider/*", element: <SliderRoutes /> },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <AccountRoute />,
    children: [
      { path: "sign_in", element: <LoginPage /> },
      { path: "sign_up/:userId", element: <SignUpPage /> },
      { path: "welcome", element: <WelcomePage /> },
      { path: "oauth2/*", element: <LoginPage /> },
    ],
  },
]);

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
