/*
  Warnings:

  - You are about to drop the column `userID` on the `Discount` table. All the data in the column will be lost.
  - Added the required column `access` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Discount` DROP FOREIGN KEY `Discount_userID_fkey`;

-- AlterTable
ALTER TABLE `Discount` DROP COLUMN `userID`,
    ADD COLUMN `access` INTEGER NOT NULL;
