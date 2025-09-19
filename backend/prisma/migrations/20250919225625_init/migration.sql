/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "country" CHAR(2),
ADD COLUMN     "email" VARCHAR(100),
ADD COLUMN     "name" VARCHAR(100),
ADD COLUMN     "surname" VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
