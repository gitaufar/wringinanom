const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.penduduk.createMany({
    data: [
      {
        nik: "3512345678900001",
        no_kk: "3512345678900000",
        nama_lengkap: "Zhafir Aufar",
        nama_ibu: "Siti Aminah",
        nama_ayah: "Budi Santoso",
        jenis_kelamin: "Laki-laki",
        tempat_lahir: "Malang",
        tanggal_lahir: new Date("2000-07-10"),
        alamat: "Jl. Raya Wringinanom No. 12",
        rt: 3,
        rw: 4,
        pekerjaan: "Mahasiswa",
        agama: "Islam",
      },
      {
        nik: "3512345678900002",
        no_kk: "3512345678900000",
        nama_lengkap: "Dian Pratiwi",
        nama_ibu: "Rina Marlina",
        nama_ayah: "Sugeng Riyadi",
        jenis_kelamin: "Perempuan",
        tempat_lahir: "Malang",
        tanggal_lahir: new Date("1999-03-15"),
        alamat: "Jl. Sawojajar No. 5",
        rt: 1,
        rw: 2,
        pekerjaan: "Guru",
        agama: "Kristen",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed data penduduk berhasil dimasukkan.");
}

main()
  .catch((e) => {
    console.error("❌ Gagal insert:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
