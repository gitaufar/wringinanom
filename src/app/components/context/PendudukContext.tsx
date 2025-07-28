import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { penduduk } from "@prisma/client";

const LIMIT = 10;
const DEBOUNCE_DELAY = 500;

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
  searchTerm: string;
  setSearchTerm: (term: string) => void;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);

  // Debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); // Reset ke page 1 saat searchTerm berubah
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchPenduduk = async (p: number, search: string = "") => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: p.toString(),
        limit: LIMIT.toString(),
        ...(search ? { search } : {}),
      });

      const res = await fetch(`/api/penduduk?${query.toString()}`);
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
    void fetchPenduduk(page, debouncedSearchTerm);
  }, [page, debouncedSearchTerm]);

  const refetch = () => {
    void fetchPenduduk(page, debouncedSearchTerm);
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
        searchTerm,
        setSearchTerm,
        setPage,
        refetch,
      }}
    >
      {children}
    </PendudukContext.Provider>
  );
};
