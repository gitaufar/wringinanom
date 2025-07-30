"use client";
import { usePathname } from "next/navigation";
import type { FC, JSX } from "react";
import { Mail, MapPin, Phone } from "lucide-react"; 

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
        </div>

        <div>
          <h2 className="text-lg font-semibold">Kontak Desa</h2>
          <ul className="mt-2 text-sm space-y-2">
            <li className="flex items-center space-x-2">
             <Phone className="w-4 h-4 text-white-600" />
             <span>0819-4555-1589</span>
            </li>
            <li className="flex items-center space-x-2">
             <Mail className="w-4 h-4 text-white-600" />
            <span>pemdesawringinanom@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-white-600" />
              <span>Jl. Raya Wringinanom No.12, Kode Pos 65167</span>
            </li>
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
