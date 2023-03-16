import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentPageState } from "@/store/menu-store.jsx";
import { AiOutlineUser } from "react-icons/ai";
import { iconSize } from "@/services/utils";

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
];

const Header = ({ user, isLogin }) => {
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
              <li
                key={menu.name}
                className={`${currentPage === menu.path ? styles.active : ""} ${
                  currentPage === "Home" && menu.path === "/"
                    ? styles.active
                    : ""
                } ${styles.menu}`}
                onClick={() => setCurrentPage(menu.path)}
              >
                <NavLink to={menu.path} activeclassname={styles.active}>
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute md:right-0 left-0 p-2 px-4">
          {!isLogin ? (
            <span className={styles.menu}>
              <NavLink to="/login" activeclassname={styles.active}>
                Login
              </NavLink>
            </span>
          ) : (
            <AiOutlineUser size={iconSize} />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
