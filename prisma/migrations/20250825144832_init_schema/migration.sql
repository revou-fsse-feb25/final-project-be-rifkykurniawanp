-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_itemId_course_fkey";

-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_itemId_product_fkey";

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_itemId_product_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_itemId_course_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
