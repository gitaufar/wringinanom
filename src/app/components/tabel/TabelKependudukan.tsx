"use client";
import { useEffect, useState } from "react";
import ButtonAction from "../button/ButtonAction";
import { format } from "date-fns";

type Penduduk = {
  nik: string;
  no_kk: string;
  nama_lengkap?: string;
  nama_ibu?: string;
  nama_ayah?: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  pendidikan: string;
  pekerjaan?: string;
  golongan_darah: string;
  status_perkawinan: string;
  tanggal_perkawinan?: string;
  status_keluarga: string;
  alamat: string;
  rt: number;
  rw: number;
};

const TabelKependudukan = () => {
  const [dataPenduduk, setDataPenduduk] = useState<Penduduk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPenduduk = async () => {
      try {
        const res = await fetch("/api/penduduk");
        const data = await res.json();
        setDataPenduduk(data);
        console.log("Data penduduk:", data);
      } catch (err) {
        console.error("Gagal fetch penduduk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPenduduk();
  }, []);

  return (
    <div className="bg-white rounded-xl border px-5 py-4 mt-0">
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-3 px-4">NIK</th>
            <th className="py-3 px-4">NAMA</th>
            <th className="py-3 px-4">JENIS KELAMIN</th>
            <th className="py-3 px-4">TANGGAL LAHIR</th>
            <th className="py-3 px-4">ALAMAT</th>
            <th className="py-3 px-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="py-4 px-4 text-center">
                Loading...
              </td>
            </tr>
          ) : dataPenduduk.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4 px-4 text-center">
                Tidak ada data penduduk
              </td>
            </tr>
          ) : (
            dataPenduduk.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-4 align-middle">{item.nik}</td>
                <td className="py-4 px-4 align-middle">{item.nama_lengkap}</td>
                <td className="py-4 px-4 align-middle">{item.nama_ibu}</td>
                <td className="py-4 px-4 align-middle">
                  {format(new Date(item.tanggal_lahir), "dd-MM-yyyy")}
                </td>
                <td className="py-4 px-4 align-middle">{item.alamat}</td>
                <td className="py-4 px-4 align-middle">
                  <ButtonAction
                    editData={() => console.log("Edit", item.nik)}
                    deleteData={() => console.log("Delete", item.nik)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {!loading && (
        <div className="text-sm text-gray-500 mt-2">
          Menampilkan 1-{dataPenduduk.length} dari {dataPenduduk.length}
        </div>
      )}
    </div>
  );
};

export default TabelKependudukan;
