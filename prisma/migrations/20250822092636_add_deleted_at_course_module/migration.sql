-- AlterTable
ALTER TABLE "public"."Assignment" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."CourseModule" ADD COLUMN     "deletedAt" TIMESTAMP(3);
