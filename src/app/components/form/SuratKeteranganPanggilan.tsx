"use client";

import React, { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import { Calendar, Clock, MapPin, Clipboard, ChevronRight } from "lucide-react";

export default function SuratKeteranganPanggilan() {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");

  const [hari, setHari] = useState("Senin");
  const [tanggal, setTanggal] = useState("22-11-2025");
  const [jam, setJam] = useState("07:00");
  const [tempat, setTempat] = useState("Malang");
  const [keperluan, setKeperluan] = useState("Sidang");

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
              SURAT KETERANGAN PANGGILAN
            </h1>
            <p className="text-black text-base max-w-xl mx-auto">
              Silakan lengkapi data berikut untuk proses pengajuan surat.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Data Panggilan</h2>
            <InputField inputLabel="Hari" inputPlaceholder="Hari" data={hari} setData={setHari} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Tanggal" inputPlaceholder="Tanggal" data={tanggal} setData={setTanggal} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Jam" inputPlaceholder="Jam" data={jam} setData={setJam} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Tempat" inputPlaceholder="Tempat" data={tempat} setData={setTempat} setEditData={setEdit} editData={edit} submited={submited} />
            <InputField inputLabel="Keperluan" inputPlaceholder="Keperluan" data={keperluan} setData={setKeperluan} setEditData={setEdit} editData={edit} submited={submited} />
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