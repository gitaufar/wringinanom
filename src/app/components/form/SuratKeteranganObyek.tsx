"use client";

import { useState } from "react";
import InputField from "../field/InputField";
import InputFieldDate from "../field/InputFieldDate";

export default function PenambahanAnggotaForm() {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  // Data Pengaju
  const [nama, setNama] = useState("");
  const [NOP, setNOP] = useState("");
  const [AlmatObyek, setAlamatObyek] = useState("");
  const [Alamatwajib, setAlamatWajib] = useState("");
  const [luas, setLuas] = useState("");
  const [NJOP, setNJOP] = useState("");
  const [TotalNJOP, setTotalNJOP] = useState("");
  const [Tahundata, setTahundata] = useState("");
  const [tahunbelumterbitang, setTahunBelumTerbit] = useState("");
  const [tujuanpengajuan, setTujuanPengajuan] = useState("");

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

      {/* Main Content */}
      <div className="w-full pt-24 px-5 lg:px-[170px]">
        <div className="flex justify-center items-center py-10 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
              SURAT KETRANGAN OBYEK
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Silakan lengkapi data berikut untuk proses pengajuan surat.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          {/* Data Pengaju */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Nama Pengaju</h2>
            <InputField inputLabel="Nama" inputPlaceholder="Nama Pengaju" data={nama} setData={setNama} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="NOP" inputPlaceholder="Nomor Objek Pajak" data={NOP} setData={setNOP} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Alamat Obyek" inputPlaceholder="Alamat Obyek" data={AlmatObyek} setData={setAlamatObyek} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Alamat Wajib Pajak" inputPlaceholder="Alamat Wajib Pajak" data={Alamatwajib} setData={setAlamatWajib} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Luas Obyek" inputPlaceholder="Luas Obyek" data={luas} setData={setLuas} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="NJOP" inputPlaceholder="Co. 200000" data={NJOP} setData={setNJOP} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Total NJOP" inputPlaceholder="Co. 24.000.000" data={TotalNJOP} setData={setTotalNJOP} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tahun Data" data={Tahundata} setData={setTahundata} setEditData={setEdit} editData={edit} submited={submited} />
            <InputFieldDate inputLabel="Tahun Belum Terbit" data={tahunbelumterbitang} setData={setTahunBelumTerbit} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Tujuan Pengajuan" inputPlaceholder="Co. Pelengkap dokumen jual beli tanah" data={tujuanpengajuan} setData={setTujuanPengajuan} setEditData={setEdit} editData={edit} submited={submited} />
          </div>

          {/* Submit */}
          <div className="text-start">
            <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
              Submit
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="py-10 text-center text-sm text-neutral-500">
          © 2025 Pemerintah Desa. All rights reserved.
        </div>
      </div>
    </div>
  );
}
