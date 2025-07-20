"use client";
import React from "react";
import ArrowIcon from "../icon/ArrowIcon";

type ButtonGeneralProps = {
  text: string;
  icon?: "arrow";
  onClick?: () => void;
  className?: string;
  href?: string;
};

const ButtonGeneral = ({ text, icon, onClick, className, href }: ButtonGeneralProps) => {
  const ButtonComponent = href ? "a" : "button";
  return (
    <ButtonComponent
      href={href}
      onClick={onClick}
      className={`cursor-pointer flex flex-row gap-4 sm:gap-6 py-3 sm:py-4 px-4 sm:px-6 bg-[#008266] hover:bg-[#00664f] transition-all duration-200 ease-in-out items-center rounded-3xl ${className}`}
    >
      <p className="text-sm sm:text-xl text-white">{text}</p>
      {icon === "arrow" && <ArrowIcon />}
    </ButtonComponent>
  );
};

export default ButtonGeneral;
