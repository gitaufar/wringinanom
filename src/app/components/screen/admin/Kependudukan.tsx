"use client";
import TabelKependudukan from "../../../components/tabel/TabelKependudukan";
import TabelKonfirmasi from "../../../components/tabel/TabelKonfirmasi";
import ButtonTambahPenduduk from "../../../components/button/ButtonTambahPenduduk";
import FilterPenduduk from "../../filter/FilterPenduduk";
import { useRouter } from "next/navigation";


export default function KependudukanPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Kependudukan</h1>

      {/* Filter + Tombol */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <FilterPenduduk />
        <ButtonTambahPenduduk
          onClick={() => router.push('/admin/kependudukan/tambah')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        />
      </div>

      {/* Menunggu Konfirmasi */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Menunggu Konfirmasi</h2>
        <TabelKonfirmasi />
      </section>

      {/* Data Penduduk */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Penduduk</h2>
        <TabelKependudukan />
      </section>
    </div>
  )
}
