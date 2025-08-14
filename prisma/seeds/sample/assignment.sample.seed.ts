// import { PrismaClient } from '@prisma/client';

// export async function seedAssignments(prisma: PrismaClient) {
//   console.log('  📝 Creating sample assignments...');

//   // Get some lessons to add assignments to
//   const lessons = await prisma.lesson.findMany({
//     where: {
//       type: { not: 'quiz' }
//     },
//     take: 4,
//     include: {
//       module: {
//         include: {
//           course: true
//         }
//       }
//     }
//   });

//   // Get students for submissions
//   const students = await prisma.user.findMany({
//     where: { isStudent: true },
//     take: 3
//   });

//   const assignments = [
//     {
//       lessonId: lessons[0]?.id,
//       title: 'Coffee Tasting Journal',
//       instructions: 'Create a detailed tasting journal for 3 different coffee origins. Include notes on aroma, flavor, body, and acidity. Compare and contrast the differences between each origin.',
//       dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
//       submissions: [
//         {
//           userId: students[0]?.id,
//           content: 'I tasted Ethiopian Yirgacheffe, Colombian Supremo, and Brazilian Santos. Ethiopian had bright floral notes with high acidity, Colombian was well-balanced with chocolate undertones, and Brazilian was nutty with low acidity and full body.',
//           grade: 95,
//           feedback: 'Excellent detailed analysis! You clearly identified the key characteristics of each origin.'
//         },
//         {
//           userId: students[1]?.id,
//           content: 'Tried three different coffees as requested. The Ethiopian was very bright and fruity, Colombian smooth and balanced, Brazilian more earthy and nutty.',
//           grade: 78,
//           feedback: 'Good observations, but could use more detailed tasting notes on body and specific flavor descriptors.'
//         }
//       ]
//     },
//     {
//       lessonId: lessons[1]?.id,
//       title: 'Espresso Shot Analysis',
//       instructions: 'Pull 5 espresso shots with different grind sizes and extraction times. Document the results including taste, crema formation, and overall quality. Identify the optimal parameters.',
//       dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
//       submissions: [
//         {
//           userId: students[0]?.id,
//           content: 'Shot 1: Fine grind, 30s - bitter, over-extracted. Shot 2: Medium-fine, 25s - balanced, good crema. Shot 3: Medium, 20s - sour, under-extracted. Shot 4: Extra fine, 35s - very bitter. Shot 5: Medium-fine adjusted, 27s - perfect balance. Optimal: medium-fine grind, 25-27 second extraction.',
//           grade: 92,
//           feedback: 'Great systematic approach and excellent conclusions. Good understanding of extraction principles.'
//         }
//       ]
//     },
//     {
//       lessonId: lessons[2]?.id,
//       title: 'Milk Steaming Practice Report',
//       instructions: 'Practice steaming milk for latte art. Document your attempts, techniques used, and improvements made. Include photos if possible.',
//       dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
//       submissions: [
//         {
//           userId: students[1]?.id,
//           content: 'Practiced steaming milk for 2 hours. Initially struggled with temperature control and texture. By the end, I could create smooth microfoam consistently. Key learnings: keep steam wand just below surface initially, then plunge deeper for heating. Achieved basic heart pattern twice.',
//           grade: 85,
//           feedback: 'Good progress shown! Keep practicing the pouring technique for more consistent latte art.'
//         },
//         {
//           userId: students[2]?.id,
//           content: 'Steamed milk multiple times. Found it challenging to get the right texture. Sometimes too foamy, sometimes not enough foam. Need more practice with steam wand positioning.',
//           grade: 70,
//           feedback: 'Good honest assessment. Focus on steam wand angle and timing. Practice will improve your technique.'
//         }
//       ]
//     },
//     {
//       lessonId: lessons[3]?.id,
//       title: 'Pour Over Brewing Comparison',
//       instructions: 'Compare three different pour-over methods (V60, Chemex, French Press). Use the same coffee beans and document the differences in taste, clarity, and body.',
//       dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
//       submissions: [
//         {
//           userId: students[0]?.id,
//           content: 'Used Ethiopian beans for all three methods. V60: Clean, bright, highlighted acidity and floral notes. Chemex: Very clean, smooth, subtle flavors. French Press: Full body, some sediment, rich mouthfeel but less clarity. V60 best showcased the coffee\'s unique characteristics.',
//           grade: 88,
//           feedback: 'Excellent comparative analysis! You understood how each method affects flavor extraction.'
//         }
//       ]
//     }
//   ];

//   for (const assignmentData of assignments) {
//     if (!assignmentData.lessonId) continue;

//     const { submissions, ...assignment } = assignmentData;
    
//     const createdAssignment = await prisma.assignment.create({
//       data: assignment
//     });

//     for (const submissionData of submissions) {
//       if (!submissionData.userId) continue;

//       await prisma.assignmentSubmission.create({
//         data: {
//           ...submissionData,
//           assignmentId: createdAssignment.id
//         }
//       });
//     }
//   }

//   console.log('    ✓ Created sample assignments with submissions');
// }