"use client";

import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ButtonGeneral from "../button/ButtonGeneral";
import SearchIcon from "../icon/SearchIcon";

const HeroSection = (): JSX.Element => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/${search}`);
    }
  };

  return (
    <section className="relative w-full">
      <div className="relative w-full h-[60vh] sm:h-[90vh] overflow-hidden">
        {/* Background */}
        <Image
          src="/png/KantorDesaWringinanom.JPG"
          alt="Background"
          fill
          className="object-cover z-[-2]"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-[-1]" />

        {/* Search bar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-[90%] sm:max-w-md px-4 z-10">
          <div className="flex items-center bg-white rounded-full px-5 py-2 shadow-md">
            <input
              type="text"
              placeholder="Cari riwayat laporanmu di sini..."
              className="flex-grow text-sm sm:text-base text-gray-800 bg-transparent border-none focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <SearchIcon />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-6 sm:px-10 text-white max-w-5xl mx-auto">
          <h1 className="text-[32px] sm:text-[40px] md:text-[64px] font-semibold leading-tight mb-3">
            DESA WRINGINANOM
          </h1>

          <p className="text-sm sm:text-lg md:text-xl leading-relaxed mb-6 max-w-full sm:max-w-[80%] md:max-w-[60%]">
            Layanan Digital untuk Warga Desa Wringinanom,
            Kec. Poncokusumo, Kab. Malang
          </p>

          <ButtonGeneral
            className="px-4 py-1.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm"
            text="Mulai Sekarang"
            icon="arrow"
            onClick={() => {}}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
