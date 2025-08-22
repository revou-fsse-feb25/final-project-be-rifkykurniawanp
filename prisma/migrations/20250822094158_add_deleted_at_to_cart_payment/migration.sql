-- AlterTable
ALTER TABLE "public"."Cart" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."CartItem" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "deletedAt" TIMESTAMP(3);
