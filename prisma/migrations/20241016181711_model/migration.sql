/*
  Warnings:

  - Added the required column `userID` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contact` ADD COLUMN `userID` INTEGER NOT NULL,
    MODIFY `company` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
