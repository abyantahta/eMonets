import React from 'react'
import logo from '../images/logo.png'
import leftArrow from '../images/leftArrow.png'
import editIcon from '../images/editIcon.png'
import silang from '../images/silang.png'
import addCategory from '../images/addCategory.png'
import deleteIcon from '../images/deleteIcon.png'
import rightArrow from '../images/rightArrow.png'
import {useState} from 'react'

function Catatanku() {
  const [pengeluaranPopUp, setPengeluaranPopUp] = useState(false);
  const [pemasukanPopUp, setPemasukanPopUp] = useState(false);

  const handlePemasukanPopUp = (e)=>{
    e.preventDefault()
    setPemasukanPopUp(true)
  }
  const handlePengeluaranPopUp = (e)=>{
    e.preventDefault()
    setPengeluaranPopUp(true)
  }
  const handleExit = (e)=>{
    e.preventDefault()
    setPengeluaranPopUp(false)
    setPemasukanPopUp(false)
  }
  return (
    <div className="catatanku">
      <div className="left">
        <div className="img">
          <img src="" alt="" />
        </div>

        <h1>Syarif Izza</h1>
        <h2>Lorem ipsum dolor Lorem</h2>
        <div className="logout">
          <h3>Logout</h3>
        </div>
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
            <h2 className="h2catatanku">CatatanKu</h2>
            <div className="month">
              <img src={leftArrow} a  lt="" />
              <h2>Januari</h2>
              <img src={rightArrow} alt="" />
            </div>
          </div>
          <div className="headerRight">
            <div className="item" onClick={handlePemasukanPopUp}>
              <h2>Input Pemasukan</h2>
            </div>
            <div className="item" onClick={handlePengeluaranPopUp}>
              <h2>Input Pengeluaran</h2>
            </div>
          </div>
        </div>
        <div className="tableFixHead content">
          <table className="">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Deskripsi</th>
                <th>Jumlah</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>09/10/2022</td>
                <td>Makanan</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing</td>
                <td>20.000</td>
                <td class="aksi">
                  <div className="imgContainer">
                    <div className="item">
                      <img src={editIcon} alt="" />
                    </div>
                    <div className="item">
                      <img src={deleteIcon} alt="" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>09/10/2022</td>
                <td>Makanan</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing</td>
                <td>20.000</td>
                <td class="aksi">
                  <div className="imgContainer">
                    <div className="item">
                      <img src={editIcon} alt="" />
                    </div>
                    <div className="item">
                      <img src={deleteIcon} alt="" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>09/10/2022</td>
                <td>Makanan</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing</td>
                <td>20.000</td>
                <td class="aksi">
                  <div className="imgContainer">
                    <div className="item">
                      <img src={editIcon} alt="" />
                    </div>
                    <div className="item">
                      <img src={deleteIcon} alt="" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>09/10/2022</td>
                <td>Makanan</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing</td>
                <td>20.000</td>
                <td class="aksi">
                  <div className="imgContainer">
                    <div className="item">
                      <img src={editIcon} alt="" />
                    </div>
                    <div className="item">
                      <img src={deleteIcon} alt="" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>09/10/2022</td>
                <td>Makanan</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing</td>
                <td>20.000</td>
                <td class="aksi">
                  <div className="imgContainer">
                    <div className="item">
                      <img src={editIcon} alt="" />
                    </div>
                    <div className="item">
                      <img src={deleteIcon} alt="" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>09/10/2022</td>
                <td>Makanan</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing</td>
                <td>20.000</td>
                <td class="aksi">
                  <div className="imgContainer">
                    <div className="item">
                      <img src={editIcon} alt="" />
                    </div>
                    <div className="item">
                      <img src={deleteIcon} alt="" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>09/10/2022</td>
                <td>Makanan</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing</td>
                <td>20.000</td>
                <td class="aksi">
                  <div className="imgContainer">
                    <div className="item">
                      <img src={editIcon} alt="" />
                    </div>
                    <div className="item">
                      <img src={deleteIcon} alt="" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>09/10/2022</td>
                <td>Makanan</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing</td>
                <td>20.000</td>
                <td class="aksi">
                  <div className="imgContainer">
                    <div className="item">
                      <img src={editIcon} alt="" />
                    </div>
                    <div className="item">
                      <img src={deleteIcon} alt="" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>09/10/2022</td>
                <td>Makanan</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing</td>
                <td>20.000</td>
                <td class="aksi">
                  <div className="imgContainer">
                    <div className="item">
                      <img src={editIcon} alt="" />
                    </div>
                    <div className="item">
                      <img src={deleteIcon} alt="" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div className={ pemasukanPopUp ? "popUpCatatanku ":"popUpCatatanku hidden"}>
        <div className="content">
          <div className="header">
            <h3>Pemasukan</h3>
            <div className="silang" onClick={handleExit}>
              <img src={silang} alt="" />
            </div>
          </div>
          <div className="body">
            <h3 className="subTitle">
              Kategori
            </h3>
            <div className="categoryWrapper">
              <div className="category">
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
              </div>
              <div className="addCategory">
                <img src={addCategory} alt="" />
              </div>
            </div>
              <form action="">
                <div className="formPemasukan">
                  <div className="leftSide">
                    <h4 className="subTitle">Tanggal</h4>
                    <input type="date" className="inputForm" placeholder="Masukkan tanggal" />
                    <h4 className="subTitle">Jumlah</h4>
                    <input type="text" className="inputForm" placeholder="Masukkan jumlah" />

                  </div>
                  <div className="rightSide">
                    <h4 className="subTitle">Deskripsi</h4>
                    <textarea type="text" className="inputForm descForm" placeholder="Masukkan deskripsi" />

                  </div>
                </div >

                <button class="submit"> Simpan </button>
              </form>
          </div>
        </div>

        <div className="popUpCategory">
          
        </div>
      </div>
      <div className={ pengeluaranPopUp ? "popUpCatatanku ":"popUpCatatanku hidden"}>
        <div className="content">
          <div className="header">
            <h3>Pengeluaran</h3>
            <div className="silang" onClick={handleExit}>
              <img src={silang} alt="" />
            </div>
          </div>
          <div className="body">
            <h3 className="subTitle">
              Kategori
            </h3>
            <div className="categoryWrapper">
              <div className="category">
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
                <div className="categoryItem">
                  <div className="img">
                    <img src="" alt="" />
                  </div>
                  <h4 className="imgTitle">Kategori 1</h4>
                </div>
              </div>
              <div className="addCategory">
                <img src={addCategory} alt="" />
              </div>
            </div>
              <form action="">
                <div className="formPemasukan">
                  <div className="leftSide">
                    <h4 className="subTitle">Tanggal</h4>
                    <input type="date" className="inputForm" placeholder="Masukkan tanggal" />
                    <h4 className="subTitle">Jumlah</h4>
                    <input type="text" className="inputForm" placeholder="Masukkan jumlah" />

                  </div>
                  <div className="rightSide">
                    <h4 className="subTitle">Deskripsi</h4>
                    <textarea type="text" className="inputForm descForm" placeholder="Masukkan deskripsi" />

                  </div>
                </div >

                <button class="submit"> Simpan </button>
              </form>
          </div>
        </div>

        <div className="popUpCategory">

        </div>
      </div>



    </div>
  )
}

export default Catatanku