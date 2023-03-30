import { useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { iconSize } from "@/services/utils";
import styled from "styled-components";

const selectTodayEmotion = ({ settings, onClose }) => {
  useEffect(() => {
    console.log(settings);
  }, [settings]);
  return (
    <>
      <EmotionWrapper>
        <button
          onClick={() => {
            console.log("오늘의 감정 선택");
            onClose();
          }}
        >
          <AiFillPlusCircle size={iconSize * 2}></AiFillPlusCircle>
        </button>
        <div>
          
        </div>
      </EmotionWrapper>
    </>
  );
};

const EmotionWrapper = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
`;
export default selectTodayEmotion;
