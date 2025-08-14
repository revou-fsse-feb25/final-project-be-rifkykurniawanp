import { PrismaClient, ProductCategory, CourseCategory } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedCategories() {
  console.log("✅ Product & Course categories are enums in Prisma — no DB insert needed");
}
