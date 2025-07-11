"use client";
import TabelKependudukan from "../../../components/tabel/TabelKependudukan";
import TabelKonfirmasi from "../../../components/tabel/TabelKonfirmasi";
import ButtonTambahPenduduk from "../../../components/button/ButtonTambahPenduduk";


const KependudukanPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Kependudukan</h1>
        <ButtonTambahPenduduk onClick={() => alert("Tambah Penduduk")}/>
      </div>
      <h1 className="text-2xl font-semibold">Menunggu Konfirmasi</h1>
      <TabelKonfirmasi />
      <h1 className="text-2xl font-semibold">Data Penduduk</h1>
      <TabelKependudukan />
    </div>
  );
};

export default KependudukanPage;
