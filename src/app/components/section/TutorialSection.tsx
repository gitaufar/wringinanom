"use client";

import ButtonGeneral from "../button/ButtonGeneral";

const steps = [
  {
    number: "01",
    title: "Pilih Jenis Layanan",
    description:
      "Masuk ke halaman layanan dan pilih jenis pengurusan seperti surat pengantar, KK, atau laporan warga.",
  },
  {
    number: "02",
    title: "Isi Formulir Online",
    description: "Lorem Ipsum Has Been The Industry's Standard Dummy",
  },
  {
    number: "03",
    title: "Unggah Dokumen Pendukung",
    description: "Lorem Ipsum Has Been The Industry's Standard Dummy",
  },
  {
    number: "04",
    title: "Kirim Dan Tunggu Notifikasi",
    description: "Lorem Ipsum Has Been The Industry's Standard Dummy",
  },
];

const TutorialSection = () => {
  return (
    <section
      className="flex flex-col lg:flex-row items-start justify-between gap-10 px-4 sm:px-6 md:px-10 py-10 bg-white font-['Plus_Jakarta_Sans'] w-full max-w-[1440px] mx-auto"
    >
      {/* Kiri: Judul, deskripsi, tombol */}
      <div className="flex flex-col items-start gap-6 w-full lg:max-w-[573px]">
        <h2
          style={{
            color: "#020B23",
            fontSize: "55px",
            fontWeight: 700,
            textTransform: "capitalize",
            lineHeight: "normal",
          }}
        >
          Langkah Penggunaan Sistem
        </h2>
        <p
          style={{
            color: "#000",
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "40px",
            textTransform: "capitalize",
          }}
        >
          Berikut ini langkah mudah dalam menggunakan sistem pelayanan online
          Desa Wringinanom. Kini, mengurus surat atau menyampaikan laporan bisa
          dilakukan dari rumah.
        </p>
        <ButtonGeneral
          text="Lihat Tutorial"
          icon="arrow"
          className="mt-2"
          onClick={() => {
            const tutorial = document.getElementById("tutorial-list");
            tutorial?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>

      {/* Kanan: Langkah-langkah */}
      <div
        id="tutorial-list"
        className="flex flex-col border-l-2 border-black w-full pl-4 sm:pl-6 md:pl-10 lg:pl-20"
        style={{ flex: 1 }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative flex flex-col sm:flex-row items-start py-6 pr-4 pl-6 sm:pl-10 ${
              index !== steps.length - 1 ? "border-b border-black" : ""
            }`}
          >
            {/* Nomor langkah (hanya di desktop) */}
            <div
              className="absolute -left-6 sm:-left-[50px] hidden md:flex items-center"
              style={{
                width: "83.012px",
                height: "67px",
                fontSize: "40px",
                fontWeight: 400,
                color: "#020B23",
                textTransform: "capitalize",
              }}
            >
              {step.number}
            </div>

            {/* Gambar placeholder */}
            <div
              className="rounded-[22px] mr-4 mb-4 sm:mb-0"
              style={{
                width: "107.609px",
                height: "97px",
                background: "#D9D9D9",
                flexShrink: 0,
              }}
            />

            {/* Konten teks */}
            <div className="flex flex-col gap-2 w-full">
              <h3
                style={{
                  fontSize: "25px",
                  fontWeight: 700,
                  color: "#020B23",
                  textTransform: "capitalize",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color: "#6B6B6B",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
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
