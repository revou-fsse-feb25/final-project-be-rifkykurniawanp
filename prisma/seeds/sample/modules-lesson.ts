// prisma/seeds/sample/modules-lessons.ts
import {
  PrismaClient,
  CourseModule,
  Lesson,
  LessonType,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

/**
 * SAMPLE COURSE MODULES & LESSONS
 * - Creates modules and lessons for existing courses
 * - Various lesson types (VIDEO, ARTICLE, QUIZ, ASSIGNMENT)
 * - Idempotent with detailed tracking
 */
export async function seedModulesAndLessons(): Promise<{
  modules: CourseModule[];
  lessons: Lesson[];
}> {
  console.log("📖 Seeding sample course modules and lessons...");

  // --- Pre-check: courses exist ---
  const courses = await prisma.course.findMany({
    select: { id: true, slug: true, title: true },
  });

  if (courses.length === 0) {
    throw new Error("❌ No courses found. Please seed courses first.");
  }

  // --- Prepare tracking ---
  const seededModules: CourseModule[] = [];
  const seededLessons: Lesson[] = [];
  const moduleStats: string[] = [];
  const lessonStats: string[] = [];

  // --- Course Structure Data ---
  const courseStructures = [
    {
      courseSlug: "coffee-brewing-fundamentals",
      modules: [
        {
          title: "Coffee Origins & Selection",
          description: "Understanding coffee beans, origins, and quality factors",
          orderNumber: 1,
          lessons: [
            {
              slug: "coffee-origins-introduction",
              title: "Introduction to Coffee Origins",
              description: "Overview of major coffee-growing regions worldwide",
              duration: 15,
              type: LessonType.VIDEO,
              videoUrl: "https://example.com/videos/coffee-origins-intro.mp4",
              orderNumber: 1,
              isPreview: true,
            },
            {
              slug: "arabica-vs-robusta",
              title: "Arabica vs Robusta: Understanding the Difference",
              description: "Deep dive into the two main coffee species",
              duration: 20,
              type: LessonType.VIDEO,
              videoUrl: "https://example.com/videos/arabica-robusta.mp4",
              orderNumber: 2,
            },
            {
              slug: "coffee-grading-systems",
              title: "Coffee Grading and Quality Assessment",
              description: "Learn how coffee quality is assessed and graded",
              duration: null,
              type: LessonType.ARTICLE,
              content: "Coffee grading involves multiple factors including bean size, density, defects, and processing methods. Understanding these systems helps in selecting quality beans for brewing...",
              orderNumber: 3,
            },
            {
              slug: "origins-knowledge-check",
              title: "Coffee Origins Knowledge Check",
              description: "Test your understanding of coffee origins",
              duration: 10,
              type: LessonType.QUIZ,
              quizQuestions: {
                questions: [
                  {
                    question: "Which coffee species is generally considered higher quality?",
                    options: ["Arabica", "Robusta", "Liberica", "Excelsa"],
                    correct: 0
                  },
                  {
                    question: "What factors affect coffee flavor profile?",
                    options: ["Altitude only", "Climate only", "Soil, altitude, and climate", "Processing method only"],
                    correct: 2
                  }
                ]
              },
              passingScore: new Prisma.Decimal(80),
              orderNumber: 4,
            },
          ],
        },
        {
          title: "Grinding Techniques",
          description: "Master the art of coffee grinding for optimal extraction",
          orderNumber: 2,
          lessons: [
            {
              slug: "grinder-types-overview",
              title: "Types of Coffee Grinders",
              description: "Blade vs burr grinders and their impact on coffee quality",
              duration: 18,
              type: LessonType.VIDEO,
              videoUrl: "https://example.com/videos/grinder-types.mp4",
              orderNumber: 1,
            },
            {
              slug: "grind-size-guide",
              title: "Grind Size Guide for Different Brewing Methods",
              description: "Matching grind size to your brewing method",
              duration: 25,
              type: LessonType.VIDEO,
              videoUrl: "https://example.com/videos/grind-size.mp4",
              orderNumber: 2,
            },
            {
              slug: "grinding-consistency-assignment",
              title: "Grinding Consistency Practice",
              description: "Hands-on practice with different grind sizes",
              duration: 30,
              type: LessonType.ASSIGNMENT,
              orderNumber: 3,
            },
          ],
        },
        {
          title: "Brewing Methods",
          description: "Learn multiple brewing techniques and their applications",
          orderNumber: 3,
          lessons: [
            {
              slug: "pour-over-technique",
              title: "Pour-Over Brewing Mastery",
              description: "Master the V60 and Chemex pour-over techniques",
              duration: 35,
              type: LessonType.VIDEO,
              videoUrl: "https://example.com/videos/pour-over.mp4",
              orderNumber: 1,
            },
            {
              slug: "french-press-method",
              title: "French Press Brewing",
              description: "Perfect your French press technique",
              duration: 22,
              type: LessonType.VIDEO,
              videoUrl: "https://example.com/videos/french-press.mp4",
              orderNumber: 2,
            },
            {
              slug: "espresso-basics",
              title: "Introduction to Espresso",
              description: "Understanding espresso fundamentals",
              duration: 30,
              type: LessonType.VIDEO,
              videoUrl: "https://example.com/videos/espresso-basics.mp4",
              orderNumber: 3,
            },
          ],
        },
        {
          title: "Tasting & Evaluation",
          description: "Develop your palate and evaluation skills",
          orderNumber: 4,
          lessons: [
            {
              slug: "cupping-basics",
              title: "Coffee Cupping Fundamentals",
              description: "Learn professional coffee tasting techniques",
              duration: 40,
              type: LessonType.VIDEO,
              videoUrl: "https://example.com/videos/cupping.mp4",
              orderNumber: 1,
            },
            {
              slug: "flavor-wheel-guide",
              title: "Understanding the Coffee Flavor Wheel",
              description: "Navigate the SCA flavor wheel for better tasting",
              duration: null,
              type: LessonType.ARTICLE,
              content: "The SCA Coffee Flavor Wheel is a valuable tool for describing coffee flavors systematically. This guide will help you understand how to use it effectively...",
              orderNumber: 2,
            },
            {
              slug: "tasting-assignment",
              title: "Comparative Tasting Exercise",
              description: "Taste and evaluate different coffee samples",
              duration: 45,
              type: LessonType.ASSIGNMENT,
              orderNumber: 3,
            },
          ],
        },
      ],
    },
    {
      courseSlug: "advanced-tea-ceremony-mastery",
      modules: [
        {
          title: "History & Philosophy",
          description: "Understanding the cultural and philosophical foundations",
          orderNumber: 1,
          lessons: [
            {
              slug: "tea-ceremony-history",
              title: "Origins of Tea Ceremony",
              description: "Historical development of tea ceremony traditions",
              duration: 25,
              type: LessonType.VIDEO,
              videoUrl: "https://example.com/videos/tea-history.mp4",
              orderNumber: 1,
              isPreview: true,
            },
            {
              slug: "philosophical-foundations",
              title: "Philosophical Principles of Tea",
              description: "Wa, Kei, Sei, Jaku - the four principles",
              duration: null,
              type: LessonType.ARTICLE,
              content: "The four principles of tea ceremony - Wa (harmony), Kei (respect), Sei (purity), and Jaku (tranquility) - form the philosophical foundation...",
              orderNumber: 2,
            },
            {
              slug: "mindfulness-in-tea",
              title: "Mindfulness and Presence in Tea Ceremony",
              description: "Cultivating awareness through tea practice",
              duration: 30,
              type: LessonType.VIDEO,
              videoUrl: "https://example.com/videos/tea-mindfulness.mp4",
              orderNumber: 3,
            },
          ],
        },
        {
          title: "Traditional Tools & Equipment",
          description: "Understanding and using traditional tea ceremony tools",
          orderNumber: 2,
          lessons: [
            {
              slug: "essential-tea-tools",
              title: "Essential Tea Ceremony Tools",
              description: "Overview of basic implements and their purposes",
              duration: 28,
              type: LessonType.VIDEO,
              videoUrl: "https://example.com/videos/tea-tools.mp4",
              orderNumber: 1,
            },
            {
              slug: "tool-care-maintenance",
              title: "Caring for Your Tea Tools",
              description: "Proper maintenance and storage of tea implements",
              duration: null,
              type: LessonType.ARTICLE,
              content: "Proper care of tea ceremony tools is essential for preserving their function and spiritual significance...",
              orderNumber: 2,
            },
            {
              slug: "tools-knowledge-quiz",
              title: "Tea Tools Knowledge Assessment",
              description: "Test your knowledge of tea ceremony implements",
              duration: 15,
              type: LessonType.QUIZ,
              quizQuestions: {
                questions: [
                  {
                    question: "What is the purpose of the chasen in tea ceremony?",
                    options: ["Measuring tea", "Whisking matcha", "Cleaning tools", "Storing tea"],
                    correct: 1
                  }
                ]
              },
              orderNumber: 3,
            },
          ],
        },
      ],
    },
  ];

  // --- Process each course structure ---
  for (const structure of courseStructures) {
    const course = courses.find((c) => c.slug === structure.courseSlug);
    if (!course) {
      console.warn(`⚠️ Course ${structure.courseSlug} not found, skipping...`);
      continue;
    }

    console.log(`📚 Processing course: ${course.title}`);

    // --- Process modules ---
    for (const moduleData of structure.modules) {
      // Create unique slug for module
      const moduleSlug = `${course.slug}-${moduleData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}`;

      const existingModule = await prisma.courseModule.findFirst({
        where: {
          courseId: course.id,
          title: moduleData.title,
        },
        select: { id: true },
      });

      const module = await prisma.courseModule.upsert({
        where: {
          id: existingModule?.id || -1, // Use existing ID or impossible value
        },
        update: {
          title: moduleData.title,
          description: moduleData.description,
          orderNumber: moduleData.orderNumber,
          isPublished: true,
        },
        create: {
          courseId: course.id,
          title: moduleData.title,
          description: moduleData.description,
          orderNumber: moduleData.orderNumber,
          isPublished: true,
        },
      });

      seededModules.push(module);
      moduleStats.push(
        existingModule ? `Updated: ${module.title}` : `Created: ${module.title}`
      );

      // --- Process lessons for this module ---
      for (const lessonData of moduleData.lessons) {
        const existingLesson = await prisma.lesson.findUnique({
          where: { slug: lessonData.slug },
          select: { id: true },
        });

        const lesson = await prisma.lesson.upsert({
          where: { slug: lessonData.slug },
          update: {
            title: lessonData.title,
            description: lessonData.description,
            duration: lessonData.duration,
            type: lessonData.type,
            videoUrl: 'videoUrl' in lessonData ? lessonData.videoUrl ?? null : null,
            content: 'content' in lessonData ? lessonData.content ?? null : null,
            quizQuestions: 'quizQuestions' in lessonData ? lessonData.quizQuestions ?? undefined : undefined,
            passingScore: 'passingScore' in lessonData ? lessonData.passingScore ?? new Prisma.Decimal(70) : new Prisma.Decimal(70),
            orderNumber: lessonData.orderNumber,
            isPreview: 'isPreview' in lessonData ? lessonData.isPreview ?? false : false,
            isPublished: true,
          },
          create: {
            moduleId: module.id,
            slug: lessonData.slug,
            title: lessonData.title,
            description: lessonData.description,
            duration: lessonData.duration,
            type: lessonData.type,
            videoUrl: 'videoUrl' in lessonData ? lessonData.videoUrl ?? null : null,
            content: 'content' in lessonData ? lessonData.content ?? null : null,
            quizQuestions: 'quizQuestions' in lessonData ? lessonData.quizQuestions ?? undefined : undefined,
            passingScore: 'passingScore' in lessonData ? lessonData.passingScore ?? new Prisma.Decimal(70) : new Prisma.Decimal(70),
            orderNumber: lessonData.orderNumber,
            isPreview: 'isPreview' in lessonData ? lessonData.isPreview ?? false : false,
            isPublished: true,
          },
        });

        seededLessons.push(lesson);
        lessonStats.push(
          existingLesson ? `Updated: ${lesson.slug}` : `Created: ${lesson.slug}`
        );
      }
    }
  }

  // --- Summary Statistics ---
  const lessonsByType = seededLessons.reduce((acc, lesson) => {
    acc[lesson.type] = (acc[lesson.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log("——— Modules & Lessons Seeding Summary ———");
  console.log(`• Courses processed: ${courseStructures.length}`);
  console.log(`• Modules created/updated: ${seededModules.length}`);
  console.log(`• Lessons created/updated: ${seededLessons.length}`);
  console.log("• Lesson types distribution:");
  Object.entries(lessonsByType).forEach(([type, count]) => {
    console.log(`  → ${type}: ${count} lessons`);
  });
  console.log(`• Preview lessons: ${seededLessons.filter(l => l.isPreview).length}`);
  console.log(`• Total content duration: ${seededLessons
    .filter(l => l.duration)
    .reduce((sum, l) => sum + (l.duration || 0), 0)} minutes`);

  console.log("✅ Sample modules and lessons seeded successfully.");

  return {
    modules: seededModules,
    lessons: seededLessons,
  };
}