import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentPageState } from "@/store/menu-store.jsx";

const menus = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Register",
    path: "/register",
  },
];

const Header = () => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentPage("Home");
    } else {
      setCurrentPage(location.pathname.slice(1, location.pathname.length));
    }
  }, []);

  return (
    <>
      <header className="flex w-full justify-between items-center px-4">
        <div className="p-4">로고</div>
        <nav className="relative">
          <ul className="flex gap-2">
            {menus.map((menu) => (
              <li key={menu.name}>
                <NavLink to={menu.path} activeclassname="active">
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div>
          <span>Current page : {currentPage}</span>
        </div>
    </>
  );
};

export default Header;
