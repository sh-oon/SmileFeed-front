import { apiRequest } from "@/services/common";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/store/user-store.jsx";

const Main = () => {
  const [userData, setUserData] = useRecoilState(currentUserState);
  return (
    <>
      <section className="flex flex-col gap-4">
        <button onClick={async (e) => {
          let res = await apiRequest('get', '/v1/api/user/profile')
          console.log(res.data);
          setUserData(res.data.data)
        }}>프로필 조회 버튼</button>

        <button onClick={async (e) => {
          const data = {
            content: 'test',
            image: 'test',
            thumbnail: 'test',
            date: 'test',
            emotion: 'test',
          }
          let res = await apiRequest('post', '/v1/api/feed/diary', data)
          console.log(res);
        }}>
          일기 등록
        </button>

        <button onClick={async () => {
          let res = await apiRequest('get', '/v1/api/feed/diary')
          console.log(res);
        }}>
          피드 조회
        </button>
      </section>
    </>
  );
};

export default Main;
