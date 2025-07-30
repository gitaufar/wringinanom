"use client";

import { JSX, useEffect, useState } from "react";
import StatusCard from "../../components/card/StatusCard";
import { IoMdDownload } from "react-icons/io";
import { FaPhone, FaTrashAlt } from "react-icons/fa";

type DataRiwayat = {
  no_resi: string;
  date: string;
  tipe: string;
  keterangan: string;
  status: "Menunggu" | "Selesai" | "Dibatalkan";
  no_wa?: string;
  nik?: string;
  data_dinamis?: Record<string, unknown>;
  penduduk: {
    nama_lengkap: string;
  };
};

type PaginationData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

type ApiResponse = {
  data: DataRiwayat[];
  pagination: PaginationData;
};

type TabelRiwayatPermohonanProps = {
  change: boolean;
};

const TabelRiwayatPermohonan = ({
  change,
}: TabelRiwayatPermohonanProps): JSX.Element => {
  const [dataRiwayat, setDataRiwayat] = useState<DataRiwayat[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedResi, setSelectedResi] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    const fetchRiwayat = async (page: number = 1): Promise<void> => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
        });

        if (searchTerm) {
          params.append("search", searchTerm);
        }

        if (statusFilter && statusFilter !== "") {
          params.append("status", statusFilter);
        }

        const res = await fetch(`/api/layanan?${params.toString()}`);
        const result = (await res.json()) as ApiResponse;

        if (!res.ok) {
          throw new Error("Gagal fetch data");
        }

        // Filter out "Menunggu" status
        const filteredData = result.data.filter(
          (item) => item.status?.toLowerCase() !== "menunggu"
        );

        setDataRiwayat(filteredData);
        setPagination(result.pagination);
      } catch (error) {
        console.error("Gagal fetch data dari /api/layanan:", error);
        alert("Gagal memuat data riwayat");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchRiwayat(pagination.page);
  }, [change, pagination.page, pagination.limit, searchTerm, statusFilter]);

  // Fungsi untuk handle perubahan halaman
  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  // Fungsi untuk handle pencarian
  const handleSearch = (value: string): void => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset ke halaman 1
  };

  // Fungsi untuk handle filter status
  const handleStatusFilter = (status: string): void => {
    setStatusFilter(status);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset ke halaman 1
  };

  // Fungsi untuk membuka WhatsApp
  const handleWhatsApp = (item: DataRiwayat): void => {
    const { no_wa, penduduk, tipe, no_resi, status } = item;

    if (!no_wa) {
      alert("Nomor WhatsApp tidak tersedia untuk riwayat ini.");
      return;
    }

    // Format nomor WA (hilangkan karakter non-digit dan tambahkan 62 jika diawali 08)
    let formattedNumber = no_wa.replace(/\D/g, "");
    if (formattedNumber.startsWith("08")) {
      formattedNumber = "62" + formattedNumber.substring(1);
    } else if (!formattedNumber.startsWith("62")) {
      formattedNumber = "62" + formattedNumber;
    }

    // Template pesan berdasarkan status
    let message = `Halo ${penduduk.nama_lengkap},\n\n`;

    if (status === "Selesai") {
      message += `✅ *Permohonan Surat Selesai*\n\n`;
      message += `📋 *Detail Permohonan:*\n`;
      message += `• No. Resi: ${no_resi}\n`;
      message += `• Jenis Surat: ${tipe}\n`;
      message += `• Status: ${status}\n\n`;
      message += `Permohonan surat Anda telah selesai diproses. Silakan ambil surat di kantor desa atau download melalui sistem.\n\n`;
    } else if (status === "Dibatalkan") {
      message += `❌ *Permohonan Surat Dibatalkan*\n\n`;
      message += `📋 *Detail Permohonan:*\n`;
      message += `• No. Resi: ${no_resi}\n`;
      message += `• Jenis Surat: ${tipe}\n`;
      message += `• Status: ${status}\n`;
      message += `• Keterangan: ${item.keterangan}\n\n`;
      message += `Mohon maaf, permohonan surat Anda telah dibatalkan. Silakan hubungi kami untuk informasi lebih lanjut.\n\n`;
    }

    message += `Terima kasih telah menggunakan layanan kami.\n\n`;
    message += `Salam,\nPelayanan Administrasi Desa`;

    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);

    // Buka WhatsApp
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // Fungsi untuk download surat
  const handleDownload = async (item: DataRiwayat): Promise<void> => {
    const { nik, no_resi, tipe, data_dinamis, penduduk, status } = item;

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
      link.download = `${nik || no_resi}-${penduduk.nama_lengkap}.docx`;
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

  const handleDeleteConfirm = (noResi: string): void => {
    setSelectedResi(noResi);
    setShowConfirmModal(true);
  };

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
            : "Gagal menghapus riwayat";
        throw new Error(message);
      }

      setDataRiwayat((prev) =>
        prev.filter((item) => item.no_resi !== selectedResi)
      );

      // Update pagination total
      setPagination((prev) => ({
        ...prev,
        total: prev.total - 1,
        totalPages: Math.ceil((prev.total - 1) / prev.limit),
      }));
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus riwayat.");
      console.error("Gagal hapus riwayat:", error);
    } finally {
      setShowConfirmModal(false);
      setSelectedResi(null);
    }
  };

  return (
    <div className="relative">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau no resi..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="min-w-[200px]">
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Status</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="text-sm text-gray-600">
            Menampilkan {dataRiwayat.length} dari {pagination.total} data
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm mt-4 overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-500">Memuat data...</p>
          </div>
        ) : dataRiwayat.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            {searchTerm || statusFilter
              ? "Tidak ada data yang sesuai dengan pencarian."
              : "Belum ada riwayat permohonan surat."}
          </p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-[#F9FAFB] text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-4 text-left font-medium">NO RESI</th>
                <th className="px-6 py-4 text-left font-medium">NAMA</th>
                <th className="px-6 py-4 text-left font-medium">
                  TANGGAL PERMINTAAN
                </th>
                <th className="px-6 py-4 text-left font-medium">JENIS SURAT</th>
                <th className="px-6 py-4 text-left font-medium">ACTION</th>
                <th className="px-6 py-4 text-left font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataRiwayat.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{row.no_resi}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.penduduk.nama_lengkap}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(row.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.tipe}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                    <button
                      className="text-green-600 hover:text-green-700 p-1 rounded hover:bg-green-50"
                      onClick={() => handleWhatsApp(row)}
                      title="Hubungi via WhatsApp"
                    >
                      <FaPhone size={14} />
                    </button>
                    <button
                      className={`p-1 rounded ${
                        row.status === "Selesai"
                          ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                      onClick={() => void handleDownload(row)}
                      title={
                        row.status === "Selesai"
                          ? "Download Surat"
                          : "Surat belum selesai"
                      }
                      disabled={row.status !== "Selesai"}
                    >
                      <IoMdDownload size={16} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                      onClick={() => handleDeleteConfirm(row.no_resi)}
                      title="Hapus Riwayat"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusCard status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && dataRiwayat.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm mt-4 p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Page Info */}
            <div className="text-sm text-gray-600">
              Halaman {pagination.page} dari {pagination.totalPages}(
              {pagination.total} total data)
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* First Page */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={!pagination.hasPrev}
                className={`px-3 py-2 rounded-lg text-sm ${
                  !pagination.hasPrev
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                ««
              </button>

              {/* Previous Page */}
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                className={`px-3 py-2 rounded-lg text-sm ${
                  !pagination.hasPrev
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                « Prev
              </button>

              {/* Page Numbers */}
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.page >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        pageNum === pagination.page
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}

              {/* Next Page */}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNext}
                className={`px-3 py-2 rounded-lg text-sm ${
                  !pagination.hasNext
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Next »
              </button>

              {/* Last Page */}
              <button
                onClick={() => handlePageChange(pagination.totalPages)}
                disabled={!pagination.hasNext}
                className={`px-3 py-2 rounded-lg text-sm ${
                  !pagination.hasNext
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                »»
              </button>
            </div>

            {/* Items per page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Per halaman:</span>
              <select
                value={pagination.limit}
                onChange={(e) =>
                  setPagination((prev) => ({
                    ...prev,
                    limit: parseInt(e.target.value),
                    page: 1,
                  }))
                }
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 ">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Konfirmasi Hapus
            </h2>
            <p className="text-sm mb-4 text-center">
              Apakah Anda yakin ingin menghapus riwayat dengan nomor resi:{" "}
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
};

export default TabelRiwayatPermohonan;
