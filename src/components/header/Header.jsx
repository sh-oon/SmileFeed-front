import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentPageState } from "@/store/menu-store.jsx";
import { AiOutlineUser } from "react-icons/ai";
import { iconSize } from "@/services/utils";

import styles from "./Header.module.css";
import styled from "styled-components";
import { colorPallet } from "@/styled/common";

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
    name: "Setting",
    path: "setting",
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
      <HeaderWrapper>
        <nav className="relative z-50">
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
            <Menu>
              <NavLink to="/login" activeclassname={styles.active}>
                Login
              </NavLink>
            </Menu>
          ) : (
            <>
              <span>
                <AiOutlineUser size={iconSize} />
              </span>
            </>
          )}
        </div>
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colorPallet.bg};
  z-index: 100;
  text-align: center;
  position: fixed;
  padding: 1rem;
`;

const Menu = styled.span`
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #ffeba7;
  }
`;

export default Header;
