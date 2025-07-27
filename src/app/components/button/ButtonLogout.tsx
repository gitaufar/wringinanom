"use client";

import { logoutAdmin } from "@/lib/api/admin";
import { useRouter } from "next/navigation";
import React, { JSX } from "react";

const ButtonLogout = (): JSX.Element => {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    await logoutAdmin();
    router.push("/login");
  };

  return (
    <button
      onClick={() => {
        void handleLogout(); // ✅ hindari return promise secara langsung
      }}
      className="cursor-pointer text-center bg-red-500 rounded-md text-white py-2 px-4"
    >
      Logout
    </button>
  );
};

export default ButtonLogout;
