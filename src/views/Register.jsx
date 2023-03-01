import Debouncer from "../components/Debouncer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { apiRequest } from "../services/common";

const registerForm = [
  {
    type: "email",
    id: "email",
    label: "Email",
    placeholder: "Email",
  },
  {
    type: "password",
    id: "password",
    label: "Password",
    placeholder: "Password",
  },
  {
    type: "password",
    id: "password-valid",
    label: "Verify password",
    placeholder: "Verify password",
  },
  {
    type: "text",
    id: "name",
    label: "Name",
    placeholder: "Name",
  },
  {
    type: "number",
    id: "phone",
    label: "Phone Number",
    placeholder: "Phone Number",
  },
];

const Register = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [timer, setTimer] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to handle form submission
    console.log(email, password, passwordValid, name, phone);
    if(password !== passwordValid) {
      alert('Password is not valid');
      return;
    }
    const param = {
      email,
      password,
      name,
      phone,
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "password-valid":
        setPasswordValid(value);
        break;
      case "name":
        setName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }
  }

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handlePasswordValidChange = (value) => {
    setPasswordValid(value);
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

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
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          {registerForm.map((item, index) => {
            return (
              <div key={index}>
                <label htmlFor={item.id}>{item.label}</label>
                <Debouncer placeholder={item.placeholder} onChange={async (value)=> {
                  switch (item.id) {
                    case "email":
                      handleEmailChange(value);
                      console.log('이것도 디바운서에 들어감?')
                      break;
                    case "password":
                      handlePasswordChange(value);
                      break;
                    case "password-valid":
                      handlePasswordValidChange(value);
                      break;
                    case "name":
                      handleNameChange(value);
                      break;
                    case "phone":
                      handlePhoneChange(value);
                      break;
                    default:
                      break;
                  }
                  // 중복성 검사 또는 밸리데이션 검사
                }} delay={500}></Debouncer>
              </div>
            );
          })}
          <button className={styles.button}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
