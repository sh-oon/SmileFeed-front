import { apiRequest } from "@/services/common";

const Main = () => {
  return (
    <>
      <section>
        <button onClick={async (e) => {
          await apiRequest('post', '/v1/api/test')
        }}>gkdl</button>
      </section>
    </>
  );
};

export default Main;
