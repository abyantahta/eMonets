import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.scss";
import registerHero from "../images/registerHero.png";
import logo from "../images/logo.png";
import backButton from "../images/backButton.png";
import { BsPerson } from "react-icons/bs";
import { VscMail } from "react-icons/vsc";
import { BsKey } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import axios from "../api/axios";
import Loading from "./Loading";

const REGISTER_URL = "/api/register";

function Register() {
  //ref state
  const userRef = useRef();
  const errRef = useRef();

  //user state
  const [username, setUsername] = useState("");

  //email state
  const [email, setEmail] = useState("");

  //password state
  const [passwordInput, setPasswordInput] = useState("");

  //confirm password state
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  //error success state
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //set focus use effect
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //password confirm password match useEffect
  useEffect(() => {
    const match = passwordInput === confirmPasswordInput;
    setValidMatch(match);
  }, [passwordInput, confirmPasswordInput]);

  //clear error massage useEffect
  useEffect(() => {
    setErrMsg("");
  }, [username, email, passwordInput, confirmPasswordInput]);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validMatch) {
      setErrMsg("password dan confirm password tidak sesuai");
      return;
    }

    try {
      setIsLoading(true);
      const payload = JSON.stringify({
        username: username,
        email: email,
        password: passwordInput,
      });
      const response = await axios.post(REGISTER_URL, payload, {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
      });
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("server tidak merespon");
      } else {
        setErrMsg(error.response.data.messages);
      }
      errRef.current.focus();
    }
  };

  const [passwordType, setPasswordType] = useState("password");
  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
    console.log(e.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordInput(e.target.value);
    console.log(e.target.value);
  };
  const toggleConfirmPassword = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
      return;
    }
    setConfirmPasswordType("password");
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>silahkan cek email anda</p>
        </section>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="form">
          <div className="left">
            <img src={registerHero} alt="" />
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="right">
            <div className="contentContainer">
              {/* pesan error sementara */}
              <p
                ref={errRef}
                aria-live="assertive"
                style={{ marginLeft: 2, color: "red" }}
              >
                {" "}
                {errMsg}{" "}
              </p>
              {/* pesan error sementara */}
              <form onSubmit={handleSubmit}>
                <h1 className="formTitle">Register</h1>
                <div className="input">
                  <i>
                    <BsPerson />
                  </i>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    required=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    // tambahan irvan
                    ref={userRef}
                    // tambahan irvan
                  />
                </div>
                <div className="input">
                  <i>
                    <VscMail />
                  </i>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    required=""
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
                    onChange={handlePasswordChange}
                    name="password"
                    placeholder="password"
                    value={passwordInput}
                  />
                  <div className="showPassword" onClick={togglePassword}>
                    {passwordType === "password" ? <BsEye /> : <BsEyeSlash />}
                  </div>
                </div>
                <div className="input">
                  <i>
                    <BsKey />
                  </i>
                  <input
                    type={confirmPasswordType}
                    onChange={handleConfirmPasswordChange}
                    name="password"
                    placeholder="confirm password"
                    value={confirmPasswordInput}
                  />
                  <div className="showPassword" onClick={toggleConfirmPassword}>
                    {confirmPasswordType === "password" ? (
                      <BsEye />
                    ) : (
                      <BsEyeSlash />
                    )}
                  </div>
                </div>
                <button type="submit">Register</button>
              </form>
              <h3>
                Already have an account?{" "}
                <Link to="../login">
                  <span>Login</span>
                </Link>
              </h3>
            </div>
            <Link className="backButton" to="../">
              <img src={backButton} alt="" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
