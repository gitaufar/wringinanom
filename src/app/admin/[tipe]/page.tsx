import ButtonLogout from "@/app/components/button/ButtonLogout";
import Kependudukan from "@/app/components/screen/admin/Kependudukan";
import { TambahPenduduk } from "@/app/components/screen/admin/TambahPenduduk";
import Link from "next/link";
import { headers } from "next/headers";

type Params = {
  params: {
    tipe: string;
  };
};

const menus = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Administrasi", value: "administrasi" },
  { label: "Laporan", value: "laporan" },
  { label: "Kependudukan", value: "kependudukan" },
];

export default async function Page({ params }: Params) {
  const { tipe } = await params;
  const headersList = await headers();
  const adminId = headersList.get("x-admin-id");

  return (
    <main className="flex flex-row bg-[#F5F6FA] min-h-screen">
      {/* Navbar */}
      <nav className="bg-white fixed top-0 w-screen px-10 py-2 flex justify-end">
        <ButtonLogout />
      </nav>
      {/* Sidebar */}
      <div className="w-1/5 bg-white min-h-screen flex flex-col items-center pt-16 pb-10 justify-between">
        <div className="w-full flex flex-col gap-4">
          {menus.map((menu) => {
            const isActive = tipe === menu.value;
            return (
              <Link key={menu.value} href={`/admin/${menu.value}`}>
                <div
                  key={menu.value}
                  className="flex justify-center px-6 w-full"
                >
                  <div
                    className={`text-base rounded-md py-4 w-full text-center cursor-pointer transition
                  ${
                    isActive
                      ? "bg-[#4880FF] text-white"
                      : "bg-transparent text-black hover:bg-[#4880FF] hover:text-white"
                  }`}
                  >
                    {menu.label}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-[55px]">
        {tipe === "dashboard" ? (
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        ) : tipe === "kependudukan" ? (
          <Kependudukan />
        ) : tipe === "administrasi" ? (
          <h1 className="text-2xl font-bold text-gray-800">
            Halaman Administrasi
          </h1>
        ) : tipe === "tambah-penduduk" ? (
          <TambahPenduduk />
        ) : (
          <h1 className="text-2xl font-bold text-red-500">
            Tipe Tidak Dikenal
          </h1>
        )}
      </div>
    </main>
  );
}
