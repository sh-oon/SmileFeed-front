import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <>
      <div className={`${styles.loginWrap} ${showAnimation ? 'opacity' : "opacity-0"}`}>
        <div className="flex flex-col items-center gap-4">
          <div>Logo</div>
          <h2 className="font-bold text-xl py-2">LOG IN</h2>
        </div>
        <div className="flex flex-col w-full gap-4">
          <input
            type="text"
            id="ID"
            className={styles.input}
            placeholder="ID"
          />
          <input
            type="text"
            id="PW"
            className={styles.input}
            placeholder="Password"
          />
        </div>
        <button className={styles.button}>Login</button>
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
