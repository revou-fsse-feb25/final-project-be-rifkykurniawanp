// prisma/seeds/sample/courses.ts
import {
  PrismaClient,
  Course,
  CourseLevel,
  CourseCategory,
  CourseStatus,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

/**
 * SAMPLE COURSES
 * - Creates courses for existing instructors
 * - Various categories and levels
 * - Idempotent (safe to run repeatedly)
 */
export async function seedCourses(): Promise<Course[]> {
  console.log("📚 Seeding sample courses...");

  // --- Pre-check: instructors exist ---
  const instructors = await prisma.instructor.findMany({
    include: { user: true },
  });

  if (instructors.length === 0) {
    throw new Error(
      "❌ No instructors found. Please seed instructors first."
    );
  }

  // Use first instructor for all courses (or distribute if multiple)
  const instructor = instructors[0];

  // --- Course Data ---
  const coursesData = [
    {
      title: "Coffee Brewing Fundamentals",
      slug: "coffee-brewing-fundamentals",
      description: "Learn the art and science of brewing perfect coffee. From bean selection to extraction techniques, master the fundamentals that will elevate your coffee experience.",
      shortDescription: "Master the fundamentals of coffee brewing",
      syllabus: "Module 1: Coffee Origins\nModule 2: Grinding Techniques\nModule 3: Brewing Methods\nModule 4: Tasting & Evaluation",
      price: new Prisma.Decimal(299000),
      instructorId: instructor.id,
      rating: new Prisma.Decimal(4.7),
      reviewCount: 15,
      students: 45,
      level: CourseLevel.BEGINNER,
      category: CourseCategory.COFFEE_BREWING,
      language: "id",
      subtitles: ["en", "id"],
      thumbnail: "coffee-brewing-thumb.jpg",
      previewVideo: "preview-coffee-brewing.mp4",
      whatYouWillLearn: [
        "Understand different coffee origins and their characteristics",
        "Master various grinding techniques for optimal extraction",
        "Learn 5+ brewing methods (pour-over, French press, espresso)",
        "Develop your palate for coffee tasting and evaluation",
        "Troubleshoot common brewing problems"
      ],
      requirements: [
        "Basic interest in coffee",
        "Access to coffee beans and basic brewing equipment",
        "No prior experience required"
      ],
      targetAudience: [
        "Coffee enthusiasts wanting to improve their brewing skills",
        "Beginners looking to learn proper coffee brewing techniques",
        "Home baristas seeking to understand the science behind great coffee"
      ],
      totalDuration: 480, // 8 hours
      totalLessons: 16,
      certificate: true,
      status: CourseStatus.PUBLISHED,
      isPublished: true,
      maxStudents: 100,
    },
    {
      title: "Advanced Tea Ceremony Mastery",
      slug: "advanced-tea-ceremony-mastery",
      description: "Dive deep into the traditional art of tea ceremony. Learn the philosophical foundations, precise movements, and cultural significance of this ancient practice.",
      shortDescription: "Master the traditional art of tea ceremony",
      syllabus: "Module 1: History & Philosophy\nModule 2: Traditional Tools\nModule 3: Ceremony Techniques\nModule 4: Advanced Practices",
      price: new Prisma.Decimal(450000),
      instructorId: instructor.id,
      rating: new Prisma.Decimal(4.9),
      reviewCount: 8,
      students: 22,
      level: CourseLevel.ADVANCED,
      category: CourseCategory.TEA_CEREMONY,
      language: "id",
      subtitles: ["en", "id", "jp"],
      thumbnail: "tea-ceremony-thumb.jpg",
      previewVideo: "preview-tea-ceremony.mp4",
      whatYouWillLearn: [
        "Understand the philosophical foundations of tea ceremony",
        "Master traditional tea preparation techniques",
        "Learn proper etiquette and movement sequences",
        "Appreciate different tea varieties and their ceremonies",
        "Create meaningful tea experiences for others"
      ],
      requirements: [
        "Basic knowledge of tea varieties",
        "Patience and mindfulness for ceremonial practices",
        "Access to basic tea ceremony tools (guidance provided)"
      ],
      targetAudience: [
        "Tea enthusiasts seeking deeper cultural understanding",
        "Mindfulness practitioners interested in tea meditation",
        "Cultural learners wanting authentic tea ceremony knowledge"
      ],
      totalDuration: 600, // 10 hours
      totalLessons: 20,
      certificate: true,
      status: CourseStatus.PUBLISHED,
      isPublished: true,
      maxStudents: 30,
    },
    {
      title: "Herbal Medicine Garden to Cup",
      slug: "herbal-medicine-garden-to-cup",
      description: "Complete guide to growing, harvesting, and preparing medicinal herbs. Learn traditional remedies and modern applications for wellness.",
      shortDescription: "Grow and prepare your own medicinal herbs",
      syllabus: "Module 1: Herb Selection\nModule 2: Growing Techniques\nModule 3: Harvesting & Drying\nModule 4: Preparation Methods",
      price: new Prisma.Decimal(375000),
      instructorId: instructor.id,
      rating: new Prisma.Decimal(4.5),
      reviewCount: 12,
      students: 38,
      level: CourseLevel.INTERMEDIATE,
      category: CourseCategory.HERBAL_MEDICINE,
      language: "id",
      subtitles: ["en", "id"],
      thumbnail: "herbal-medicine-thumb.jpg",
      previewVideo: "preview-herbal-medicine.mp4",
      whatYouWillLearn: [
        "Identify and grow 20+ medicinal herbs",
        "Master harvesting techniques for maximum potency",
        "Create tinctures, teas, and other herbal preparations",
        "Understand herb safety and contraindications",
        "Design your own medicinal herb garden"
      ],
      requirements: [
        "Interest in natural health and wellness",
        "Access to gardening space (containers work too)",
        "Basic understanding of plant care"
      ],
      targetAudience: [
        "Health-conscious individuals interested in natural remedies",
        "Gardeners wanting to grow medicinal plants",
        "Wellness practitioners seeking herb knowledge"
      ],
      totalDuration: 540, // 9 hours
      totalLessons: 18,
      certificate: true,
      status: CourseStatus.PUBLISHED,
      isPublished: true,
      maxStudents: 50,
    },
    {
      title: "Professional Barista Skills",
      slug: "professional-barista-skills",
      description: "Comprehensive training for aspiring professional baristas. Master espresso, milk steaming, latte art, and customer service skills needed for coffee shop success.",
      shortDescription: "Professional barista training program",
      syllabus: "Module 1: Espresso Mastery\nModule 2: Milk Techniques\nModule 3: Latte Art\nModule 4: Customer Service",
      price: new Prisma.Decimal(650000),
      instructorId: instructor.id,
      rating: new Prisma.Decimal(4.8),
      reviewCount: 25,
      students: 67,
      level: CourseLevel.INTERMEDIATE,
      category: CourseCategory.BARISTA_SKILLS,
      language: "id",
      subtitles: ["en", "id"],
      thumbnail: "barista-skills-thumb.jpg",
      previewVideo: "preview-barista-skills.mp4",
      whatYouWillLearn: [
        "Pull perfect espresso shots consistently",
        "Master milk steaming and texturing techniques",
        "Create 10+ latte art designs",
        "Develop efficient workflow and speed",
        "Provide excellent customer service in coffee environments"
      ],
      requirements: [
        "Access to espresso machine and grinder",
        "Physical ability to stand for extended periods",
        "Enthusiasm for coffee and customer service"
      ],
      targetAudience: [
        "Aspiring professional baristas",
        "Coffee shop employees wanting to improve skills",
        "Coffee enthusiasts considering career change"
      ],
      totalDuration: 720, // 12 hours
      totalLessons: 24,
      certificate: true,
      status: CourseStatus.PUBLISHED,
      isPublished: true,
      maxStudents: 40,
    },
    {
      title: "Coffee Business Startup Guide",
      slug: "coffee-business-startup-guide",
      description: "Everything you need to know to start and run a successful coffee business. From business planning to operations, marketing, and financial management.",
      shortDescription: "Complete guide to starting a coffee business",
      syllabus: "Module 1: Business Planning\nModule 2: Location & Equipment\nModule 3: Operations\nModule 4: Marketing & Growth",
      price: new Prisma.Decimal(799000),
      instructorId: instructor.id,
      rating: new Prisma.Decimal(4.6),
      reviewCount: 18,
      students: 29,
      level: CourseLevel.ADVANCED,
      category: CourseCategory.COFFEE_BUSINESS,
      language: "id",
      subtitles: ["en", "id"],
      thumbnail: "coffee-business-thumb.jpg",
      previewVideo: "preview-coffee-business.mp4",
      whatYouWillLearn: [
        "Create a comprehensive business plan for coffee venture",
        "Choose optimal location and equipment setup",
        "Develop efficient operational systems",
        "Master coffee business marketing strategies",
        "Understand financial management and profitability"
      ],
      requirements: [
        "Serious interest in starting a coffee business",
        "Basic business knowledge helpful but not required",
        "Access to market research tools and resources"
      ],
      targetAudience: [
        "Entrepreneurs wanting to start coffee businesses",
        "Existing coffee shop owners seeking improvement",
        "Investors interested in coffee industry opportunities"
      ],
      totalDuration: 900, // 15 hours
      totalLessons: 30,
      certificate: true,
      status: CourseStatus.PUBLISHED,
      isPublished: true,
      maxStudents: 25,
    },
  ];

  // --- Upsert courses with tracking ---
  const seededCourses: Course[] = [];
  const created: string[] = [];
  const updated: string[] = [];

  for (const courseData of coursesData) {
    const existing = await prisma.course.findUnique({
      where: { slug: courseData.slug },
      select: { id: true },
    });

    const course = await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: { ...courseData },
      create: { ...courseData },
    });

    if (existing) updated.push(courseData.slug);
    else created.push(courseData.slug);

    seededCourses.push(course);
  }

  // --- Summary ---
  console.log("——— Course Seeding Summary ———");
  console.log(`• Instructor: ${instructor.user.email} ✅`);
  console.log(`• Created: ${created.length} courses`);
  if (created.length > 0) console.log(`  → ${created.join(", ")}`);
  console.log(`• Updated: ${updated.length} courses`);
  if (updated.length > 0) console.log(`  → ${updated.join(", ")}`);
  console.log(`• Total courses: ${seededCourses.length}`);
  console.log(`• Categories covered: ${[...new Set(coursesData.map(c => c.category))].join(", ")}`);
  console.log(`• Levels covered: ${[...new Set(coursesData.map(c => c.level))].join(", ")}`);

  console.log("✅ Sample courses seeded successfully.");
  return seededCourses;
}