"use client";
import NotFound from "../components/screen/user/NotFound";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaWhatsapp,
  FaFacebook,
  FaTelegram,
  FaClipboard,
} from "react-icons/fa"; // pastikan path sesuai
import StatusCard from "../components/card/StatusCard";

type Order = {
  receiptNumber: string;
  applicantName: string;
  applicantNIK: string;
  letterType: string;
  submissionDate: string;
  creationDate: string;
  status: "Selesai" | "Menunggu" | "Dibatalkan" | "Diproses";
  description?: string;
};

const Receipt = () => {
  const { no_resi } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!no_resi) return;
      try {
        const res = await fetch(`/api/layanan/${no_resi}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Gagal memuat data");

        const permohonan = data.data;

        setOrder({
          receiptNumber: permohonan.no_resi,
          applicantName: permohonan.penduduk.nama_lengkap,
          applicantNIK: permohonan.nik,
          letterType: permohonan.jenis_surat,
          submissionDate: permohonan.date,
          creationDate: new Date(permohonan.date).toLocaleDateString("id-ID"),
          status: permohonan.status,
          description: permohonan.keterangan || "", // tambahkan keterangan
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [no_resi]);

  const handleCopy = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.receiptNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
  if (error)
    return <NotFound />;
  if (!order)
    return <NotFound />;

  return (
    <div className="bg-[#f4f4f4] flex justify-center items-center min-h-screen p-5">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">
            {order.letterType}
          </h1>
          <p className="mt-1 text-lg">#{order.receiptNumber}</p>
        </div>

        <div className="flex justify-center my-6">
          <h2 className="text-4xl font-bold text-blue-600">
            # {order.receiptNumber}
          </h2>
        </div>

        <div className="mt-5 text-base bg-[#f9f9f9] p-5 rounded-lg">
          <div className="flex justify-between mb-3">
            <span className="font-semibold">Nama Pengaju</span>
            <span>{order.applicantName}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="font-semibold">NIK</span>
            <span>{order.applicantNIK}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="font-semibold">Tanggal Pembuatan</span>
            <span>{order.creationDate}</span>
          </div>
          <div className="flex justify-between mb-3 items-center">
            <span className="font-semibold">Status</span>
            <StatusCard status={order.status} />
          </div>

          {order.status === "Dibatalkan" && order.description && (
            <div className="mt-4 p-4 bg-red-50 text-red-800 border border-red-200 rounded-md">
              <p className="font-semibold mb-1">Keterangan Pembatalan:</p>
              <p>{order.description}</p>
            </div>
          )}
        </div>

        <div className="border-t-2 border-gray-200 my-8"></div>

        <div className="text-center text-base mt-6">
          <p>
            Jika ada pertanyaan, Anda bisa langsung lapor ke kantor desa melalui{" "}
            <a
              href="https://maps.app.goo.gl/sMrfivxHfNmi5taK6"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Lokasi Kantor Desa
            </a>
            .
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-5 mt-8">
          <button
            onClick={handleCopy}
            className="px-5 py-2 bg-green-600 text-white rounded-md flex items-center text-base hover:bg-green-700"
          >
            <FaClipboard className="mr-2" />
            {copied ? "Disalin!" : "Salin Resi"}
          </button>

          <Link
            href={`https://wa.me?text=${order.receiptNumber}`}
            target="_blank"
          >
            <button className="px-5 py-2 bg-[#25D366] text-white rounded-md flex items-center text-base hover:bg-green-500">
              <FaWhatsapp className="mr-2" />
              WhatsApp
            </button>
          </Link>

          <Link href="https://facebook.com" target="_blank">
            <button className="px-5 py-2 bg-[#4267B2] text-white rounded-md flex items-center text-base hover:bg-blue-700">
              <FaFacebook className="mr-2" />
              Facebook
            </button>
          </Link>

          <Link href="https://telegram.org" target="_blank">
            <button className="px-5 py-2 bg-[#0088cc] text-white rounded-md flex items-center text-base hover:bg-blue-500">
              <FaTelegram className="mr-2" />
              Telegram
            </button>
          </Link>
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-md text-base hover:bg-blue-700">
              Kembali ke Halaman Utama
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
