/*
  Warnings:

  - The values [Complete] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `Location` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `userWallet` on the `Campaign` table. All the data in the column will be lost.
  - Added the required column `location` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Waiting', 'Approved', 'Rejected');
ALTER TABLE "Campaign" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Campaign" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Campaign" ALTER COLUMN "status" SET DEFAULT 'Waiting';
COMMIT;

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "Location",
DROP COLUMN "total_amount",
DROP COLUMN "userWallet",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "target" INTEGER NOT NULL;
