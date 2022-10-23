import React from 'react'
import logo from '../images/logo.png'

function Navbar() {
  return (
    <div className="navbar">
        <div className="left">
            <img src={logo} alt="" />
        </div>
        <div className="right">
            <ul>
                <li><a href="#LandingPage">Home</a></li>
                <li><a href="#manfaat">Manfaat</a></li>
                <li><a href="#layananKami">Fitur</a></li>
                <li><a href="#tentangKami">Tentang Kami</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar