/*
  Warnings:

  - Added the required column `userID` to the `Ban` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ban` ADD COLUMN `userID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Ban` ADD CONSTRAINT `Ban_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
