-- DropForeignKey
ALTER TABLE `logperubahanstatus` DROP FOREIGN KEY `LogPerubahanStatus_no_resi_fkey`;

-- AddForeignKey
ALTER TABLE `LogPerubahanStatus` ADD CONSTRAINT `LogPerubahanStatus_no_resi_fkey` FOREIGN KEY (`no_resi`) REFERENCES `RiwayatLayanan`(`no_resi`) ON DELETE CASCADE ON UPDATE CASCADE;
