/*
  Warnings:

  - You are about to alter the column `weight` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `number` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `number` INTEGER NOT NULL,
    MODIFY `weight` DOUBLE NOT NULL;
