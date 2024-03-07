import styled from "styled-components";
import MaxSlider from "../components/slider-max";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HBoarddetail from "../components/home/board-detail";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { TITTOPost } from "./board/tittoboard";
import { QNAPost } from "./board/qnaboard";
import userStore from "../stores/UserStore";

const Wrapper = styled.div`
  width: 100%;
`;

const IconMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
`;

const MyIcon = styled.div`
  margin-top: 30px;
  position: relative;
  transition: transform 0.3s ease-in-out;
  font-weight: bold;
  &:hover {
    transform: translateY(-10px);
    cursor: pointer;
  }

  img {
    display: block;
    padding-bottom: 10px;
  }
`;

const BoardWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

const BoardDetail = styled.div`
  width: 49%;
  text-align: left;
  span {
    font-size: 25px;
    font-weight: bold;
    display: inline-block;
  }

  span:hover {
    cursor: pointer;
    color: #bababa;
  }
`;

const HomeScreen = () => {
  const [tittoList, setTittoList] = useState<TITTOPost[]>([]);
  const [qnaList, setQnaList] = useState<QNAPost[]>([]);

  const getTITTOBoardList = async () => {
    try {
      const res = await axios.get(
        "https://titto.store/matching-board/all?page=0",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const formattedPosts = res.data.content.slice(0, 3);
      setTittoList(formattedPosts);
    } catch (e) {
      console.log(e);
    }
  };

  const getQNABoardList = async () => {
    try {
      const res = await axios.get(
        "https://titto.store/questions/posts?page=0",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const formattedPosts = res.data.content.slice(0, 3);
      setQnaList(formattedPosts);
      console.log(formattedPosts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTITTOBoardList();
    getQNABoardList();
  }, []);

  const navigate = useNavigate();
  return (
    <Wrapper>
      <MaxSlider></MaxSlider>
      <IconMenu>
        <MyIcon>
          <img
            src="/imgs/myIcon.svg"
            alt="My Icon"
            onClick={() => navigate("/board/lists/titto/1")}
          />
          티토찾기
        </MyIcon>
        <MyIcon>
          <img
            src="/imgs/myIcon.svg"
            alt="My Icon"
            onClick={() => navigate("/board/lists/qna/1")}
          />
          질문하기
        </MyIcon>
        <MyIcon>
          <img
            src="/imgs/myIcon.svg"
            alt="My Icon"
            onClick={() =>
              navigate(`/mypage/users/${userStore.getUser()?.id}/profile`)
            }
          />
          마이페이지
        </MyIcon>
      </IconMenu>
      <BoardWrapper>
        <BoardDetail onClick={() => navigate("/board/lists/titto/1")}>
          <span style={{ paddingBottom: "10px" }}>
            티토 찾아요
            <ArrowForwardIosIcon />
          </span>

          {tittoList.map((post) => {
            return (
              <HBoarddetail
                key={post.matchingPostId}
                category={post.category}
                title={post.title}
                detail={post.content}
                view={post.viewCount}
                comment={post.reviewCount}
              ></HBoarddetail>
            );
          })}
        </BoardDetail>
        <BoardDetail onClick={() => navigate("/board/lists/qna/1")}>
          <span style={{ paddingBottom: "10px" }}>
            질문 있어요
            <ArrowForwardIosIcon />
          </span>

          {qnaList.map((post) => {
            return (
              <HBoarddetail
                key={post.id}
                category={post.department}
                title={post.title}
                detail={post.content}
                view={post.viewCount}
                comment={post.answerList.length}
              ></HBoarddetail>
            );
          })}
        </BoardDetail>
      </BoardWrapper>
    </Wrapper>
  );
};

export default HomeScreen;
