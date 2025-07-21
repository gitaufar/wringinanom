"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import StatusCard from "../../components/card/StatusCard";

type DataPermintaan = {
  no_resi: string;
  penduduk: {
    nama_lengkap: string;
  };
  tanggal: string;
  jenis_surat: string;
  data_dinamis?: any;
  riwayat: {
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
  const [loading, setLoading] = useState(false); // buat error handling internal
  const [firstLoading, setFirstLoading] = useState(true); // hanya true pertama kali buka
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPermohonan = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/permohonan");
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Gagal fetch Permohonan");
        console.log(result.data);
        const onlyMenunggu = (result.data || []).filter(
          (x: DataPermintaan) => x.riwayat?.status === "Menunggu"
        );

        setPermohonan(onlyMenunggu);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
        setFirstLoading(false); // hanya false setelah fetch pertama selesai
      }
    };

    fetchPermohonan(); // panggil pertama kali

    const interval = setInterval(fetchPermohonan, 5000); // polling tiap 5 detik
    return () => clearInterval(interval); // cleanup saat unmount
  }, []);

  const handleApprove = async (
    noResi: string,
    jenisSurat: string,
    dataDinamis: any,
    nama: string
  ) => {
    console.log(jenisSurat)
    try {
      // Unduh file
      const fileRes = await fetch(`/api/surat/${jenisSurat}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataDinamis),
      });
      const blob = await fileRes.blob();

      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `${noResi}-${nama}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Ubah status jadi "Selesai"
      // const updateRes = await fetch("/api/permohonan/status", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     no_resi: noResi,
      //     status_baru: "Selesai",
      //   }),
      // });

      // if (!updateRes.ok) {
      //   throw new Error("Gagal mengubah status menjadi selesai");
      // }

      // // Hapus permohonan dari database
      // await fetch(`/api/permohonan?no_resi=${noResi}`, {
      //   method: "DELETE",
      // });

      // Hapus dari state lokal
      setPermohonan((prev) => prev.filter((item) => item.no_resi !== noResi));
      setChange(!change);
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat memproses permintaan.");
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
            <th className="px-6 py-3 font-semibold">TANGGAL PERMINTAAN</th>
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
                  <button className="text-green-600 hover:text-green-700">
                    <FaCheck
                      size={16}
                      onClick={() =>
                        handleApprove(
                          row.no_resi,
                          row.jenis_surat,
                          row.data_dinamis,
                          row.penduduk.nama_lengkap
                        )
                      }
                    />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTimes size={16} />
                  </button>
                  <button className="hover:text-blue-700">
                    <FaEye size={16} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <StatusCard status={row.riwayat?.status || "Menunggu"} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabelPermohonan;
