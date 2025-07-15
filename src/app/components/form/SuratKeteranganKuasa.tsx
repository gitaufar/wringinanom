"use client";

import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { useState } from "react";

export default function BelumMenikahForm() {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const [namaPengaju, setNamaPengaju] = useState("");
  const [nikPengaju, setNikPengaju] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [nomorKK, setNomorKK] = useState("");
  const [kotaLahir, setKotaLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [agama, setAgama] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [hubunganPK, setHubunganPK] = useState("");

  const handleSubmit = () => {
    setSubmited("submit");
    setEdit(false);
  };

  return (
       <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Top Bar */}
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
              SURAT KETERANGAN BELUM MENIKAH
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Silakan lengkapi data berikut untuk proses pengajuan surat.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          <div className="space-y-3">
            <h1 className="text-xl font-bold">Data Pemberi Kuasa</h1>
            <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={namaPengaju} setData={setNamaPengaju} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={kotaLahir} setData={setKotaLahir} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={tanggalLahir} setData={setTanggalLahir} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={nikPengaju} setData={setNikPengaju} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
            {/* JENISKELAMIN */}
            <InputField inputLabel="Agama" inputPlaceholder="Agama" data={agama} setData={setAgama} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={alamat} setData={setAlamat} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Penerima Kuasa</h2>
            <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={namaLengkap} setData={setNamaLengkap} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={kotaLahir} setData={setKotaLahir} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tanggal Lahir" data={tanggalLahir} setData={setTanggalLahir} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="NIK" inputPlaceholder="NIK" data={nikPengaju} setData={setNikPengaju} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
            {/* JENISKELAMIN */}
            <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="Nomor KK" data={nomorKK} setData={setNomorKK} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Agama" inputPlaceholder="Agama" data={agama} setData={setAgama} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={pekerjaan} setData={setPekerjaan} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={alamat} setData={setAlamat} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Hubungan Pemberi Kuasa" inputPlaceholder="Co. Anak kandung" data={hubunganPK} setData={setHubunganPK} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          <div className="text-start">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
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
