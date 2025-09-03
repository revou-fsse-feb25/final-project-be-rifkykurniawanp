// prisma/seeds/sample/enrollments-certificates.ts
import {
  PrismaClient,
  CourseEnrollment,
  Certificate,
  LessonProgress,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

/**
 * SAMPLE COURSE ENROLLMENTS & CERTIFICATES
 * - Creates enrollments for completed course payments
 * - Generates lesson progress for enrolled students
 * - Awards certificates for eligible completions
 * - Realistic progress patterns and timing
 * - Idempotent with detailed tracking
 */
export async function seedEnrollmentsAndCertificates(): Promise<{
  enrollments: CourseEnrollment[];
  certificates: Certificate[];
  progresses: LessonProgress[];
}> {
  console.log("🎓 Seeding course enrollments and certificates...");

  // --- Pre-check: completed course payments exist ---
  const completedPayments = await prisma.payment.findMany({
    where: {
      status: "COMPLETED",
      cart: {
        items: {
          some: {
            itemType: "COURSE"
          }
        }
      }
    },
    include: {
      user: {
        select: { id: true, email: true, firstName: true, lastName: true, isStudent: true }
      },
      cart: {
        include: {
          items: {
            where: { itemType: "COURSE" },
            include: {
              course: {
                include: {
                  modules: {
                    include: {
                      lessons: {
                        select: { id: true, slug: true, title: true, duration: true, type: true }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (completedPayments.length === 0) {
    console.warn("⚠️ No completed course payments found. Please ensure payments are seeded first.");
    return { enrollments: [], certificates: [], progresses: [] };
  }

  // --- Progress patterns for different student types ---
  const progressPatterns = [
    {
      name: "High Achiever",
      weight: 0.2,
      completionRange: [85, 100],
      averageTimeSpentMultiplier: 1.2, // Spends more time per lesson
      consistentProgress: true,
    },
    {
      name: "Average Student",
      weight: 0.4,
      completionRange: [60, 85],
      averageTimeSpentMultiplier: 1.0,
      consistentProgress: true,
    },
    {
      name: "Struggling Student",
      weight: 0.2,
      completionRange: [30, 60],
      averageTimeSpentMultiplier: 0.8,
      consistentProgress: false,
    },
    {
      name: "Starter Only",
      weight: 0.15,
      completionRange: [5, 30],
      averageTimeSpentMultiplier: 0.5,
      consistentProgress: false,
    },
    {
      name: "Course Completed",
      weight: 0.05,
      completionRange: [100, 100],
      averageTimeSpentMultiplier: 1.1,
      consistentProgress: true,
    },
  ];

  // --- Process enrollments ---
  const seededEnrollments: CourseEnrollment[] = [];
  const seededCertificates: Certificate[] = [];
  const seededProgresses: LessonProgress[] = [];
  const enrollmentStats: string[] = [];
  const certificateStats: string[] = [];

  for (const payment of completedPayments) {
    const courseItems = payment.cart.items.filter(item => item.itemType === "COURSE");
    
    for (const courseItem of courseItems) {
      if (!courseItem.course) continue;

      const course = courseItem.course;
      const student = payment.user;

      // --- Check for existing enrollment ---
      const existingEnrollment = await prisma.courseEnrollment.findUnique({
        where: {
          courseId_studentId: {
            courseId: course.id,
            studentId: student.id,
          }
        },
        select: { id: true },
      });

      // --- Determine progress pattern ---
      let selectedPattern = progressPatterns[0];
      let random = Math.random();
      for (const pattern of progressPatterns) {
        if (random <= pattern.weight) {
          selectedPattern = pattern;
          break;
        }
        random -= pattern.weight;
      }

      // --- Calculate progress percentage ---
      const progressPercentage = Math.floor(
        selectedPattern.completionRange[0] + 
        Math.random() * (selectedPattern.completionRange[1] - selectedPattern.completionRange[0])
      );

      // --- Determine enrollment timing ---
      const enrolledAt = payment.paidAt || payment.createdAt;
      const daysSinceEnrollment = Math.floor((Date.now() - enrolledAt.getTime()) / (1000 * 60 * 60 * 24));
      
      let completedAt: Date | null = null;
      if (progressPercentage >= 100) {
        // Course completed within reasonable timeframe
        const completionDays = Math.min(daysSinceEnrollment, Math.floor(Math.random() * 60) + 14); // 14-74 days
        completedAt = new Date(enrolledAt.getTime() + completionDays * 24 * 60 * 60 * 1000);
      }

      // --- Last accessed timing ---
      const lastAccessedAt = progressPercentage > 0 
        ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Within last 7 days if active
        : new Date(enrolledAt.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000); // Early access if inactive

      // --- Create/update enrollment ---
      const enrollment = await prisma.courseEnrollment.upsert({
        where: {
          courseId_studentId: {
            courseId: course.id,
            studentId: student.id,
          }
        },
        update: {
          progress: progressPercentage,
          completedAt: completedAt,
          lastAccessedAt: lastAccessedAt,
        },
        create: {
          courseId: course.id,
          studentId: student.id,
          paymentId: payment.id,
          pricePaid: courseItem.priceSnapshot,
          progress: progressPercentage,
          enrolledAt: enrolledAt,
          completedAt: completedAt,
          lastAccessedAt: lastAccessedAt,
        },
      });

      seededEnrollments.push(enrollment);
      enrollmentStats.push(
        existingEnrollment 
          ? `Updated enrollment: ${student.firstName} ${student.lastName} in ${course.title} (${progressPercentage}%)`
          : `Created enrollment: ${student.firstName} ${student.lastName} in ${course.title} (${progressPercentage}%)`
      );

      // --- Generate lesson progress ---
      const allLessons = course.modules.flatMap(module => module.lessons);
      const lessonsToComplete = Math.floor(allLessons.length * (progressPercentage / 100));

      // Clear existing progress for clean slate
      if (existingEnrollment) {
        await prisma.lessonProgress.deleteMany({
          where: {
            userId: student.id,
            lesson: {
              module: {
                courseId: course.id
              }
            }
          }
        });
      }

      // --- Create lesson progress records ---
      for (let i = 0; i < lessonsToComplete; i++) {
        const lesson = allLessons[i];
        if (!lesson) continue;

        const baseTimeSpent = lesson.duration || 15; // Default 15 minutes if no duration
        const actualTimeSpent = Math.floor(
          baseTimeSpent * selectedPattern.averageTimeSpentMultiplier * (0.8 + Math.random() * 0.4) // ±20% variance
        );

        // Completion time should be after enrollment but before last access
        const minCompletionTime = enrolledAt.getTime();
        const maxCompletionTime = Math.min(
          lastAccessedAt.getTime(),
          enrolledAt.getTime() + (i + 1) * 24 * 60 * 60 * 1000 // Progressive over days
        );
        
        const completionTime = new Date(
          minCompletionTime + Math.random() * (maxCompletionTime - minCompletionTime)
        );

        const lessonProgress = await prisma.lessonProgress.create({
          data: {
            lessonId: lesson.id,
            userId: student.id,
            completed: true,
            timeSpent: actualTimeSpent,
            completedAt: completionTime,
          },
        });

        seededProgresses.push(lessonProgress);
      }

      // --- Handle certificate generation for completed courses ---
      if (progressPercentage >= 100 && completedAt) {
        const certificateNumber = `CERT-${course.id.toString().padStart(3, '0')}-${student.id.toString().padStart(4, '0')}-${Date.now().toString().slice(-6)}`;
        
        // Check if certificate already exists
        const existingCertificate = await prisma.certificate.findUnique({
          where: { enrollmentId: enrollment.id },
          select: { id: true },
        });

        // Determine certificate eligibility (most completed courses are eligible)
        const isEligible = Math.random() > 0.1; // 90% eligible
        const finalLessonsCompleted = lessonsToComplete >= allLessons.length * 0.95; // 95% threshold
        const finalAssignmentsCompleted = Math.random() > 0.2; // 80% have assignments completed

        const certificate = await prisma.certificate.upsert({
          where: { enrollmentId: enrollment.id },
          update: {
            finalLessonsCompleted: finalLessonsCompleted,
            finalAssignmentsCompleted: finalAssignmentsCompleted,
            eligible: isEligible,
            issuedAt: isEligible ? completedAt : null,
            certificateUrl: isEligible ? `https://certificates.example.com/${certificateNumber}.pdf` : null,
          },
          create: {
            enrollmentId: enrollment.id,
            certificateNumber: certificateNumber,
            finalLessonsCompleted: finalLessonsCompleted,
            finalAssignmentsCompleted: finalAssignmentsCompleted,
            eligible: isEligible,
            issuedAt: isEligible ? completedAt : null,
            certificateUrl: isEligible ? `https://certificates.example.com/${certificateNumber}.pdf` : null,
          },
        });

        seededCertificates.push(certificate);
        certificateStats.push(
          existingCertificate 
            ? `Updated certificate: ${student.firstName} ${student.lastName} - ${course.title} (${isEligible ? 'ISSUED' : 'PENDING'})`
            : `Created certificate: ${student.firstName} ${student.lastName} - ${course.title} (${isEligible ? 'ISSUED' : 'PENDING'})`
        );

        // Update enrollment to mark certificate awarded
        if (isEligible) {
          await prisma.courseEnrollment.update({
            where: { id: enrollment.id },
            data: { certificateAwarded: true },
          });
        }
      }
    }
  }

  // --- Calculate summary statistics ---
  const totalEnrollments = seededEnrollments.length;
  const completedEnrollments = seededEnrollments.filter(e => e.completedAt).length;
  const averageProgress = totalEnrollments > 0 
    ? seededEnrollments.reduce((sum, e) => sum + e.progress, 0) / totalEnrollments 
    : 0;
  
  const certificatesIssued = seededCertificates.filter(c => c.issuedAt).length;
  const certificatesPending = seededCertificates.filter(c => !c.issuedAt && c.eligible).length;
  
  const totalLessonProgress = seededProgresses.length;
  const averageTimeSpent = totalLessonProgress > 0 
    ? seededProgresses.reduce((sum, p) => sum + (p.timeSpent || 0), 0) / totalLessonProgress
    : 0;

  // Course completion rates
  const enrollmentsByCourse = seededEnrollments.reduce((acc, enrollment) => {
    const courseId = enrollment.courseId;
    if (!acc[courseId]) {
      acc[courseId] = { total: 0, completed: 0, courseName: '' };
    }
    acc[courseId].total++;
    if (enrollment.completedAt) {
      acc[courseId].completed++;
    }
    return acc;
  }, {} as Record<number, { total: number; completed: number; courseName: string }>);

  // Get course names for summary
  const courses = await prisma.course.findMany({
    where: { id: { in: seededEnrollments.map(e => e.courseId) } },
    select: { id: true, title: true },
  });

  courses.forEach(course => {
    if (enrollmentsByCourse[course.id]) {
      enrollmentsByCourse[course.id].courseName = course.title;
    }
  });

  // --- Console Summary ---
  console.log("——— Enrollments & Certificates Seeding Summary ———");
  console.log(`• Completed course payments: ${completedPayments.length}`);
  console.log(`• Course enrollments created/updated: ${totalEnrollments}`);
  console.log(`• Lesson progress records: ${totalLessonProgress}`);
  console.log(`• Certificates created/updated: ${seededCertificates.length}`);
  console.log("");
  console.log("• Enrollment statistics:");
  console.log(`  → Completed courses: ${completedEnrollments}/${totalEnrollments} (${((completedEnrollments/totalEnrollments)*100).toFixed(1)}%)`);
  console.log(`  → Average progress: ${averageProgress.toFixed(1)}%`);
  console.log(`  → Average time per lesson: ${averageTimeSpent.toFixed(1)} minutes`);
  console.log("");
  console.log("• Certificate statistics:");
  console.log(`  → Certificates issued: ${certificatesIssued}`);
  console.log(`  → Certificates pending: ${certificatesPending}`);
  console.log(`  → Certificate issuance rate: ${seededCertificates.length > 0 ? ((certificatesIssued/seededCertificates.length)*100).toFixed(1) : 0}%`);
  console.log("");
  console.log("• Course completion rates:");
  Object.entries(enrollmentsByCourse).forEach(([courseId, stats]) => {
    const completionRate = ((stats.completed / stats.total) * 100).toFixed(1);
    console.log(`  → ${stats.courseName}: ${stats.completed}/${stats.total} (${completionRate}%)`);
  });

  // Show progress pattern distribution
  console.log("");
  console.log("• Progress pattern distribution (estimated):");
  const progressRanges = [
    { label: "Course Completed (100%)", count: seededEnrollments.filter(e => e.progress === 100).length },
    { label: "High Achievers (85-99%)", count: seededEnrollments.filter(e => e.progress >= 85 && e.progress < 100).length },
    { label: "Average Students (60-84%)", count: seededEnrollments.filter(e => e.progress >= 60 && e.progress < 85).length },
    { label: "Struggling (30-59%)", count: seededEnrollments.filter(e => e.progress >= 30 && e.progress < 60).length },
    { label: "Starters Only (5-29%)", count: seededEnrollments.filter(e => e.progress >= 5 && e.progress < 30).length },
    { label: "No Progress (0-4%)", count: seededEnrollments.filter(e => e.progress < 5).length },
  ];

  progressRanges.forEach(range => {
    if (range.count > 0) {
      const percentage = ((range.count / totalEnrollments) * 100).toFixed(1);
      console.log(`  → ${range.label}: ${range.count} (${percentage}%)`);
    }
  });

  console.log("✅ Course enrollments and certificates seeded successfully.");

  return {
    enrollments: seededEnrollments,
    certificates: seededCertificates,
    progresses: seededProgresses,
  };
}