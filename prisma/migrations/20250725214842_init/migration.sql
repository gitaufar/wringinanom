-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logperubahanstatus" (
    "id" SERIAL NOT NULL,
    "no_resi" TEXT NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "status_lama" TEXT NOT NULL,
    "status_baru" TEXT NOT NULL,
    "waktu_perubahan" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logperubahanstatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penduduk" (
    "nik" TEXT NOT NULL,
    "no_kk" TEXT NOT NULL,
    "nama_lengkap" TEXT,
    "nama_ibu" TEXT,
    "nama_ayah" TEXT,
    "jenis_kelamin" TEXT NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "rt" INTEGER NOT NULL,
    "rw" INTEGER NOT NULL,
    "pekerjaan" TEXT,
    "agama" TEXT NOT NULL,
    "pendidikan" TEXT NOT NULL,
    "status_keluarga" TEXT NOT NULL,
    "status_perkawinan" TEXT NOT NULL,
    "tanggal_perkawinan" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "penduduk_pkey" PRIMARY KEY ("nik")
);

-- CreateTable
CREATE TABLE "permohonansurat" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "jenis_surat" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Menunggu',
    "data_dinamis" JSONB,
    "no_resi" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,

    CONSTRAINT "permohonansurat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riwayatlayanan" (
    "no_resi" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "tipe" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "data_dinamis" JSONB,

    CONSTRAINT "riwayatlayanan_pkey" PRIMARY KEY ("no_resi")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE INDEX "LogPerubahanStatus_admin_id_idx" ON "logperubahanstatus"("admin_id");

-- CreateIndex
CREATE INDEX "LogPerubahanStatus_no_resi_idx" ON "logperubahanstatus"("no_resi");

-- CreateIndex
CREATE UNIQUE INDEX "PermohonanSurat_no_resi_key" ON "permohonansurat"("no_resi");

-- CreateIndex
CREATE INDEX "PermohonanSurat_nik_idx" ON "permohonansurat"("nik");

-- CreateIndex
CREATE INDEX "RiwayatLayanan_nik_idx" ON "riwayatlayanan"("nik");

-- AddForeignKey
ALTER TABLE "logperubahanstatus" ADD CONSTRAINT "LogPerubahanStatus_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logperubahanstatus" ADD CONSTRAINT "LogPerubahanStatus_no_resi_fkey" FOREIGN KEY ("no_resi") REFERENCES "riwayatlayanan"("no_resi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permohonansurat" ADD CONSTRAINT "PermohonanSurat_nik_fkey" FOREIGN KEY ("nik") REFERENCES "penduduk"("nik") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permohonansurat" ADD CONSTRAINT "PermohonanSurat_no_resi_fkey" FOREIGN KEY ("no_resi") REFERENCES "riwayatlayanan"("no_resi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "riwayatlayanan" ADD CONSTRAINT "RiwayatLayanan_nik_fkey" FOREIGN KEY ("nik") REFERENCES "penduduk"("nik") ON DELETE NO ACTION ON UPDATE CASCADE;
