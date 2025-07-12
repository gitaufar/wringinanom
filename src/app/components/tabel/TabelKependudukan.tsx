"use client";
import ButtonAction from "../button/ButtonAction";

const dataPenduduk = Array(7).fill({
  nik: "6403050303040001",
  nama: "Regasari Rekyan Permatasari",
  jenisKelamin: "Laki-laki",
  tanggalLahir: "20-22-2020",
  alamat: "Dusun Besuki RT 028 RW 006",
});

const TabelKependudukan = () => {
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
  {dataPenduduk.map((item, index) => (
    <tr key={index} className="border-b">
      <td className="py-4 px-4 align-middle">{item.nik}</td>
      <td className="py-4 px-4 align-middle">{item.nama}</td>
      <td className="py-4 px-4 align-middle">{item.jenisKelamin}</td>
      <td className="py-4 px-4 align-middle">{item.tanggalLahir}</td>
      <td className="py-4 px-4 align-middle">{item.alamat}</td>
      <td className="py-4 px-4 align-middle"><ButtonAction /></td>
    </tr>
  ))}
</tbody>

      </table>
      <div className="text-sm text-gray-500 mt-2">Menampilkan 1-09 dari 78</div>
    </div>
  );
};

export default TabelKependudukan;