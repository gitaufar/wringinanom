"use client";
import { useParams } from "next/navigation";
import { TambahPenduduk } from "@/app/components/screen/admin/TambahPenduduk";
import { useEffect, useState } from "react";
import { PendudukProps } from "@/app/components/screen/admin/TambahPenduduk";

export default function Page() {
  const { nik } = useParams();
  const [data, setData] = useState<PendudukProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/penduduk/${nik}`);
      const json = await res.json();
      setData({
        ...json,
        tanggal_lahir: json.tanggal_lahir?.split("T")[0],
        tanggal_perkawinan: json.tanggal_perkawinan?.split("T")[0] ?? null,
        rt: json.rt.toString(),
        rw: json.rw.toString(),
      });
    };
    fetchData();
  }, [nik]);

  if (!data) return <p>Loading...</p>;

  return <TambahPenduduk formDataProps={data} />;
}
