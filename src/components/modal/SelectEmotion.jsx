import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { iconSize } from "@/services/utils";
import styled from "styled-components";
import { colorPallet } from "../../styled/common";
import { apiRequest } from "@/services/common";
import { useRecoilState } from "recoil";
import { loadingState } from "../../store/menu-store";

import Loading from "../portal/Loading";

const emotions = [
  {
    id: 1,
    name: "행복",
    color: "#F9D71C",
  },
  {
    id: 2,
    name: "슬픔",
    color: "#F9D71C",
  },
  {
    id: 3,
    name: "화남",
    color: "#F9D71C",
  },
  {
    id: 4,
    name: "놀람",
    color: "#F9D71C",
  },
  {
    id: 5,
    name: "피곤",
    color: "#F9D71C",
  },
  {
    id: 6,
    name: "불안",
    color: "#F9D71C",
  },
  {
    id: 7,
    name: "기쁨",
    color: "#F9D71C",
  },
  {
    id: 8,
    name: "평온",
    color: "#F9D71C",
  },
  {
    id: 9,
    name: "무기력",
    color: "#F9D71C",
  },
  {
    id: 10,
    name: "평범",
    color: "#F9D71C",
  },
  {
    id: 11,
    name: "기대",
    color: "#F9D71C",
  },
  {
    id: 12,
    name: "흥미",
    color: "#F9D71C",
  },
  {
    id: 13,
    name: "불안",
    color: "#F9D71C",
  },
];

const selectTodayEmotion = ({ settings, onClose }) => {
  const [loading, setLoading] = useRecoilState(loadingState);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const [checked, setChecked] = useState(1);
  const [targetDate, setTargetDate] = useState(
    `${year}-${month.toString().length === 1 ? "0" + month : month}-${day.toString().length === 1 ? "0" + day : day}`
  );
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  async function postFeed() {
    setLoading(true);
    let param = {
      emotion: checked,
      targetDate: targetDate,
      content: content,
      thumbnail: null,
      image: null,
    }

    const res = await apiRequest('post', 'v1/api/feed/diary', param);

    setLoading(false);
    if(res.status === 200) {
      onClose();
    } else {
      alert('오류가 발생했습니다.');
    }
  }

  return (
    <>
      <Wrapper>
        <SubmitButton
          onClick={() => {
            console.log("오늘의 감정 선택");
            onClose();
          }}
        >
          <AiFillPlusCircle size={iconSize * 2}></AiFillPlusCircle>
        </SubmitButton>
        <div className="flex flex-col gap-4">
          <legend>
            <h2>오늘의 감정</h2>
          </legend>
          <div className="flex flex-col gap-2 py-2">
            {emotions.map((emotion) => {
              return (
                <div key={emotion.id} className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id={emotion.name}
                    name="emotion"
                    value={emotion.id}
                    checked={checked === emotion.id}
                    onChange={() => setChecked(emotion.id)}
                  />
                  <label htmlFor={emotion.name}>{emotion.name}</label>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 flex-col">
            <label htmlFor="content">오늘의 일기</label>
            <textarea
              name="content text-black"
              id="content"
              cols="30"
              rows="10"
              className="resize-none p-4 w-full"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              value={content}
              placeholder="오늘의 일기를 작성해주세요."
            ></textarea>
          </div>
          <div>
            <input
              type="date"
              name="targetDate"
              id="targetDate"
              onChange={(e) => {
                setTargetDate(e.target.value);
              }}
              value={targetDate}
            />
          </div>
          <button onClick={()=> {
            postFeed();
          }}>일기 제출</button>
        </div>
      </Wrapper>

      <Loading/>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${colorPallet.bg};
  border-radius: 1rem;
  padding: 1rem;
  box-sizing: border-box;
`;
const SubmitButton = styled.button`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
`;
export default selectTodayEmotion;
