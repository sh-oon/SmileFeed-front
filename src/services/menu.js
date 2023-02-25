import { useEffect } from "react"

export const setCurrentMenu = (location) => {
  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentPage("Home");
    } else {
      setCurrentPage(location.pathname.slice(1));
    }

    console.log("currentPage: ", currentPage);
  }, []);
}