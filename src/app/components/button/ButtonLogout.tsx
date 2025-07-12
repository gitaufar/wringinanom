"use client";

import { logoutAdmin } from "@/lib/api/admin";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonLogout = () => {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        logoutAdmin().then(() => {
          router.push("/login");
        })
      }
      className="cursor-pointer text-center bg-red-500 rounded-md text-white py-2 px-4"
    >
      Logout
    </button>
  );
};

export default ButtonLogout;
