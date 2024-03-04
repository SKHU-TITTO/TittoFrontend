import styled from "styled-components";

const SenderContentMessage = () => {
  return (
    <ContentMessage>
      <div className="item">
        <div className="top">
          <h3>보낸 쪽지</h3>
          <time>시간</time>
        </div>
        <div className="bottom">
          <p>미리보기</p>
        </div>
      </div>
    </ContentMessage>
  );
};

const ContentMessage = styled.div`
  .item {
    padding: 15px;
    border-bottom: 1px solid #ccc;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h3 {
    margin: 0;
    font-weight: bold;
    color: #ffc900;
  }

  .bottom {
    margin-top: 20px;
  }
`;
export default SenderContentMessage;
