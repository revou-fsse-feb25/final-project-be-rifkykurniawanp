// import { PrismaClient } from '@prisma/client';

// export async function seedQuizzes(prisma: PrismaClient) {
//   console.log('  📝 Creating sample quizzes...');

//   // Get some lessons to add quizzes to
//   const lessons = await prisma.lesson.findMany({
//     take: 3,
//     include: {
//       module: {
//         include: {
//           course: true
//         }
//       }
//     }
//   });

//   const quizzes = [
//     {
//       lessonId: lessons[0]?.id,
//       title: 'Coffee Origins Quiz',
//       passingScore: 70,
//       questions: [
//         {
//           question: 'Which country is considered the birthplace of coffee?',
//           type: 'multiple_choice',
//           choices: [
//             { text: 'Brazil', isCorrect: false },
//             { text: 'Ethiopia', isCorrect: true },
//             { text: 'Colombia', isCorrect: false },
//             { text: 'Yemen', isCorrect: false }
//           ]
//         },
//         {
//           question: 'What are the two main commercial coffee species?',
//           type: 'multiple_choice',
//           choices: [
//             { text: 'Arabica and Robusta', isCorrect: true },
//             { text: 'Arabica and Liberica', isCorrect: false },
//             { text: 'Robusta and Liberica', isCorrect: false },
//             { text: 'Typica and Bourbon', isCorrect: false }
//           ]
//         },
//         {
//           question: 'Which coffee variety is known for higher caffeine content?',
//           type: 'multiple_choice',
//           choices: [
//             { text: 'Arabica', isCorrect: false },
//             { text: 'Robusta', isCorrect: true },
//             { text: 'Liberica', isCorrect: false },
//             { text: 'Excelsa', isCorrect: false }
//           ]
//         }
//       ]
//     },
//     {
//       lessonId: lessons[1]?.id,
//       title: 'Coffee Processing Methods Quiz',
//       passingScore: 75,
//       questions: [
//         {
//           question: 'In the washed process, what is removed from the coffee cherry first?',
//           type: 'multiple_choice',
//           choices: [
//             { text: 'The bean', isCorrect: false },
//             { text: 'The parchment', isCorrect: false },
//             { text: 'The pulp', isCorrect: true },
//             { text: 'The silver skin', isCorrect: false }
//           ]
//         },
//         {
//           question: 'Which processing method typically results in fruitier flavor notes?',
//           type: 'multiple_choice',
//           choices: [
//             { text: 'Washed', isCorrect: false },
//             { text: 'Natural/Dry', isCorrect: true },
//             { text: 'Semi-washed', isCorrect: false },
//             { text: 'Wet-hulled', isCorrect: false }
//           ]
//         },
//         {
//           question: 'What is the honey process also known as?',
//           type: 'multiple_choice',
//           choices: [
//             { text: 'Pulped natural', isCorrect: true },
//             { text: 'Fully washed', isCorrect: false },
//             { text: 'Dry process', isCorrect: false },
//             { text: 'Wet process', isCorrect: false }
//           ]
//         }
//       ]
//     },
//     {
//       lessonId: lessons[2]?.id,
//       title: 'Espresso Fundamentals Quiz',
//       passingScore: 80,
//       questions: [
//         {
//           question: 'What is the ideal extraction time for a double espresso shot?',
//           type: 'multiple_choice',
//           choices: [
//             { text: '15-20 seconds', isCorrect: false },
//             { text: '25-30 seconds', isCorrect: true },
//             { text: '35-40 seconds', isCorrect: false },
//             { text: '45-50 seconds', isCorrect: false }
//           ]
//         },
//         {
//           question: 'What does "crema" indicate in espresso?',
//           type: 'multiple_choice',
//           choices: [
//             { text: 'Over-extraction', isCorrect: false },
//             { text: 'Under-extraction', isCorrect: false },
//             { text: 'Fresh coffee and proper extraction', isCorrect: true },
//             { text: 'Old coffee beans', isCorrect: false }
//           ]
//         },
//         {
//           question: 'What grind size is best for espresso?',
//           type: 'multiple_choice',
//           choices: [
//             { text: 'Coarse', isCorrect: false },
//             { text: 'Medium', isCorrect: false },
//             { text: 'Fine', isCorrect: true },
//             { text: 'Extra coarse', isCorrect: false }
//           ]
//         },
//         {
//           question: 'What is the recommended dose for a double espresso?',
//           type: 'multiple_choice',
//           choices: [
//             { text: '14-16 grams', isCorrect: false },
//             { text: '18-20 grams', isCorrect: true },
//             { text: '22-24 grams', isCorrect: false },
//             { text: '26-28 grams', isCorrect: false }
//           ]
//         }
//       ]
//     }
//   ];

//   for (const quizData of quizzes) {
//     if (!quizData.lessonId) continue;

//     const { questions, ...quiz } = quizData;
    
//     const createdQuiz = await prisma.quiz.upsert({
//       where: { lessonId: quiz.lessonId },
//       update: {},
//       create: quiz
//     });

//     for (const questionData of questions) {
//       const { choices, ...question } = questionData;
      
//       const createdQuestion = await prisma.quizQuestion.create({
//         data: {
//           ...question,
//           quizId: createdQuiz.id
//         }
//       });

//       for (const choice of choices) {
//         await prisma.quizChoice.create({
//           data: {
//             ...choice,
//             questionId: createdQuestion.id
//           }
//         });
//       }
//     }
//   }

//   console.log('    ✓ Created sample quizzes with questions and choices');
// }