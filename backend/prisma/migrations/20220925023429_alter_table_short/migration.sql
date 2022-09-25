/*
  Warnings:

  - Added the required column `name` to the `Short` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Short" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "video_name" TEXT NOT NULL,
    "thumbnail_name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Short" ("created_at", "id", "thumbnail_name", "video_name") SELECT "created_at", "id", "thumbnail_name", "video_name" FROM "Short";
DROP TABLE "Short";
ALTER TABLE "new_Short" RENAME TO "Short";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
