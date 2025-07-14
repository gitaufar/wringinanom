/*
  Warnings:

  - You are about to drop the column `keterangan` on the `permohonansurat` table. All the data in the column will be lost.
  - Added the required column `tipe` to the `PermohonanSurat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permohonansurat` DROP COLUMN `keterangan`,
    ADD COLUMN `tipe` VARCHAR(191) NOT NULL;
