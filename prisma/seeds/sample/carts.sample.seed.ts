// import { PrismaClient } from '@prisma/client';

// export async function seedCarts(prisma: PrismaClient) {
//   console.log('  🛒 Creating sample carts...');

//   // Get regular users
//   const users = await prisma.user.findMany({
//     where: { 
//       role: { name: 'USER' },
//       isBuyer: true 
//     }
//   });

//   // Get some products and courses
//   const products = await prisma.product.findMany({ take: 4 });
//   const courses = await prisma.course.findMany({ take: 2 });

//   if (users.length === 0 || products.length === 0) {
//     console.log('    ⚠️ Skipping cart creation - no users or products found');
//     return;
//   }

//   const carts = [
//     {
//       userId: users[0]?.id,
//       status: 'active',
//       items: [
//         {
//           itemType: 'product',
//           itemId: products[0]?.id,
//           quantity: 2,
//           price: products[0]?.price
//         },
//         {
//           itemType: 'product',
//           itemId: products[1]?.id,
//           quantity: 1,
//           price: products[1]?.price
//         },
//         {
//           itemType: 'course',
//           itemId: courses[0]?.id,
//           quantity: 1,
//           price: courses[0]?.price
//         }
//       ]
//     },
//     {
//       userId: users[1]?.id,
//       status: 'active',
//       items: [
//         {
//           itemType: 'product',
//           itemId: products[2]?.id,
//           quantity: 1,
//           price: products[2]?.price
//         },
//         {
//           itemType: 'course',
//           itemId: courses[1]?.id,
//           quantity: 1,
//           price: courses[1]?.price
//         }
//       ]
//     },
//     {
//       userId: users[2]?.id,
//       status: 'checked_out',
//       items: [
//         {
//           itemType: 'product',
//           itemId: products[3]?.id,
//           quantity: 3,
//           price: products[3]?.price
//         }
//       ]
//     }
//   ];

//   for (const cartData of carts) {
//   if (!cartData.userId) continue;

//   const { items, ...cart } = cartData;

//   let createdCart = await prisma.cart.findFirst({
//     where: {
//       userId: cart.userId,
//       status: cart.status
//     }
//   });

//   if (!createdCart) {
//     createdCart = await prisma.cart.create({
//       data: cart
//     });
//   }

//   for (const item of items) {
//     if (!item.itemId || !item.price) continue;

//     await prisma.cartItem.upsert({
//       where: {
//         cartId_itemType_itemId: {
//           cartId: createdCart.id,
//           itemType: item.itemType,
//           itemId: item.itemId
//         }
//       },
//       update: {},
//       create: {
//         cartId: createdCart.id,
//         itemType: item.itemType,
//         itemId: item.itemId,
//         quantity: item.quantity,
//         price: item.price
//       }
//     });
//   }
// }


//   console.log('    ✓ Created sample carts with items');
// }