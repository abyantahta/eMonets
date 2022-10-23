import React from 'react'
import {Link} from 'react-router-dom'
import "../styles/style.scss"
import registerHero from '../images/registerHero.png'
import logo from '../images/logo.png'
import backButton from '../images/backButton.png'
import {BsPerson} from 'react-icons/bs'
import {VscMail} from 'react-icons/vsc'
import {BsKey} from 'react-icons/bs'
import {BsEye} from 'react-icons/bs'
import {BsEyeSlash} from 'react-icons/bs'
import {useState} from 'react'

function Register() {
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange =(e)=>{
        setPasswordInput(e.target.value);
        console.log(e.target.value)
    }
    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

      const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const handleConfirmPasswordChange =(e)=>{
        setConfirmPasswordInput(e.target.value);
        console.log(e.target.value)
    }
    const toggleConfirmPassword =()=>{
      if(confirmPasswordType==="password")
      {
       setConfirmPasswordType("text")
       return;
      }
      setConfirmPasswordType("password")
    }

  return (
    <div className="form">
      <div className="left">
        <img src={registerHero} alt="" />
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </div> 
      <div className="right">
        <div className="contentContainer">
          <form action="">
          <h1 className="formTitle">Register</h1>
            <div className="input">
              <i><BsPerson/></i>
              <input type="text" name='username' placeholder='username'/>
            </div>
            <div className="input">
              <i><VscMail/></i>
              <input type="email" name='email' placeholder='email'/>
            </div>
            <div className="input">
              <i><BsKey/></i>
              <input type={passwordType} onChange={handlePasswordChange} name='password' placeholder='password' value={passwordInput}/>
              <div className="showPassword" onClick={togglePassword}>
                {passwordType==="password"? <BsEye/> : <BsEyeSlash/> }
              </div>
            </div>
            <div className="input">
              <i><BsKey/></i>
              <input type={confirmPasswordType} onChange={handleConfirmPasswordChange} name='password' placeholder='confirm password' value={confirmPasswordInput}/>
              <div className="showPassword" onClick={toggleConfirmPassword}>
                {confirmPasswordType==="password"? <BsEye/> : <BsEyeSlash/> }
              </div>
            </div>
            <button type="submit">Register</button>
          </form>
          <h3>Already have an account? <Link to="../login"><span>Login</span></Link></h3>
        </div>
        <Link className="backButton" to="../">
          <img src={backButton} alt="" />
        </Link>
      </div>
    </div>
  )
}

export default Register