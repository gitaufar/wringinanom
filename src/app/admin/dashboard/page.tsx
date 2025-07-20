"use client";

import { FaUserAlt, FaChartLine, FaClock } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const statistikKartu = [
  {
    judul: "Total Penduduk",
    nilai: "40.689",
    ikon: <FaUserAlt className="text-2xl text-purple-600" />,
    perubahan: "+8.5% Naik dari kemarin",
    warnaPerubahan: "text-green-500",
    latarIkon: "bg-purple-100",
  },
  {
    judul: "Total Surat Masuk - Hari ini",
    nilai: "89.000", // TANPA simbol Rp
    ikon: <FaChartLine className="text-2xl text-green-600" />,
    perubahan: "-4.3% Turun dari kemarin",
    warnaPerubahan: "text-red-500",
    latarIkon: "bg-green-100",
  },
  {
    judul: "Total Laporan Masuk - Hari ini",
    nilai: "2.040",
    ikon: <FaClock className="text-2xl text-orange-500" />,
    perubahan: "+1.8% Naik dari kemarin",
    warnaPerubahan: "text-green-500",
    latarIkon: "bg-orange-100",
  },
];

const dataPermintaan = [
  {
    noResi: "00001",
    nama: "Hulin",
    tanggal: "04 Sep 2019",
    jenisLayanan: "Administrasi Surat",
    status: "Selesai",
  },
  {
    noResi: "00002",
    nama: "Sinta",
    tanggal: "05 Sep 2019",
    jenisLayanan: "Laporan",
    status: "Menunggu",
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-[#f8f9fd] min-h-screen">
      <h2 className="text-2xl font-bold text-black">Dashboard</h2>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {statistikKartu.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start"
          >
            <div>
              <span className="text-sm font-medium text-gray-500">{item.judul}</span>
              <h3 className="text-2xl font-bold text-gray-900">{item.nilai}</h3>
              <p className={`text-sm ${item.warnaPerubahan}`}>{item.perubahan}</p>
            </div>
            <div className={`p-2 rounded-full ${item.latarIkon}`}>
              {item.ikon}
            </div>
          </div>
        ))}
      </div>

      {/* Tabel Permintaan */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Permintaan Masuk Hari Ini</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-500 uppercase bg-gray-100">
              <tr>
                <th className="px-4 py-3">No Resi</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Tanggal Permintaan</th>
                <th className="px-4 py-3">Jenis Layanan</th>
                <th className="px-4 py-3 text-center">Aksi</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {dataPermintaan.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{item.noResi}</td>
                  <td className="px-4 py-3">{item.nama}</td>
                  <td className="px-4 py-3">{item.tanggal}</td>
                  <td className="px-4 py-3">{item.jenisLayanan}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="text-blue-600 hover:text-blue-800" title="Edit">
                        <FiEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="Hapus">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        item.status === "Selesai"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
