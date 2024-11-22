/*
  Warnings:

  - You are about to alter the column `piority` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.

*/
-- AlterTable
ALTER TABLE `Ticket` MODIFY `piority` INTEGER NOT NULL DEFAULT 1;
