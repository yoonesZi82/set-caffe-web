/*
  Warnings:

  - You are about to alter the column `score` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `score` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Comment` MODIFY `score` DOUBLE NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE `Product` MODIFY `score` DOUBLE NOT NULL;
