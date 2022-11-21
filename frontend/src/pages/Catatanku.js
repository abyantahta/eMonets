import React from "react";
import logo from "../images/logo.png";
import leftArrow from "../images/leftArrow.png";
import editIcon from "../images/editIcon.png";
import silang from "../images/silang.png";
import addCategory from "../images/addCategory.png";
import deleteIcon from "../images/deleteIcon.png";
import rightArrow from "../images/rightArrow.png";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useCookies } from "react-cookie";
import Feed from "../components/Feed";

function Catatanku() {
  // integrasi start

  const [user, setUser] = useState();
  // const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // const { auth, setAuth } = useAuth();
  const [cookies, setCookies] = useCookies(["auth"]);

  const logout = async () => {
    setCookies("auth", {});
    navigate("/");
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axios.get("/api/user", {
          headers: { authorization: `Bearer ${cookies.auth.accessToken}` },
          signal: controller.signal,
        });
        isMounted && setUser(response.data.payload);
      } catch (error) {
        console.log(error.response);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getTransaksi = async () => {
      try {
        const response = await axios.get("/api/transaksi", {
          headers: { authorization: `Bearer ${cookies.auth.accessToken}` },
          signal: controller.signal,
        });
        isMounted && setList_transaksi(response.data.payload);
      } catch (error) {
        console.log(error.response);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUser();
    getTransaksi();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // integrasi end

  // nyoba dulu start

  const [nominal, setNominal] = useState(0);
  const [kategori, setKategori] = useState("makanan");
  const [deskripsi, setDeskripsi] = useState("");
  const [date, setDate] = useState();
  const [list_transaksi, setList_transaksi] = useState([]);

  const handleSubmitPemasukan = (e) => {
    e.preventDefault();

    const postTransaksi = async () => {
      try {
        const payload = JSON.stringify({
          nominal: nominal,
          kategori: kategori,
          deskripsi: deskripsi,
          tanggal: date,
          tipe: 0,
        });
        const response = await axios.post("/api/transaksi", payload, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${cookies.auth.accessToken}`,
          },
        });
        setList_transaksi(response.data.payload);
      } catch (error) {
        console.log(error.response);
      }
    };
    postTransaksi();
    setPemasukanPopUp(false);
    setNominal(0);
    setKategori("makanan");
    setDeskripsi("");
    setDate({});
  };

  const handleDeleteTransaksi = async (id) => {
    const response = await axios.delete("/api/transaksi/" + id, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookies.auth.accessToken}`,
      },
    });

    setList_transaksi(response.data.payload);
  };

  // nyoba dulu end

  const [pengeluaranPopUp, setPengeluaranPopUp] = useState(false);
  const [pemasukanPopUp, setPemasukanPopUp] = useState(false);
  const [month, setMonth] = useState(1);
  const [currentMonths, setCurrentMonths] = useState("Januari");
  const months = {
    "01": "Januari",
    "02": "Februari",
    "03": "Maret",
    "04": "April",
    "05": "Mei",
    "06": "Juni",
    "07": "Juli",
    "08": "Agustus",
    "09": "September",
    10: "Oktober",
    11: "November",
    12: "Desember",
    key: function (n) {
      return this[Object.keys(this)[(n + 14) % 12]];
    },
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    let current = month + 1;
    setMonth(current);
    setCurrentMonths(months.key(current));
  };
  const handlePrevMonth = (e) => {
    e.preventDefault();
    let current = month - 1;
    setMonth(current);
    setCurrentMonths(months.key(current));
  };

  const handlePemasukanPopUp = (e) => {
    e.preventDefault();
    setPemasukanPopUp(true);
  };
  const handlePengeluaranPopUp = (e) => {
    e.preventDefault();
    setPengeluaranPopUp(true);
  };
  const handleExit = (e) => {
    e.preventDefault();
    setPengeluaranPopUp(false);
    setPemasukanPopUp(false);
  };
  return (
    <div className="catatanku">
      <div className="left">
        <div className="img">
          <img src="" alt="" />
        </div>

        <h1>{user ? user.username : "Username not found"}</h1>
        <h2>{user ? user.email : "Email not found"}</h2>
        <div className="logout">
          <button onClick={logout}>
            <h3>Logout</h3>
          </button>
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
              <img src={leftArrow} alt="" onClick={handlePrevMonth} />
              <h2>{currentMonths}</h2>
              <img src={rightArrow} alt="" onClick={handleNextMonth} />
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
              {list_transaksi.length ? (
                <Feed
                  list_transaksi={list_transaksi}
                  handleDeleteTransaksi={handleDeleteTransaksi}
                />
              ) : (
                <p className="statusMsg">Belum ada transaksi</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div
        className={pemasukanPopUp ? "popUpCatatanku " : "popUpCatatanku hidden"}
      >
        <div className="content">
          <div className="header">
            <h3>Pemasukan</h3>
            <div className="silang" onClick={handleExit}>
              <img src={silang} alt="" />
            </div>
          </div>
          <div className="body">
            <form action="">
              <div className="formPemasukan">
                <div className="leftSide">
                  <h4 className="subTitle">Kategori</h4>
                  <select
                    name=""
                    id=""
                    className="inputKategori"
                    onChange={(e) => setKategori(e.target.value)}
                    value={kategori}
                  >
                    <option value="makanan">Makanan dan Minuman</option>
                    <option value="transportasi">Transportasi</option>
                    <option value="kesehatan">Kesehatan</option>
                    <option value="hobby">Hobby</option>
                    <option value="sedekah">Sedekah</option>
                    <option value="danlainlain">Dan lain-lain</option>
                  </select>
                  <h4 className="subTitle">Tanggal</h4>
                  <input
                    type="date"
                    className="inputForm"
                    placeholder="Masukkan tanggal"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <h4 className="subTitle">Jumlah</h4>
                  <input
                    type="number"
                    className="inputForm"
                    placeholder="Masukkan jumlah"
                    value={nominal}
                    onChange={(e) => setNominal(e.target.value)}
                  />
                </div>
                <div className="rightSide">
                  <h4 className="subTitle">Deskripsi</h4>
                  <textarea
                    type="text"
                    className="inputForm descForm"
                    placeholder="Masukkan deskripsi"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                </div>
              </div>

              <button class="submit" onClick={handleSubmitPemasukan}>
                {" "}
                Simpan{" "}
              </button>
            </form>
          </div>
        </div>

        <div className="popUpCategory"></div>
      </div>
      <div
        className={
          pengeluaranPopUp ? "popUpCatatanku " : "popUpCatatanku hidden"
        }
      >
        <div className="content">
          <div className="header">
            <h3>Pengeluaran</h3>
            <div className="silang" onClick={handleExit}>
              <img src={silang} alt="" />
            </div>
          </div>
          <div className="body">
            <form action="">
              <div className="formPemasukan">
                <div className="leftSide">
                  <h4 className="subTitle">Kategori</h4>
                  <select name="" id="" className="inputKategori">
                    <option value="gaji">Gaji</option>
                    <option value="bonus">Bonus</option>
                    <option value="hasilpenjualan">Hasil Penjualan</option>
                    <option value="danlainlain">Dan lain-lain</option>
                  </select>
                  <h4 className="subTitle">Tanggal</h4>
                  <input
                    type="date"
                    className="inputForm"
                    placeholder="Masukkan tanggal"
                  />
                  <h4 className="subTitle">Jumlah</h4>
                  <input
                    type="number"
                    className="inputForm"
                    placeholder="Masukkan jumlah"
                  />
                </div>
                <div className="rightSide">
                  <h4 className="subTitle">Deskripsi</h4>
                  <textarea
                    type="text"
                    className="inputForm descForm"
                    placeholder="Masukkan deskripsi"
                  />
                </div>
              </div>

              <button class="submit"> Simpan </button>
            </form>
          </div>
        </div>

        <div className="popUpCategory"></div>
      </div>
    </div>
  );
}

export default Catatanku;
