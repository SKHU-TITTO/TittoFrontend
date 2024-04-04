import styled from "styled-components";
import QnaCategoty from "../../components/board/qna-category";
import QnaTitle from "../../components/board/title-qna";
import NumberSelector from "../../components/board/number-selector";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../../components/board/loadingscreen";

export type boardUrl = {
  id: string;
  page: number;
};
export type QNAPost = {
  id: number;
  authrId: number;
  authorNickname: string;
  department: string;
  status: string;
  title: string;
  content: string;
  answerList: Array<string>;
  viewCount: number;
  accepted: false;
  createDate: string;
  level: number;
};

const changeDepartment = (department: string) => {
  switch (department) {
    case "HUMANITIES":
      return "인문융합콘텐츠";
    case "MANAGEMENT":
      return "경영";
    case "SOCIETY":
      return "사회융합";
    case "MEDIA_CONTENT":
      return "미디어콘텐츠융합";
    case "FUTURE_FUSION":
      return "미래융합";
    case "SOFTWARE":
      return "소프트웨어융합";
  }
};

const sliceContent = (content: string) => {
  if (content.length > 50) {
    return content.slice(0, 50) + "...";
  } else {
    return content;
  }
};

const QnaBoard = ({ id, page }: boardUrl) => {
  const { boardId } = useParams();
  const [searchParmas] = useSearchParams();
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const [pages, setPages] = useState(0);
  const [posts, setPost] = useState<QNAPost[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        if (searchParmas.get("search")) {
          const searchKey = searchParmas.get("search");
          const res = await axios.get(
            `https://titto.store/questions/search?page=${
              page - 1
            }&keyWord=${searchKey}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setPages(res.data.totalPages);
          const formattedPost = res.data.content.map((post: QNAPost) => ({
            ...post,
            content: sliceContent(post.content),
            department: changeDepartment(post.department),
          }));
          setPost(formattedPost);
        } else if (searchParmas.get("status")) {
          const status = searchParmas.get("status");
          if (status === "UNSOLVED") {
            setStatus(1);
          } else {
            setStatus(2);
          }
          const res = await axios.get(
            `https://titto.store/questions/status/${status}?page=${page - 1}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setPages(res.data.totalPages);
          const formattedPost = res.data.content.map((post: QNAPost) => ({
            ...post,
            content: sliceContent(post.content),
            department: changeDepartment(post.department),
          }));
          setPost(formattedPost);
        } else if (searchParmas.get("category")) {
          const category = searchParmas.get("category");
          const res = await axios.get(
            `https://titto.store/questions/category/${category}?page=${
              page - 1
            }`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setPages(res.data.totalPages);
          const formattedPost = res.data.content.map((post: QNAPost) => ({
            ...post,
            content: sliceContent(post.content),
            department: changeDepartment(post.department),
          }));
          setPost(formattedPost);
        } else {
          const res = await axios.get(
            `https://titto.store/questions/posts?page=${page - 1}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setPages(res.data.totalPages);
          const formattedPost = res.data.content.map((post: QNAPost) => ({
            ...post,
            content: sliceContent(post.content),
            department: changeDepartment(post.department),
          }));
          setPost(formattedPost);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [page, accessToken, searchParmas]);

  return (
    <Wrapper>
      {loading ? (
        <LoadingScreen />
      ) : (
        <BoardWrapper>
          <MainDiv>
            <span
              style={{ color: "#3E68FF", fontWeight: "bold", fontSize: "25px" }}
            >
              질문 게시판
            </span>
            <SolveDiv>
              <SolveTitle
                className={status === 0 ? "select" : ""}
                onClick={() => {
                  navigate(`/board/lists/qna/1`);
                  setStatus(0);
                }}
              >
                전체
              </SolveTitle>
              <SolveTitle
                className={status === 1 ? "select" : ""}
                onClick={() => {
                  navigate(`/board/lists/qna/1/?status=UNSOLVED`);
                  setStatus(1);
                }}
              >
                미해결
              </SolveTitle>
              <SolveTitle
                className={status === 2 ? "select" : ""}
                onClick={() => {
                  navigate(`/board/lists/qna/1/?status=SOLVED`);
                  setStatus(2);
                }}
              >
                해결
              </SolveTitle>
            </SolveDiv>
            <SearchDiv>
              <input
                type="text"
                placeholder="제목으로 검색하기"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  navigate(`/board/lists/qna/1/?search=${searchValue}`);
                }}
              >
                검색
              </button>
            </SearchDiv>
            <PostWrapper>
              {posts.map((post) => (
                <QnaTitle
                  key={post.id}
                  id={post.id}
                  solve={post.status === "UNSOLVED" ? false : true}
                  title={post.title}
                  date={post.createDate.split("T")[0]}
                  detail={post.content}
                  category={post.department}
                  userLv={post.level}
                  userNick={post.authorNickname}
                  view={post.viewCount}
                  comment={post.answerList.length}
                ></QnaTitle>
              ))}
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
            <QnaCategoty />
          </CategoryDiv>
        </BoardWrapper>
      )}
    </Wrapper>
  );
};

export default QnaBoard;

const Wrapper = styled.div`
  width: 100%;
`;

const BoardWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
`;

const CategoryDiv = styled.div`
  width: 28%;
`;

const MainDiv = styled.div`
  width: 70%;
  text-align: left;
`;

const SolveDiv = styled.div`
  margin-top: 10px;
  width: 100%;
  border-bottom: 1px solid #bababa;
  display: flex;
  .select {
    color: black;
    border-bottom: 2px solid #3e68ff;
  }
`;

const SolveTitle = styled.div`
  padding: 10px 15px 10px 15px;
  font-size: 20px;
  color: #bababa;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: black;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  padding: 10px 0 10px 0;
  justify-content: space-between;
  border-bottom: 1px solid #bababa;
  input {
    border: 1px solid #bababa;
    border-radius: 5px;
    width: 85%;
    padding-left: 10px;
    font-size: 20px;
  }
  input:focus {
    outline: none;
    color: black;
  }
  input:focus::placeholder {
    opacity: 0;
  }
  button {
    width: 14%;
    border: none;
    background-color: #3e68ff;
    color: white;
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  button:hover {
    cursor: pointer;
    background-color: #7391ff;
  }
`;

const PostWrapper = styled.div`
  width: 100%;
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
    transition: background-color 0.3s;
  }
  .btn:hover {
    cursor: pointer;
    background-color: #7391ff;
  }
`;
