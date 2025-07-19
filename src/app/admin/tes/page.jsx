// pages/kependudukan.tsx
import React from 'react'
import { FaTrash, FaEdit, FaBell } from 'react-icons/fa'

const Kependudukan = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-2xl font-bold text-blue-600">
          Dash<span className="text-black">Stack</span>
        </div>
        <nav className="mt-6 space-y-2 text-gray-700">
          <a href="#" className="block px-6 py-2 hover:bg-gray-100">Dashboard</a>
          <a href="#" className="block px-6 py-2 hover:bg-gray-100">Notifikasi</a>
          <a href="#" className="block px-6 py-2 hover:bg-gray-100">Administrasi</a>
          <a href="#" className="block px-6 py-2 hover:bg-gray-100">Laporan</a>
          <a href="#" className="block px-6 py-2 bg-blue-100 text-blue-700 rounded-l-full font-semibold">Kependudukan</a>
        </nav>
        <div className="absolute bottom-6 left-6 text-gray-500">Logout</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Kependudukan</h1>
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600 text-xl" />
            <div className="flex items-center space-x-2">
              <img src="https://i.pravatar.cc/40" className="rounded-full" />
              <div>
                <p className="text-sm font-semibold">Moni Roy</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <select className="px-3 py-2 rounded border text-sm">
              <option>Urutkan</option>
              <option>Nama</option>
              <option>Tanggal</option>
            </select>
            <select className="px-3 py-2 rounded border text-sm">
              <option>Waktu</option>
            </select>
            <select className="px-3 py-2 rounded border text-sm">
              <option>Jenis Surat</option>
            </select>
            <select className="px-3 py-2 rounded border text-sm">
              <option>Status Order</option>
            </select>
            <button className="text-sm text-red-500 hover:underline">Reset Urutan</button>
          </div>
          <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 text-sm">Tambah Penduduk</button>
        </div>

        {/* Table Menunggu Konfirmasi */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Menunggu Konfirmasi</h2>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">NIK</th>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Jenis Kelamin</th>
                  <th className="px-4 py-2">Tanggal Lahir</th>
                  <th className="px-4 py-2">Alamat</th>
                  <th className="px-4 py-2">Keterangan</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">6403050303040001</td>
                  <td className="px-4 py-2">Regasari Rekyan Permatasari</td>
                  <td className="px-4 py-2">Laki-laki</td>
                  <td className="px-4 py-2">20-22-2020</td>
                  <td className="px-4 py-2">Dusun Besuki RT 028 RW 006</td>
                  <td className="px-4 py-2">Kematian</td>
                  <td className="px-4 py-2 text-red-500">
                    <FaTrash />
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">6403050303040001</td>
                  <td className="px-4 py-2">Regasari Rekyan Permatasari</td>
                  <td className="px-4 py-2">Laki-laki</td>
                  <td className="px-4 py-2">20-22-2020</td>
                  <td className="px-4 py-2">Dusun Besuki RT 028 RW 006</td>
                  <td className="px-4 py-2">Kelahiran</td>
                  <td className="px-4 py-2 text-red-500">
                    <FaTrash />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Kependudukan */}
        <h2 className="text-lg font-semibold mb-2">Kependudukan</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">NIK</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Jenis Kelamin</th>
                <th className="px-4 py-2">Tanggal Lahir</th>
                <th className="px-4 py-2">Alamat</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">6403050303040001</td>
                  <td className="px-4 py-2">Regasari Rekyan Permatasari</td>
                  <td className="px-4 py-2">Laki-laki</td>
                  <td className="px-4 py-2">20-22-2020</td>
                  <td className="px-4 py-2">Dusun Besuki RT 028 RW 006</td>
                  <td className="px-4 py-2 flex space-x-3 text-blue-600">
                    <FaEdit className="cursor-pointer" />
                    <FaTrash className="cursor-pointer text-red-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-sm text-gray-500 mt-4">Menampilkan 1-09 dari 78</div>
      </main>
    </div>
  )
}

export default Kependudukan
