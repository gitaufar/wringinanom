import { Button } from 'flowbite-react';
import React from 'react';

interface LetterCardProps {
  title: string;
  description: string;
  topic: string;
  
  color: string;
  icon: string;
}

const LetterCard: React.FC<LetterCardProps> = ({
  title,
  description,
  topic,
  color,
  icon,
}) => {
  return (
    // 1. Ganti <Card> dengan <div> biasa untuk kontrol penuh
    //    Kita gunakan flexbox untuk memastikan layout konsisten
    <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden flex flex-col">
      
      {/* Bagian ATAS: Latar belakang berwarna dengan ikon */}
      <div className={`h-32 flex items-center justify-center ${color}`}>
        <div className="text-6xl text-white opacity-80">{icon}</div>
      </div>

      {/* Bagian BAWAH: Konten dengan latar belakang putih eksplisit */}
      <div className="p-4 bg-white flex flex-col flex-grow">
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
          
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg"
            size="sm"
          >
            Pilih Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LetterCard;