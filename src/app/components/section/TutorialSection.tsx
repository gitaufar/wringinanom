"use client";

import Image from "next/image";
import ButtonGeneral from "../button/ButtonGeneral";
import { FileText, ClipboardEdit, BellRing } from "lucide-react";
import { JSX } from "react";

const steps = [
  {
    number: "01",
    title: "Pilih Jenis Layanan",
    description:
      "Masuk ke halaman layanan dan pilih jenis pengurusan seperti surat pengantar, KK, dan lain sebagainya.",
    icon: <FileText size={48} />, // Pakai JSX langsung
  },
  {
    number: "02",
    title: "Isi Formulir Online",
    description:
      "Lengkapi data pada formulir yang tersedia sesuai dengan keperluan pengurusan layanan.",
    icon: <ClipboardEdit size={48} />,
  },
  {
    number: "03",
    title: "Kirim dan Tunggu Notifikasi",
    description:
      "Setelah formulir dikirim, sistem akan memproses dan mengirim nomor resi saat laporan dibuat. Anda juga bisa cek statusnya di kolom pencarian menggunakan nomor resi yang diberikan.",
    icon: <BellRing size={48} />,
  },
];


const TutorialSection = (): JSX.Element => {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-12 px-4 sm:px-6 md:px-10 py-16 bg-white w-full max-w-[1440px] mx-auto">
      {/* Kiri: Judul dan deskripsi */}
      <div className="flex flex-col items-start gap-6 w-full lg:max-w-[573px]">
        <h2 className="text-[#020B23] text-[36px] md:text-[55px] font-bold leading-snug capitalize">
          Langkah Penggunaan Sistem
        </h2>
        <p className="text-black text-lg md:text-xl leading-relaxed">
          Berikut ini langkah mudah dalam menggunakan sistem pelayanan online
          Desa Wringinanom. Kini, mengurus surat bisa
          dilakukan dari rumah.
        </p>
        <ButtonGeneral
          text="Lihat Tutorial"
          icon="arrow"
          className="mt-2"
          onClick={() => {
            window.open("https://youtu.be/KITcZh7CWos", "_blank");
          }} 
        />
      </div>  

      {/* Kanan: Step List */}
      <div
        id="tutorial-list"
        className="flex flex-col border-l-2 border-black w-full pl-6 md:pl-12"
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative flex flex-col sm:flex-row items-start py-6 gap-4 ${
              index !== steps.length - 1 ? "border-b border-black" : ""
            }`}
          >
            {/* Nomor langkah */}
            <div className="absolute -left-[40px] text-[#020B23] text-2xl font-semibold hidden md:block">
              {step.number}
            </div>
            <div className="block md:hidden text-[#020B23] text-xl font-semibold">
              {step.number}
            </div>

            {/* Gambar icon (gunakan Next.js Image) */}
            <div className="rounded-[22px] w-[100px] h-[100px] flex items-center justify-center overflow-hidden">
              {step.icon}
            </div>

            {/* Teks */}
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-[#020B23] text-xl md:text-2xl font-bold capitalize">
                {step.title}
              </h3>
              <p className="text-[#6B6B6B] text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TutorialSection;
