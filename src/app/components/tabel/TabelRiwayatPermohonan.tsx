"use client";

import { useEffect, useState } from "react";
import StatusCard from "../../components/card/StatusCard";
import { FaEye, FaTrashAlt } from "react-icons/fa";

type DataRiwayat = {
  noResi: string;
  nama: string;
  tanggal: string;
  jenisSurat: string;
  status: "Menunggu" | "Selesai" | "Dibatalkan";
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
            noResi: item.no_resi,
            nama: item.penduduk?.nama_lengkap ?? "Tidak diketahui",
            tanggal: new Date(item.date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            jenisSurat: item.keterangan ?? "-",
            status: item.status,
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
                <td className="px-6 py-4">{row.noResi}</td>
                <td className="px-6 py-4">{row.nama}</td>
                <td className="px-6 py-4">{row.tanggal}</td>
                <td className="px-6 py-4">{row.jenisSurat}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <button className="hover:text-blue-700">
                    <FaEye size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
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
