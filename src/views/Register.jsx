import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Register = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <>
      <div
        className={`${styles.loginWrap} ${
          showAnimation ? "opacity" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div>Logo</div>
          <h2 className="font-bold text-xl py-2">REGISTER</h2>
        </div>
        <div className="flex flex-col w-full gap-4">
          <input
            type="text"
            id="id"
            className={styles.input}
            placeholder="Email"
          />
          <input
            type="text"
            id="password"
            className={styles.input}
            placeholder="Password"
          />
          <input
            type="text"
            id="password-valid"
            className={styles.input}
            placeholder="Verify password"
          />
          <input
            type="text"
            id="name"
            className={styles.input}
            placeholder="Name"
          />
          <div className="flex">
            <input
              type="number"
              id="phone"
              className={styles.input}
              placeholder="Phone Number"
            />
          </div>
        </div>
        <button className={styles.button}>Submit</button>
      </div>
    </>
  );
};

export default Register;
