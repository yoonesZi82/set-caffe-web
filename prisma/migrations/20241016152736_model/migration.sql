/*
  Warnings:

  - You are about to drop the column `time` on the `Otp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Otp` DROP COLUMN `time`,
    MODIFY `expTime` VARCHAR(191) NOT NULL;
