"use client";

import { JSX, useEffect, useState } from "react";
import { FaUserAlt, FaChartLine, FaClock } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";

type Layanan = {
  no_resi: string;
  date: string;
  tipe: string;
  status: string;
  penduduk: {
    nama_lengkap: string;
  };
};

type Penduduk = {
  nik: string;
  nama_lengkap: string;
};

// API response types for better type safety
type LayananResponse = Layanan[];
type PendudukResponse = {
  data: Penduduk[];
};

export default function Dashboard(): JSX.Element {
  const [hariIni, setHariIni] = useState<Layanan[]>([]);
  const [kemarin, setKemarin] = useState<Layanan[]>([]);
  const [pendudukHariIni, setPendudukHariIni] = useState<Penduduk[]>([]);
  const [pendudukKemarin, setPendudukKemarin] = useState<Penduduk[]>([]);

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const formatDate = (date: Date): string =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;

    const fetchData = async (): Promise<void> => {
      try {
        const [resTodayLayanan, resYesterdayLayanan] = await Promise.all([
          fetch(`/api/layanan?date=${formatDate(today)}`),
          fetch(`/api/layanan?date=${formatDate(yesterday)}`),
        ]);

        const layananToday = (await resTodayLayanan.json()) as LayananResponse;
        const layananYesterday =
          (await resYesterdayLayanan.json()) as LayananResponse;

        setHariIni(layananToday);
        setKemarin(layananYesterday);
      } catch (err) {
        console.error("Gagal mengambil layanan:", err);
      }
    };

    const fetchPenduduk = async (): Promise<void> => {
      try {
        const [resTodayPenduduk, resYesterdayPenduduk] = await Promise.all([
          fetch(`/api/penduduk?date=${formatDate(today)}`),
          fetch(`/api/penduduk?date=${formatDate(yesterday)}`),
        ]);

        const dataToday = (await resTodayPenduduk.json()) as PendudukResponse;
        const dataYesterday =
          (await resYesterdayPenduduk.json()) as PendudukResponse;

        setPendudukHariIni(dataToday.data || []);
        setPendudukKemarin(dataYesterday.data || []);
      } catch (err) {
        console.error("Gagal mengambil penduduk:", err);
      }
    };

    void fetchData();
    void fetchPenduduk();
  }, []);

  const perubahanPersen = (today: number, yesterday: number): number => {
    if (yesterday === 0) return today > 0 ? 100 : 0;
    return ((today - yesterday) / yesterday) * 100;
  };

  const totalLayananHariIni = hariIni.length;
  const totalLayananKemarin = kemarin.length;
  const totalLaporanHariIni = hariIni.filter(
    (d) => d.tipe.toLowerCase() === "laporan"
  ).length;
  const totalLaporanKemarin = kemarin.filter(
    (d) => d.tipe.toLowerCase() === "laporan"
  ).length;

  const totalPendudukHariIni = pendudukHariIni.length;
  const totalPendudukKemarin = pendudukKemarin.length;

  const persenSurat = perubahanPersen(totalLayananHariIni, totalLayananKemarin);
  const persenLaporan = perubahanPersen(
    totalLaporanHariIni,
    totalLaporanKemarin
  );
  const persenPenduduk = perubahanPersen(
    totalPendudukHariIni,
    totalPendudukKemarin
  );

  const statistikKartu = [
    {
      judul: "Penduduk Baru - Hari ini",
      nilai: totalPendudukHariIni.toLocaleString(),
      ikon: <FaUserAlt className="text-2xl text-purple-600" />,
      perubahan:
        (persenPenduduk >= 0 ? "+" : "") +
        persenPenduduk.toFixed(1) +
        "% " +
        (persenPenduduk >= 0 ? "Naik" : "Turun") +
        " dari kemarin",
      warnaPerubahan: persenPenduduk >= 0 ? "text-green-500" : "text-red-500",
      latarIkon: "bg-purple-100",
    },
    {
      judul: "Total Surat Masuk - Hari ini",
      nilai: totalLayananHariIni.toLocaleString(),
      ikon: <FaChartLine className="text-2xl text-green-600" />,
      perubahan:
        (persenSurat >= 0 ? "+" : "") +
        persenSurat.toFixed(1) +
        "% " +
        (persenSurat >= 0 ? "Naik" : "Turun") +
        " dari kemarin",
      warnaPerubahan: persenSurat >= 0 ? "text-green-500" : "text-red-500",
      latarIkon: "bg-green-100",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-[#f8f9fd] min-h-screen">
      <h2 className="text-2xl font-bold text-black">Dashboard</h2>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {statistikKartu.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start"
          >
            <div>
              <span className="text-sm font-medium text-gray-500">
                {item.judul}
              </span>
              <h3 className="text-2xl font-bold text-gray-900">{item.nilai}</h3>
              <p className={`text-sm ${item.warnaPerubahan}`}>
                {item.perubahan}
              </p>
            </div>
            <div className={`p-2 rounded-full ${item.latarIkon}`}>
              {item.ikon}
            </div>
          </div>
        ))}
      </div>

      {/* Tabel Layanan Hari Ini */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Permintaan Masuk Hari Ini
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F9FAFB] text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-4 text-left font-medium">No Resi</th>
                <th className="px-6 py-4 text-left font-medium">Nama</th>
                <th className="px-6 py-4 text-left font-medium">Tanggal Permintaan</th>
                <th className="px-6 py-4 text-left font-medium">Jenis Layanan</th>
                <th className="px-6 py-4 text-center font-medium">Aksi</th>
                <th className="px-6 py-4 text-center font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {hariIni.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.no_resi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.penduduk?.nama_lengkap || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.tipe}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        item.status.toLowerCase() === "selesai"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {hariIni.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-8">
                    Tidak ada permintaan hari ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
