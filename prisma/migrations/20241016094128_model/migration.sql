/*
  Warnings:

  - You are about to drop the column `text` on the `Comment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `body` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productID` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `text`,
    ADD COLUMN `body` TEXT NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `isAccept` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `productID` INTEGER NOT NULL,
    ADD COLUMN `score` INTEGER NOT NULL DEFAULT 5,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'کاربر ست کافی';

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `shortDescription` VARCHAR(191) NOT NULL,
    `longDescription` VARCHAR(191) NOT NULL,
    `weight` INTEGER NOT NULL,
    `suitableFor` VARCHAR(191) NOT NULL,
    `smell` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `tags` JSON NOT NULL,

    UNIQUE INDEX `Product_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discountID` INTEGER NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `percent` INTEGER NOT NULL,
    `maxUse` INTEGER NOT NULL,
    `uses` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `departmentID` INTEGER NOT NULL,
    `subdepartmentID` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `piority` ENUM('ONE', 'TWO', 'THREE') NOT NULL DEFAULT 'ONE',
    `hasAnswer` BOOLEAN NOT NULL DEFAULT false,
    `isAnswer` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wishlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `productID` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ban` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Ban_email_phone_key`(`email`, `phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Contact_phone_email_key`(`phone`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subdepartment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departmentID` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Otp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `expTime` INTEGER NOT NULL,
    `time` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Comment_email_key` ON `Comment`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_phone_key` ON `User`(`email`, `phone`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_discountID_fkey` FOREIGN KEY (`discountID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_departmentID_fkey` FOREIGN KEY (`departmentID`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_subdepartmentID_fkey` FOREIGN KEY (`subdepartmentID`) REFERENCES `Subdepartment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subdepartment` ADD CONSTRAINT `Subdepartment_departmentID_fkey` FOREIGN KEY (`departmentID`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
