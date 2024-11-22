/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Department_title_key` ON `Department`(`title`);
