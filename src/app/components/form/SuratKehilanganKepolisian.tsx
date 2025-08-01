// "use client";

// import { useState } from "react";
// import type { ReactNode } from 'react'; // Impor tipe ReactNode
// import InputField from "../../components/field/InputField";
// import InputFieldDate from "../../components/field/InputFieldDate";
// import InputFieldDropdown from "../../components/field/InputFieldDropdown";
// import InputFieldTime from "../../components/field/InputFieldTime";
// import ConfirmationModal from "../../components/modal/ConfirmationModal";

// type SuratKehilanganKepolisianProps = {
//   tipe: string;
// };

// type FormErrors = {
//   [key: string]: string | undefined;
// };

// // DIUBAH: Menambahkan tipe spesifik untuk response dari API
// type ApiResponse = {
//   permohonan: {
//     no_resi: string;
//   };
//   error?: string; // error bersifat opsional
// };

// export default function SuratKehilanganKepolisian({ tipe }: SuratKehilanganKepolisianProps): ReactNode { // DIUBAH: Menambahkan return type
//   const initialData = {
//     no_wa: "",
//     nama: "",
//     kota: "",
//     nik: "",
//     nomorKK: "",
//     tanggalLahir: "",
//     jenisKelamin: "",
//     agama: "",
//     alamat: "",
//     namaBarang: "",
//     pekerjaan: "",
//     lokasiKehilangan: "",
//     tanggalKehilangan: "",
//     jamKehilangan: "",
//   };

//   const [formData, setFormData] = useState(initialData);
//   const [errors, setErrors] = useState<FormErrors>({}); 
//   const [editData, setEditData] = useState(true);
//   const [submited, setSubmited] = useState<string | null>(""); // Diubah dari "" ke null
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [errorInfo, setErrorInfo] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (field: keyof typeof initialData, value: string): void => { // DIUBAH: Return type void
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: undefined }));
//     }
//   };
  
//   const validateForm = (): FormErrors => {
//     const newErrors: FormErrors = {};
//     Object.keys(formData).forEach(keyStr => {
//       const key = keyStr as keyof typeof formData;
//       if (!formData[key] || !formData[key].trim()) {
//         const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
//         newErrors[key] = `${fieldName} wajib diisi.`;
//       }
//     });
//     return newErrors;
//   };

//   const handleSubmit = (e: React.FormEvent): void => { // DIUBAH: Return type void
//     e.preventDefault();
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return; 
//     }
//     setErrors({}); 
//     setShowConfirmModal(true);
//   };

//   const handleConfirm = async (): Promise<void> => { // DIUBAH: Return type Promise<void>
//     setSubmited(null); // Diubah dari "" ke null
//     setLoading(true);

//     const data_dinamis = { ...formData };

//     try {
//       const res = await fetch("/api/permohonan", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           no_wa: formData.no_wa,
//           nik: formData.nik,
//           jenis_surat: "kehilangan_kepolisian",
//           tipe: tipe,
//           keterangan: `Pengajuan Surat Kehilangan oleh ${formData.nama}`,
//           data_dinamis,
//         }),
//       });

      
//       const result = await res.json() as ApiResponse;
//       if (!res.ok) throw new Error(result.error || "Gagal mengirim permohonan");

//       window.location.href = `/${result.permohonan.no_resi}`;

//     } catch (err) {
//       if (err instanceof Error) {
//         setErrorInfo(`Terjadi kesalahan: ${err.message}`);
//       } else {
//         setErrorInfo("Terjadi kesalahan yang tidak diketahui.");
//       }
//       setEditData(true); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = (): void => { 
//     setFormData(initialData);
//     setErrors({});
//     setSubmited(""); 
//     setEditData(true);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-white">
//       <div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
//         <button
//           onClick={() => window.history.back()}
//           className="p-2 rounded-full hover:bg-gray-100 transition"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6 text-black"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//           </svg>
//         </button>
//         <div className="w-10 h-10 rounded-full bg-black/10 flex-shrink-0" />
//         <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">
//           Pengajuan Surat
//         </div>
//       </div>

