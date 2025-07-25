// components/tabel/TabelKependudukan.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { penduduk } from '@prisma/client'
import { useRouter } from 'next/navigation'
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
  FiTrash2,
} from 'react-icons/fi'

const LIMIT = 10

export default function TabelKependudukan() {
  const router = useRouter()
  const [data, setData] = useState<penduduk[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalData, setTotalData] = useState(0)

  const fetchPage = async (p: number) => {
    setLoading(true)
    const res = await fetch(`/api/penduduk?page=${p}&limit=${LIMIT}`)
    const json = await res.json()
    setData(json.data)
    setTotalPages(json.totalPages)
    setTotalData(json.totalData)
    setLoading(false)
  }

  useEffect(() => {
    fetchPage(page)
  }, [page])

  const handleDelete = async (nik: string) => {
    if (!confirm('Yakin ingin menghapus?')) return
    await fetch(`/api/penduduk/${nik}`, { method: 'DELETE' })
    fetchPage(page)
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['NIK','Nama','Jenis Kelamin','Tanggal Lahir','Alamat','Action'].map((h) => (
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
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  Data kosong
                </td>
              </tr>
            ) : (
              data.map((d) => (
                <tr key={d.nik} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-700">{d.nik}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{d.nama_lengkap}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{d.jenis_kelamin}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {format(new Date(d.tanggal_lahir), 'dd-MM-yyyy')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{d.alamat}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => router.push(`/admin/kependudukan/edit/${d.nik}`)}
                      className="p-2 rounded hover:bg-gray-100"
                      title="Edit"
                    >
                      <FiEdit className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(d.nik)}
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

        {/* Pagination */}
        {!loading && data.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Menampilkan {(page - 1) * LIMIT + 1}–{(page - 1) * LIMIT + data.length} dari {totalData}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                <FiChevronLeft />
              </button>
              <span>
                Halaman <strong>{page}</strong>/{totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
