/*
  Warnings:

  - You are about to drop the column `url` on the `team` table. All the data in the column will be lost.
  - Added the required column `name` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team" DROP COLUMN "url",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "pokemon" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_team_id_key" ON "pokemon"("team_id");

-- AddForeignKey
ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
