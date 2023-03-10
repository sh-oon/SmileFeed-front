import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentPageState } from "@/store/menu-store.jsx";

import styles from "./Header.module.css";

const menus = [
  {
    name: "Home",
    path: "/",
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

const Header = () => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const location = useLocation();

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
              >
                <NavLink to={menu.path} activeclassname={styles.active}>
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute left-0 px-4">
          <button>User</button>
          <span>{  }</span>
        </div>
      </header>
    </>
  );
};

export default Header;
