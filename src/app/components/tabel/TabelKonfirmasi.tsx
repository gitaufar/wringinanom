"use client";
import ButtonAction from "../button/ButtonAction";

const dataKonfirmasi = [
  {
    nik: "6403050303040001",
    nama: "Regasari Rekyan Permatasari",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "20-22-2020",
    alamat: "Dusun Besuki RT 028 RW 006",
    keterangan: "Kematian",
  },
  {
    nik: "6403050303040001",
    nama: "Regasari Rekyan Permatasari",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "20-22-2020",
    alamat: "Dusun Besuki RT 028 RW 006",
    keterangan: "Kelahiran",
  },
];

const TabelKonfirmasi = () => {
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
            <th className="py-3 px-4">KETERANGAN</th>
            <th className="py-3 px-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {dataKonfirmasi.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-4 px-4 align-middle">{item.nik}</td>
              <td className="py-4 px-4 align-middle">{item.nama}</td>
              <td className="py-4 px-4 align-middle">{item.jenisKelamin}</td>
              <td className="py-4 px-4 align-middle">{item.tanggalLahir}</td>
              <td className="py-4 px-4 align-middle">{item.alamat}</td>
              <td className="py-4 px-4 align-middle">{item.keterangan}</td>
              <td className="py-4 px-4 align-middle"><ButtonAction editData={() => console.log("Edit")} deleteData={() => console.log("Delete")}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelKonfirmasi;
