"use client";

import Link from "next/link";
import ButtonGeneral from "../button/ButtonGeneral";

type LayananCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  href: string; // Tambahkan properti href
};

const LayananCard = ({ title, description, imageUrl, href }: LayananCardProps) => {
  return (
    <div className="gap-2 text-white text-center flex flex-col items-center py-8 px-7 border-4 border-white rounded-3xl">
      <img src={imageUrl} alt={title} className="w-full rounded-2xl h-42 object-cover" />
      <h2 className="font-bold text-4xl">{title}</h2>
      <p className="text-xl font-normal opacity-80">{description}</p>
      
      {/* Bungkus tombol dengan Link dari Next.js */}
      <Link href={href} passHref>
        <ButtonGeneral text="Mulai Sekarang" onClick={() => {}} />
      </Link>
    </div>
  );
};

export default LayananCard;