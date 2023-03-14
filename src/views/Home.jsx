import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/store/user-store.jsx";
import { apiRequest } from "@/services/common";

import styles from "./Home.module.css";
import Header from "@/components/header/Header.jsx";

const Home = () => {
  const [userData, setUserData] = useRecoilState(currentUserState);
  let tried = false
  useEffect(() => {
    async function getUser() {
      const res = await apiRequest("post", "/v1/api/user/profile");
      if(res.status === 200) {
        const user = res.data.data
        setUserData(user);
      }
    }
    if(!tried) {
      getUser();
      tried = true
    }
  }, []);

  return (
    <>
      <div className={styles.wrap}>
        <Header user={userData.name}></Header>
        <section className={styles.contentsWrap}>
          <img
            src="/src/assets/image/bg-earth.jpg"
            alt="backgroundImage"
            className="bg"
          />
          <div className={styles.contents}>
            <Outlet></Outlet>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
