import { useRecoilValue } from "recoil";
import { loadingState } from "@/store/menu-store.jsx";
import styled from "styled-components";

const Loading = () => {
  const isLoading = useRecoilValue(loadingState);

  return (
    <>
      {isLoading && (
        <LoadingWrap>
          <LoadingBar></LoadingBar>
        </LoadingWrap>
      )}
    </>
  );
};

const LoadingWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
`;

const LoadingBar = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #333;
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

export default Loading;
