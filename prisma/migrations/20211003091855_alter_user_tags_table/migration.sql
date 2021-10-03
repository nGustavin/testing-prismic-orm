-- RenameIndex
ALTER INDEX "UserTags_tagId_key" RENAME TO "UserTags_tagId_unique";

-- RenameIndex
ALTER INDEX "UserTags_userId_key" RENAME TO "UserTags_userId_unique";
