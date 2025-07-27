"use client";
import { JSX } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

type ButtonActionProps = {
  editData: () => void;
  deleteData: () => void;
};

const ButtonAction = ({editData, deleteData}: ButtonActionProps): JSX.Element => {
  return (
    <div className="flex gap-3 text-gray-600">
      <button onClick={editData} className="hover:text-blue-500">
        <FaEdit />
      </button>
      <button onClick={deleteData} className="text-red-500">
        <FaTrash />
      </button>
    </div>
  );
};

export default ButtonAction;