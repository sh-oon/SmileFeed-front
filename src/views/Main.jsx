import { useEffect, useState } from "react";
import { apiRequest } from "@/services/common";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/store/user-store.jsx";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiListSettingsLine } from "react-icons/ri";
import { iconSize } from "@/services/utils";

import SettingsModal from "../components/settings/Setting";
import ModalPortal from "@/components/ModalPortal.jsx";
import Calendar from "../components/calender/Calender";

const Main = () => {
  useEffect(() => {
    console.log("Main");
  }, []);

  const [userData, setUserData] = useRecoilState(currentUserState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="flex flex-col gap-4 w-full">
        <Calendar></Calendar>
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
