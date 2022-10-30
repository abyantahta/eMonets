import React from 'react'
import {Link} from 'react-router-dom'
import {useInView} from 'react-intersection-observer'
import "../styles/style.scss"
import landingHero from '../images/landingHero.png'
import manfaat1 from '../images/manfaat1.png'
import manfaat2 from '../images/manfaat2.png'
import manfaat3 from '../images/manfaat3.png'
import layanan1 from '../images/layanan1.png'
import layanan2 from '../images/layanan2.png'
import layanan3 from '../images/layanan3.png'
import layanan4 from '../images/layanan4.png'
import layanan5 from '../images/layanan5.png'
import facebook from '../images/facebook.png'
import instagram from '../images/instagram.png'
import tentangKamiLogo from '../images/tentangKamiLogo.png'
import Navbar from '../components/Navbar'
import logo from '../images/logo.png'
function Landing() {
  
  const {ref : myRef, inView : isVisible} = useInView()
  const {ref : cardRef1, inView : cardIsVisible1} = useInView({
    threshold : 0.2,
  })
  const {ref : cardRef2, inView : cardIsVisible2} = useInView({
    threshold : 0.2,
  })
  const {ref : cardRef3, inView : cardIsVisible3} = useInView({
    threshold : 0.2,
  })
  const {ref : layananKami, inView : layananIsVisible} = useInView({
    threshold : 0.2,
  })
  const {ref : refLayanan1, inView : layanan1IsVisible} = useInView({
    threshold : 0.4,
  })
  const {ref : refLayanan2, inView : layanan2IsVisible} = useInView({
    threshold : 0.4,
  })
  const {ref : refLayanan3, inView : layanan3IsVisible} = useInView({
    threshold : 0.4,
  })
  const {ref : refLayanan4, inView : layanan4IsVisible} = useInView({
    threshold : 0.4,
  })
  const {ref : refLayanan5, inView : layanan5IsVisible} = useInView({
    threshold : 0.4,
  })
  const {ref : aboutUs, inView : aboutUsIsVisible} = useInView({
    threshold : 0.2,
  })
  
  return ( 
    <div className="Landing">
    <Navbar />
    <section id="landingPage">
      <div className="leftSide">
          <div className="container">
            <h2 className="heroText">Ayo Catat <br />Keuanganmu Sekarang</h2>
            <h4 className="heroDescription">Nikmati mudahnya kelola finansial hanya dengan e-monets</h4>
            <div className="button">
              <Link to="/login"><button className="btn">Login</button></Link>
              <Link to="/register"><button className="btn">Register</button></Link>
            </div>
          </div>
      </div>
      <div className="landingHero">
        <img src={landingHero} alt="" />
      </div>
    </section>

    <section id="manfaat" >
      <h1 className={`${isVisible? `pop-slide-up` : ``} heroText `} ref={myRef}>Mengapa Pencatatan Keuangan itu Penting ?</h1>
      <div className='cardContainer' >
        <div className={`${cardIsVisible1? `cardAnimation-1` : ``} card `} ref={cardRef1}>
          <div className="img">
            <img src={manfaat1} alt="" />
          </div>
          <h2>Mempersiapkan masa depan</h2>
        </div>
        <div className={`${cardIsVisible2? `cardAnimation-2` : ``} card `} ref={cardRef2}>
          <div className="img">
            <img src={manfaat2} alt="" />
          </div>
          <h2>Keuangan terkelola dengan baik</h2>
        </div>
        <div className={`${cardIsVisible3? `cardAnimation-3` : ``} card `} ref={cardRef3}>
          <div className="img">
            <img src={manfaat3} alt="" />
          </div>
          <h2>Menyeimbangkan pemasukan dan pengeluaran</h2>
        </div>
      </div>
    </section>

    <section id="layananKami">
      <h1 className={`${layananIsVisible? `pop-slide-up` : ``} heroText `} ref={layananKami}>Layanan Kami</h1>
      <div className="container">
        <div className={`${layanan1IsVisible? `slideLeft` : ``} card `} ref={refLayanan1}>
          <div className="img">
            <img src={layanan1} alt="" />
          </div>
          <div className="content">
            <h2 className="title">Catatanku</h2>
            <h4 className="text">Catat pemasukan dan pengeluaranmu selama sebulan agar keuangan lebih teratur</h4>
          </div>
        </div>
        <div className={`${layanan2IsVisible? `slideRight` : ``} card cardRight`} ref={refLayanan2}>
          <div className="img">
            <img src={layanan2} alt="" />
          </div>
          <div className="content">
            <h2 className="title">Laporanku</h2>
            <h4 className="text">Unduh laporan mingguan, bulanan, dan tahunan dengan sekali klikteratur</h4>
          </div>
        </div>
        <div className={`${layanan3IsVisible? `slideLeft` : ``} card `} ref={refLayanan3}>
          <div className="img">
            <img src={layanan3} alt="" />
          </div>
          <div className="content">
            <h2 className="title">RencanaKu</h2>
            <h4 className="text">Rencanakan pengeluaran yang akan datang dan tabung anggaran agar rencanamu menjadi nyata</h4>
          </div>
        </div>
        <div className={`${layanan4IsVisible? `slideRight` : ``} card cardRight`} ref={refLayanan4}>
          <div className="img">
            <img src={layanan4} alt="" />
          </div>
          <div className="content">
            <h2 className="title">LiterasiKu</h2>
            <h4 className="text">Baca tips-tips pengelolaan keuangan dari berbagai artikel menarik</h4>
          </div>
        </div>
        <div className={`${layanan5IsVisible? `slideLeft` : ``} card `} ref={refLayanan5}>
          <div className="img">
            <img src={layanan5} alt="" />
          </div>
          <div className="content">
            <h2 className="title">AnggaranKu</h2>
            <h4 className="text">Input nominal sebagai batas pengeluaran agar keuangan tetap seimbang</h4>
          </div>
        </div>
      </div>
    </section>

    <section id="tentangKami" className={`${aboutUsIsVisible? `pop-slide-up` : ``}`} ref={aboutUs}>
      <h2>Tentang Kami</h2>
      <div className="container">
        <div className="img">
          <img src={tentangKamiLogo} alt="" />
        </div>
        <div className="content">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <h4>e-monets merupakan website pencatatan keuangan yang menyediakan berbagai fitur yang memudahkan dalam pengelolaan finansial</h4>
          <div className="sosmed">
            <div className="icon">
              <img src={instagram} alt="" />
            </div>
            <div className="icon">
              <img src={facebook} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer className="footer">
      copyright @2022
    </footer>
    </div>
  )
}

export default Landing