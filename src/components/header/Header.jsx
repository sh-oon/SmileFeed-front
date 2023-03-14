import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentPageState } from "@/store/menu-store.jsx";
import { currentUserState } from "@/store/user-store.jsx";

import styles from "./Header.module.css";

const menus = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Main",
    path: "main",
  },
  {
    name: "Login",
    path: "login",
  },
  {
    name: "Register",
    path: "register",
  },
];

const Header = ({user}) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentPage("Home");
    } else {
      setCurrentPage(location.pathname.slice(1));
    }

  }, [location.pathname, setCurrentPage]);

  return (
    <>
      <header className={styles.header}>
        <nav className="relative">
          <ul className="flex gap-8 py-2">
            {menus.map((menu) => (
              <li key={menu.name} 
              className={`${
                currentPage === menu.path ? styles.active : ""
              } ${currentPage === 'Home' && menu.path === '/' ? styles.active : ""} ${styles.menu}`}
              onClick={() => setCurrentPage(menu.path)}
              >
                <NavLink to={menu.path} activeclassname={styles.active}>
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute left-0 px-4">
          <button>{ user }</button>
          <span>님 환영합니다.</span>
        </div>
      </header>
    </>
  );
};

export default Header;
