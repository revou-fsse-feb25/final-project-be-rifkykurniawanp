import { seedRoles } from './core/roles.seed'
import { seedUsers } from './core/users.seed'
import { seedCategories } from './core/categories.seed'

import { seedSampleProducts } from './sample/products.sample.seed'
import { seedSampleCourses } from './sample/courses.sample.seed'
import { seedSampleOrders } from './sample/orders.sample.seed'
import { seedSampleReviews } from './sample/reviews.sample.seed'

async function main() {
  // Core data
  await seedRoles()
  await seedUsers()
  await seedCategories()

  // Sample data
  await seedSampleProducts()
  await seedSampleCourses()
  await seedSampleOrders()
  await seedCategories()
}

main()
