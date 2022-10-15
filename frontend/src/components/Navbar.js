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
                <li>Home</li>
                <li>Manfaat</li>
                <li>Fitur</li>
                <li>Artikel</li>
                <li>Tentang Kami</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar