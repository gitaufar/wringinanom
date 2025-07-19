"use client";
import { FaEdit, FaTrash } from "react-icons/fa";

type ButtonActionProps = {
  editData: () => void;
  deleteData: () => void;
};

const ButtonAction = ({editData, deleteData}: ButtonActionProps) => {
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