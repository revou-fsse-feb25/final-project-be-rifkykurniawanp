import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSampleCourses() {
  console.log('📚 Seeding sample courses...');

  // Get categories and instructor
  const baristaBasicsCategory = await prisma.courseCategory.findUniqueOrThrow({ where: { slug: 'barista-basics' } });
  const coffeeBrewingCategory = await prisma.courseCategory.findUniqueOrThrow({ where: { slug: 'coffee-brewing' } });
  const latteArtCategory = await prisma.courseCategory.findUniqueOrThrow({ where: { slug: 'latte-art' } });
  const instructor = await prisma.user.findUniqueOrThrow({ where: { email: 'instructor@coffeeshop.com' } });

  // Sample courses
  const courses = [
    {
      title: 'Complete Barista Fundamentals',
      slug: 'complete-barista-fundamentals',
      description: 'Master the essential skills every barista needs. From espresso extraction to milk steaming techniques.',
      price: 299000,
      originalPrice: 399000,
      categoryId: baristaBasicsCategory.id,
      level: 'Beginner',
      duration: '4 hours',
      language: 'Indonesian',
      certificate: true,
      icon: '☕',
      color: 'bg-amber-500',
      modules: [
        {
          title: 'Introduction to Coffee',
          lessons: [
            {
              title: 'Coffee Origins and Varieties',
              type: 'video',
              duration: '15 min',
              content: 'Learn about coffee origins, varieties, and processing methods.'
            },
            {
              title: 'Understanding Coffee Equipment',
              type: 'video',
              duration: '20 min',
              content: 'Overview of essential barista equipment and tools.'
            }
          ]
        },
        {
          title: 'Espresso Fundamentals',
          lessons: [
            {
              title: 'Espresso Extraction Basics',
              type: 'video',
              duration: '25 min',
              content: 'Master the perfect espresso shot extraction.'
            },
            {
              title: 'Grinding and Dosing',
              type: 'video',
              duration: '18 min',
              content: 'Learn proper grinding techniques and dosing.'
            },
            {
              title: 'Espresso Quiz',
              type: 'quiz',
              duration: '10 min',
              content: 'Test your espresso knowledge.'
            }
          ]
        }
      ]
    },
    {
      title: 'Advanced Pour Over Techniques',
      slug: 'advanced-pour-over-techniques',
      description: 'Perfect your pour-over brewing with advanced techniques for V60, Chemex, and other methods.',
      price: 199000,
      originalPrice: 249000,
      categoryId: coffeeBrewingCategory.id,
      level: 'Intermediate',
      duration: '3 hours',
      language: 'Indonesian',
      certificate: true,
      icon: '🫗',
      color: 'bg-blue-500',
      modules: [
        {
          title: 'Pour Over Fundamentals',
          lessons: [
            {
              title: 'Water Quality and Temperature',
              type: 'video',
              duration: '12 min',
              content: 'Understanding water quality impact on extraction.'
            },
            {
              title: 'V60 Brewing Guide',
              type: 'video',
              duration: '22 min',
              content: 'Step-by-step V60 brewing technique.'
            }
          ]
        }
      ]
    },
    {
      title: 'Latte Art Mastery',
      slug: 'latte-art-mastery',
      description: 'Create beautiful latte art patterns. From basic heart to advanced rosetta and tulip designs.',
      price: 349000,
      originalPrice: 449000,
      categoryId: latteArtCategory.id,
      level: 'Intermediate',
      duration: '5 hours',
      language: 'Indonesian',
      certificate: true,
      icon: '🎨',
      color: 'bg-pink-500',
      modules: [
        {
          title: 'Milk Steaming Techniques',
          lessons: [
            {
              title: 'Perfect Microfoam',
              type: 'video',
              duration: '20 min',
              content: 'Master milk steaming for perfect microfoam.'
            },
            {
              title: 'Milk Temperature and Texture',
              type: 'video',
              duration: '15 min',
              content: 'Understanding optimal milk temperature and texture.'
            }
          ]
        },
        {
          title: 'Basic Latte Art Patterns',
          lessons: [
            {
              title: 'Heart Pattern',
              type: 'video',
              duration: '18 min',
              content: 'Learn to create perfect heart patterns.'
            },
            {
              title: 'Leaf Pattern',
              type: 'video',
              duration: '20 min',
              content: 'Master the classic leaf pattern.'
            },
            {
              title: 'Practice Assignment',
              type: 'assignment',
              duration: '30 min',
              content: 'Practice and submit your latte art creations.'
            }
          ]
        }
      ]
    }
  ];

  for (const courseData of courses) {
    const { modules, ...courseInfo } = courseData;
    
    const course = await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: {},
      create: {
        ...courseInfo,
        instructorId: instructor.id,
        instructorBio: 'Professional barista with 8+ years experience in specialty coffee.',
        instructorAvatar: 'https://example.com/images/instructor-avatar.jpg',
        rating: Math.random() * 1 + 4, // Random rating between 4.0-5.0
        students: Math.floor(Math.random() * 500) + 100, // Random student count 100-600
        lastUpdated: new Date()
      }
    });

    // Add course tags
    const tags = ['coffee', 'barista', 'professional', 'certification'];
    for (const tag of tags) {
      await prisma.courseTag.upsert({
        where: {
          courseId_tag: {
            courseId: course.id,
            tag: tag
          }
        },
        update: {},
        create: {
          courseId: course.id,
          tag: tag
        }
      });
    }

    // Add course requirements
    const requirements = [
      'Basic understanding of coffee',
      'Access to espresso machine or pour-over equipment',
      'Willingness to practice regularly'
    ];
    for (const req of requirements) {
      await prisma.courseRequirement.create({
        data: {
          courseId: course.id,
          content: req
        }
      });
    }

    // Add learning outcomes
    const outcomes = [
      'Master fundamental barista techniques',
      'Understand coffee extraction principles',
      'Create professional-quality coffee drinks',
      'Develop sensory evaluation skills'
    ];
    for (const outcome of outcomes) {
      await prisma.courseLearningOutcome.create({
        data: {
          courseId: course.id,
          content: outcome
        }
      });
    }

    // Create modules and lessons
    for (let i = 0; i < modules.length; i++) {
      const moduleData = modules[i];
      const courseModule = await prisma.courseModule.create({
        data: {
          courseId: course.id,
          title: moduleData.title,
          orderNumber: i + 1
        }
      });

      // Create lessons
      for (let j = 0; j < moduleData.lessons.length; j++) {
        const lessonData = moduleData.lessons[j];
        const lesson = await prisma.lesson.create({
          data: {
            moduleId: courseModule.id,
            slug: `${course.slug}-lesson-${i + 1}-${j + 1}`,
            title: lessonData.title,
            description: lessonData.content,
            duration: lessonData.duration,
            type: lessonData.type,
            orderNumber: j + 1,
            videoUrl: lessonData.type === 'video' ? `https://example.com/videos/${course.slug}-${i + 1}-${j + 1}.mp4` : null,
            content: lessonData.content
          }
        });

        // Create quiz for quiz lessons
        if (lessonData.type === 'quiz') {
          const quiz = await prisma.quiz.create({
            data: {
              lessonId: lesson.id,
              title: lessonData.title,
              passingScore: 70
            }
          });

          // Add sample quiz questions
          const question = await prisma.quizQuestion.create({
            data: {
              quizId: quiz.id,
              question: 'What is the ideal extraction time for espresso?',
              type: 'multiple_choice'
            }
          });

          // Add quiz choices
          const choices = [
            { text: '15-20 seconds', isCorrect: false },
            { text: '25-30 seconds', isCorrect: true },
            { text: '35-40 seconds', isCorrect: false },
            { text: '45-50 seconds', isCorrect: false }
          ];

          for (const choice of choices) {
            await prisma.quizChoice.create({
              data: {
                questionId: question.id,
                text: choice.text,
                isCorrect: choice.isCorrect
              }
            });
          }
        }

        // Create assignment for assignment lessons
        if (lessonData.type === 'assignment') {
          await prisma.assignment.create({
            data: {
              lessonId: lesson.id,
              title: lessonData.title,
              instructions: lessonData.content,
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
            }
          });
        }
      }
    }
  }

  console.log('✅ Sample courses seeded successfully');
}
