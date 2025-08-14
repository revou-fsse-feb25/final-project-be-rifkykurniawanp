/*
  Warnings:

  - You are about to drop the `assignment_submissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `assignments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `certificates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_enrollments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_learning_outcomes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_modules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_requirements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lesson_progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lessons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiz_attempts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiz_choices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiz_questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quizzes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."RoleName" AS ENUM ('ADMIN', 'SUPPLIER', 'INSTRUCTOR', 'USER');

-- CreateEnum
CREATE TYPE "public"."ProductCategory" AS ENUM ('COFFEE', 'TEA', 'HERBAL', 'EQUIPMENT');

-- CreateEnum
CREATE TYPE "public"."ProductOrigin" AS ENUM ('INDONESIA', 'VIETNAM', 'BRAZIL', 'ETHIOPIA', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ProductStatus" AS ENUM ('ACTIVE', 'OUT_OF_STOCK', 'DRAFT');

-- CreateEnum
CREATE TYPE "public"."ProductTagName" AS ENUM ('ARABICA', 'ROBUSTA', 'GREEN_TEA', 'HERBAL', 'EQUIPMENT');

-- CreateEnum
CREATE TYPE "public"."CourseCategory" AS ENUM ('COFFEE_BREWING', 'TEA_TASTING', 'HERBAL_HEALTH');

-- CreateEnum
CREATE TYPE "public"."CourseLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "public"."CartItemType" AS ENUM ('PRODUCT', 'COURSE');

-- CreateEnum
CREATE TYPE "public"."CartStatus" AS ENUM ('ACTIVE', 'CHECKOUT', 'ABANDONED');

-- CreateEnum
CREATE TYPE "public"."LessonType" AS ENUM ('VIDEO', 'ARTICLE', 'QUIZ', 'ASSIGNMENT');

-- CreateEnum
CREATE TYPE "public"."PayableType" AS ENUM ('PRODUCT', 'COURSE');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "public"."assignment_submissions" DROP CONSTRAINT "assignment_submissions_assignment_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."assignment_submissions" DROP CONSTRAINT "assignment_submissions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."assignments" DROP CONSTRAINT "assignments_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."certificates" DROP CONSTRAINT "certificates_enrollment_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."certificates" DROP CONSTRAINT "certificates_final_assignment_submission_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."certificates" DROP CONSTRAINT "certificates_final_lesson_progress_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."course_enrollments" DROP CONSTRAINT "course_enrollments_course_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."course_enrollments" DROP CONSTRAINT "course_enrollments_student_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."course_learning_outcomes" DROP CONSTRAINT "course_learning_outcomes_course_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."course_modules" DROP CONSTRAINT "course_modules_course_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."course_requirements" DROP CONSTRAINT "course_requirements_course_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."course_tags" DROP CONSTRAINT "course_tags_course_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."courses" DROP CONSTRAINT "courses_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."courses" DROP CONSTRAINT "courses_instructor_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson_progress" DROP CONSTRAINT "lesson_progress_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson_progress" DROP CONSTRAINT "lesson_progress_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lessons" DROP CONSTRAINT "lessons_module_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_course_enrollment_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_product_order_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_categories" DROP CONSTRAINT "product_categories_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_order_items" DROP CONSTRAINT "product_order_items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_order_items" DROP CONSTRAINT "product_order_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_orders" DROP CONSTRAINT "product_orders_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_reviews" DROP CONSTRAINT "product_reviews_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_reviews" DROP CONSTRAINT "product_reviews_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_tags" DROP CONSTRAINT "product_tags_product_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."quiz_attempts" DROP CONSTRAINT "quiz_attempts_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."quiz_attempts" DROP CONSTRAINT "quiz_attempts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."quiz_choices" DROP CONSTRAINT "quiz_choices_question_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."quiz_questions" DROP CONSTRAINT "quiz_questions_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."quizzes" DROP CONSTRAINT "quizzes_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_permissions" DROP CONSTRAINT "role_permissions_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_permissions" DROP CONSTRAINT "role_permissions_role_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_role_id_fkey";

-- DropTable
DROP TABLE "public"."assignment_submissions";

-- DropTable
DROP TABLE "public"."assignments";

-- DropTable
DROP TABLE "public"."certificates";

-- DropTable
DROP TABLE "public"."course_categories";

-- DropTable
DROP TABLE "public"."course_enrollments";

-- DropTable
DROP TABLE "public"."course_learning_outcomes";

-- DropTable
DROP TABLE "public"."course_modules";

-- DropTable
DROP TABLE "public"."course_requirements";

-- DropTable
DROP TABLE "public"."course_tags";

-- DropTable
DROP TABLE "public"."courses";

-- DropTable
DROP TABLE "public"."lesson_progress";

-- DropTable
DROP TABLE "public"."lessons";

-- DropTable
DROP TABLE "public"."payments";

-- DropTable
DROP TABLE "public"."permissions";

-- DropTable
DROP TABLE "public"."product_categories";

-- DropTable
DROP TABLE "public"."product_order_items";

-- DropTable
DROP TABLE "public"."product_orders";

-- DropTable
DROP TABLE "public"."product_reviews";

-- DropTable
DROP TABLE "public"."product_tags";

-- DropTable
DROP TABLE "public"."products";

-- DropTable
DROP TABLE "public"."quiz_attempts";

-- DropTable
DROP TABLE "public"."quiz_choices";

-- DropTable
DROP TABLE "public"."quiz_questions";

-- DropTable
DROP TABLE "public"."quizzes";

-- DropTable
DROP TABLE "public"."role_permissions";

-- DropTable
DROP TABLE "public"."roles";

-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "role" "public"."RoleName" NOT NULL,
    "isBuyer" BOOLEAN NOT NULL DEFAULT false,
    "isStudent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "category" "public"."ProductCategory" NOT NULL,
    "status" "public"."ProductStatus" NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "origin" "public"."ProductOrigin" NOT NULL,
    "weight" TEXT,
    "tags" "public"."ProductTagName"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductReview" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "syllabus" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL DEFAULT 0,
    "students" INTEGER NOT NULL DEFAULT 0,
    "duration" TEXT,
    "level" "public"."CourseLevel" NOT NULL,
    "category" "public"."CourseCategory" NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'id',
    "certificate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CourseModule" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "orderNumber" INTEGER NOT NULL,

    CONSTRAINT "CourseModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Lesson" (
    "id" SERIAL NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "slug" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" TEXT,
    "type" "public"."LessonType" NOT NULL DEFAULT 'VIDEO',
    "videoUrl" TEXT,
    "content" TEXT,
    "quizQuestions" TEXT,
    "passingScore" DECIMAL(5,2) NOT NULL DEFAULT 70,
    "orderNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LessonProgress" (
    "lessonId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("lessonId","userId")
);

-- CreateTable
CREATE TABLE "public"."Assignment" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AssignmentSubmission" (
    "id" SERIAL NOT NULL,
    "assignmentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT,
    "grade" DECIMAL(5,2),
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "public"."CartStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CartItem" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "itemType" "public"."CartItemType" NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "payableType" "public"."PayableType" NOT NULL,
    "payableId" INTEGER NOT NULL,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductOrder" (
    "id" SERIAL NOT NULL,
    "buyerId" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "totalPrice" DECIMAL(12,2) NOT NULL,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductOrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceEach" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "ProductOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CourseEnrollment" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "pricePaid" DECIMAL(12,2) NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "certificateAwarded" BOOLEAN NOT NULL DEFAULT false,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Certificate" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "finalLessonsCompleted" BOOLEAN NOT NULL DEFAULT false,
    "finalAssignmentsCompleted" BOOLEAN NOT NULL DEFAULT false,
    "eligible" BOOLEAN NOT NULL DEFAULT false,
    "issuedAt" TIMESTAMP(3),
    "certificateUrl" TEXT,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "public"."Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "public"."Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_slug_key" ON "public"."Lesson"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_enrollmentId_key" ON "public"."Certificate"("enrollmentId");

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductReview" ADD CONSTRAINT "ProductReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Course" ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourseModule" ADD CONSTRAINT "CourseModule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."CourseModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "public"."Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LessonProgress" ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Assignment" ADD CONSTRAINT "Assignment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "public"."Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "public"."Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductOrder" ADD CONSTRAINT "ProductOrder_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductOrder" ADD CONSTRAINT "ProductOrder_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductOrderItem" ADD CONSTRAINT "ProductOrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."ProductOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductOrderItem" ADD CONSTRAINT "ProductOrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Certificate" ADD CONSTRAINT "Certificate_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "public"."CourseEnrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
