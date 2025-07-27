'use client'

import React, { JSX, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { penduduk } from '@prisma/client'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

interface FetchResponse {
  data: penduduk[];
}

export default function TabelKonfirmasi(): JSX.Element {
  const router = useRouter()
  const [data, setData] = useState<penduduk[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchData = async (): Promise<void> => {
    try {
      const res = await fetch('/api/penduduk?status=pending');
      const json = (await res.json()) as FetchResponse;
      setData(json.data);
    } catch (error) {
      console.error('Gagal memuat data:', error);
    } finally {
      setLoading(false);
    }
  };

  void fetchData();
}, []);


  const handleDelete = async (nik: string): Promise<void> => {
    if (!window.confirm('Yakin ingin menghapus?')) return

    try {
      await fetch(`/api/penduduk/${nik}`, { method: 'DELETE' })
      setData((prev) => prev.filter((x) => x.nik !== nik))
    } catch (error) {
      console.error('Gagal menghapus data:', error)
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['NIK', 'Nama', 'Jenis Kelamin', 'Tanggal Lahir', 'Alamat', 'Keterangan', 'Action'].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map((d) => (
                <tr key={d.nik} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-700">{d.nik}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{d.nama_lengkap}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{d.jenis_kelamin}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {d.tanggal_lahir ? format(new Date(d.tanggal_lahir), 'dd-MM-yyyy') : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{d.alamat}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">kosong dulu</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => router.push(`/admin/kependudukan/edit/${d.nik}`)}
                      className="p-2 rounded hover:bg-gray-100"
                      title="Edit"
                    >
                      <FiEdit className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => void handleDelete(d.nik)} // ✅ void untuk async handler
                      className="p-2 rounded hover:bg-red-50"
                      title="Hapus"
                    >
                      <FiTrash2 className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
