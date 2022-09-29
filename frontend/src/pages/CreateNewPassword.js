import React from 'react'
import "../styles/style.scss"
import createPassword from '../images/createpassword.png'
import logo from '../images/logo.png'
import {BsPerson} from 'react-icons/bs'
import {VscMail} from 'react-icons/vsc'
import {BsKey} from 'react-icons/bs'
import {BsEye} from 'react-icons/bs'
import {BsEyeSlash} from 'react-icons/bs'
import {useState} from 'react'

function CreateNewPassword() {
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
        <img src={createPassword} alt="" />
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </div> 
      <div className="right">
        <div className="contentContainer">
          <form action="">
          <h1 className="formTitle">Create New Password</h1>
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
            <button type="submit">Reset</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateNewPassword