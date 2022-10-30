import React from 'react'
import logo from '../images/logo.png'
import leftArrow from '../images/leftArrow.png'
import editIcon from '../images/editIcon.png'
import silang from '../images/silang.png'
import deleteIcon from '../images/deleteIcon.png'
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
            <div className="item">
              <h2>Input Pemasukan</h2>
            </div>
            <div className="item">
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

      <div className="popUpCatatanku">
        <div className="content">
          <div className="header">
            <h3>Pemasukan</h3>
            <div className="silang">
              <img src={silang} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catatanku