"use client";
import { FaEdit, FaTrash } from "react-icons/fa";

const ButtonAction = () => {
  return (
    <div className="flex gap-3 text-gray-600">
      <button className="hover:text-blue-500">
        <FaEdit />
      </button>
      <button className="hover:text-red-500">
        <FaTrash />
      </button>
    </div>
  );
};

export default ButtonAction;