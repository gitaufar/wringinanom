"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <p className="text-sm">
            Lorem Ipsum has been the industry's standard dummy text ever since.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Kontak Desa</h2>
          <ul className="mt-2 text-sm space-y-1">
            <li>(Kontak) 0812-3456-7890</li>
            <li>(Email) kontak@desakita.id</li>
            <li>(Lokasi) Jl. Raya Desa No. 123</li>
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
}
