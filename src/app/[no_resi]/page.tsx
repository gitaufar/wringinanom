"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaWhatsapp,
  FaFacebook,
  FaTelegram,
  FaClipboard,
} from "react-icons/fa";

type Order = {
  receiptNumber: string;
  applicantName: string;
  applicantNIK: string;
  letterType: string;
  submissionDate: string;
  creationDate: string;
  status: string; // 🆕 tambahkan status
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
        const res = await fetch(`/api/permohonan?no_resi=${no_resi}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Gagal memuat data");

        const permohonan = data.data;

        setOrder({
          receiptNumber: permohonan.no_resi,
          applicantName: permohonan.penduduk.nama_lengkap,
          applicantNIK: permohonan.nik,
          letterType: permohonan.jenis_surat,
          submissionDate: permohonan.tanggal,
          creationDate: new Date(permohonan.tanggal).toLocaleDateString(
            "id-ID"
          ),
          status: permohonan.status, // 🆕 status ditambahkan di sini
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
    return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;
  if (!order)
    return <div style={{ textAlign: "center" }}>Data tidak ditemukan</div>;

  return (
    <div
      style={{
        fontFamily: "Jakarta Sans, sans-serif",
        backgroundColor: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{ fontSize: "2rem", color: "#007bff", fontWeight: "bold" }}
          >
            {order.letterType}
          </h1>
          <p style={{ margin: "5px 0", fontSize: "1.2rem" }}>
            #{order.receiptNumber}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <h2
            style={{ fontSize: "3rem", fontWeight: "bold", color: "#007bff" }}
          >
            # {order.receiptNumber}
          </h2>
        </div>

        <div
          style={{
            marginTop: "20px",
            fontSize: "1rem",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Nama Pengaju</span>
            <span>{order.applicantName}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>NIK</span>
            <span>{order.applicantNIK}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Tanggal Pembuatan</span>
            <span>{order.creationDate}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Status</span>
            <span>{order.status}</span>
          </div>
        </div>

        <div style={{ borderTop: "2px solid #ddd", margin: "30px 0" }}></div>

        <div
          style={{ marginTop: "30px", textAlign: "center", fontSize: "1rem" }}
        >
          <p>
            Jika ada pertanyaan, Anda bisa langsung lapor ke kantor desa melalui{" "}
            <a
              href="https://maps.app.goo.gl/sMrfivxHfNmi5taK6"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              Lokasi Kantor Desa
            </a>
            .
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleCopy}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaClipboard style={{ marginRight: "8px" }} />
            {copied ? "Disalin!" : "Salin Resi"}
          </button>

          <Link
            href={`https://wa.me?text=${order.receiptNumber}`}
            target="_blank"
          >
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#25D366",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaWhatsapp style={{ marginRight: "8px" }} /> WhatsApp
            </button>
          </Link>

          <Link href="https://facebook.com" target="_blank">
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#4267B2",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaFacebook style={{ marginRight: "8px" }} /> Facebook
            </button>
          </Link>

          <Link href="https://telegram.org" target="_blank">
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#0088cc",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaTelegram style={{ marginRight: "8px" }} /> Telegram
            </button>
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Link href="/">
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Kembali ke Halaman Utama
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
