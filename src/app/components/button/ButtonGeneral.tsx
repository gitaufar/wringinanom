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
  const ButtonComponent = href ? 'a' : 'button';
  return (
    <ButtonComponent
      href={href}
      className={`${className} cursor-pointer flex flex-row gap-6 py-4 px-6 bg-[#008266] items-center rounded-3xl`}
      onClick={onClick}
    >
      <p className="cursor-pointer text-xl text-white">{text}</p>
      {icon === "arrow" && <ArrowIcon />}
    </ButtonComponent>
  );
};

export default ButtonGeneral;