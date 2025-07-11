"use client";

import { useState } from "react";

export const TestApi = () => {
  const [form, setForm] = useState({
    nik: "",
    no_kk: "",
    nama_lengkap: "",
    nama_ibu: "",
    nama_ayah: "",
    jenis_kelamin: "Laki-laki",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    rt: "",
    rw: "",
    pekerjaan: "",
    agama: "",
  });

  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/penduduk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          rt: parseInt(form.rt),
          rw: parseInt(form.rw),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan.");
      } else {
        setResponse(data.message);
      }
    } catch (err: any) {
      setError(err.message || "Gagal memproses.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded space-y-4">
      <h2 className="text-xl font-bold mb-4">Form Tambah / Update Penduduk</h2>

      {Object.entries(form).map(([key, value]) => {
        if (key === "jenis_kelamin") {
          return (
            <div key={key}>
              <label className="block font-medium">Jenis Kelamin</label>
              <select
                name="jenis_kelamin"
                value={value}
                onChange={handleChange}
                className="border px-3 py-2 w-full rounded"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          );
        }

        return (
          <div key={key}>
            <label className="block font-medium capitalize">{key.replace(/_/g, " ")}</label>
            <input
              type={key === "tanggal_lahir" ? "date" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              className="border px-3 py-2 w-full rounded"
            />
          </div>
        );
      })}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Kirim
      </button>

      {response && <p className="text-green-600 mt-2">{response}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};
