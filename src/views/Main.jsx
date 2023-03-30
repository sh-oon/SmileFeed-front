import { useEffect, useState } from "react";
import { apiRequest } from "@/services/common";
import { useRecoilState } from "recoil";
import {
  currentUserState,
  currentUserSettingState,
} from "@/store/user-store.jsx";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiListSettingsLine } from "react-icons/ri";
import { iconSize } from "@/services/utils";

import SettingsModal from "@/components/modal/Setting";
import PostDiaryModal from "@/components/modal/PostDiary";
import SpinEmotionModal from "@/components/modal/SpinEmotion";
import ModalPortal from "@/components/portal/ModalPortal.jsx";
import AlertPortal from "@/components/portal/AlertPortal.jsx";
import Calendar from "@/components/calender/Calender";

const Main = () => {
  const [settings, setSettings] = useRecoilState(currentUserSettingState);
  const [userData, setUserData] = useRecoilState(currentUserState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getSettingOpenModal() {
    const res = await apiRequest("get", "v1/api/user/setting");
    if(res.status !== 200) return alert(res.data.message);
    setSettings({
      ...settings,
      alert: res.data.data.alert,
      backgroundColor: res.data.data.backgroundColor,
      font: res.data.data.font,
      fontSize: res.data.data.fontSize,
      passwordLock: res.data.data.passwordLock,
      syncronize: res.data.data.syncronize,
      theme: res.data.data.theme,
    });
    setIsModalOpen("setting");
  }

  function selectTodayEmotion() {
    console.log("오늘의 감정 선택");
  }

  return (
    <>
      <section className="flex flex-col gap-4 w-full h-full">
        <Calendar></Calendar>
      </section>
      <div className="absolute flex justify-center items-center w-full px-4 bottom-12 z-50">
        <button
          className="mr-auto border-2 rounded-2xl p-1"
          onClick={() => {
            getSettingOpenModal();
          }}
        >
          <RiListSettingsLine size={iconSize}></RiListSettingsLine>
        </button>
        <button
          className="absolute left-1/2 -translate-x-1/2"
          onClick={() => {
            setIsModalOpen("diary");
            console.log("일기 등록 페이지 오픈");
          }}
        >
          <AiFillPlusCircle size={48}></AiFillPlusCircle>
        </button>
      </div>
      {isModalOpen === "setting" ? (
        <ModalPortal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <SettingsModal settings={settings} />
        </ModalPortal>
      ) : (
        <ModalPortal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <SpinEmotionModal settings={settings} onClose={() => setIsModalOpen(false)} />
        </ModalPortal>
      )}
    </>
  );
};

export default Main;
