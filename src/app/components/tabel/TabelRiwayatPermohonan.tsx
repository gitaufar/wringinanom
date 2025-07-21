"use client";

import { useEffect, useState } from "react";
import StatusCard from "../../components/card/StatusCard";
import { FaEye, FaTrashAlt } from "react-icons/fa";

type DataRiwayat = {
  no_resi: string;
  penduduk: {
    nama_lengkap: string;
  };
  date: string;
  keterangan: string;
  status: "Menunggu" | "Selesai" | "Dibatalkan";
  permohonan?: {
    jenis_surat: string;
  };
};

type TabelRiwayatPermohonanProps = {
  change: boolean;
};

const TabelRiwayatPermohonan = ({ change }: TabelRiwayatPermohonanProps) => {
  const [dataRiwayat, setDataRiwayat] = useState<DataRiwayat[]>([]);

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const res = await fetch("/api/layanan");
        const json = await res.json();

        if (Array.isArray(json)) {
          const filtered = json.filter(
            (item: any) => item.status?.toLowerCase() !== "menunggu"
          );

          const mappedData: DataRiwayat[] = filtered.map((item: any) => ({
            no_resi: item.no_resi,
            penduduk: {
              nama_lengkap: item.penduduk?.nama_lengkap ?? "Tidak diketahui",
            },
            date: item.date,
            keterangan: item.keterangan ?? "-",
            status: item.status,
            permohonan: {
              jenis_surat: item.permohonan?.jenis_surat ?? "-",
            },
          }));

          setDataRiwayat(mappedData);
        } else {
          console.error("Response bukan array:", json);
        }
      } catch (error) {
        console.error("Gagal fetch data dari /api/layanan:", error);
      }
    };

    fetchRiwayat();
  }, [change]);

  const handleDelete = async (noResi: string) => {
    const konfirmasi = confirm(`Yakin ingin menghapus riwayat #${noResi}?`);
    if (!konfirmasi) return;

    try {
      const res = await fetch(`/api/layanan/${noResi}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menghapus riwayat");
      }

      // Hapus data dari state agar langsung hilang dari UI
      setDataRiwayat((prev) => prev.filter((item) => item.no_resi !== noResi));
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus riwayat.");
      console.error("Gagal hapus riwayat:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mt-4 overflow-x-auto">
      {dataRiwayat.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Belum ada riwayat permohonan surat.
        </p>
      ) : (
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
            {dataRiwayat.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{row.no_resi}</td>
                <td className="px-6 py-4">{row.penduduk?.nama_lengkap}</td>
                <td className="px-6 py-4">
                  {new Date(row.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">{row.permohonan?.jenis_surat}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <button className="hover:text-blue-700">
                    <FaEye size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(row.no_resi)}
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <StatusCard status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TabelRiwayatPermohonan;
