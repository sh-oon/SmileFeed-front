import { useEffect, useState } from "react";
import { apiRequest } from "@/services/common";
import { useRecoilState } from "recoil";
import {
  currentUserState,
  currentUserSettingState,
} from "@/store/user-store.jsx";
import { loadingState } from "@/store/menu-store";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiListSettingsLine } from "react-icons/ri";
import { iconSize } from "@/services/utils";

import SettingsModal from "@/components/modal/Setting";
import PostDiaryModal from "@/components/modal/PostDiary";
import SelecttEmotionModal from "@/components/modal/SelectEmotion";
import ModalPortal from "@/components/portal/ModalPortal.jsx";
import AlertPortal from "@/components/portal/AlertPortal.jsx";
import Calendar from "@/components/calender/Calender";
import Loading from "../components/portal/Loading";

const Main = () => {
  const [settings, setSettings] = useRecoilState(currentUserSettingState);
  const [userData, setUserData] = useRecoilState(currentUserState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadState, setLoadingState] = useRecoilState(loadingState);

  async function getSettingOpenModal() {
    setLoadingState(true);
    let applicationSetting = {};
    if (!localStorage.applicationSetting) {
      const res = await apiRequest("get", "v1/api/user/setting");
      if (res.status !== 200) return alert(res.data.message);
      applicationSetting = res.data.data;
      localStorage.applicationSetting = JSON.stringify(applicationSetting);
    } else applicationSetting = JSON.parse(localStorage.applicationSetting);

    setSettings({
      ...settings,
      alert: applicationSetting.alert,
      backgroundColor: applicationSetting.backgroundColor,
      font: applicationSetting.font,
      fontSize: applicationSetting.fontSize,
      passwordLock: applicationSetting.passwordLock,
      syncronize: applicationSetting.syncronize,
      theme: applicationSetting.theme,
    });
    setLoadingState(false);
    setIsModalOpen("setting");
  }

  function selectTodayEmotion() {
    console.log("오늘의 감정 선택");
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <SelecttEmotionModal settings={settings} onClose={closeModal} />
        </ModalPortal>
      )}
      <Loading></Loading>
    </>
  );
};

export default Main;
