"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import StatusCard from "../../components/card/StatusCard";
import * as mammoth from "mammoth";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";

type DataPermintaan = {
  no_resi: string;
  penduduk: {
    nama_lengkap: string;
  };
  tanggal: string;
  jenis_surat: string;
  data_dinamis?: any;
  riwayatlayanan: {
    status: "Menunggu" | "Selesai" | "Dibatalkan";
  };
};

type TabelPermohonanProps = {
  search: string;
  setChange: (value: boolean) => void;
  change: boolean;
};

const TabelPermohonan = ({
  search = "",
  setChange,
  change,
}: TabelPermohonanProps) => {
  const [Permohonan, setPermohonan] = useState<DataPermintaan[]>([]);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalApproveOpen, setModalApproveOpen] = useState(false);
  const [modalRejectOpen, setModalRejectOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataPermintaan | null>(null);

  const [alasan, setAlasan] = useState("");

  useEffect(() => {
    const fetchPermohonan = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/permohonan");
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Gagal fetch Permohonan");

        const onlyMenunggu = (result.data || []).filter(
          (x: DataPermintaan) => x.riwayatlayanan?.status === "Menunggu"
        );

        setPermohonan(onlyMenunggu);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
        setFirstLoading(false);
      }
    };

    fetchPermohonan();
    const interval = setInterval(fetchPermohonan, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async () => {
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
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menyetujui.");
    }
  };

  const handleReject = async () => {
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
      setAlasan(""); // Reset input
      setChange(!change);
      setModalRejectOpen(false);
    } catch (err: any) {
      alert("Gagal membatalkan permohonan");
    }
  };

  const handlePreview = async (jenisSurat: string, dataDinamis: any) => {
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
    } catch (err: any) {
      alert("Gagal preview dokumen: " + err.message);
    }
  };

  if (firstLoading) return <p className="mt-4">Loading Permohonan...</p>;
  if (error) return <p className="text-red-500 mt-4">❌ {error}</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm mt-4 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="text-left bg-[#F9FAFB] border-b">
          <tr>
            <th className="px-6 py-3 font-semibold">NO RESI</th>
            <th className="px-6 py-3 font-semibold">NAMA</th>
            <th className="px-6 py-3 font-semibold">TANGGAL</th>
            <th className="px-6 py-3 font-semibold">JENIS SURAT</th>
            <th className="px-6 py-3 font-semibold">ACTION</th>
            <th className="px-6 py-3 font-semibold">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {Permohonan.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                Tidak ada Permohonan ditemukan.
              </td>
            </tr>
          ) : (
            Permohonan.map((row) => (
              <tr key={row.no_resi} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{row.no_resi}</td>
                <td className="px-6 py-4">{row.penduduk?.nama_lengkap}</td>
                <td className="px-6 py-4">
                  {new Date(row.tanggal).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">{row.jenis_surat}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <button className="text-gray-600 hover:text-blue-600">
                    <FaEdit size={16} />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-700"
                    onClick={() => {
                      setSelectedItem(row);
                      setModalApproveOpen(true);
                    }}
                  >
                    <FaCheck size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setSelectedItem(row);
                      setModalRejectOpen(true);
                    }}
                  >
                    <FaTimes size={16} />
                  </button>
                  <button
                    className="hover:text-blue-700"
                    onClick={() =>
                      handlePreview(row.jenis_surat, row.data_dinamis)
                    }
                  >
                    <FaEye size={16} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <StatusCard
                    status={row.riwayatlayanan?.status || "Menunggu"}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* MODAL APPROVE */}
      <ConfirmationModal
        isOpen={modalApproveOpen}
        onClose={() => setModalApproveOpen(false)}
        onConfirm={handleApprove}
        title="Setujui Permohonan?"
        message={`Apakah Anda yakin ingin menyetujui permohonan ${selectedItem?.penduduk?.nama_lengkap}?`}
      />

      {/* MODAL REJECT */}
      <ConfirmationModal
        isOpen={modalRejectOpen}
        onClose={() => {
          setModalRejectOpen(false);
          setAlasan("");
        }}
        onConfirm={handleReject}
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
