-- CreateEnum
CREATE TYPE "public"."SeasonStatus" AS ENUM ('upcoming', 'ongoing', 'finished', 'cancelled');

-- AlterTable
ALTER TABLE "public"."Season" ADD COLUMN     "status" "public"."SeasonStatus" NOT NULL DEFAULT 'upcoming';
