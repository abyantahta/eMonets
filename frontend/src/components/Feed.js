import React from "react";
import Transaksi from "./Transaksi";

const Feed = ({ list_transaksi, handleDeleteTransaksi }) => {
  return (
    <>
      {list_transaksi.map((transaksi) => (
        <tr>
          <Transaksi
            transaksi={transaksi}
            handleDeleteTransaksi={handleDeleteTransaksi}
          />
        </tr>
      ))}
    </>
  );
};

export default Feed;
