import { Link } from 'react-router-dom'
import Header from '@/components/header/Header.jsx'

const Home = () => {
  return (
    <>
    <Header></Header>
    <div>
      <h1>Home</h1>
      <Link to='/login'>
        헬로
      </Link>
    </div>
    </>
  );
}

export default Home;