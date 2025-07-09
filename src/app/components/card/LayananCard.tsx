"use client";

import ButtonGeneral from "../button/ButtonGeneral";

type LayananCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
};

const LayananCard = ({ title, description, imageUrl, onClick }: LayananCardProps) => {
  return (
    <div className="gap-2 text-white text-center flex flex-col items-center py-8 px-7 border-4 border-white rounded-3xl">
      <img src={imageUrl} alt={title} className="w-full rounded-2xl h-42" />
      <h2 className="font-bold text-4xl">{title}</h2>
      <p className="text-xl font-normal opacity-80">{description}</p>
      <ButtonGeneral text="Mulai Sekarang" onClick={() => onClick} />
    </div>
  );
};

export default LayananCard;
