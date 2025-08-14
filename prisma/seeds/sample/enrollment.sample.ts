import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedEnrollments() {
  const student = await prisma.user.findFirst({ where: { role: 'USER' } });
  const course = await prisma.course.findFirst();
  const payment = await prisma.payment.findFirst({ where: { userId: student?.id } });

  if (!student || !course || !payment) return;

  await prisma.courseEnrollment.create({
    data: {
      courseId: course.id,
      studentId: student.id,
      paymentId: payment.id,
      pricePaid: course.price,
      progress: 0,
      certificateAwarded: false,
    },
  });

  console.log('Enrollments seeded');
}
