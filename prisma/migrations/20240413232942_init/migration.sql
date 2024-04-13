-- CreateTable
CREATE TABLE "urlTable" (
    "id" SERIAL NOT NULL,
    "sourceURL" TEXT NOT NULL,
    "shortURL" TEXT,
    "viewCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urlTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urlTable_shortURL_key" ON "urlTable"("shortURL");
