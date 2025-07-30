// "use client";

// import InputField from "../../components/field/InputField";
// import InputFieldDate from "../../components/field/InputFieldDate";
// import InputFieldDropdown from "../field/InputFieldDropdown";
// import ConfirmationModal from "../../components/modal/ConfirmationModal";
// import { useState } from "react";
// import type { ReactNode } from "react"; 


// type SuratKeteranganCeraiMatiProps = {
//   tipe: string;
// };

// type FormErrors = {
//   [key: string]: string | undefined;
// };

// type ApiResponse = {
//   permohonan: {
//     no_resi: string;
//   };
//   error?: string; 
// };

// export default function SuratKeteranganCeraiMati({ tipe }: SuratKeteranganCeraiMatiProps): ReactNode {
//   const initialData = {
//     NamaPengaju: "",
//     NIKPengaju: "",

//     //Page1 
//     namaLengkap: "",
//     kotaLahir: "",
//     tanggalLahir: "",
//     NIK1: "",
//     jenisKelamin: "",
//     agama: "",
//     Alamat1: "",
//     Tujuan1: "",
//   };

//   const [formData, setFormData] = useState(initialData);
//   const [errors, setErrors] = useState<FormErrors>({}); // BARU: State untuk error
//   const [editData, setEditData] = useState(true);
//   const [submited, setSubmited] = useState<string | null>("");
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
  
//   const [loading, setLoading] = useState(false);
//   const [errorInfo, setErrorInfo] = useState<string | null>(null);

//   const handleInputChange = (field: keyof typeof initialData, value: string): void => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: undefined }));
//     }
//   };

//   const validateForm = (): FormErrors => {
//     const newErrors: FormErrors = {};
//     Object.keys(formData).forEach(keyStr => {
//       const key = keyStr as keyof typeof initialData;
//       if (!formData[key]?.trim()) {
//         const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
//         newErrors[key] = `${fieldName} wajib diisi.`;
//       }
//     });
//     return newErrors;
//   };

// const handleSubmit = (e: React.FormEvent): void => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     console.log("HASIL VALIDASI:", formErrors);
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return; 
//     }
//     console.log("VALIDASI BERHASIL, MENAMPILKAN MODAL..."); 
//     setErrors({}); 
//     setShowConfirmModal(true);
//   };

//  const handleConfirm = async (): Promise <void> => {
//     setLoading(true);
//     try {
//       setSubmited("");
//       setLoading(true);

//       const res = await fetch("/api/permohonan", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           nik: formData.NIKPengaju, 
//           jenis_surat: "cerai_mati",
//           tipe: tipe,
//           keterangan: `Pengajuan Surat Keterangan Cerai Mati oleh ${formData.NamaPengaju}`,
//           data_dinamis:{
//             nama: formData.namaLengkap,
//             kota: formData.kotaLahir,
//             tanggalLahir: formData.tanggalLahir,
//             jenisKelamin: formData.jenisKelamin,
//             agama: formData.agama,
//             nik: formData.NIK1,
//             alamat: formData.Alamat1,
//             tujuan: formData.Tujuan1,
//           },
//         }),
//       });

//       const result = (await res.json()) as ApiResponse;

//       if (!res.ok) {
//         throw new Error(result.error || "Gagal mengirim permohonan");
//       }
      
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

//   const handleReset = () => {
//     setFormData(initialData);
//     setErrors({});
//     setSubmited("");
//     setEditData(true);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-white">
//       {/* Header */}
// <div className="w-full h-20 flex items-center justify-center gap-5 px-4 md:px-5 bg-white shadow fixed top-0 z-10">
//   {/* Tombol Back */}
//   <button
//     onClick={() => window.history.back()}
//     className="p-2 rounded-full hover:bg-gray-100 transition"
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={1.5}
//       stroke="currentColor"
//       className="w-6 h-6 text-black"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M15.75 19.5L8.25 12l7.5-7.5"
//       />
//     </svg>
//   </button>

//   {/* Avatar & Judul */}
//   <div className="flex-1 text-black font-roboto text-xl md:text-[28px] font-medium leading-9">
//     Pengajuan Surat
//   </div>
// </div>


