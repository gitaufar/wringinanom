/*
  Warnings:

  - Added the required column `golongan_darah` to the `Penduduk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pendidikan` to the `Penduduk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_keluarga` to the `Penduduk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_perkawinan` to the `Penduduk` table without a default value. This is not possible if the table is not empty.
  - Made the column `agama` on table `penduduk` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `penduduk` ADD COLUMN `golongan_darah` VARCHAR(191) NOT NULL,
    ADD COLUMN `pendidikan` VARCHAR(191) NOT NULL,
    ADD COLUMN `status_keluarga` VARCHAR(191) NOT NULL,
    ADD COLUMN `status_perkawinan` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggal_perkawinan` DATETIME(3) NULL,
    MODIFY `nama_lengkap` VARCHAR(191) NULL,
    MODIFY `agama` VARCHAR(191) NOT NULL;
