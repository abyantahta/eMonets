import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/style.scss";
import loginHero from "../images/loginHero.png";
import logo from "../images/logo.png";
import backButton from "../images/backButton.png";
import { BsPerson } from "react-icons/bs";
import { VscMail } from "react-icons/vsc";
import { BsKey } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { RiCloseCircleLine } from "react-icons/ri";
import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { useCookies } from "react-cookie";

const LOGIN_URL = "/api/login";

function Login() {
  //ini
  const [cookies, setCookie] = useCookies(["auth"]);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/catatanku";

  //ref
  const userRef = useRef();
  const errRef = useRef();

  //user state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //succes & error
  const [errMsg, setErrMsg] = useState("");

  //useEffect
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handle = async (e) => {
    e.preventDefault();

    let formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await axios.post(LOGIN_URL, formData.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      console.log(JSON.stringify(response.data));
      const accessToken = response.data.payload.access_token;
      setCookie("auth", { accessToken });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error.response) {
        setErrMsg("Server tidak merespon");
      } else {
        setErrMsg(error.response.data.messages);
      }
      errRef.current.focus();
    }
  };

  const [passwordType, setPasswordType] = useState("password");
  // const [passwordInput, setPasswordInput] = useState("");
  // const handlePasswordChange =(e)=>{
  //     setPasswordInput(e.target.value);
  //     console.log(e.target.value)
  // }
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="form">
      <div className="left">
        <img src={loginHero} alt="" />
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </div>
      <div className="right">
        <div className="contentContainer">
          <form action="">
            <h1 className="formTitle">Login</h1>
          {/* error messages sementara */}
          {errMsg &&  
          <div ref={errRef} aria-live="assertive" className="errorMsg">
            <i><RiCloseCircleLine/></i>
            <p>{errMsg}</p>
          </div>
          }

          {/* error messages sementara */}
            <div className="input">
              <i>
                <VscMail />
              </i>
              <input
                type="email"
                ref={userRef}
                name="email"
                placeholder="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <i>
                <BsKey />
              </i>
              <input
                type={passwordType}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
                minLength='6'
                maxLength='12'
                placeholder="password"
                value={password}
              />
              <div className="showPassword" onClick={togglePassword}>
                {passwordType === "password" ? <BsEye /> : <BsEyeSlash />}
              </div>
            </div>
            <Link to="../forgotpassword">
              <h3 className="forget">Forgot Password?</h3>
            </Link>
            <button type="submit" onClick={handle}>
              Login
            </button>
          </form>
          <h3>
            Don't have an account?{" "}
            <Link to="../register">
              <span>Register</span>
            </Link>
          </h3>
        </div>
        <Link className="backButton" to="../">
          <img src={backButton} alt="" />
        </Link>
      </div>
    </div>
  );
}

export default Login;