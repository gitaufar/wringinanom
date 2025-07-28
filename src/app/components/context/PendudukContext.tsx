"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { penduduk } from "@prisma/client";

const LIMIT = 10;

interface FetchResponse {
  data: penduduk[];
  totalPages: number;
  totalData: number;
}

interface PendudukContextType {
  data: penduduk[];
  totalPages: number;
  totalData: number;
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  refetch: () => void;
  setData: React.Dispatch<React.SetStateAction<penduduk[]>>;
}

const PendudukContext = createContext<PendudukContextType | undefined>(
  undefined
);

export const usePenduduk = (): PendudukContextType => {
  const context = useContext(PendudukContext);
  if (!context) {
    throw new Error("usePenduduk must be used within a PendudukProvider");
  }
  return context;
};

export const PendudukProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<penduduk[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const fetchPenduduk = async (p: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/penduduk?page=${p}&limit=${LIMIT}`);
      const json = (await res.json()) as FetchResponse;
      setData(json.data);
      setTotalPages(json.totalPages);
      setTotalData(json.totalData);
    } catch (error) {
      console.error("Gagal fetch data penduduk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPenduduk(page);
  }, [page]);

  const refetch = () => {
    void fetchPenduduk(page);
  };

  return (
    <PendudukContext.Provider
      value={{
        data,
        setData,
        totalPages,
        totalData,
        loading,
        page,
        setPage,
        refetch,
      }}
    >
      {children}
    </PendudukContext.Provider>
  );
};
