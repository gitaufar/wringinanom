"use client";
import { useParams } from "next/navigation";
import { TambahPenduduk } from "@/app/components/screen/admin/TambahPenduduk";
import { JSX, useEffect, useState } from "react";
import { PendudukProps } from "@/app/components/screen/admin/TambahPenduduk";

// Define interface for API response
interface PendudukApiResponse {
  nik: string;
  no_kk: string;
  nama_lengkap?: string | null;
  nama_ibu?: string | null;
  nama_ayah?: string | null;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string; // ISO date string from API
  agama: string;
  pendidikan: string;
  pekerjaan?: string | null;
  status_perkawinan: string;
  tanggal_perkawinan?: string | null; // ISO date string from API
  status_keluarga: string;
  alamat: string;
  rt: number; // API returns number
  rw: number; // API returns number
}

interface ErrorResponse {
  error: string;
  message?: string;
}

export default function Page(): JSX.Element {
  const params = useParams();
  const nik = Array.isArray(params.nik) ? params.nik[0] : params.nik;
  const [data, setData] = useState<PendudukProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (!nik || typeof nik !== "string") {
          throw new Error("NIK parameter is required");
        }

        const res = await fetch(`/api/penduduk/${nik}`);

        if (!res.ok) {
          const errorData = (await res.json()) as ErrorResponse;
          throw new Error(errorData.error || "Failed to fetch data");
        }

        const json = (await res.json()) as PendudukApiResponse;

        // Transform API response to component props format
        const transformedData: PendudukProps = {
          ...json,
          // Convert null values to empty strings and handle date formatting
          nama_lengkap: json.nama_lengkap || "",
          nama_ibu: json.nama_ibu || "",
          nama_ayah: json.nama_ayah || "",
          pekerjaan: json.pekerjaan || "",
          tanggal_lahir: json.tanggal_lahir?.split("T")[0] || "",
          tanggal_perkawinan: json.tanggal_perkawinan?.split("T")[0] || "",
          rt: json.rt.toString(),
          rw: json.rw.toString(),
        };

        setData(transformedData);
      } catch (err) {
        console.error("Error fetching penduduk data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchData(); // Explicitly mark as ignored to satisfy ESLint
  }, [nik]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data found</p>;

  return <TambahPenduduk formDataProps={data} />;
}
