import React from "react";
import editIcon from "../images/editIcon.png";
import deleteIcon from "../images/deleteIcon.png";

const Transaksi = ({ transaksi, handleDeleteTransaksi }) => {
  return (
    <>
      <td>{transaksi.tanggal}</td>
      <td> {transaksi.kategori} </td>
      <td>{transaksi.deskripsi}</td>
      <td>{transaksi.nominal}</td>
      <td class="aksi">
        <div className="imgContainer">
          <div className="item">
            <img src={editIcon} alt="" />
          </div>
          <div
            className="item"
            onClick={() => handleDeleteTransaksi(transaksi.id)}
          >
            <img src={deleteIcon} alt="" />
          </div>
        </div>
      </td>
    </>
  );
};

export default Transaksi;
