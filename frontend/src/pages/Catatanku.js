import React from 'react'
import logo from '../images/logo.png'
import leftArrow from '../images/leftArrow.png'
import rightArrow from '../images/rightArrow.png'

function Catatanku() {
  return (
    <div className="catatanku">
      <div className="left">
        <div className="img">
          <img src="" alt="" />
        </div>

        <h1>Syarif Izza</h1>
        <h2>Lorem ipsum dolor Lorem</h2>
        <div className="nav">
          <div className="list">Catatanku</div>
          <div className="list">Laporanku</div>
          <div className="list">Rencanaku</div>
          <div className="list">Literasiku</div>
          <div className="list">Anggaranku</div>
        </div>
      </div>
      <div className="right">
        <div className="header">
          <div className="headerLeft">
            <h2 className="catatanku">CatatanKu</h2>
            <div className="month">
              <img src={leftArrow} alt="" />
              <h2>Januari</h2>
              <img src={rightArrow} alt="" />
            </div>
          </div>
          <div className="headerRight">
            <div className="pemasukan">
              <h2>Input Pemasukan</h2>
            </div>
            <div className="pengeluaran">
              <h2>Input Pengeluaran</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
    </div>
  )
}

export default Catatanku