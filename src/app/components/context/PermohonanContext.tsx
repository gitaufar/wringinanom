"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  JSX,
} from "react";

type Status = "Menunggu" | "Selesai" | "Dibatalkan";

type DataPermintaan = {
  no_resi: string;
  penduduk: {
    nama_lengkap: string;
  };
  tanggal: string;
  jenis_surat: string;
  data_dinamis?: Record<string, unknown>;
  riwayatlayanan: {
    status: Status;
  };
};

type PermohonanContextType = {
  permohonan: DataPermintaan[];
  fetchPermohonan: () => void;
};

const PermohonanContext = createContext<PermohonanContextType | undefined>(
  undefined
);

// ✅ Fixed: Added explicit return type
export const PermohonanProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [permohonan, setPermohonan] = useState<DataPermintaan[]>([]);

  const fetchPermohonan = async (): Promise<void> => {
    try {
      const res = await fetch("/api/permohonan");
      const result = (await res.json()) as {
        data?: DataPermintaan[];
        error?: string;
      };

      if (!res.ok) throw new Error(result.error || "Gagal fetch permohonan");

      const onlyMenunggu = (result.data || []).filter(
        (x) => x.riwayatlayanan?.status === "Menunggu"
      );

      setPermohonan(onlyMenunggu);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi Kesalahan";
      console.error(message);
    }
  };

  // ✅ Alternative: Create a wrapper function with explicit error handling
  const fetchPermohonanVoid = (): void => {
    fetchPermohonan().catch((err) => {
      console.error("Error in fetchPermohonan:", err);
    });
  };

  useEffect(() => {
    // ✅ Alternative: Explicit error handling
    fetchPermohonan().catch((err) => {
      console.error("Error in initial fetchPermohonan:", err);
    });

    const interval = setInterval(fetchPermohonanVoid, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PermohonanContext.Provider
      value={{ permohonan, fetchPermohonan: fetchPermohonanVoid }}
    >
      {children}
    </PermohonanContext.Provider>
  );
};

export const usePermohonan = (): PermohonanContextType => {
  const context = useContext(PermohonanContext);
  if (!context) {
    throw new Error(
      "usePermohonan harus digunakan di dalam <PermohonanProvider>"
    );
  }
  return context;
};
