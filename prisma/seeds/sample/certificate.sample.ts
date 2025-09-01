import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCertificates() {
  const enrollment = await prisma.courseEnrollment.findFirst();
  if (!enrollment) return;

  await prisma.certificate.create({
    data: {
      enrollmentId: enrollment.id,
      finalLessonsCompleted: false,
      finalAssignmentsCompleted: false,
      eligible: false,
    },
  });

  console.log('Certificates seeded');
}
