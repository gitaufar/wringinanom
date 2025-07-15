"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";

export default function PenambahanAnggotaForm() {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const [nama, setNama] = useState("");
  const [kotaKabupatenLahir, setKotaKabupatenLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("laki-laki");
  const [status, setStatus] = useState("");

  const [namaBaru, setNamaBaru] = useState("");
  const [kotaKabupatenBaru, setKotaKabupatenBaru] = useState("");
  const [tanggalLahirBaru, setTanggalLahirBaru] = useState("");
  const [jenisKelaminBaru, setJenisKelaminBaru] = useState("laki-laki");
  const [statusBaru, setStatusBaru] = useState("");
  const [namaAyah, setNamaAyah] = useState("");
  const [namaIbu, setNamaIbu] = useState("");
  const [hubunganDalamKeluarga, setHubunganDalamKeluarga] = useState("");

  const handleSubmit = () => {
    setSubmited("submit");
    setEdit(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
        <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0" />
        <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">
          Pengajuan Surat
        </div>
      </div>

      <div className="w-full pt-24 px-5 lg:px-[170px]">
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETERANGAN PENAMBAHAN ANGGOTA KELUARGA
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Silakan lengkapi data berikut untuk proses pengajuan surat.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Pengaju</h2>
            <InputField inputLabel="Nama" inputPlaceholder="Nama Pengaju" data={nama} setData={setNama} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={kotaKabupatenLahir} setData={setKotaKabupatenLahir} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={tanggalLahir} setData={setTanggalLahir} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Agama" inputPlaceholder="Agama" data={agama} setData={setAgama} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={pekerjaan} setData={setPekerjaan} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={alamat} setData={setAlamat} setEditData={setEdit} editData={edit} submited={submited} />
            {/* <InputField inputLabel="Jenis Kelamin" inputPlaceholder="Jenis Kelamin" data={jenisKelamin} setData={setJenisKelamin} setEditData={setEdit} editData={edit} submited={submited} /> */}
            <InputField inputLabel="Status" inputPlaceholder="Status" data={status} setData={setStatus} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Anggota Keluarga Baru</h2>
            <InputField inputLabel="Nama" inputPlaceholder="Nama" data={namaBaru} setData={setNamaBaru} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={kotaKabupatenBaru} setData={setKotaKabupatenBaru} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={tanggalLahirBaru} setData={setTanggalLahirBaru} setEditData={setEdit} editData={edit} submited={submited} />
            {/* <InputField inputLabel="Jenis Kelamin" inputPlaceholder="Jenis Kelamin" data={jenisKelaminBaru} setData={setJenisKelaminBaru} setEditData={setEdit} editData={edit} submited={submited} /> */}
            <InputField inputLabel="Status" inputPlaceholder="Status" data={statusBaru} setData={setStatusBaru} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Nama Ayah" inputPlaceholder="Nama Ayah" data={namaAyah} setData={setNamaAyah} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Nama Ibu" inputPlaceholder="Nama Ibu" data={namaIbu} setData={setNamaIbu} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Hubungan dalam Keluarga" inputPlaceholder="Hubungan" data={hubunganDalamKeluarga} setData={setHubunganDalamKeluarga} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          <div className="text-start">
            <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
              Submit
            </button>
          </div>
        </div>

        <div className="py-10 text-center text-sm text-neutral-500">
          © 2025 Pemerintah Desa. All rights reserved.
        </div>
      </div>
    </div>
  );
}
