"use client";
import React from "react";
import ArrowIcon from "../icon/ArrowIcon";

type ButtonGeneralProps = {
  text: string;
  icon?: React.ReactNode | "arrow";
  onClick?: () => void;
  className?: string;
};

const ButtonGeneral = ({ text, icon, onClick, className }: ButtonGeneralProps) => {
  const renderIcon = () => {
    if (icon === "arrow") {
      return <ArrowIcon />;
    }
    return icon;
  };

  return (
    <button
      className={`${className} cursor-pointer flex flex-row gap-6 py-4 px-6 bg-[#008266] items-center rounded-3xl`}
      onClick={onClick}
    >
      <p className="cursor-pointer text-xl text-white">{text}</p>
      {renderIcon()}
    </button>
  );
};

export default ButtonGeneral;
