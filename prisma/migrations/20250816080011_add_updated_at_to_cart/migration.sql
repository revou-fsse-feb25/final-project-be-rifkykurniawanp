/*
  Warnings:

  - You are about to drop the column `status` on the `Cart` table. All the data in the column will be lost.
  - The `quizQuestions` column on the `Lesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Cart" DROP COLUMN "status",
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Lesson" DROP COLUMN "quizQuestions",
ADD COLUMN     "quizQuestions" JSONB;

-- DropEnum
DROP TYPE "public"."CartStatus";

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_itemId_product_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_itemId_course_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
