import React from 'react'
import {Link} from 'react-router-dom'
import "../styles/style.scss"
import loginHero from '../images/loginHero.png'
import logo from '../images/logo.png'
import backButton from '../images/backButton.png'
import {BsPerson} from 'react-icons/bs'
import {VscMail} from 'react-icons/vsc'
import {BsKey} from 'react-icons/bs'
import {BsEye} from 'react-icons/bs'
import {BsEyeSlash} from 'react-icons/bs'
import {useState} from 'react'

function Login() {
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
          <Link to='../forgotpassword'><h3 className='forget'>Forgot Password?</h3></Link>
            <button type="submit">Login</button>
          </form>
          <h3>Don't have an account? <Link to='../register'><span>Register</span></Link></h3>
        </div>
        <Link className="backButton" to="../">
          <img src={backButton} alt="" />
        </Link>
      </div>
    </div>
  )
}

export default Login