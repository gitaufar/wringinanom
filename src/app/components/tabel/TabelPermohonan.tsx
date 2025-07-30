"use client";

import { JSX, useEffect, useState } from "react";
import { FaPhone, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import StatusCard from "../../components/card/StatusCard";
import * as mammoth from "mammoth";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";

type Status = "Menunggu" | "Selesai" | "Dibatalkan";

type DataPermintaan = {
  no_resi: string;
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

type TabelPermohonanProps = {
  search: string;
  setChange: (value: boolean) => void;
  change: boolean;
};

const TabelPermohonan = ({ setChange, change }: TabelPermohonanProps): JSX.Element => {
  const [Permohonan, setPermohonan] = useState<DataPermintaan[]>([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const [modalApproveOpen, setModalApproveOpen] = useState(false);
  const [modalRejectOpen, setModalRejectOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataPermintaan | null>(null);
  const [alasan, setAlasan] = useState("");

  useEffect(() => {
    const fetchPermohonan = async (): Promise<void> => {
      try {
        const res = await fetch("/api/permohonan");
        const result = (await res.json()) as { data?: DataPermintaan[]; error?: string };

        if (!res.ok) throw new Error(result.error || "Gagal fetch Permohonan");

        const onlyMenunggu = (result.data || []).filter(
          (x) => x.riwayatlayanan?.status === "Menunggu"
        );

        setPermohonan(onlyMenunggu);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Terjadi Kesalahan";
        alert(message);
      } finally {
        setFirstLoading(false);
      }
    };

    void fetchPermohonan(); // ditandai void agar aman sesuai ESLint
    const interval = setInterval(() => void fetchPermohonan(), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (): Promise<void> => {
    if (!selectedItem) return;
    const { no_resi, jenis_surat, data_dinamis, penduduk } = selectedItem;
    try {
      const fileRes = await fetch(`/api/surat/${jenis_surat}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data_dinamis),
      });

      const blob = await fileRes.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `${no_resi}-${penduduk.nama_lengkap}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await fetch("/api/permohonan/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_resi, status_baru: "Selesai" }),
      });

      await fetch(`/api/permohonan?no_resi=${no_resi}`, { method: "DELETE" });

      setPermohonan((prev) => prev.filter((item) => item.no_resi !== no_resi));
      setChange(!change);
      setModalApproveOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan saat menyetujui.";
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
      const message = err instanceof Error ? err.message : "Gagal membatalkan permohonan.";
      alert(message);
    }
  };

  const handlePreview = async (
    jenisSurat: string,
    dataDinamis: Record<string, unknown>
  ): Promise<void> => {
    try {
      const res = await fetch(`/api/surat/${jenisSurat}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataDinamis),
      });

      if (!res.ok) throw new Error("Gagal ambil dokumen");

      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

      const printWindow = window.open("", "_blank", "width=800,height=600");
      if (printWindow) {
        printWindow.document.write(`
          <html><head><title>Preview</title></head><body>${html}</body></html>
        `);
        printWindow.document.close();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal preview dokumen";
      alert("Gagal preview dokumen: " + message);
    }
  };

  if (firstLoading) return <p className="mt-4">Loading Permohonan...</p>;

  return (
    <div className="overflow-x-auto">
  <div className="min-w-[800px] bg-white border border-gray-200 rounded-lg mt-8 shadow-sm overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50">
        <tr>
          {["NO RESI", "NAMA", "TANGGAL", "JENIS SURAT", "ACTION", "STATUS"].map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {Permohonan.length === 0 ? (
          <tr>
            <td colSpan={6} className="py-6 text-center text-gray-500">
              Tidak ada Permohonan ditemukan.
            </td>
          </tr>
        ) : (
          Permohonan.map((row) => (
            <tr key={row.no_resi} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-700">{row.no_resi}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{row.penduduk?.nama_lengkap}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {new Date(row.tanggal).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{row.jenis_surat}</td>
              <td className="px-6 py-4 flex space-x-2">
                <button className="p-2 rounded hover:bg-gray-100" title="Edit">
                  <FaPhone className="text-gray-600" size={14} />
                </button>
                <button
                  className="p-2 rounded hover:bg-green-50"
                  title="Setujui"
                  onClick={() => {

                  }}
                >
                  <FaCheck className="text-green-600" size={16} />
                </button>
                <button
                  className="p-2 rounded hover:bg-red-50"
                  title="Tolak"
                  onClick={() => {
                    setSelectedItem(row);
                    setModalRejectOpen(true);
                  }}
                >
                  <FaTimes className="text-red-500" size={16} />
                </button>
                <button
                  className="p-2 rounded hover:bg-blue-50"
                  title="Preview"
                  onClick={() => {
                    if (row.data_dinamis) {
                      void handlePreview(row.jenis_surat, row.data_dinamis);
                    } else {
                      alert("Data dinamis tidak tersedia untuk surat ini.");
                    }
                  }}
                >
                  <FaEye className="text-blue-600" size={16} />
                </button>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <StatusCard status={row.riwayatlayanan?.status || "Menunggu"} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

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
      className="mt-4 w-full border border-gray-300 rounded-md p-2 text-sm"
      rows={3}
    />
  </ConfirmationModal>
</div>

  );
};

export default TabelPermohonan;