//       <div className="w-full pt-24 px-5 lg:px-[170px]">
//         <div className="flex justify-center items-center py-10 text-center">
//           <div className="flex flex-col gap-4">
//             <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
//               SURAT KETERANGAN KEHILANGAN KEPOLISIAN
//             </h1>
//             <p className="text-black text-base max-w-xl mx-auto">
//               Mohon isi sesuai data dan sejujur-jujurnya.
//             </p>
//           </div>
//         </div>
//         <form onSubmit={handleSubmit} noValidate className="max-w-4xl mx-auto bg-white shadow p-8 rounded-[15px] space-y-8">
//           <div className="space-y-3">
//             <h2 className="text-xl font-bold">Data Pengaju</h2>
//             <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.nama} setData={(val) => handleInputChange("nama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.nama} />
//             <InputField inputLabel="Nomor WA" inputPlaceholder="No. WA Pengaju" data={formData.no_wa} setData={(val) => handleInputChange("no_wa", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.no_wa} />
//             <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten Lahir" data={formData.kota} setData={(val) => handleInputChange("kota", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kota} />
//             <InputFieldDate inputLabel="Tanggal Lahir" data={formData.tanggalLahir} setData={(val) => handleInputChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tanggalLahir} />
//             <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.nik} setData={(val) => handleInputChange("nik", val)} setEditData={setEditData} editData={editData} submited={submited} numberOnly error={errors.nik} />
//             <InputField inputLabel="Nomor Kartu Keluarga" inputPlaceholder="Nomor KK" data={formData.nomorKK} setData={(val) => handleInputChange("nomorKK", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.nomorKK} />
//             <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.jenisKelamin} setData={(val) => handleInputChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.jenisKelamin} />
//             <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} data={formData.agama} setData={(val) => handleInputChange("agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.agama} />
//             <InputField inputLabel="Pekerjaan" inputPlaceholder="Pekerjaan" data={formData.pekerjaan} setData={(val) => handleInputChange("pekerjaan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.pekerjaan} />
//             <InputField inputLabel="Alamat" inputPlaceholder="Alamat" data={formData.alamat} setData={(val) => handleInputChange("alamat", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.alamat} />
//           </div>

//           <div className="space-y-3">
//             <h2 className="text-xl font-bold">Data Kehilangan</h2>
//             <InputField inputLabel="Nama Barang" inputPlaceholder="Nama Barang" data={formData.namaBarang} setData={(val) => handleInputChange("namaBarang", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaBarang} />
//             <InputField inputLabel="Lokasi Kehilangan" inputPlaceholder="Lokasi Kehilangan" data={formData.lokasiKehilangan} setData={(val) => handleInputChange("lokasiKehilangan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.lokasiKehilangan} />
//             <InputFieldDate inputLabel="Tanggal Kehilangan" data={formData.tanggalKehilangan} setData={(val) => handleInputChange("tanggalKehilangan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tanggalKehilangan} />
//             <InputFieldTime inputLabel="Jam Kehilangan" data={formData.jamKehilangan} setData={(val) => handleInputChange("jamKehilangan", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.jamKehilangan} />
//           </div>

//           <div className="flex gap-4">
//             <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium transition-colors hover:bg-blue-700">Submit</button>
//             <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium transition-colors hover:bg-gray-400">Reset</button>
//           </div>
//         </form>

//         <div className="py-10 text-center text-sm text-neutral-500">
//           © 2025 Pemerintah Desa. All rights reserved.
//         </div>
//       </div>
//       <ConfirmationModal
//         isOpen={showConfirmModal || errorInfo !== null}
//         onClose={() => {
//           setShowConfirmModal(false);
//           setErrorInfo(null);
//         }}
//         onConfirm={() => { void handleConfirm(); }}
//         isLoading={loading}
//         title={errorInfo ? "Gagal Mengirim" : "Konfirmasi Pengajuan"}
//         message={errorInfo || "Apakah Anda yakin semua data sudah benar?"}
//       />
//     </div>
//   );
// }
