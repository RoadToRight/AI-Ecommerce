import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  width: 25px;
  height: 25px;
  border: 6px solid #e0e0e0;
  border-top: 6px solid #7F25FB;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => {
    return (
        <LoaderWrapper>
            <Spinner />
        </LoaderWrapper>
    );
};

export default Loader;
