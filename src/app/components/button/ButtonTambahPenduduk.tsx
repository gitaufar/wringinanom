"use client";

import { JSX } from "react";

type ButtonTambahPendudukProps = {
  onClick: () => void;
};

const ButtonTambahPenduduk = ({ onClick }: ButtonTambahPendudukProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="bg-[#3E64FF] hover:bg-[#2c4edb] text-white text-sm font-medium px-5 py-2.5 rounded-md shadow"
    >
      Tambah Penduduk
    </button>
  );
};

export default ButtonTambahPenduduk;
