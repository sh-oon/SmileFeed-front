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
      setCurrentPage(location.pathname.slice(1));
    }
  }, []);

  return (
    <>
      <header className="flex w-full bg-white justify-center items-center px-4 fixed top-0 z-50">
        <nav className="relative">
          <ul className="flex gap-4 py-2">
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
    </>
  );
};

export default Header;
