/*
  Warnings:

  - You are about to drop the `Ban` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ban` DROP FOREIGN KEY `Ban_userID_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isBan` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `Ban`;
