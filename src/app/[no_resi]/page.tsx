'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp, FaFacebook, FaTelegram, FaClipboard } from "react-icons/fa";  // Updated icons

const Receipt = () => {
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  // Sample administrative receipt data
  const sampleOrder = {
    receiptNumber: `RWS-${new Date().toLocaleDateString("id-ID")}`,
    applicantName: "Ridwan",
    applicantNIK: "123456789",
    letterType: "Surat Pengajuan Izin Usaha",
    submissionDate: "19 Juli 2025",
    creationDate: "19 Juli 2025", // Tanggal pembuatan
  };

  useEffect(() => {
    // Using sample data for now
    setOrder(sampleOrder);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(order.receiptNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div style={{ fontFamily: "Jakarta Sans, sans-serif", margin: 0, padding: 0, backgroundColor: "#f4f4f4", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: '20px' }}>
      <div style={{ width: "100%", maxWidth: "800px", padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={{ fontSize: "2rem", color: "#007bff", fontWeight: "bold" }}>{order.letterType}</h1>
            {/* Replaced "Tanggal Pengajuan" with "Nomor Resi" */}
            <p style={{ margin: "5px 0", fontSize: "1.2rem" }}>#{order.receiptNumber}</p>
          </div>
        

        {/* Receipt Number Section */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0" }}>
          <h2 style={{ fontSize: "3rem", fontWeight: "bold", color: "#007bff" }}># {order.receiptNumber}</h2>
        </div>

        {/* Combined Section for "Nama Pengaju", "NIK", and "Tanggal Pembuatan" */}
        <div style={{ marginTop: "20px", fontSize: "1rem", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold" }}>Nama Pengaju</span>
            <span>{order.applicantName}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold" }}>NIK</span>
            <span>{order.applicantNIK}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold" }}>Tanggal Pembuatan</span>
            <span>{order.creationDate}</span>
          </div>
        </div>

        {/* Divider Line */}
        <div style={{ borderTop: "2px solid #ddd", margin: "30px 0" }}></div>

        {/* Contact Center Information */}
        <div style={{ marginTop: "30px", textAlign: "center", fontSize: "1rem" }}>
          <p>Jika ada pertanyaan, Anda bisa langsung lapor ke kantor desa melalui <a href="https://maps.app.goo.gl/sMrfivxHfNmi5taK6" target="_blank" style={{ color: "#007bff", textDecoration: "underline" }}>Lokasi Kantor Desa</a>.</p>
        </div>

        {/* Copy and Share Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px", flexWrap: "wrap", gap: "15px" }}>
          <button onClick={handleCopy} style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center" }}>
            <FaClipboard style={{ marginRight: "8px" }} /> {copied ? "Disalin!" : "Salin Resi"}
          </button>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <Link href="https://wa.me" target="_blank">
              <button style={{ padding: "10px 20px", backgroundColor: "#25D366", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center" }}>
                <FaWhatsapp style={{ marginRight: "8px" }} /> WhatsApp
              </button>
            </Link>
            <Link href="https://facebook.com" target="_blank">
              <button style={{ padding: "10px 20px", backgroundColor: "#4267B2", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center" }}>
                <FaFacebook style={{ marginRight: "8px" }} /> Facebook
              </button>
            </Link>
            <Link href="https://telegram.org" target="_blank">
              <button style={{ padding: "10px 20px", backgroundColor: "#0088cc", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center" }}>
                <FaTelegram style={{ marginRight: "8px" }} /> Telegram
              </button>
            </Link>
          </div>
        </div>

        {/* Back to Home Button */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
          <Link href="/">
            <button style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "1rem" }}>
              Kembali ke Halaman Utama
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
