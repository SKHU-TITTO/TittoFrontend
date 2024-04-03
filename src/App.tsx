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
import BestRanking from "./screens/rainking/bestranking";

axios.defaults.withCredentials = true;

const Wrapper = styled.div`
  box-sizing: border-box;
  min-width: 1100px;
`;
const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    ::-webkit-scrollbar {
      width: 12px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: none; 
    }
    ::-webkit-scrollbar-thumb {
      background: #c2c2c2;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:active {
      background: #6b98ff;
    }
    ::-webkit-scrollbar-thumb:active {
      background: #4b7fff;
    }
    ::-webkit-scrollbar-corner {
      background: #f0f0f0;
    }
    
    
  }
  
  body {
    
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .swal2-icon {
    margin: 20px auto 0;
}
.ql-editor.ql-blank::before {
  content: attr(data-placeholder);
  font-style: normal;
  pointer-events: none;
  position: absolute;
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
      { path: "ranking/*", element: <BestRanking /> },
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
