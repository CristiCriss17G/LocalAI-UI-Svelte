/*
  Warnings:

  - You are about to drop the column `modelId` on the `ChatInteraction` table. All the data in the column will be lost.
  - Added the required column `providerId` to the `ChatInteraction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatInteraction" DROP CONSTRAINT "ChatInteraction_modelId_fkey";

-- AlterTable
ALTER TABLE "ChatInteraction" DROP COLUMN "modelId",
ADD COLUMN     "providerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ChatInteraction" ADD CONSTRAINT "ChatInteraction_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AiProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
