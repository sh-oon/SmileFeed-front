import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginValid } from "@/services/login.js";
import styles from "./Login.module.css";

const Login = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const loginSubmit = (arg) => {
    console.log(arg);
    loginValid();
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
            onChange={(e)=>{setID(e.target.value)}}
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
          loginSubmit({ID, password});
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
