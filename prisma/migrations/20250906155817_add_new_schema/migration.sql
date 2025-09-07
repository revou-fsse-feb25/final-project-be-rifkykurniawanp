/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `ProductOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `CourseReview` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."EntityType" AS ENUM ('PRODUCT', 'COURSE');

-- AlterEnum
ALTER TYPE "public"."Permission" ADD VALUE 'MANAGE_SEARCH';

-- DropIndex
DROP INDEX "public"."Assignment_lessonId_idx";

-- DropIndex
DROP INDEX "public"."Course_category_level_status_idx";

-- DropIndex
DROP INDEX "public"."Course_instructorId_isPublished_idx";

-- DropIndex
DROP INDEX "public"."CourseModule_courseId_isPublished_idx";

-- DropIndex
DROP INDEX "public"."CourseModule_courseId_orderNumber_idx";

-- DropIndex
DROP INDEX "public"."Lesson_moduleId_isPublished_idx";

-- DropIndex
DROP INDEX "public"."Lesson_moduleId_orderNumber_idx";

-- DropIndex
DROP INDEX "public"."Product_category_status_idx";

-- DropIndex
DROP INDEX "public"."Product_supplierId_status_idx";

-- AlterTable
ALTER TABLE "public"."CourseReview" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Instructor" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "public"."ProductOrder" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "avatar" TEXT;

-- CreateTable
CREATE TABLE "public"."SearchIndex" (
    "id" SERIAL NOT NULL,
    "entityType" "public"."EntityType" NOT NULL,
    "entityId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "category" TEXT NOT NULL,
    "subcategory" TEXT,
    "level" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL DEFAULT 0,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "language" TEXT NOT NULL DEFAULT 'id',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SearchQuery" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "query" TEXT NOT NULL,
    "filters" JSONB,
    "resultsCount" INTEGER NOT NULL DEFAULT 0,
    "selectedItems" JSONB,
    "sessionId" TEXT,
    "ipAddress" TEXT,
    "searchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchQuery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SearchSuggestion" (
    "id" SERIAL NOT NULL,
    "query" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL DEFAULT 1,
    "category" TEXT,
    "language" TEXT NOT NULL DEFAULT 'id',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SearchIndex_entityType_isActive_idx" ON "public"."SearchIndex"("entityType", "isActive");

-- CreateIndex
CREATE INDEX "SearchIndex_category_isActive_idx" ON "public"."SearchIndex"("category", "isActive");

-- CreateIndex
CREATE INDEX "SearchIndex_price_rating_popularity_idx" ON "public"."SearchIndex"("price", "rating", "popularity");

-- CreateIndex
CREATE INDEX "SearchIndex_language_isActive_idx" ON "public"."SearchIndex"("language", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "SearchIndex_entityType_entityId_key" ON "public"."SearchIndex"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "SearchQuery_query_searchedAt_idx" ON "public"."SearchQuery"("query", "searchedAt");

-- CreateIndex
CREATE INDEX "SearchQuery_userId_searchedAt_idx" ON "public"."SearchQuery"("userId", "searchedAt");

-- CreateIndex
CREATE UNIQUE INDEX "SearchSuggestion_query_key" ON "public"."SearchSuggestion"("query");

-- CreateIndex
CREATE INDEX "SearchSuggestion_popularity_isActive_idx" ON "public"."SearchSuggestion"("popularity", "isActive");

-- CreateIndex
CREATE INDEX "SearchSuggestion_category_language_isActive_idx" ON "public"."SearchSuggestion"("category", "language", "isActive");

-- CreateIndex
CREATE INDEX "Assignment_lessonId_deletedAt_idx" ON "public"."Assignment"("lessonId", "deletedAt");

-- CreateIndex
CREATE INDEX "Cart_deletedAt_idx" ON "public"."Cart"("deletedAt");

-- CreateIndex
CREATE INDEX "Course_category_level_status_deletedAt_idx" ON "public"."Course"("category", "level", "status", "deletedAt");

-- CreateIndex
CREATE INDEX "Course_instructorId_isPublished_deletedAt_idx" ON "public"."Course"("instructorId", "isPublished", "deletedAt");

-- CreateIndex
CREATE INDEX "CourseModule_courseId_orderNumber_deletedAt_idx" ON "public"."CourseModule"("courseId", "orderNumber", "deletedAt");

-- CreateIndex
CREATE INDEX "CourseModule_courseId_isPublished_deletedAt_idx" ON "public"."CourseModule"("courseId", "isPublished", "deletedAt");

-- CreateIndex
CREATE INDEX "Instructor_deletedAt_idx" ON "public"."Instructor"("deletedAt");

-- CreateIndex
CREATE INDEX "Lesson_moduleId_orderNumber_deletedAt_idx" ON "public"."Lesson"("moduleId", "orderNumber", "deletedAt");

-- CreateIndex
CREATE INDEX "Lesson_moduleId_isPublished_deletedAt_idx" ON "public"."Lesson"("moduleId", "isPublished", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "public"."Payment"("transactionId");

-- CreateIndex
CREATE INDEX "Product_category_status_deletedAt_idx" ON "public"."Product"("category", "status", "deletedAt");

-- CreateIndex
CREATE INDEX "Product_supplierId_status_deletedAt_idx" ON "public"."Product"("supplierId", "status", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "public"."RefreshToken"("token");

-- CreateIndex
CREATE INDEX "User_firstName_lastName_idx" ON "public"."User"("firstName", "lastName");

-- AddForeignKey
ALTER TABLE "public"."SearchQuery" ADD CONSTRAINT "SearchQuery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
