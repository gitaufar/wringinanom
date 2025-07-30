"use client";

import { JSX, useEffect, useState } from "react";
import { FaPhone, FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import StatusCard from "../../components/card/StatusCard";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";

type Status = "Menunggu" | "Selesai" | "Dibatalkan";

type DataPermintaan = {
  nik: string;
  no_resi: string;
  no_wa?: string;
  penduduk: {
    nama_lengkap: string;
  };
  tanggal: string;
  jenis_surat: string;
  data_dinamis?: Record<string, unknown>;
  riwayatlayanan: {
    status: Status;
  };
};

type PaginationData = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type ApiResponse = {
  data: DataPermintaan[];
  pagination: PaginationData;
};

type TabelPermohonanProps = {
  search?: string;
  setChange: (value: boolean) => void;
  change: boolean;
};

const TabelPermohonan = ({
  setChange,
  change,
}: TabelPermohonanProps): JSX.Element => {
  const [permohonan, setPermohonan] = useState<DataPermintaan[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [modalApproveOpen, setModalApproveOpen] = useState(false);
  const [modalRejectOpen, setModalRejectOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataPermintaan | null>(null);
  const [alasan, setAlasan] = useState("");

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [jenisFilter, setJenisFilter] = useState<string>("");
  const [availableJenis, setAvailableJenis] = useState<string[]>([]);

  const fetchPermohonan = async (
    page: number = 1,
    showLoading: boolean = true
  ): Promise<void> => {
    if (showLoading) {
      setIsLoading(true);
    }

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.pageSize.toString(),
      });

      if (jenisFilter) {
        params.append("jenis", jenisFilter);
      }

      const res = await fetch(`/api/permohonan?${params.toString()}`);
      const result = (await res.json()) as ApiResponse & { error?: string };

      if (!res.ok) throw new Error(result.error || "Gagal fetch Permohonan");

      // Filter hanya status "Menunggu" dan berdasarkan search term
      let filteredData = (result.data || []).filter(
        (x) => x.riwayatlayanan?.status === "Menunggu"
      );

      // Client-side search filtering
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filteredData = filteredData.filter(
          (item) =>
            item.penduduk.nama_lengkap.toLowerCase().includes(searchLower) ||
            item.no_resi.toLowerCase().includes(searchLower) ||
            item.nik.toLowerCase().includes(searchLower)
        );
      }

      setPermohonan(filteredData);
      setPagination(result.pagination);

      // Extract unique jenis surat for filter options
      const uniqueJenis = Array.from(
        new Set(result.data.map((item) => item.jenis_surat))
      ).sort();
      setAvailableJenis(uniqueJenis);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi Kesalahan";
      console.error("Error fetching permohonan:", err);
      alert(message);
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    void fetchPermohonan(pagination.currentPage, true); // Show loading on initial fetch
  }, [change, pagination.currentPage, pagination.pageSize, jenisFilter]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void fetchPermohonan(1, true); // Show loading when searching
      setPagination((prev) => ({ ...prev, currentPage: 1 }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Fungsi untuk handle perubahan halaman
  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  // Fungsi untuk handle perubahan items per page
  const handlePageSizeChange = (newPageSize: number): void => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
      currentPage: 1,
    }));
  };

  // Fungsi untuk handle filter jenis surat
  const handleJenisFilter = (jenis: string): void => {
    setJenisFilter(jenis);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Clear all filters
  const handleClearFilters = (): void => {
    setSearchTerm("");
    setJenisFilter("");
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Fungsi untuk membuka WhatsApp
  const handleWhatsApp = (item: DataPermintaan): void => {
    const { no_wa, penduduk, jenis_surat, no_resi } = item;

    if (!no_wa) {
      alert("Nomor WhatsApp tidak tersedia untuk permohonan ini.");
      return;
    }

    // Format nomor WA (hilangkan karakter non-digit dan tambahkan 62 jika diawali 08)
    let formattedNumber = no_wa.replace(/\D/g, "");
    if (formattedNumber.startsWith("08")) {
      formattedNumber = "62" + formattedNumber.substring(1);
    } else if (!formattedNumber.startsWith("62")) {
      formattedNumber = "62" + formattedNumber;
    }

    // Template pesan
    const message = `Halo ${penduduk.nama_lengkap},

Kami ingin menginformasikan bahwa permohonan surat Anda telah kami terima:

📋 *Detail Permohonan:*
• No. Resi: ${no_resi}
• Jenis Surat: ${jenis_surat}
• Status: Sedang diproses

Terima kasih telah menggunakan layanan kami. Jika ada pertanyaan, silakan hubungi kami kembali.

Salam,
Pelayanan Administrasi Desa`;

    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);

    // Buka WhatsApp
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // Fungsi untuk download surat
  const handleDownload = async (item: DataPermintaan): Promise<void> => {
    const { nik, jenis_surat, data_dinamis, penduduk } = item;
    try {
      const fileRes = await fetch(`/api/surat/${jenis_surat}`, {
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
      link.download = `${nik}-${penduduk.nama_lengkap}.docx`;
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

  // Fungsi untuk approve/mengubah status jadi selesai
  const handleApprove = async (): Promise<void> => {
    if (!selectedItem) return;
    const { no_resi } = selectedItem;

    try {
      // Update status menjadi "Selesai"
      await fetch("/api/permohonan/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_resi, status_baru: "Selesai" }),
      });

      // Delete dari daftar permohonan menunggu
      await fetch(`/api/permohonan?no_resi=${no_resi}`, { method: "DELETE" });

      // Update state
      setPermohonan((prev) => prev.filter((item) => item.no_resi !== no_resi));
      setChange(!change);
      setModalApproveOpen(false);

      alert("Permohonan berhasil disetujui!");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyetujui.";
      alert(message);
    }
  };

  const handleReject = async (): Promise<void> => {
    if (!selectedItem) return;
    try {
      await fetch("/api/permohonan/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          no_resi: selectedItem.no_resi,
          status_baru: "Dibatalkan",
        }),
      });

      await fetch(`/api/layanan/${selectedItem.no_resi}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keterangan: alasan || "Permohonan dibatalkan",
        }),
      });

      await fetch(`/api/permohonan?no_resi=${selectedItem.no_resi}`, {
        method: "DELETE",
      });

      setPermohonan((prev) =>
        prev.filter((item) => item.no_resi !== selectedItem.no_resi)
      );
      setAlasan("");
      setChange(!change);
      setModalRejectOpen(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal membatalkan permohonan.";
      alert(message);
    }
  };

  // Auto-refresh setiap 15 detik
  useEffect(() => {
    const intervalId = setInterval(() => {
      void fetchPermohonan(pagination.currentPage, false); // Don't show loading for interval refresh
    }, 15000); // 15000 ms = 15 detik

    return () => clearInterval(intervalId); // Cleanup saat unmount
  }, [pagination.currentPage, pagination.pageSize, jenisFilter]);

  return (
    <div className="space-y-4">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <FaSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Cari nama, NIK, atau no resi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Jenis Surat Filter */}
            <div className="min-w-[200px]">
              <select
                value={jenisFilter}
                onChange={(e) => handleJenisFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Jenis Surat</option>
                {availableJenis.map((jenis) => (
                  <option key={jenis} value={jenis}>
                    {jenis}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>

          {/* Results Info */}
          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            Menampilkan {permohonan.length} dari {pagination.totalCount}{" "}
            permohonan
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-500">Memuat data permohonan...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "NO RESI",
                    "NAMA",
                    "TANGGAL",
                    "JENIS SURAT",
                    "ACTION",
                    "STATUS",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {permohonan.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      {searchTerm || jenisFilter
                        ? "Tidak ada permohonan yang sesuai dengan filter."
                        : "Tidak ada permohonan menunggu ditemukan."}
                    </td>
                  </tr>
                ) : (
                  permohonan.map((row) => (
                    <tr
                      key={row.no_resi}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.no_resi}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {row.penduduk?.nama_lengkap}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(row.tanggal).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {row.jenis_surat}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                            title="Hubungi via WhatsApp"
                            onClick={() => handleWhatsApp(row)}
                          >
                            <FaPhone className="text-green-600" size={14} />
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                            title="Setujui"
                            onClick={() => {
                              setSelectedItem(row);
                              setModalApproveOpen(true);
                            }}
                          >
                            <FaCheck className="text-green-600" size={16} />
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Tolak"
                            onClick={() => {
                              setSelectedItem(row);
                              setModalRejectOpen(true);
                            }}
                          >
                            <FaTimes className="text-red-500" size={16} />
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Download"
                            onClick={() => {
                              if (row.data_dinamis) {
                                void handleDownload(row);
                              } else {
                                alert(
                                  "Data dinamis tidak tersedia untuk surat ini."
                                );
                              }
                            }}
                          >
                            <IoMdDownload className="text-blue-600" size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusCard
                          status={row.riwayatlayanan?.status || "Menunggu"}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && permohonan.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Page Info */}
            <div className="text-sm text-gray-600">
              Halaman {pagination.currentPage} dari {pagination.totalPages}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* First Page */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={!pagination.hasPrevPage}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  !pagination.hasPrevPage
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                ««
              </button>

              {/* Previous Page */}
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  !pagination.hasPrevPage
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
                  } else if (pagination.currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (
                    pagination.currentPage >=
                    pagination.totalPages - 2
                  ) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        pageNum === pagination.currentPage
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
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  !pagination.hasNextPage
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Next »
              </button>

              {/* Last Page */}
              <button
                onClick={() => handlePageChange(pagination.totalPages)}
                disabled={!pagination.hasNextPage}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  !pagination.hasNextPage
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
                value={pagination.pageSize}
                onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Modal Approve */}
      <ConfirmationModal
        isOpen={modalApproveOpen}
        onClose={() => setModalApproveOpen(false)}
        onConfirm={() => void handleApprove()}
        title="Setujui Permohonan?"
        message={`Apakah Anda yakin ingin menyetujui permohonan ${selectedItem?.penduduk?.nama_lengkap}?`}
      />

      {/* Modal Reject */}
      <ConfirmationModal
        isOpen={modalRejectOpen}
        onClose={() => {
          setModalRejectOpen(false);
          setAlasan("");
        }}
        onConfirm={() => void handleReject()}
        title="Batalkan Permohonan?"
        message={`Apakah Anda yakin ingin membatalkan permohonan ${selectedItem?.penduduk?.nama_lengkap}?`}
      >
        <textarea
          value={alasan}
          onChange={(e) => setAlasan(e.target.value)}
          placeholder="Masukkan alasan pembatalan"
          className="mt-4 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </ConfirmationModal>
    </div>
  );
};

export default TabelPermohonan;
