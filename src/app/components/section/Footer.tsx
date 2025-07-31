"use client";

import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export function Component() {
  return (
    <footer className="bg-[#394D89] text-white px-8 md:px-20 py-8">
      {/* Bagian Atas Footer */}
      <div className="flex flex-col md:flex-row justify-between gap-10">
  {/* Info Desa */}
  <div className="md:flex-1">
    <div className="flex items-center gap-4 mb-4">
      <Image
        src="/png/Logo_Kabupaten_Malang.png"
        alt="Logo"
        width={30}
        height={30}
        className="object-contain hover:scale-110 transition-transform duration-300"
      />
      <h1 className="text-xl font-semibold">Desa Wringinanom</h1>
    </div>
  </div>

  {/* Alamat + Kontak dibungkus */}
  <div className="md:flex md:items-start md:gap-14">
    {/* Alamat */}
    <div>
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-xl font-semibold">Alamat</h1>
      </div>
      <h3 className="text-sm">Kecamatan Poncokusumo</h3>
      <p className="text-xs text-white/80 mt-1">
        Jl. Raya Wringinanom No.12, Kec. Poncokusumo,<br />
        Kabupaten Malang, Jawa Timur 65167
      </p>
    </div>

    {/* Kontak Desa */}
    <div>
      <h2 className="text-lg font-semibold">Kontak Desa</h2>
      <ul className="mt-2 text-sm space-y-2">
        <li className="flex items-center space-x-2">
          <Phone className="w-4 h-4" />
          <a
            href="https://wa.me/6282232331839"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            +62 822-3233-1839
          </a>
        </li>
        <li className="flex items-center space-x-2">
          <Mail className="w-4 h-4" />
          <span>pemdesawringinanom@gmail.com</span>
        </li>
      </ul>
    </div>
  </div>
</div>


      {/* Garis pemisah */}
      <hr className="my-8 border-white/30" />

      {/* Bagian bawah */}
      <div className="text-xs text-white/70 flex flex-col md:flex-row justify-between items-start gap-4">

        {/* Info Pengembang */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 w-full">
          <div className="flex items-center gap-4">
            <Image
              src="/png/Logo_UB.png"
              alt="Logo UB"
              width={35}
              height={35}
              className="hover:scale-110 transition-transform duration-300"
            />
            <Image
              src="/png/Logo_Filkom.png"
              alt="Logo Filkom"
              width={110}
              height={40}
              className="hover:scale-110 transition-transform duration-300"
            />
            <Image
              src="/png/Logo_MMD_Filkom_46.png"
              alt="Logo MMD"
              width={32}
              height={32}
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="text-white text-sm leading-snug md:ml-4 text-left">
            Dikembangkan oleh Tim MMD FILKOM 46 Tahun 2025 <br />
            <span className="text-xs text-white/70">
              Program Mahasiswa Membangun Desa, Fakultas Ilmu Komputer, Universitas Brawijaya
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}   


// "use client";
// import { usePathname } from "next/navigation";
// import type { FC, JSX } from "react";
// import { Mail, Phone } from "lucide-react";
// import Image from "next/image";

// const Footer: FC = (): JSX.Element | null => {
//   const path = usePathname();
//   const hideFooterRoutes = ["/login", "/register", "/Chat", "/createProfile", "/kostumasiUser"];
//   const shouldHideFooter = hideFooterRoutes.includes(path);

//   if (shouldHideFooter) return null;

//   return (
//     <footer className="bg-[#34518D] mt-10 text-white">
//       {/* Bagian Atas Footer */}
//       <div className="max-w-xl mx-auto px-4 py-12 flex flex-col md:flex-row  gap-10">
//         {/* Info Desa */}
//         <div>
//           <h2 className="text-lg font-bold">Desa Wringinanom</h2>
//           <h3 className="mt-0.5 text-sm">Kecamatan Poncokusumo</h3>
//           <span className="text-xs text-white/80">
//             Jl. Raya Wringinanom No.12, Kec. Poncokusumo, <br />
//             Kabupaten Malang, Jawa Timur 65167
//           </span>
//         </div>

//         {/* Kontak Desa */}
//         <div>
//           <h2 className="text-lg font-semibold">Kontak Desa</h2>
//           <ul className="mt-2 text-sm space-y-2">
//             <li className="flex items-center space-x-2">
//               <Phone className="w-4 h-4" />
//               <a
//                 href="https://wa.me/6282232331839"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:underline"
//               >
//                 +62 822-3233-1839
//               </a>
//             </li>
//             <li className="flex items-center space-x-2">
//               <Mail className="w-4 h-4" />
//               <span>pemdesawringinanom@gmail.com</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Bagian Bawah Footer */}
//       <div className="border-t border-white/30 py-4">
//         <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
//           {/* Logo-Logo + Teks */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 w-full">
//             {/* Logo */}
//             <div className="flex items-center gap-4">
//               <Image
//                 src="/png/Logo_UB.png"
//                 alt="Logo UB"
//                 width={35}
//                 height={35}
//                 className="hover:scale-110 transition-transform duration-300"
//               />
//               <Image
//                 src="/png/Logo_Filkom.png"
//                 alt="Logo Filkom"
//                 width={110}
//                 height={40}
//                 className="hover:scale-110 transition-transform duration-300"
//               />
//               <Image
//                 src="/png/Logo_MMD_Filkom_46.png"
//                 alt="Logo MMD"
//                 width={32}
//                 height={32}
//                 className="hover:scale-110 transition-transform duration-300"
//               />
//             </div>

//             {/* Teks */}
//             <div className="text-white text-sm leading-snug md:ml-4 text-left">
//               Dikembangkan oleh Tim MMD FILKOM 46 Tahun 2025 <br />
//               <span className="text-xs text-white/70">
//                 Program Mahasiswa Membangun Desa, Fakultas Ilmu Komputer, Universitas Brawijaya
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
 