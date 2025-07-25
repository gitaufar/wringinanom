"use client";
import TabelKependudukan from "../../../components/tabel/TabelKependudukan";
import TabelKonfirmasi from "../../../components/tabel/TabelKonfirmasi";
import ButtonTambahPenduduk from "../../../components/button/ButtonTambahPenduduk";
import { useRouter } from "next/navigation";


export default function KependudukanPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Kependudukan</h1>

      {/* Filter + Tombol */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm">

        <ButtonTambahPenduduk
          onClick={() => router.push('/admin/kependudukan/tambah')}
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
