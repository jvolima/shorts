-- CreateTable
CREATE TABLE "Short" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "video_name" TEXT NOT NULL,
    "thumbnail_name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
