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
    >
      Logout
    </button>
  );
};

export default ButtonLogout;
