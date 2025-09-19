-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "steamId" TEXT NOT NULL,
    "displayName" VARCHAR(100) NOT NULL,
    "avatar" VARCHAR(255) NOT NULL,
    "communityVisibilityState" INTEGER NOT NULL,
    "profileState" INTEGER NOT NULL,
    "personaName" VARCHAR(100) NOT NULL,
    "commentPermission" INTEGER NOT NULL,
    "profileUrl" VARCHAR(255) NOT NULL,
    "avatarMedium" VARCHAR(255) NOT NULL,
    "avatarFull" VARCHAR(255) NOT NULL,
    "avatarHash" VARCHAR(100) NOT NULL,
    "lastLogoff" INTEGER NOT NULL,
    "personaState" INTEGER NOT NULL,
    "realName" VARCHAR(100),
    "primaryClanId" VARCHAR(100),
    "timeCreated" INTEGER NOT NULL,
    "personaStateFlags" INTEGER NOT NULL,
    "locCountryCode" VARCHAR(10),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_steamId_key" ON "public"."User"("steamId");
