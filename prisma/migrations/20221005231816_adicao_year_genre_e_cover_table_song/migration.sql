/*
  Warnings:

  - You are about to drop the column `duration` on the `Song` table. All the data in the column will be lost.
  - Added the required column `album` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "duration",
ADD COLUMN     "album" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
