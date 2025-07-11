import { PencilIcon } from "lucide-react";

type InputFieldDropdownProps = {
  inputLabel?: string;
  inputPlaceholder?: string;
  options: string[];
  data?: string;
  setData: (value: string) => void;
  setEditData: (value: boolean) => void;
  editData: boolean;
  submited: string | null;
};

export default function InputFieldDropdown({
  inputLabel,
  inputPlaceholder = "Pilih...",
  options,
  data = "",
  setData,
  setEditData,
  editData,
  submited,
}: InputFieldDropdownProps) {
  return (
    <div className="flex flex-col gap-3">
      {inputLabel && (
        <label className="text-base font-normal text-neutral-600">{inputLabel}</label>
      )}
      <div className="relative flex justify-end items-center">
        <select
          disabled={!editData}
          value={data}
          onChange={(e) => setData(e.target.value)}
          className={`w-full text-xs sm:text-base font-normal border ${
            editData
              ? "bg-transparent border-[#D5D5D5]"
              : "bg-[#F5F6FA] border-transparent"
          } px-[12px] py-[8px] rounded-[4px] outline-none ${
            data === "" ? "text-neutral-400" : "text-black"
          }`}
        >
          <option value="" disabled hidden>
            {inputPlaceholder}
          </option>
          {options.map((opt) => (
            <option className="text-black" key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {(submited === null || submited === "submit") && (
          <div
            onClick={() => setEditData(!editData)}
            className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-700 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
          >
            <p className="text-xs text-neutral-400">{editData ? "Simpan" : "Edit"}</p>
            <PencilIcon width={14} height={14} color="#A3A3A3" />
          </div>
        )}
      </div>
    </div>
  );
}