//       {/* Main Content */}
//       <div className="w-full pt-20">
//         {/* Header */}
//         <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px] py-8 md:py-[60px]">
//           <div className="flex flex-col items-center gap-6 flex-1">
//             <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
//               SURAT KETERANGAN CERAI MATI
//             </h1>
//             <p className="max-w-full md:max-w-[520px] text-black text-center font-roboto text-base font-normal leading-6 px-4">
//               Mohon isi sesuai data dan dengan sejujur-jujurnya.
//             </p>
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className="flex justify-center items-center px-4 md:px-8 lg:px-[170px]">
//           <form
//             onSubmit={handleSubmit}
//             noValidate
//             className="w-full max-w-[1320px] p-4 md:p-8 lg:p-[60px] flex flex-col gap-6 rounded-[15px] bg-white shadow"
//           >
//             {/* DIUBAH: Semua komponen input sekarang terhubung ke sistem validasi */}
//             <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
//               Nama Pengaju
//             </h1>
//             <InputField inputLabel="Nama Pengaju" inputPlaceholder="Nama Pengaju" data={formData.NamaPengaju} setData={(val) => handleInputChange("NamaPengaju", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.NamaPengaju} />
//             <InputField inputLabel="NIK" inputPlaceholder="NIK" data={formData.NIKPengaju} setData={(val) => handleInputChange("NIKPengaju", val)} numberOnly setEditData={setEditData} editData={editData} submited={submited} error={errors.NIKPengaju} />

//             <h1 className="text-black text-[32px] lg:text-[40px] font-bold">
//               Data Identitas Personal
//             </h1>
//             <InputField inputLabel="Nama Lengkap" inputPlaceholder="Nama Lengkap" data={formData.namaLengkap} setData={(val) => handleInputChange("namaLengkap", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.namaLengkap} />
//             <InputField inputLabel="Kota/Kabupaten Lahir" inputPlaceholder="Kota/Kabupaten" data={formData.kotaLahir} setData={(val) => handleInputChange("kotaLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.kotaLahir} />
//             <InputFieldDate inputLabel="Tanggal Lahir" data={formData.tanggalLahir} setData={(val) => handleInputChange("tanggalLahir", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.tanggalLahir} />
//             <InputField inputLabel="NIK" inputPlaceholder="Masukan NIK" data={formData.NIK1} setData={(val) => handleInputChange("NIK1", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.NIK1} />
//             <InputFieldDropdown inputLabel="Jenis Kelamin" options={["Laki-laki", "Perempuan"]} data={formData.jenisKelamin} setData={(val) => handleInputChange("jenisKelamin", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.jenisKelamin} />
//             <InputFieldDropdown inputLabel="Agama" options={["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]} data={formData.agama} setData={(val) => handleInputChange("agama", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.agama} />
//             <InputField inputLabel="Alamat" inputPlaceholder="Masukan Alamat" data={formData.Alamat1} setData={(val) => handleInputChange("Alamat1", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.Alamat1} />
//             <InputField inputLabel="Tujuan" inputPlaceholder="Alasan Pembuatan Surat" data={formData.Tujuan1} setData={(val) => handleInputChange("Tujuan1", val)} setEditData={setEditData} editData={editData} submited={submited} error={errors.Tujuan1} />

//             <div className="flex gap-4">
//               <button type="submit" className="px-6 py-3 rounded bg-blue-600 text-white text-sm font-medium">Submit</button>
//               <button type="button" onClick={handleReset} className="px-6 py-3 rounded bg-gray-300 text-black text-sm font-medium">Reset</button>
//             </div>
//           </form>
//         </div>

//         {/* Footer */}
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
//         onConfirm={()=>{
//           void handleConfirm();
//         }}
//         isLoading={loading}
//         title={errorInfo ? "Gagal Mengirim" : "Konfirmasi Pengajuan"}
//         message={errorInfo || "Apakah Anda yakin semua data sudah benar?"}
//             />
//     </div>
//   );
// }