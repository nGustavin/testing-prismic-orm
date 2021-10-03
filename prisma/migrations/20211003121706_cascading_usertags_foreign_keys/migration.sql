-- DropForeignKey
ALTER TABLE "UserTags" DROP CONSTRAINT "UserTags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "UserTags" DROP CONSTRAINT "UserTags_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserTags" ADD CONSTRAINT "UserTags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTags" ADD CONSTRAINT "UserTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
