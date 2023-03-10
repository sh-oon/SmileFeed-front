import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginValid } from "@/services/login.js";
import styles from "./Login.module.css";
import { apiRequest, setCookie } from "../services/common";

const Login = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const loginSubmit = async (arg) => {
    let loginRes = loginValid(arg.email, arg.password);
    if(!loginRes.success) return alert(loginRes.message)

    const res = await apiRequest('post', '/v1/api/auth/login', arg)
    if(res.status === 200) {
      alert('Login Success');
      const data = res.data.data;
      setCookie('accessToken', data.accessToken, 30, 'm');
      setCookie('refreshToken', data.refreshToken, 7, 'd');
    } else {
      alert(res.data.message);
    }
  }

  return (
    <>
      <div className={`${styles.loginWrap} ${showAnimation ? 'opacity' : "opacity-0"}`}>
        <div className="flex flex-col items-center gap-4">
          <div>Logo</div>
          <h2 className="font-bold text-xl py-2">LOG IN</h2>
        </div>
        <div className="flex flex-col w-full gap-4">
          <input
            type="email"
            id="Email"
            className={styles.input}
            placeholder="Email"
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Password"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        <button className={styles.button} onClick={()=>{
          loginSubmit({email, password});
        }}>Login</button>
        <div className="flex gap-2">
          <span className="text-xs">Don't have an account?</span>
          <span className="text-xs font-bold">
            <Link to='/register'>Sign up Here</Link>
          </span>
        </div>
        <div>
          <span className="text-xs font-bold">
            <Link to='/'>Forgot your password?</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
