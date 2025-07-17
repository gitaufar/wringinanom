"use client"; // Diperlukan karena menggunakan useRouter

import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React from 'react';

// 1. Perbarui interface: Hapus 'color' & 'icon', tambahkan 'imageUrl'
interface LetterCardProps {
  title: string;
  description: string;
  topic: string;
  link?: string;
  imageUrl: string; // Properti baru untuk gambar preview
}

const LetterCard: React.FC<LetterCardProps> = ({
  title,
  description,
  topic,
  link,
  imageUrl, // Gunakan properti baru ini
}) => {
  const router = useRouter();

  return (
    <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden flex flex-col bg-white">
      
      {/* 2. Ganti bagian atas dengan preview gambar */}
      <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center overflow-auto">
        <img 
          src={imageUrl} 
          alt={`Preview untuk ${title}`} 
          className="h-full w-full object-cover object-top pb-2" // 'object-contain' agar gambar pas dan tidak terpotong
        />
      </div>

      {/* Bagian bawah tetap sama */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[2.8rem]">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2rem]">
          {description}
        </p>

        {/* Wrapper untuk mendorong button ke bawah */}
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {topic}
            </span>
          </div>
          
          {/* 3. Fungsionalitas tombol navigasi dipertahankan */}
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg"
            size="sm"
            onClick={() => router.push(`/surat/${link}`)}
          >
            Ajukan Surat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LetterCard;
