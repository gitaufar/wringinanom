// app/components/modal/ConfirmationModal.tsx (Diperbarui)

"use client";

import { CheckCircle2 } from "lucide-react";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title: string;
  message: string;
  // Prop baru untuk menampilkan info sukses
  successInfo?: { title: string; resi: string } | null;
};

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title,
  message,
  successInfo = null, // Default null
}: ConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }

  // Tampilan Sukses
  if (successInfo) {
    return (
      <div className="fixed inset-0 bg-black/50 h-full w-full flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 max-w-md text-center animate-fade-in-scale">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-gray-900">{successInfo.title}</h3>
          <p className="mt-2 text-sm text-gray-600">
            Nomor resi pengajuan Anda adalah:
          </p>
          <p className="mt-2 text-lg font-mono font-bold text-blue-600 bg-blue-50 p-2 rounded-md">
            {successInfo.resi}
          </p>
          <p className="mt-4 text-xs text-gray-500">
            Anda akan diarahkan kembali ke halaman utama.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  // Tampilan Konfirmasi (Default)
  return (
    <div
      className="fixed inset-0 bg-black/50 h-full w-full flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-11/12 max-w-md animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? "Memproses..." : "Ya, Lanjutkan"}
          </button>
        </div>
      </div>
      <style jsx>{`
        /* Animasi sederhana untuk pop-up */
        @keyframes fade-in-scale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
}