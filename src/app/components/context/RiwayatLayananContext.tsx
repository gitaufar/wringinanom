"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  JSX,
} from "react";

// Mendefinisikan tipe data untuk setiap item riwayat
export type DataRiwayat = {
  no_resi: string;
  date: string;
  tipe: string;
  keterangan: string;
  status: "Menunggu" | "Selesai" | "Dibatalkan";
  penduduk: {
    nama_lengkap: string;
  };
};

// Mendefinisikan tipe untuk konteks
type RiwayatContextType = {
  dataRiwayat: DataRiwayat[];
  loading: boolean;
  refetch: () => void;
  setDataRiwayat: React.Dispatch<React.SetStateAction<DataRiwayat[]>>;
};

// Membuat konteks dengan nilai awal undefined
const RiwayatContext = createContext<RiwayatContextType | undefined>(undefined);

// Custom hook untuk menggunakan konteks Riwayat
export const useRiwayat = (): RiwayatContextType => {
  const context = useContext(RiwayatContext);
  if (!context) {
    throw new Error("useRiwayat must be used within a RiwayatProvider");
  }
  return context;
};

// Komponen Provider untuk menyediakan data riwayat ke komponen anak
export const RiwayatProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [dataRiwayat, setDataRiwayat] = useState<DataRiwayat[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data riwayat dari API
  const fetchRiwayat = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch("/api/layanan");
      
      // Mem-parsing respons JSON dan memberikan tipe yang diharapkan
      const result = (await res.json()) as { data?: DataRiwayat[]; error?: string };

      if (!res.ok) {
        throw new Error(result.error || 'Gagal mengambil data riwayat');
      }

      // Memastikan properti 'data' dari respons adalah sebuah array
      if (Array.isArray(result.data)) {
        // Menyaring data untuk tidak menampilkan status "menunggu"
        const filtered = result.data.filter(
          (item): item is DataRiwayat =>
            typeof item === "object" &&
            item !== null &&
            // Penegasan tipe (as DataRiwayat) dihapus karena tidak perlu berkat type guard `item is DataRiwayat`
            item.status?.toLowerCase() !== "menunggu"
        );

        // Memetakan data yang sudah difilter ke format yang diinginkan
        const mappedData: DataRiwayat[] = filtered.map((item) => ({
          no_resi: item.no_resi,
          date: item.date,
          tipe: item.tipe,
          keterangan: item.keterangan,
          status: item.status,
          penduduk: {
            nama_lengkap: item.penduduk?.nama_lengkap ?? "Tidak diketahui",
          },
        }));

        setDataRiwayat(mappedData);
      } else {
        // Jika 'data' bukan array, atur state ke array kosong untuk menghindari error
        console.warn("Response.data bukan array, diatur ke array kosong:", result);
        setDataRiwayat([]);
      }
    } catch (error) {
      console.error("Gagal fetch data riwayat:", error);
      setDataRiwayat([]); // Atur ke array kosong jika terjadi error
    } finally {
      setLoading(false);
    }
  };

  // Fungsi pembungkus untuk 'refetch' agar sesuai dengan tipe 'void'
  const refetchVoid = (): void => {
    void fetchRiwayat();
  };

  // Mengambil data saat komponen pertama kali di-mount
  useEffect(() => {
    void fetchRiwayat();
  }, []);

  return (
    <RiwayatContext.Provider
      value={{ dataRiwayat, setDataRiwayat, loading, refetch: refetchVoid }}
    >
      {children}
    </RiwayatContext.Provider>
  );
};
