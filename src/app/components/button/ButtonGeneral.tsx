"use client";
import React, { JSX } from "react";
import ArrowIcon from "../icon/ArrowIcon";

type ButtonGeneralProps = {
  text: string;
  icon?: "arrow";
  onClick?: () => void;
  className?: string;
  href?: string;
};

const ButtonGeneral = ({
  text,
  icon,
  onClick,
  className = "",
  href,
}: ButtonGeneralProps): JSX.Element => {
  const baseClass =
    "cursor-pointer flex flex-row gap-4 sm:gap-6 py-3 sm:py-4 px-4 sm:px-6 bg-[#008266] hover:bg-[#00664f] transition-all duration-200 ease-in-out items-center rounded-3xl";

  const content = (
    <>
      <p className="text-sm sm:text-xl text-white">{text}</p>
      {icon === "arrow" && <ArrowIcon />}
    </>
  );

  return href ? (
    <a href={href} className={`${baseClass} ${className}`}>
      {content}
    </a>
  ) : (
    <button onClick={onClick} className={`${baseClass} ${className}`}>
      {content}
    </button>
  );
};

export default ButtonGeneral;
