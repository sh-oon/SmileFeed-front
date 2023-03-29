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

import SettingsModal from "@/components/modal/Settings";
import PostDiaryModal from "@/components/modal/PostDiary";
import ModalPortal from "@/components/ModalPortal.jsx";
import Calendar from "@/components/modal/Calender";

const Main = () => {
  const [settings, setSettings] = useRecoilState(currentUserSettingState);

  useEffect(() => {
    function getSetting() {
      apiRequest("get", "v1/api/user/setting").then((res) => {
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
      });
    }

    getSetting();
  }, []);

  const [userData, setUserData] = useRecoilState(currentUserState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="flex flex-col gap-4 w-full h-full">
        <Calendar></Calendar>
      </section>
      <div className="absolute flex justify-center items-center w-full px-4 bottom-12 z-50">
        <button
          className="mr-auto border-2 rounded-2xl p-1"
          onClick={() => {
            setIsModalOpen('setting');
            console.log("설정 페이지 오픈");
          }}
        >
          <RiListSettingsLine size={iconSize}></RiListSettingsLine>
        </button>
        <button
          className="absolute left-1/2 -translate-x-1/2"
          onClick={() => {
            setIsModalOpen('diary');
            console.log("일기 등록 페이지 오픈");
          }}
        >
          <AiFillPlusCircle size={48}></AiFillPlusCircle>
        </button>
      </div>
      {isModalOpen === 'setting' ? (
        <ModalPortal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <SettingsModal settings={settings} />
        </ModalPortal>
      ) : (
        <ModalPortal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <PostDiaryModal settings={settings} />
        </ModalPortal>
      )}
    </>
  );
};

export default Main;
