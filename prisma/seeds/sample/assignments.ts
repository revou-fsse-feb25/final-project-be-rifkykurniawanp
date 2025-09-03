// prisma/seeds/sample/assignments.ts
import {
  PrismaClient,
  Assignment,
  AssignmentSubmission,
  LessonType,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

/**
 * SAMPLE ASSIGNMENTS & SUBMISSIONS
 * - Creates assignments for lessons of type ASSIGNMENT
 * - Sample submissions from enrolled students
 * - Idempotent with detailed tracking
 */
export async function seedAssignments(): Promise<{
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
}> {
  console.log("📝 Seeding sample assignments and submissions...");

  // --- Pre-check: assignment lessons exist ---
  const assignmentLessons = await prisma.lesson.findMany({
    where: { type: LessonType.ASSIGNMENT },
    include: {
      module: {
        include: { course: true },
      },
    },
  });

  if (assignmentLessons.length === 0) {
    console.warn("⚠️ No assignment lessons found. Skipping assignment seeding.");
    return { assignments: [], submissions: [] };
  }

  // --- Get students for submissions ---
  const students = await prisma.user.findMany({
    where: { isStudent: true },
    take: 5, // Limit for demo purposes
  });

  // --- Assignment Data ---
  const assignmentsData = [
    {
      lessonSlug: "grinding-consistency-assignment",
      title: "Grinding Consistency Practice",
      instructions: `Practice grinding coffee beans at different sizes and document your results.

**Requirements:**
1. Grind the same coffee beans at 3 different sizes: coarse, medium, fine
2. Take photos of each grind consistency
3. Brew each grind using the same method (pour-over recommended)
4. Document taste differences and extraction times
5. Write a 300-word reflection on how grind size affected your coffee

**Submission Format:**
- Upload photos of each grind size
- Include brewing notes and tasting observations
- Submit written reflection as PDF or text

**Evaluation Criteria:**
- Demonstration of different grind sizes (30 points)
- Quality of brewing observations (35 points)  
- Reflection depth and insights (35 points)`,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      maxScore: new Prisma.Decimal(100),
    },
    {
      lessonSlug: "tasting-assignment",
      title: "Comparative Tasting Exercise",
      instructions: `Conduct a comparative tasting of three different coffee origins and document your findings.

**Materials Needed:**
- 3 different single-origin coffees (provided recommendations in lesson)
- Cupping spoons or tasting spoons
- Cupping forms (downloadable from lesson resources)
- Timer

**Assignment Steps:**
1. Set up a proper cupping session following lesson guidelines
2. Evaluate each coffee using the SCA cupping protocol
3. Complete cupping forms for all three coffees
4. Identify flavor notes using the coffee flavor wheel
5. Rank the coffees by preference and justify your choices

**Deliverables:**
- Completed cupping forms (scanned or photos)
- Written comparison analysis (500-700 words)
- Flavor wheel annotations for each coffee

**Grading Rubric:**
- Proper cupping technique demonstration (25 points)
- Accuracy of flavor identification (25 points)
- Quality of comparative analysis (25 points)
- Use of coffee terminology (25 points)`,
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
      maxScore: new Prisma.Decimal(100),
    },
    {
      lessonSlug: "tools-knowledge-quiz", // This will be skipped since it's a QUIZ, not ASSIGNMENT
      title: "Tea Tools Practical Assessment", 
      instructions: `This won't be created as it's a QUIZ type lesson, not ASSIGNMENT`,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      maxScore: new Prisma.Decimal(50),
    },
  ];

  // --- Sample submission data ---
  const submissionTemplates = [
    {
      content: "I practiced grinding coffee at three different settings on my burr grinder. The coarse grind worked best for French press, taking 4 minutes to brew. The medium grind was perfect for pour-over with a 3-minute extraction time. The fine grind was too slow for pour-over but would work well for espresso. I noticed that consistency in grind size significantly affects extraction and flavor balance.",
      grade: new Prisma.Decimal(85),
      feedback: "Excellent observation about grind consistency! Your brewing notes show good attention to extraction times. Consider exploring the relationship between grind size and water temperature in future experiments.",
    },
    {
      content: "Completed the grinding exercise with three different sizes. Coarse grind was uneven with my blade grinder, which affected the flavor - some bitter, some sour. Medium grind worked okay for pour-over. Fine grind clogged my filter. I learned that my equipment might need upgrading for better consistency.",
      grade: new Prisma.Decimal(78),
      feedback: "Good self-awareness about equipment limitations! Your observation about uneven extraction with blade grinders is spot on. The filter clogging issue shows you understand the relationship between grind size and brewing method.",
    },
    {
      content: "I did the three grinds but didn't notice much difference in taste. Maybe my palate needs more training. The coarse grind looked bigger and the fine grind looked smaller. All three cups tasted like coffee to me.",
      grade: new Prisma.Decimal(65),
      feedback: "It's normal for palate development to take time! Try focusing on one aspect at a time - perhaps start with noticing differences in body or acidity rather than complex flavor notes. The visual differences you noted are a good start.",
    },
  ];

  // --- Process assignments ---
  const seededAssignments: Assignment[] = [];
  const seededSubmissions: AssignmentSubmission[] = [];
  const assignmentStats: string[] = [];
  const submissionStats: string[] = [];

  for (const assignmentData of assignmentsData) {
    const lesson = assignmentLessons.find(l => l.slug === assignmentData.lessonSlug);
    
    if (!lesson) {
      console.warn(`⚠️ Lesson ${assignmentData.lessonSlug} not found, skipping...`);
      continue;
    }

    if (lesson.type !== LessonType.ASSIGNMENT) {
      console.warn(`⚠️ Lesson ${assignmentData.lessonSlug} is not ASSIGNMENT type, skipping...`);
      continue;
    }

    // --- Create/update assignment ---
    const existingAssignment = await prisma.assignment.findFirst({
      where: {
        lessonId: lesson.id,
        title: assignmentData.title,
      },
      select: { id: true },
    });

    const assignment = await prisma.assignment.upsert({
      where: {
        id: existingAssignment?.id || -1,
      },
      update: {
        title: assignmentData.title,
        instructions: assignmentData.instructions,
        dueDate: assignmentData.dueDate,
        maxScore: assignmentData.maxScore,
      },
      create: {
        lessonId: lesson.id,
        title: assignmentData.title,
        instructions: assignmentData.instructions,
        dueDate: assignmentData.dueDate,
        maxScore: assignmentData.maxScore,
      },
    });

    seededAssignments.push(assignment);
    assignmentStats.push(
      existingAssignment ? `Updated: ${assignment.title}` : `Created: ${assignment.title}`
    );

    // --- Create sample submissions ---
    for (let i = 0; i < Math.min(students.length, submissionTemplates.length); i++) {
      const student = students[i];
      const template = submissionTemplates[i];

      const existingSubmission = await prisma.assignmentSubmission.findFirst({
        where: {
          assignmentId: assignment.id,
          userId: student.id,
        },
        select: { id: true },
      });

      // Create submission with some variety in timing
      const submittedAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      const gradedAt = new Date(submittedAt.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000);

      const submission = await prisma.assignmentSubmission.upsert({
        where: {
          id: existingSubmission?.id || -1,
        },
        update: {
          content: template.content,
          attachments: [`assignment_${assignment.id}_student_${student.id}_photos.zip`],
          grade: template.grade,
          feedback: template.feedback,
          submittedAt: submittedAt,
          gradedAt: gradedAt,
        },
        create: {
          assignmentId: assignment.id,
          userId: student.id,
          content: template.content,
          attachments: [`assignment_${assignment.id}_student_${student.id}_photos.zip`],
          grade: template.grade,
          feedback: template.feedback,
          submittedAt: submittedAt,
          gradedAt: gradedAt,
        },
      });

      seededSubmissions.push(submission);
      submissionStats.push(
        existingSubmission 
          ? `Updated submission: ${student.firstName} ${student.lastName} - ${assignment.title}` 
          : `Created submission: ${student.firstName} ${student.lastName} - ${assignment.title}`
      );
    }
  }

  // --- Summary Statistics ---
  const avgGrade = seededSubmissions.length > 0 
    ? seededSubmissions
        .filter(s => s.grade)
        .reduce((sum, s) => sum + Number(s.grade), 0) / seededSubmissions.filter(s => s.grade).length
    : 0;

  const gradedSubmissions = seededSubmissions.filter(s => s.grade).length;
  const ungradedSubmissions = seededSubmissions.filter(s => !s.grade).length;

  console.log("——— Assignments & Submissions Seeding Summary ———");
  console.log(`• Assignment lessons found: ${assignmentLessons.length}`);
  console.log(`• Assignments created/updated: ${seededAssignments.length}`);
  console.log(`• Students available for submissions: ${students.length}`);
  console.log(`• Submissions created/updated: ${seededSubmissions.length}`);
  console.log(`• Graded submissions: ${gradedSubmissions}`);
  console.log(`• Ungraded submissions: ${ungradedSubmissions}`);
  if (avgGrade > 0) {
    console.log(`• Average grade: ${avgGrade.toFixed(1)}/100`);
  }

  // Show assignment breakdown by course
  const assignmentsByCourse = seededAssignments.reduce((acc, assignment) => {
    const lesson = assignmentLessons.find(l => l.id === assignment.lessonId);
    if (lesson) {
      const courseTitle = lesson.module.course.title;
      acc[courseTitle] = (acc[courseTitle] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  console.log("• Assignments by course:");
  Object.entries(assignmentsByCourse).forEach(([course, count]) => {
    console.log(`  → ${course}: ${count} assignments`);
  });

  console.log("✅ Sample assignments and submissions seeded successfully.");

  return {
    assignments: seededAssignments,
    submissions: seededSubmissions,
  };
}