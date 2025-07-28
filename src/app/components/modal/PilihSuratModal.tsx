"use client";

import { CheckCircle2 } from "lucide-react";
import { JSX } from "react";

type PilihSuratModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (jenisSurat: string) => void;
};

export default function PilihSuratModal({
  isOpen,
  onClose,
  onSelect,
}: PilihSuratModalProps): JSX.Element | null {
  if (!isOpen) return null;

  const handleSelect = (jenis: string) => {
    onSelect(jenis);
    onClose();
  };

  const jenisSuratList = [
    { label: "Surat Wali Nikah", value: "wali-nikah" },
    { label: "Surat Keterangan Usaha", value: "usaha" },
    { label: "Surat Kehilangan Kepolisian", value: "kehilangan" },
    { label: "Surat Tidak Mampu", value: "tidak-mampu" },
    { label: "Surat Domisili Baru", value: "domisili-baru" },
    { label: "Surat Penghasilan", value: "penghasilan" },
    { label: "SKCK", value: "skck" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 h-full w-full flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-11/12 max-w-md animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <CheckCircle2 className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-900 text-center">
          Pilih Jenis Surat
        </h3>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Silakan pilih jenis surat yang ingin diajukan.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {jenisSuratList.map((surat) => (
            <button
              key={surat.value}
              type="button"
              onClick={() => handleSelect(surat.value)}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 text-center"
            >
              {surat.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Batal
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in-scale {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
