import React from 'react'
import {Link} from 'react-router-dom'
import "../styles/style.scss"
import forgotPassword from '../images/forgotpassword.png'
import backButton from '../images/backButton.png'
import logo from '../images/logo.png'
import {BsPerson} from 'react-icons/bs'
import {VscMail} from 'react-icons/vsc'
import {BsKey} from 'react-icons/bs'
import {BsEye} from 'react-icons/bs'
import {BsEyeSlash} from 'react-icons/bs'
import {useState} from 'react'

function ForgotPassword() {
  return (
    <div className="form">
      <div className="left">
        <img src={forgotPassword} alt="" />
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </div> 
      <div className="right">
        <div className="contentContainer">
          <form action="">
          <h1 className="formTitle">Forgot Password?</h1>
            <div className="input">
              <i><VscMail/></i>
              <input type="email" name='email' placeholder='email'/>
            </div>
            <button type="submit">Send Instruction</button>
          </form>
        </div>
        <Link className="backButton" to="../login">
          <img src={backButton} alt="" />
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword