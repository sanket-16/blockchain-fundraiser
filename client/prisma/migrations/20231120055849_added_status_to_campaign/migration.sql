-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Complete', 'Waiting', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Waiting';
