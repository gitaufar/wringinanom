import { PencilIcon } from "lucide-react";

type InputField = {
	inputLabel?: string;
	inputPlaceholder: string;
	setData: (value: string) => void;
	setEditData: (value: boolean) => void;
	editData: boolean;
	submited?: string | null;
	data?: string;
	numberOnly?: boolean;
  error?: string;
};

export default function InputField({
  inputLabel,
  inputPlaceholder,
  setData,
  setEditData,
  editData,
  submited,
  data = "",
  numberOnly = false,
  error, // BARU: Ambil prop error
}: InputField) {
  return (
    <div className="flex flex-col gap-2"> {/* DIUBAH: Mengurangi gap agar lebih rapat dengan pesan error */}
      {inputLabel && (
        <label className="text-base sm:text-base font-normal text-neutral-600">
          {inputLabel}
        </label>
      )}
      <div className="relative flex justify-end items-center">
        <input
          value={data}
          onChange={(e) => setData(e.target.value)}
          onKeyDown={(event) => {
            // Izinkan Ctrl+V
            if (
              (event.ctrlKey || event.metaKey) &&
              event.key.toLowerCase() === "v"
            ) {
              return;
            }

            if (
              numberOnly &&
              !/[0-9]/.test(event.key) &&
              event.key !== "Backspace"
            ) {
              event.preventDefault();
            }
          }}
          // DIUBAH: Logika className dirombak untuk menangani state error
          className={`
            w-full text-xs sm:text-base font-normal border rounded-[4px]
            px-[12px] py-[8px] outline-none transition-colors
            placeholder:text-neutral-400
            focus:ring-2
            ${editData ? "bg-transparent" : "bg-[#F5F6FA]"}
            ${error
              ? "border-red-500 focus:ring-red-500" // Style saat ada error
              : editData
                ? "border-[#D5D5D5] focus:ring-blue-500" // Style saat bisa diedit
                : "border-transparent" // Style saat tidak bisa diedit
            }
          `}
          type="text"
          placeholder={inputPlaceholder}
          disabled={!editData}
        />
        {(submited === null || submited === "submit") && (
          <div
            onClick={() => setEditData(!editData)}
            className="cursor-pointer absolute right-1 sm:right-2 bottom-1 sm:bottom-2 flex items-center bg-neutral-200 gap-x-[5px] sm:gap-x-[10px] px-[8px] py-[5px] rounded-[8px]"
          >
            <p className="text-xs text-neutral-400">
              {editData ? "Simpan" : "Edit"}
            </p>
            <PencilIcon width={14} height={14} color="#A3A3A3" />
          </div>
        )}
      </div>
      {/* BARU: Tampilkan elemen p jika ada pesan error */}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
