import { cookies } from "next/headers"

export async function POST() {
  const cookieStore = cookies()
  ;(await cookieStore).delete("admin_token")
  return Response.json({ message: "Logout berhasil" })
}
