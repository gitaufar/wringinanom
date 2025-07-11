"use client";

const InformationSection = () => {
  return (
    <section
      className="flex justify-center items-center px-6 py-10 bg-[rgba(141,184,227,0.10)] w-full max-w-[1440px] mx-auto"
    >
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center w-full gap-10">
        {/* Kiri: Teks dan Tombol */}
        <div className="flex flex-col items-start gap-6 w-full max-w-[697px]">
          <h2
            className="text-[#020B23] font-bold capitalize"
            style={{
              fontSize: "55px",
              lineHeight: "normal",
              fontWeight: 700,
            }}
          >
            Ada Pertanyaan? Hubungi Kami Langsung
          </h2>
          <p
            className="text-black capitalize"
            style={{
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "30px",
            }}
          >
            Hubungi kontak kami di bawah ini untuk informasi layanan, pengaduan,
            atau bantuan administrasi. Kami akan merespons secepat mungkin di hari kerja.
          </p>

          {/* Tombol Telpon */}
          <a
            href="tel:+628123456789"
            className="flex items-center gap-3 rounded-full text-white text-lg font-medium"
            style={{
              background: "#008266",
              borderRadius: "60px",
              padding: "8px 24px",
            }}
          >
            Telpon
            <span
              className="bg-white text-[#008266] rounded-full w-8 h-8 flex items-center justify-center"
            >
              📞
            </span>
          </a>
        </div>

        {/* Kanan: Gambar dan Label */}
        <div
          className="relative w-full max-w-[595px] h-[400px] sm:h-[500px] lg:h-[570px]"
        >
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
