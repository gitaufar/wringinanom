
"use client";

import { PencilIcon } from "lucide-react";
import { Dispatch, SetStateAction, FC } from "react";

type InputFieldDateProps = {
  inputLabel?: string;
  setData: (value: string) => void;
  setEditData: Dispatch<SetStateAction<boolean>>;
  editData: boolean;
  submited?: string | null;
  data?: string;
  error?: string;
};

const InputFieldDate: FC<InputFieldDateProps> = ({
  inputLabel,
  setData,
  setEditData,
  editData,
  submited,
  data = "",
  error,
}) => {
  const handleToggleEdit = () => {
    if (editData && !data) {
      alert("Harap isi tanggal terlebih dahulu.");
      return;
    }
    setEditData(!editData);
  };

  return (
    <div className="flex flex-col gap-2">
      {inputLabel && (
        <label className="text-sm sm:text-base font-normal text-neutral-600">
          {inputLabel}
        </label>
      )}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          disabled={!editData}
          className={`
            flex-1 w-full text-xs sm:text-base font-normal border rounded-md
            px-3 py-2 outline-none transition-colors
            focus:ring-2
            ${data === "" ? "text-neutral-400" : "text-black"}
            ${editData ? "bg-transparent" : "bg-gray-100 text-gray-700"}
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : editData
                ? "border-gray-300 focus:ring-blue-500"
                : "border-gray-100"
            }
          `}
        />
        {submited === "submit" && (
          <button
            type="button"
            onClick={handleToggleEdit}
            className="flex-shrink-0 cursor-pointer flex items-center bg-neutral-200 hover:bg-neutral-300 gap-x-2 px-3 py-2 rounded-md transition-colors"
          >
            <p className="text-xs font-medium text-gray-600">
              {editData ? "Simpan" : "Ubah"}
            </p>
            <PencilIcon width={14} height={14} className="text-gray-500" />
          </button>
        )}
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputFieldDate;
