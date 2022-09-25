/*
  Warnings:

  - You are about to drop the column `name` on the `Short` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Short" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "video_name" TEXT NOT NULL,
    "thumbnail_name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Short" ("created_at", "id", "thumbnail_name", "video_name") SELECT "created_at", "id", "thumbnail_name", "video_name" FROM "Short";
DROP TABLE "Short";
ALTER TABLE "new_Short" RENAME TO "Short";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
