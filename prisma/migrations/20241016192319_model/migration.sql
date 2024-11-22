/*
  Warnings:

  - You are about to drop the column `discountID` on the `Discount` table. All the data in the column will be lost.
  - Added the required column `userID` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Discount` DROP FOREIGN KEY `Discount_discountID_fkey`;

-- AlterTable
ALTER TABLE `Discount` DROP COLUMN `discountID`,
    ADD COLUMN `userID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
