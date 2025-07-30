"use client";

import { JSX, useEffect, useState } from "react";
import { FaUserAlt, FaChartLine } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";

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
type LayananResponse =
  | {
      data?: Layanan[];
      error?: string;
    }
  | Layanan[];

type PendudukResponse = {
  data?: Penduduk[];
  error?: string;
};

export default function Dashboard(): JSX.Element {
  const [hariIni, setHariIni] = useState<Layanan[]>([]);
  const [kemarin, setKemarin] = useState<Layanan[]>([]);
  const [pendudukHariIni, setPendudukHariIni] = useState<Penduduk[]>([]);
  const [pendudukKemarin, setPendudukKemarin] = useState<Penduduk[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setIsLoading(true);
        setError(null);

        const [resTodayLayanan, resYesterdayLayanan] = await Promise.all([
          fetch(`/api/layanan?date=${formatDate(today)}`),
          fetch(`/api/layanan?date=${formatDate(yesterday)}`),
        ]);

        if (!resTodayLayanan.ok || !resYesterdayLayanan.ok) {
          throw new Error("Failed to fetch layanan data");
        }

        const layananTodayResponse =
          (await resTodayLayanan.json()) as LayananResponse;
        const layananYesterdayResponse =
          (await resYesterdayLayanan.json()) as LayananResponse;

        // Handle different response formats
        let layananToday: Layanan[] = [];
        let layananYesterday: Layanan[] = [];

        // Check if response is array or object with data property
        if (Array.isArray(layananTodayResponse)) {
          layananToday = layananTodayResponse;
        } else if (
          layananTodayResponse &&
          typeof layananTodayResponse === "object" &&
          "data" in layananTodayResponse
        ) {
          layananToday = layananTodayResponse.data || [];
        }

        if (Array.isArray(layananYesterdayResponse)) {
          layananYesterday = layananYesterdayResponse;
        } else if (
          layananYesterdayResponse &&
          typeof layananYesterdayResponse === "object" &&
          "data" in layananYesterdayResponse
        ) {
          layananYesterday = layananYesterdayResponse.data || [];
        }

        console.log("Layanan Today Response:", layananTodayResponse);
        console.log("Processed Today:", layananToday);
        console.log("Layanan Yesterday Response:", layananYesterdayResponse);
        console.log("Processed Yesterday:", layananYesterday);

        setHariIni(layananToday);
        setKemarin(layananYesterday);
      } catch (err) {
        console.error("Gagal mengambil layanan:", err);
        setError("Gagal mengambil data layanan");
        setHariIni([]);
        setKemarin([]);
      }
    };

    const fetchPenduduk = async (): Promise<void> => {
      try {
        const [resTodayPenduduk, resYesterdayPenduduk] = await Promise.all([
          fetch(`/api/penduduk?date=${formatDate(today)}`),
          fetch(`/api/penduduk?date=${formatDate(yesterday)}`),
        ]);

        if (!resTodayPenduduk.ok || !resYesterdayPenduduk.ok) {
          console.warn("Failed to fetch penduduk data");
          setPendudukHariIni([]);
          setPendudukKemarin([]);
          return;
        }

        const dataToday = (await resTodayPenduduk.json()) as PendudukResponse;
        const dataYesterday =
          (await resYesterdayPenduduk.json()) as PendudukResponse;

        console.log("Penduduk Today Response:", dataToday);
        console.log("Penduduk Yesterday Response:", dataYesterday);

        setPendudukHariIni(dataToday?.data || []);
        setPendudukKemarin(dataYesterday?.data || []);
      } catch (err) {
        console.error("Gagal mengambil penduduk:", err);
        setPendudukHariIni([]);
        setPendudukKemarin([]);
      } finally {
        setIsLoading(false);
      }
    };

    const loadData = async (): Promise<void> => {
      await fetchData();
      await fetchPenduduk();
    };

    void loadData();
  }, []);

  const perubahanPersen = (today: number, yesterday: number): number => {
    if (yesterday === 0) return today > 0 ? 100 : 0;
    return ((today - yesterday) / yesterday) * 100;
  };

  // Safe calculations with default values
  const totalLayananHariIni = Array.isArray(hariIni) ? hariIni.length : 0;
  const totalLayananKemarin = Array.isArray(kemarin) ? kemarin.length : 0;

  const totalPendudukHariIni = Array.isArray(pendudukHariIni)
    ? pendudukHariIni.length
    : 0;
  const totalPendudukKemarin = Array.isArray(pendudukKemarin)
    ? pendudukKemarin.length
    : 0;

  const persenSurat = perubahanPersen(totalLayananHariIni, totalLayananKemarin);
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

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-[#f8f9fd] min-h-screen">
        <h2 className="text-2xl font-bold text-black">Dashboard</h2>
        <div className="flex items-center justify-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-500">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6 bg-[#f8f9fd] min-h-screen">
        <h2 className="text-2xl font-bold text-black">Dashboard</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

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
          Permintaan Masuk Hari Ini ({totalLayananHariIni})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F9FAFB] text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-4 text-left font-medium">No Resi</th>
                <th className="px-6 py-4 text-left font-medium">Nama</th>
                <th className="px-6 py-4 text-left font-medium">
                  Tanggal Permintaan
                </th>
                <th className="px-6 py-4 text-left font-medium">
                  Jenis Layanan
                </th>
                <th className="px-6 py-4 text-center font-medium">Aksi</th>
                <th className="px-6 py-4 text-center font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(hariIni) && hariIni.length > 0 ? (
                hariIni.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {item.no_resi || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.penduduk?.nama_lengkap || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.date
                        ? new Date(item.date).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.tipe || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                          title="Download"
                        >
                          <IoMdDownload />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="Hapus"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          item.status?.toLowerCase() === "selesai"
                            ? "bg-green-100 text-green-700"
                            : item.status?.toLowerCase() === "dibatalkan"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
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

      {/* Debug Information (remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="bg-gray-100 p-4 rounded-lg text-xs">
          <details>
            <summary className="cursor-pointer font-medium">Debug Info</summary>
            <div className="mt-2 space-y-2">
              <p>
                Hari ini data:{" "}
                {Array.isArray(hariIni) ? hariIni.length : "Not array"}
              </p>
              <p>
                Kemarin data:{" "}
                {Array.isArray(kemarin) ? kemarin.length : "Not array"}
              </p>
              <p>
                Penduduk hari ini:{" "}
                {Array.isArray(pendudukHariIni)
                  ? pendudukHariIni.length
                  : "Not array"}
              </p>
              <p>
                Penduduk kemarin:{" "}
                {Array.isArray(pendudukKemarin)
                  ? pendudukKemarin.length
                  : "Not array"}
              </p>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
