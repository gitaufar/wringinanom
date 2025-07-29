"use client";
import { usePathname } from "next/navigation";
import type { FC, JSX } from "react";

const Footer: FC = (): JSX.Element | null => {
  const path = usePathname();
  const hideFooterRoutes = ["/login", "/register", "/Chat", "/createProfile", "/kostumasiUser"];
  const shouldHideFooter = hideFooterRoutes.includes(path);

  if (shouldHideFooter) return null;

  return (
    <footer className="bg-[#34518D] mt-10 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-semibold">Desa Wringinanom</h2>
          <p className="mt-2 text-sm">
            Website Administrasi Desa Wringinanom dirancang untuk memberikan kemudahan pengajuan surat administrasi secara digital kepada masyarakat.
          </p>
          <p className="text-sm">
            Website ini menyediakan layanan pengajuan surat-surat administrasi secara online bagi warga Desa Wringinanom. Pengurusan dokumen menjadi lebih mudah dan.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Kontak Desa</h2>
          <ul className="mt-2 text-sm space-y-1">
            <li>(Whatsapp) 0819-4555-1589</li>
            <li>(Email) pemdesawringinanom@gmail.com</li>
            <li>(Alamat)  Jl. Raya Kunci Wringinanom No.12, Simpar Utara</li>
          </ul>
        </div>

        <div className="hidden lg:block" />
      </div>

      <div className="border-t border-white/30">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs">
          © 2025 Desa Wringinanom. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
