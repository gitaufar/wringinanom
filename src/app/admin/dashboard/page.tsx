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
  data_dinamis: Record<string, unknown>;
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
  const [semuaPenduduk, setSemuaPenduduk] = useState<Penduduk[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for delete modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedResi, setSelectedResi] = useState<string | null>(null);

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
        const res = await fetch(`/api/penduduk?limit=all`);
        if (!res.ok) {
          throw new Error("Gagal fetch semua penduduk");
        }
        const data = (await res.json()) as PendudukResponse;
        console.log("Semua Penduduk:", data);
        setSemuaPenduduk(data?.data || []);
      } catch (err) {
        console.error("Gagal mengambil semua penduduk:", err);
        setSemuaPenduduk([]);
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

  const handleDownload = async (item: Layanan): Promise<void> => {
    const { no_resi, tipe, data_dinamis, penduduk, status } = item;

    // Cek apakah surat sudah selesai
    if (status !== "Selesai") {
      alert("Surat hanya bisa didownload jika status sudah 'Selesai'.");
      return;
    }

    if (!data_dinamis) {
      alert("Data surat tidak tersedia untuk didownload.");
      return;
    }

    try {
      const fileRes = await fetch(`/api/surat/${tipe}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data_dinamis),
      });

      if (!fileRes.ok) {
        throw new Error("Gagal generate surat");
      }

      const blob = await fileRes.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `${no_resi}-${penduduk.nama_lengkap}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup URL object
      window.URL.revokeObjectURL(fileURL);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan saat download.";
      alert(message);
    }
  };

  // Function to open delete confirmation modal
  const handleDeleteConfirm = (item: Layanan): void => {
    setSelectedResi(item.no_resi);
    setShowConfirmModal(true);
  };

  // Function to handle actual deletion
  const handleDelete = async (): Promise<void> => {
    if (!selectedResi) return;

    try {
      const res = await fetch(`/api/layanan/${selectedResi}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err: unknown = await res.json();
        const message =
          typeof err === "object" && err !== null && "error" in err
            ? String((err as { error: unknown }).error)
            : "Gagal menghapus layanan";
        throw new Error(message);
      }

      // Refresh data after deletion by removing the deleted item from state
      setHariIni((prevData) =>
        prevData.filter((item) => item.no_resi !== selectedResi)
      );

      alert("Layanan berhasil dihapus.");
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus layanan.");
      console.error("Gagal hapus layanan:", error);
    } finally {
      setShowConfirmModal(false);
      setSelectedResi(null);
    }
  };

  const perubahanPersen = (today: number, yesterday: number): number => {
    if (yesterday === 0) return today > 0 ? 100 : 0;
    return ((today - yesterday) / yesterday) * 100;
  };

  // Safe calculations with default values
  const totalLayananHariIni = Array.isArray(hariIni) ? hariIni.length : 0;
  const totalLayananKemarin = Array.isArray(kemarin) ? kemarin.length : 0;

  const persenSurat = perubahanPersen(totalLayananHariIni, totalLayananKemarin);
  const totalPenduduk = Array.isArray(semuaPenduduk) ? semuaPenduduk.length : 0;

  const statistikKartu = [
    {
      judul: "Total Penduduk",
      nilai: totalPenduduk.toLocaleString(),
      ikon: <FaUserAlt className="text-2xl text-purple-600" />,
      perubahan: "", // tidak perlu ada perbandingan
      warnaPerubahan: "",
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
                          onClick={() => {
                            void handleDownload(item);
                          }}
                        >
                          <IoMdDownload />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="Hapus"
                          onClick={() => handleDeleteConfirm(item)}
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

      {/* Delete Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Konfirmasi Hapus
            </h2>
            <p className="text-sm mb-4 text-center">
              Apakah Anda yakin ingin menghapus layanan dengan nomor resi:{" "}
              <span className="font-medium">{selectedResi}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={() => void handleDelete()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
