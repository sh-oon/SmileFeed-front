import { Outlet } from "react-router-dom";

import styles from "./Home.module.css";
import Header from "@/components/header/Header.jsx";

const Home = () => {
  return (
    <>
      <div className={styles.wrap}>
        <Header></Header>
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
