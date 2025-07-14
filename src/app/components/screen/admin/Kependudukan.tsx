"use client";
import TabelKependudukan from "../../../components/tabel/TabelKependudukan";
import TabelKonfirmasi from "../../../components/tabel/TabelKonfirmasi";
import ButtonTambahPenduduk from "../../../components/button/ButtonTambahPenduduk";
import FilterPenduduk from "../../filter/FilterPenduduk";
import { useRouter } from "next/navigation";
const KependudukanPage = () => {
const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Kependudukan</h1>

      {/* Filter dan Tombol Sejajar */}
      <div className="flex items-center justify-between">
        <div className="w-full">
          <FilterPenduduk />
        </div>
        <div className="ml-4 shrink-0">
          <ButtonTambahPenduduk onClick={() => router.push("/admin/kependudukan/tambah")} />
        </div>
      </div>

      {/* Tabel Konfirmasi
      <h1 className="text-2xl font-semibold">Menunggu Konfirmasi</h1>
      <TabelKonfirmasi /> */}

      {/* Tabel Kependudukan */}
      <h1 className="text-2xl font-semibold">Data Penduduk</h1>
      <TabelKependudukan />
    </div>
  );
};

export default KependudukanPage;
