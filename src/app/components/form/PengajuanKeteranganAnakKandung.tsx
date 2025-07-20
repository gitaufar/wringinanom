"use client";
import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type PengajuanKeteranganAnakKandungProps = {
  tipe: String;
};

export default function PengajuanKeteranganAnakKandung({ tipe }: PengajuanKeteranganAnakKandungProps) {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ title: string; resi: string } | null>(null);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const initialState = {
    namaPengaju: "",
    nikPengaju: "",
    namaLengkap: "",
    alamatAnak: "",
    anakKe: "",
    darixSaudara: "",
    kotaLahir: "",
    tanggalLahir: "",
    ayah: { nama: "", kotaLahir: "", tanggalLahir: "", alamat: "", pekerjaan: "" },
    ibu: { nama: "", kotaLahir: "", tanggalLahir: "", alamat: "", pekerjaan: "" },
  };

  const [form, setForm] = useState(initialState);

  const handleSubmit = () => setShowConfirmModal(true);

  const handleConfirm = async () => {
    setEdit(false);
    setLoading(true);

    const data_dinamis = {
      namaPengaju: form.namaPengaju,
      namaLengkap: form.namaLengkap,
      alamatAnak: form.alamatAnak,
      anakKe: form.anakKe,
      darixSaudara: form.darixSaudara,
      kotaLahir: form.kotaLahir,
      tanggalLahir: form.tanggalLahir,
      ayah: form.ayah,
      ibu: form.ibu,
    };

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: form.nikPengaju,
          jenis_surat: "SK Anak Kandung",
          tipe,
          keterangan: `Pengajuan Surat Keterangan Anak Kandung oleh ${form.namaPengaju}`,
          data_dinamis,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal mengirim permohonan");

      setSuccessInfo({ title: "Pengajuan Berhasil!", resi: result.permohonan.no_resi });
    } catch (err: any) {
      setErrorInfo(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialState);
    setEdit(true);
    setSubmited("");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-white font-roboto">
        <div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0" />
          <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">Pengajuan Surat</div>
        </div>

        <div className="w-full pt-24 px-5 lg:px-[170px]">
          <div className="flex justify-center items-center py-10 text-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-black text-[32px] lg:text-[40px] font-bold">SURAT KETERANGAN ANAK KANDUNG</h1>
              <p className="text-black text-base max-w-xl mx-auto">Silakan lengkapi data berikut untuk proses pengajuan surat.</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
            <div className="space-y-3">
              <h2 className="text-xl font-bold">Nama Pengaju</h2>
              <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={form.namaPengaju} setData={(val) => setForm({ ...form, namaPengaju: val })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputField inputLabel="NIK" inputPlaceholder="NIK Pengaju" data={form.nikPengaju} setData={(val) => setForm({ ...form, nikPengaju: val })} setEditData={setEdit} editData={edit} submited={submited} numberOnly />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold">Data Anak</h2>
              <InputField inputLabel="Nama Anak" inputPlaceholder="Nama Lengkap Anak" data={form.namaLengkap} setData={(val) => setForm({ ...form, namaLengkap: val })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir Anak" data={form.kotaLahir} setData={(val) => setForm({ ...form, kotaLahir: val })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputFieldDate inputLabel="Tanggal Lahir" data={form.tanggalLahir} setData={(val) => setForm({ ...form, tanggalLahir: val })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputField inputLabel="Alamat Anak" inputPlaceholder="Alamat Domisili Anak" data={form.alamatAnak} setData={(val) => setForm({ ...form, alamatAnak: val })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputField inputLabel="Adalah anak ke-" inputPlaceholder="Contoh: 1" data={form.anakKe} setData={(val) => setForm({ ...form, anakKe: val })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputField inputLabel="Dari x Saudara" inputPlaceholder="Contoh: 3" data={form.darixSaudara} setData={(val) => setForm({ ...form, darixSaudara: val })} setEditData={setEdit} editData={edit} submited={submited} />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold">Data Ayah</h2>
              <InputField inputLabel="Nama Ayah" inputPlaceholder="Nama Lengkap Ayah" data={form.ayah.nama} setData={(val) => setForm({ ...form, ayah: { ...form.ayah, nama: val } })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputField inputLabel="Kota/Kabupaten Lahir Ayah" inputPlaceholder="Kota/Kabupaten Lahir Ayah" data={form.ayah.kotaLahir} setData={(val) => setForm({ ...form, ayah: { ...form.ayah, kotaLahir: val } })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputFieldDate inputLabel="Tanggal Lahir Ayah" data={form.ayah.tanggalLahir} setData={(val) => setForm({ ...form, ayah: { ...form.ayah, tanggalLahir: val } })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputField inputLabel="Alamat Ayah" inputPlaceholder="Alamat Domisili Ayah" data={form.ayah.alamat} setData={(val) => setForm({ ...form, ayah: { ...form.ayah, alamat: val } })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputField inputLabel="Pekerjaan Ayah" inputPlaceholder="Pekerjaan Ayah" data={form.ayah.pekerjaan} setData={(val) => setForm({ ...form, ayah: { ...form.ayah, pekerjaan: val } })} setEditData={setEdit} editData={edit} submited={submited} />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold">Data Ibu</h2>
              <InputField inputLabel="Nama Ibu" inputPlaceholder="Nama Lengkap Ibu" data={form.ibu.nama} setData={(val) => setForm({ ...form, ibu: { ...form.ibu, nama: val } })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputField inputLabel="Kota/Kabupaten Lahir Ibu" inputPlaceholder="Kota/Kabupaten Lahir Ibu" data={form.ibu.kotaLahir} setData={(val) => setForm({ ...form, ibu: { ...form.ibu, kotaLahir: val } })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputFieldDate inputLabel="Tanggal Lahir Ibu" data={form.ibu.tanggalLahir} setData={(val) => setForm({ ...form, ibu: { ...form.ibu, tanggalLahir: val } })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputField inputLabel="Alamat Ibu" inputPlaceholder="Alamat Domisili Ibu" data={form.ibu.alamat} setData={(val) => setForm({ ...form, ibu: { ...form.ibu, alamat: val } })} setEditData={setEdit} editData={edit} submited={submited} />
              <InputField inputLabel="Pekerjaan Ibu" inputPlaceholder="Pekerjaan Ibu" data={form.ibu.pekerjaan} setData={(val) => setForm({ ...form, ibu: { ...form.ibu, pekerjaan: val } })} setEditData={setEdit} editData={edit} submited={submited} />
            </div>

            <div className="flex gap-4">
              <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">Submit</button>
              <button type="button" onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md">Reset</button>
            </div>
          </div>

          <div className="py-10 text-center text-sm text-neutral-500">
            © 2025 Pemerintah Desa. All rights reserved.
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal || successInfo !== null || errorInfo !== null}
        onClose={() => {
          setShowConfirmModal(false);
          setErrorInfo(null);
          if (successInfo) window.location.href = "/";
        }}
        onConfirm={handleConfirm}
        isLoading={loading}
        title={errorInfo ? "Gagal Mengirim" : "Konfirmasi Pengajuan"}
        message={errorInfo || "Apakah Anda yakin semua data sudah benar?"}
        successInfo={successInfo}
      />
    </>
  );
}
