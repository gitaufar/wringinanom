"use client";

import Link from "next/link";
import Image from "next/image";
import ButtonGeneral from "../button/ButtonGeneral";
import { JSX } from "react";

type LayananCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
};

const LayananCard = ({
  title,
  description,
  imageUrl,
  href,
}: LayananCardProps): JSX.Element => {
  return (
    <div className="gap-2 text-white text-center flex flex-col items-center py-8 px-7 border-4 border-white rounded-3xl">
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={200}
        className="w-full rounded-2xl h-42 object-cover"
      />
      <h2 className="font-bold text-4xl">{title}</h2>
      <p className="text-xl font-normal opacity-80">{description}</p>

      <Link href={href} passHref>
        <ButtonGeneral text="Mulai Sekarang" onClick={() => {}} />
      </Link>
    </div>
  );
};

export default LayananCard;
