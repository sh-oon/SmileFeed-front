import { apiRequest } from "@/services/common";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/store/user-store.jsx";

const Main = () => {
  const [userData, setUserData] = useRecoilState(currentUserState);
  return (
    <>
      <section>
        <button onClick={async (e) => {
          await apiRequest('post', '/v1/api/user/profile')
          console.log(userData);
        }}>프로필 조회 버튼</button>
      </section>
    </>
  );
};

export default Main;
