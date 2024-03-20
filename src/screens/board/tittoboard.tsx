import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MaxSlider from "../../components/slider-max";
import SearchIcon from "@mui/icons-material/Search";
import TittoTitle from "../../components/board/title-titto";
import NumberSelector from "../../components/board/number-selector";
import TittoCategory from "../../components/board/titto-category";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../../components/board/loadingscreen";

type BoardUrl = {
  id: string;
  page: number;
};

export type TITTOPost = {
  matchingPostId: string;
  title: string;
  user: {
    nickname: string;
  };
  createDate: string;
  status: string;
  category: string;
  content: string;
  viewCount: number;
  reviewCount: number;
};

const TittoBoard = ({ id, page }: BoardUrl) => {
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pages, setPages] = useState(0);
  const [posts, setPosts] = useState<TITTOPost[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // 데이터를 가져오기 전에 로딩 상태를 true로 설정

      try {
        if (searchParams.has("search")) {
          const response = await axios.get(
            `https://titto.store/matching-board/search?page=${
              page - 1
            }&keyWord=${searchParams.get("search")}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setPages(response.data.totalPages);
          const formattedPosts = response.data.content.map(
            (post: TITTOPost) => ({
              ...post,
              createDate: new Date(
                new Date(post.createDate).getTime()
              ).toLocaleString(),
            })
          );
          setPosts(formattedPosts);
        } else if (searchParams.has("category")) {
          const response = await axios.get(
            `https://titto.store/matching-board/category?page=${
              page - 1
            }&category=${searchParams.get("category")}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setPages(response.data.totalPages);
          const formattedPosts = response.data.content.map(
            (post: TITTOPost) => ({
              ...post,
              createDate: new Date(
                new Date(post.createDate).getTime()
              ).toLocaleString(),
            })
          );
          setPosts(formattedPosts);
        } else {
          const response = await axios.get(
            `https://titto.store/matching-board/all?page=${page - 1}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setPages(response.data.totalPages);
          const formattedPosts = response.data.content.map(
            (post: TITTOPost) => ({
              ...post,
              createDate: new Date(
                new Date(post.createDate).getTime()
              ).toLocaleString(),
            })
          );
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 데이터를 가져온 후에 로딩 상태를 false로 설정
      }
    };

    fetchPosts();
  }, [page, searchParams, accessToken]);

  return (
    <Wrapper>
      <>
        {loading ? (
          <LoadingScreen /> // 로딩 중일 때는 LoadingScreen을 표시
        ) : (
          <>
            <MaxSlider></MaxSlider>
            <BoardWrapper>
              <MainDiv>
                <SearchDiv>
                  <input
                    type="text"
                    placeholder="제목 검색하기"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      navigate(`/board/lists/titto/1/?search=${searchValue}`);
                      window.location.reload();
                    }}
                  >
                    <SearchIcon style={{ fontSize: "43px" }}></SearchIcon>
                  </button>
                </SearchDiv>
                <span
                  style={{
                    color: "#3E68FF",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  티토 게시판
                </span>
                <PostWrapper>
                  <table>
                    <thead>
                      <tr>
                        <th>상태</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <TittoTitle
                          status={post.status}
                          key={post.matchingPostId}
                          title={post.title}
                          author={post.user.nickname}
                          date={post.createDate}
                          postId={post.matchingPostId}
                        />
                      ))}
                    </tbody>
                  </table>
                </PostWrapper>
                <SubmitWrapper>
                  <div
                    className="btn"
                    onClick={() => navigate("/board/write/" + boardId)}
                  >
                    글쓰기
                  </div>
                </SubmitWrapper>
                <NumberSelector id={id} page={page} pages={pages} />
              </MainDiv>

              <CategoryDiv>
                <TittoCategory />
              </CategoryDiv>
            </BoardWrapper>
          </>
        )}
      </>
    </Wrapper>
  );
};

export default TittoBoard;
const Wrapper = styled.div`
  width: 100%;
`;

const BoardWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
`;

const MainDiv = styled.div`
  width: 70%;
  text-align: left;
`;
const SearchDiv = styled.div`
  width: 100%;
  border: 1px solid #bababa;
  border-radius: 10px;
  text-align: left;
  height: 50px;

  justify-content: space-around;
  margin-bottom: 10px;
  input {
    width: 90%;
    height: 40px;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 300;
    color: #bababa;
    border: none;
    text-align: left;
  }
  input:focus {
    outline: none;
    color: black;
  }
  input:focus::placeholder {
    opacity: 0;
  }

  button {
    vertical-align: middle;
    border: none;
    background-color: white;
  }
  button:hover {
    cursor: pointer;
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  border: 1px solid #bababa;
  border-radius: 5px;
  margin-top: 10px;
  table {
    width: 100%;
    padding: 10px;
    font-weight: bold;
    text-align: center;
  }
  thead th {
    padding: 10px;
    border-bottom: 1px solid #bababa;
  }
  td {
    padding: 10px;
  }
  td:nth-child(1) {
    width: 10%;
  }
  td:nth-child(2) {
    width: 55%;
  }
  td:nth-child(3) {
    width: 17%;
  }
  td:nth-child(4) {
    width: 17%;
  }
  tr:last-child {
    border-bottom: none;
  }
`;
const CategoryDiv = styled.div`
  width: 28%;
`;

const SubmitWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  justify-content: right;
  display: flex;
  .btn {
    width: 100px;
    height: 35px;
    border-radius: 5px;
    text-align: center;
    line-height: 2em;
    border: none;
    background-color: #3e68ff;
    color: white;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
  }
`;
