import { prisma } from "@lib/prisma"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return Response.json({ error: "Email dan password wajib diisi" }, { status: 400 })
  }

  // Cari admin dengan email & password
  const admin = await prisma.admin.findFirst({
    where: {
      email,
      password,
    },
  })

  if (!admin) {
    return Response.json({ error: "Email atau password salah" }, { status: 401 })
  }

  return Response.json({
    message: "Login berhasil",
    admin: {
      id: admin.id,
      nama: admin.nama,
      email: admin.email,
    },
  })
}
