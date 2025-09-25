/*
  Warnings:

  - You are about to drop the column `createsAt` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "createsAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
