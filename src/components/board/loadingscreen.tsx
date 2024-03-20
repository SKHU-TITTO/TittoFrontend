import React from "react";
import styled from "styled-components";

const LoadingScreen = () => {
  return (
    <LoadingWrapper>
      <LoadingSpinner />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  top: 0;
  left: 0;
`;

const LoadingSpinner = styled.div`
  border: 5px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top: 5px solid #3e68ff;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingScreen;
