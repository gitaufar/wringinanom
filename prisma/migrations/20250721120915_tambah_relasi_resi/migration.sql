-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logperubahanstatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `no_resi` VARCHAR(191) NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `status_lama` VARCHAR(191) NOT NULL,
    `status_baru` VARCHAR(191) NOT NULL,
    `waktu_perubahan` DATETIME(3) NOT NULL,

    INDEX `LogPerubahanStatus_admin_id_idx`(`admin_id`),
    INDEX `LogPerubahanStatus_no_resi_idx`(`no_resi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penduduk` (
    `nik` VARCHAR(191) NOT NULL,
    `no_kk` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NULL,
    `nama_ibu` VARCHAR(191) NULL,
    `nama_ayah` VARCHAR(191) NULL,
    `jenis_kelamin` VARCHAR(191) NOT NULL,
    `tempat_lahir` VARCHAR(191) NOT NULL,
    `tanggal_lahir` DATETIME(3) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `rt` INTEGER NOT NULL,
    `rw` INTEGER NOT NULL,
    `pekerjaan` VARCHAR(191) NULL,
    `agama` VARCHAR(191) NOT NULL,
    `pendidikan` VARCHAR(191) NOT NULL,
    `status_keluarga` VARCHAR(191) NOT NULL,
    `status_perkawinan` VARCHAR(191) NOT NULL,
    `tanggal_perkawinan` DATETIME(3) NULL,

    PRIMARY KEY (`nik`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permohonansurat` (
    `id` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `jenis_surat` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'Menunggu',
    `data_dinamis` JSON NULL,
    `no_resi` VARCHAR(191) NOT NULL,
    `tipe` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PermohonanSurat_no_resi_key`(`no_resi`),
    INDEX `PermohonanSurat_nik_idx`(`nik`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riwayatlayanan` (
    `no_resi` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `tipe` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `data_dinamis` JSON NULL,

    INDEX `RiwayatLayanan_nik_idx`(`nik`),
    PRIMARY KEY (`no_resi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `logperubahanstatus` ADD CONSTRAINT `LogPerubahanStatus_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logperubahanstatus` ADD CONSTRAINT `LogPerubahanStatus_no_resi_fkey` FOREIGN KEY (`no_resi`) REFERENCES `riwayatlayanan`(`no_resi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permohonansurat` ADD CONSTRAINT `PermohonanSurat_nik_fkey` FOREIGN KEY (`nik`) REFERENCES `penduduk`(`nik`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permohonansurat` ADD CONSTRAINT `PermohonanSurat_no_resi_fkey` FOREIGN KEY (`no_resi`) REFERENCES `riwayatlayanan`(`no_resi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `riwayatlayanan` ADD CONSTRAINT `RiwayatLayanan_nik_fkey` FOREIGN KEY (`nik`) REFERENCES `penduduk`(`nik`) ON DELETE NO ACTION ON UPDATE CASCADE;
