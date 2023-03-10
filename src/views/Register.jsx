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
  {
    type: "date",
    id: "birth",
    label: "Birth",
    placeholder: "Birth",
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
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add code to handle form submission
    if (password !== passwordValid) {
      alert("Password is not valid");
      return;
    }
    const param = {
      email,
      password,
      name,
      phone,
      birth,
      gender,
    };
    const res = await apiRequest("post", "v1/api/auth/register", param);
    if (res.status === 200) {
      alert("Register Success");
      window.location.href = "/login";
    } else if (res.status === 400) {
      alert("Register Fail");
    }
  };

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

  const handleBirthChange = (value) => {
    setBirth(value);
  };

  const handleGenderChange = (value) => {
    console.log(value);
    setGender(value);
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
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
          {registerForm.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <label htmlFor={item.id}>{item.label}</label>
                <Debouncer
                  placeholder={item.placeholder}
                  onChange={async (value) => {
                    switch (item.id) {
                      case "email":
                        handleEmailChange(value);
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
                      case "birth":
                        handleBirthChange(value);
                        break;
                      default:
                        break;
                    }
                    // 중복성 검사 또는 밸리데이션 검사
                  }}
                  delay={500}
                  type={item.type}
                />
              </div>
            );
          })}
          <div className="flex flex-col gap-2">
            <span>Gender</span>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={1}
                  id="radio-man"
                  onChange={(e) => {
                    handleGenderChange(e.target.value);
                  }}
                />
                <label htmlFor="radio-man">Man</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={2}
                  id="radio-woman"
                  onChange={(e) => {
                    handleGenderChange(e.target.value);
                  }}
                />
                <label htmlFor="radio-woman">Woman</label>
              </div>
            </div>
          </div>
          <button
            className={styles.button}
            onClick={async (e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
