"use client";
import React from "react";
import ButtonGeneral from "../button/ButtonGeneral";

const InformationSection: React.FC = () => {
  return (
    <section className="flex justify-center items-center px-6 py-10 w-full max-w-[1440px] mx-auto">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center w-full gap-10">
        {/* Kiri: Teks dan Tombol */}
        <div className="flex flex-col items-start gap-6 w-full max-w-[697px]">
          <h2 className="text-[#020B23] font-bold capitalize text-[40px] sm:text-[55px] leading-normal">
            Ada Pertanyaan? Hubungi Kami Langsung
          </h2>
          <p className="text-black capitalize text-[20px] leading-[30px]">
            Hubungi kontak kami di bawah ini untuk informasi layanan, pengaduan,
            atau bantuan administrasi. Kami akan merespons secepat mungkin di
            hari kerja.
          </p>

          {/* Gunakan komponen ButtonGeneral */}
          <ButtonGeneral
            text="Telpon"
            onClick={() => (window.location.href = "tel:08123456789")}
          />
        </div>

        {/* Kanan: Gambar dan Label */}
        <div className="relative w-full max-w-[595px] h-[400px] sm:h-[500px] lg:h-[570px]">
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                'url("/images/dokter.png") lightgray 50% / cover no-repeat',
              flexShrink: 0,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default InformationSection;
