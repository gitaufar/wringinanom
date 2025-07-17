"use client";

import React from "react";

interface InputFieldTimeProps {
  inputLabel: string;
  data: string;
  setData: (val: string) => void;
  editData: boolean;
  setEditData: (val: boolean) => void;
  submited: string | null;
}

export default function InputFieldTime({
  inputLabel,
  data,
  setData,
  editData,
  setEditData,
  submited,
}: InputFieldTimeProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-base font-medium text-black">{inputLabel}</label>
      <input
        type="time"
        className={`w-full px-4 py-2 text-sm border ${
          submited && !data ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        value={data}
        onChange={(e) => setData(e.target.value)}
        disabled={!editData}
        placeholder="HH:MM"
      />
      {submited && !data && (
        <p className="text-red-500 text-xs">Wajib diisi</p>
      )}
    </div>
  );
}
