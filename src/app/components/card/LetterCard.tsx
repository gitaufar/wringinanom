"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";

interface LetterCardProps {
  title: string;
  description: string;
  topic: string;
  link?: string;
  imageUrl: string;
}

const LetterCard: React.FC<LetterCardProps> = ({
  title,
  description,
  topic,
  link,
  imageUrl,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // optional delay
      if (link) {
        router.push(`/surat/${link}`);
      }
    } catch (error) {
      console.error("Gagal redirect:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden flex flex-col bg-white">
      <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={`Preview untuk ${title}`}
          fill
          className="object-cover object-top pb-2 rounded-t-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[2.8rem]">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2rem]">
          {description}
        </p>

        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {topic}
            </span>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg"
            size="sm"
            onClick={() => void handleClick()}
            disabled={loading}
          >
            {loading ? "Memuat..." : "Ajukan Surat"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LetterCard;
