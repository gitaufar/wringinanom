"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  JSX,
} from "react";

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

type RiwayatContextType = {
  dataRiwayat: DataRiwayat[];
  loading: boolean;
  refetch: () => void;
  setDataRiwayat: React.Dispatch<React.SetStateAction<DataRiwayat[]>>;
};

const RiwayatContext = createContext<RiwayatContextType | undefined>(undefined);

export const useRiwayat = (): RiwayatContextType => {
  const context = useContext(RiwayatContext);
  if (!context) {
    throw new Error("useRiwayat must be used within a RiwayatProvider");
  }
  return context;
};

// ✅ Fixed: Added explicit return type
export const RiwayatProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [dataRiwayat, setDataRiwayat] = useState<DataRiwayat[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRiwayat = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch("/api/layanan");
      const json: unknown = await res.json();

      if (Array.isArray(json)) {
        const filtered = json.filter(
          (item): item is DataRiwayat =>
            typeof item === "object" &&
            item !== null &&
            (item as DataRiwayat).status?.toLowerCase() !== "menunggu"
        );

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
        console.error("Response bukan array:", json);
      }
    } catch (error) {
      console.error("Gagal fetch data riwayat:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fixed: Create a wrapper function that returns void
  const refetchVoid = (): void => {
    void fetchRiwayat();
  };

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
