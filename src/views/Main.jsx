import { useState } from "react";
import { apiRequest } from "@/services/common";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/store/user-store.jsx";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiListSettingsLine } from "react-icons/ri";
import { iconSize } from "@/services/utils";

import SettingsModal from "../components/settings/Setting";
import ModalPortal from "@/components/ModalPortal.jsx";

const Main = () => {
  const [userData, setUserData] = useRecoilState(currentUserState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="flex flex-col gap-4">
        <button
          onClick={async (e) => {
            let res = await apiRequest("get", "/v1/api/user/profile");
            console.log(res.data);
            setUserData(res.data.data);
          }}
        >
          프로필 조회 버튼
        </button>
        <button
          onClick={async (e) => {
            const data = {
              content: "test",
              image: "test",
              thumbnail: "test",
              date: "test",
              emotion: "test",
            };
            let res = await apiRequest("post", "/v1/api/feed/diary", data);
            console.log(res);
          }}
        >
          일기 등록
        </button>
        <button
          onClick={async () => {
            let res = await apiRequest("get", "/v1/api/feed/diary");
            console.log(res);
          }}
        >
          피드 조회
        </button>
      </section>
      <div className="absolute flex justify-center items-center w-full px-4 bottom-12">
        <button
          className="mr-auto border-2 rounded-2xl p-1"
          onClick={() => {
            setIsModalOpen(true);
            console.log("설정 페이지 오픈");
          }}
        >
          <RiListSettingsLine size={iconSize}></RiListSettingsLine>
        </button>
        <button
          className="absolute left-1/2 -translate-x-1/2"
          onClick={() => {
            console.log("일기 등록 페이지 오픈");
          }}
        >
          <AiFillPlusCircle size={48}></AiFillPlusCircle>
        </button>
      </div>
      {isModalOpen && (
        <ModalPortal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <SettingsModal />
        </ModalPortal>
      )}
    </>
  );
};

export default Main;
