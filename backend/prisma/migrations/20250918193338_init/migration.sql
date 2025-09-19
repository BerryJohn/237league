/*
  Warnings:

  - You are about to drop the column `avatarFull` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatarMedium` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `commentPermission` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `communityVisibilityState` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogoff` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `locCountryCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `personaState` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `personaStateFlags` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `primaryClanId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileState` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `realName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timeCreated` on the `User` table. All the data in the column will be lost.
  - Added the required column `steamProfileUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "avatarFull",
DROP COLUMN "avatarMedium",
DROP COLUMN "commentPermission",
DROP COLUMN "communityVisibilityState",
DROP COLUMN "lastLogoff",
DROP COLUMN "locCountryCode",
DROP COLUMN "personaState",
DROP COLUMN "personaStateFlags",
DROP COLUMN "primaryClanId",
DROP COLUMN "profileState",
DROP COLUMN "profileUrl",
DROP COLUMN "realName",
DROP COLUMN "timeCreated",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "steamProfileUrl" VARCHAR(255) NOT NULL;
