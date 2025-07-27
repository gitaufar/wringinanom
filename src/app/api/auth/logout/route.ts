import { NextResponse } from "next/server";

export function POST(): NextResponse {
  const response = NextResponse.json({ message: "Logout berhasil" });

  response.cookies.set("admin_token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return response;
}
