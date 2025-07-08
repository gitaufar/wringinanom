-- CreateTable
CREATE TABLE `Penduduk` (
    `nik` VARCHAR(191) NOT NULL,
    `no_kk` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `nama_ibu` VARCHAR(191) NULL,
    `nama_ayah` VARCHAR(191) NULL,
    `jenis_kelamin` VARCHAR(191) NOT NULL,
    `tempat_lahir` VARCHAR(191) NOT NULL,
    `tanggal_lahir` DATETIME(3) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `rt` INTEGER NOT NULL,
    `rw` INTEGER NOT NULL,

    PRIMARY KEY (`nik`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RiwayatLayanan` (
    `no_resi` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    INDEX `RiwayatLayanan_nik_idx`(`nik`),
    PRIMARY KEY (`no_resi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LogPerubahanStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `no_resi` VARCHAR(191) NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `status_lama` VARCHAR(191) NOT NULL,
    `status_baru` VARCHAR(191) NOT NULL,
    `waktu_perubahan` DATETIME(3) NOT NULL,

    INDEX `LogPerubahanStatus_no_resi_idx`(`no_resi`),
    INDEX `LogPerubahanStatus_admin_id_idx`(`admin_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RiwayatLayanan` ADD CONSTRAINT `RiwayatLayanan_nik_fkey` FOREIGN KEY (`nik`) REFERENCES `Penduduk`(`nik`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogPerubahanStatus` ADD CONSTRAINT `LogPerubahanStatus_no_resi_fkey` FOREIGN KEY (`no_resi`) REFERENCES `RiwayatLayanan`(`no_resi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogPerubahanStatus` ADD CONSTRAINT `LogPerubahanStatus_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
