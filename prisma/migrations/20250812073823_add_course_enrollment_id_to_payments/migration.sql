/*
  Warnings:

  - You are about to drop the column `payable_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payable_type` on the `payments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_payable_id_course_enrollment_fkey";

-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_payable_id_product_order_fkey";

-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "payable_id",
DROP COLUMN "payable_type",
ADD COLUMN     "course_enrollment_id" INTEGER,
ADD COLUMN     "product_order_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_product_order_id_fkey" FOREIGN KEY ("product_order_id") REFERENCES "public"."product_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_course_enrollment_id_fkey" FOREIGN KEY ("course_enrollment_id") REFERENCES "public"."course_enrollments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
