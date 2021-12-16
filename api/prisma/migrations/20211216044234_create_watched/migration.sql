-- CreateTable
CREATE TABLE "watcheds" (
    "id" TEXT NOT NULL,
    "watched" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "watcheds_user_id_key" ON "watcheds"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "watcheds_movie_id_key" ON "watcheds"("movie_id");

-- AddForeignKey
ALTER TABLE "watcheds" ADD CONSTRAINT "watcheds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watcheds" ADD CONSTRAINT "watcheds_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
