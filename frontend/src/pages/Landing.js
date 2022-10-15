import React from 'react'
import "../styles/style.scss"
import landingHero from '../images/landingHero.png'
import manfaat1 from '../images/manfaat1.png'
import manfaat2 from '../images/manfaat2.png'
import manfaat3 from '../images/manfaat3.png'
function Landing() {
  return ( 
    <div className="Landing">

    <section className="landingPage">
      <div className="leftSide">
          <div className="container">
            <h2 className="heroText">Ayo Catat <br />Keuanganmu Sekarang</h2>
            <h4 className="heroDescription">Nikmati mudahnya kelola finansial hanya dengan e-monets</h4>
            <div className="button">
              <button className="btn">Login</button>
              <button className="btn">Register</button>
            </div>
          </div>
      </div>
      <div className="landingHero">
        <img src={landingHero} alt="" />
      </div>
    </section>

    <section className="manfaat">
      <h1 className="heroText">Mengapa Pencatatan Keuangan itu Penting ?</h1>
      <div className="cardContainer">
        <div className="card">
          <div className="img">
            <img src={manfaat1} alt="" />
          </div>
          <h2>Mempersiapkan masa depan</h2>
        </div>
        <div className="card">
          <div className="img">
            <img src={manfaat2} alt="" />
          </div>
          <h2>Keuangan terkelola dengan baik</h2>
        </div>
        <div className="card">
          <div className="img">
            <img src={manfaat3} alt="" />
          </div>
          <h2>Menyeimbangkan pemasukan dan pengeluaran</h2>
        </div>
      </div>
    </section>

    </div>
  )
}

export default Landing