"use client";
import { useState } from "react";
import InputField from "../../components/field/InputField";
import InputFieldDate from "../../components/field/InputFieldDate";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

type PengajuanKeteranganAnakKandungProps = {
  tipe: string;
};

// BARU: Tipe untuk objek error
type FormErrors = {
  [key: string]: string | undefined;
};

export default function PengajuanKeteranganAnakKandung({
  tipe,
}: PengajuanKeteranganAnakKandungProps) {
  const [edit, setEdit] = useState(true);
  const [submited, setSubmited] = useState<string | null>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

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

  // BARU: Fungsi untuk validasi semua field, termasuk yang nested
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Validasi field level atas
    if (!form.namaPengaju.trim()) newErrors.namaPengaju = "Nama Pengaju wajib diisi.";
    if (!form.nikPengaju.trim()) newErrors.nikPengaju = "NIK Pengaju wajib diisi.";
    if (!form.namaLengkap.trim()) newErrors.namaLengkap = "Nama Anak wajib diisi.";
    if (!form.alamatAnak.trim()) newErrors.alamatAnak = "Alamat Anak wajib diisi.";
    if (!form.anakKe.trim()) newErrors.anakKe = "Anak ke- wajib diisi.";
    if (!form.darixSaudara.trim()) newErrors.darixSaudara = "Informasi saudara wajib diisi.";
    if (!form.kotaLahir.trim()) newErrors.kotaLahir = "Kota Lahir Anak wajib diisi.";
    if (!form.tanggalLahir.trim()) newErrors.tanggalLahir = "Tanggal Lahir Anak wajib diisi.";

    // Validasi field nested untuk Ayah
    if (!form.ayah.nama.trim()) newErrors.ayah_nama = "Nama Ayah wajib diisi.";
    if (!form.ayah.kotaLahir.trim()) newErrors.ayah_kotaLahir = "Kota Lahir Ayah wajib diisi.";
    if (!form.ayah.tanggalLahir.trim()) newErrors.ayah_tanggalLahir = "Tanggal Lahir Ayah wajib diisi.";
    if (!form.ayah.alamat.trim()) newErrors.ayah_alamat = "Alamat Ayah wajib diisi.";
    if (!form.ayah.pekerjaan.trim()) newErrors.ayah_pekerjaan = "Pekerjaan Ayah wajib diisi.";
    
    // Validasi field nested untuk Ibu
    if (!form.ibu.nama.trim()) newErrors.ibu_nama = "Nama Ibu wajib diisi.";
    if (!form.ibu.kotaLahir.trim()) newErrors.ibu_kotaLahir = "Kota Lahir Ibu wajib diisi.";
    if (!form.ibu.tanggalLahir.trim()) newErrors.ibu_tanggalLahir = "Tanggal Lahir Ibu wajib diisi.";
    if (!form.ibu.alamat.trim()) newErrors.ibu_alamat = "Alamat Ibu wajib diisi.";
    if (!form.ibu.pekerjaan.trim()) newErrors.ibu_pekerjaan = "Pekerjaan Ibu wajib diisi.";

    return newErrors;
  };

  // DIUBAH: handleSubmit sekarang menjalankan validasi terlebih dahulu
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Hentikan proses jika ada error
    }
    setErrors({}); // Bersihkan error jika berhasil
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setSubmited("");
    setLoading(true);

    const angkaNum = parseInt(form.anakKe || "0");
    const angkaNum2 = parseInt(form.darixSaudara || "0");

    try {
      const res = await fetch("/api/permohonan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nik: form.nikPengaju,
          jenis_surat: "SK Anak Kandung",
          tipe,
          keterangan: `Pengajuan Surat Keterangan Anak Kandung oleh ${form.namaPengaju}`,
          data_dinamis:{
            namaAnak: form.namaLengkap,
            kotaAnak: form.kotaLahir,
            tanggalLahirAnak: form.tanggalLahir,
            alamatAnak: form.alamatAnak,
            namaIbu: form.ibu.nama,
            kotaIbu: form.ibu.kotaLahir,
            tanggalLahirIbu: form.ibu.tanggalLahir,
            pekerjaanIbu: form.ibu.pekerjaan,
            alamatIbu: form.ibu.alamat,
            namaAyah: form.ayah.nama,
            kotaAyah: form.ayah.kotaLahir,
            tanggalLahirAyah: form.ayah.tanggalLahir,
            pekerjaanAyah: form.ayah.pekerjaan,
            alamatAyah: form.ayah.alamat,
            angkaNum: angkaNum,
            angkaNum2: angkaNum2,
          },
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal mengirim permohonan");
      window.location.href = `/${result.permohonan.no_resi}`;

    } catch (err) {
      if (err instanceof Error) {
        setErrorInfo(`Terjadi kesalahan: ${err.message}`);
      } else {
        setErrorInfo("Terjadi kesalahan yang tidak diketahui.");
      }
      setEdit(true); // Izinkan edit kembali jika ada error
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialState);
    setErrors({}); // BARU: Reset error juga saat form di-reset
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
          
          <form
            onSubmit={handleSubmit}
            noValidate
            className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8"
          >
            {/* DIUBAH: Semua komponen InputField dan InputFieldDate sekarang memiliki
              prop 'error' dan 'setData' nya diperbarui untuk menghapus error saat mengetik.
            */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold">Nama Pengaju</h2>
              <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={form.namaPengaju} setData={(val) => { setForm({ ...form, namaPengaju: val }); if(errors.namaPengaju) setErrors(prev => ({...prev, namaPengaju: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.namaPengaju} />
              <InputField inputLabel="NIK" inputPlaceholder="NIK Pengaju" data={form.nikPengaju} setData={(val) => { setForm({ ...form, nikPengaju: val }); if(errors.nikPengaju) setErrors(prev => ({...prev, nikPengaju: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} numberOnly error={errors.nikPengaju} />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold">Data Anak</h2>
              <InputField inputLabel="Nama Anak" inputPlaceholder="Nama Lengkap Anak" data={form.namaLengkap} setData={(val) => { setForm({ ...form, namaLengkap: val }); if(errors.namaLengkap) setErrors(prev => ({...prev, namaLengkap: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.namaLengkap} />
              <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir Anak" data={form.kotaLahir} setData={(val) => { setForm({ ...form, kotaLahir: val }); if(errors.kotaLahir) setErrors(prev => ({...prev, kotaLahir: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.kotaLahir} />
              <InputFieldDate inputLabel="Tanggal Lahir" data={form.tanggalLahir} setData={(val) => { setForm({ ...form, tanggalLahir: val }); if(errors.tanggalLahir) setErrors(prev => ({...prev, tanggalLahir: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.tanggalLahir} />
              <InputField inputLabel="Alamat Anak" inputPlaceholder="Alamat Domisili Anak" data={form.alamatAnak} setData={(val) => { setForm({ ...form, alamatAnak: val }); if(errors.alamatAnak) setErrors(prev => ({...prev, alamatAnak: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.alamatAnak} />
              <InputField inputLabel="Adalah anak ke-" inputPlaceholder="Contoh: 1" data={form.anakKe} setData={(val) => { setForm({ ...form, anakKe: val }); if(errors.anakKe) setErrors(prev => ({...prev, anakKe: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.anakKe} />
              <InputField inputLabel="Dari x Saudara" inputPlaceholder="Contoh: 3" data={form.darixSaudara} setData={(val) => { setForm({ ...form, darixSaudara: val }); if(errors.darixSaudara) setErrors(prev => ({...prev, darixSaudara: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.darixSaudara} />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold">Data Ayah</h2>
              <InputField inputLabel="Nama Ayah" inputPlaceholder="Nama Lengkap Ayah" data={form.ayah.nama} setData={(val) => { setForm({ ...form, ayah: { ...form.ayah, nama: val } }); if(errors.ayah_nama) setErrors(prev => ({...prev, ayah_nama: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.ayah_nama} />
              <InputField inputLabel="Kota/Kabupaten Lahir Ayah" inputPlaceholder="Kota/Kabupaten Lahir Ayah" data={form.ayah.kotaLahir} setData={(val) => { setForm({ ...form, ayah: { ...form.ayah, kotaLahir: val } }); if(errors.ayah_kotaLahir) setErrors(prev => ({...prev, ayah_kotaLahir: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.ayah_kotaLahir} />
              <InputFieldDate inputLabel="Tanggal Lahir Ayah" data={form.ayah.tanggalLahir} setData={(val) => { setForm({ ...form, ayah: { ...form.ayah, tanggalLahir: val } }); if(errors.ayah_tanggalLahir) setErrors(prev => ({...prev, ayah_tanggalLahir: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.ayah_tanggalLahir} />
              <InputField inputLabel="Alamat Ayah" inputPlaceholder="Alamat Domisili Ayah" data={form.ayah.alamat} setData={(val) => { setForm({ ...form, ayah: { ...form.ayah, alamat: val } }); if(errors.ayah_alamat) setErrors(prev => ({...prev, ayah_alamat: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.ayah_alamat} />
              <InputField inputLabel="Pekerjaan Ayah" inputPlaceholder="Pekerjaan Ayah" data={form.ayah.pekerjaan} setData={(val) => { setForm({ ...form, ayah: { ...form.ayah, pekerjaan: val } }); if(errors.ayah_pekerjaan) setErrors(prev => ({...prev, ayah_pekerjaan: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.ayah_pekerjaan} />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold">Data Ibu</h2>
              <InputField inputLabel="Nama Ibu" inputPlaceholder="Nama Lengkap Ibu" data={form.ibu.nama} setData={(val) => { setForm({ ...form, ibu: { ...form.ibu, nama: val } }); if(errors.ibu_nama) setErrors(prev => ({...prev, ibu_nama: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.ibu_nama} />
              <InputField inputLabel="Kota/Kabupaten Lahir Ibu" inputPlaceholder="Kota/Kabupaten Lahir Ibu" data={form.ibu.kotaLahir} setData={(val) => { setForm({ ...form, ibu: { ...form.ibu, kotaLahir: val } }); if(errors.ibu_kotaLahir) setErrors(prev => ({...prev, ibu_kotaLahir: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.ibu_kotaLahir} />
              <InputFieldDate inputLabel="Tanggal Lahir Ibu" data={form.ibu.tanggalLahir} setData={(val) => { setForm({ ...form, ibu: { ...form.ibu, tanggalLahir: val } }); if(errors.ibu_tanggalLahir) setErrors(prev => ({...prev, ibu_tanggalLahir: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.ibu_tanggalLahir} />
              <InputField inputLabel="Alamat Ibu" inputPlaceholder="Alamat Domisili Ibu" data={form.ibu.alamat} setData={(val) => { setForm({ ...form, ibu: { ...form.ibu, alamat: val } }); if(errors.ibu_alamat) setErrors(prev => ({...prev, ibu_alamat: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.ibu_alamat} />
              <InputField inputLabel="Pekerjaan Ibu" inputPlaceholder="Pekerjaan Ibu" data={form.ibu.pekerjaan} setData={(val) => { setForm({ ...form, ibu: { ...form.ibu, pekerjaan: val } }); if(errors.ibu_pekerjaan) setErrors(prev => ({...prev, ibu_pekerjaan: undefined})) }} setEditData={setEdit} editData={edit} submited={submited} error={errors.ibu_pekerjaan} />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">Submit</button>
              <button type="button" onClick={handleReset} className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md transition-colors">Reset</button>
            </div>
          </form>
          <div className="py-10 text-center text-sm text-neutral-500">
            © 2025 Pemerintah Desa. All rights reserved.
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showConfirmModal || errorInfo !== null}
        onClose={() => {
          setShowConfirmModal(false);
          setErrorInfo(null);
        }}
        onConfirm={handleConfirm}
        isLoading={loading}
        title={errorInfo ? "Gagal Mengirim" : "Konfirmasi Pengajuan"}
        message={errorInfo || "Apakah Anda yakin semua data sudah benar?"}
      />
    </>
  );
}