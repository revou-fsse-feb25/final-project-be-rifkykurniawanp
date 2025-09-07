# Database Seeding Structure Tree

## Recommended Directory Structure

```
prisma/
├── seeds/
│   ├── index.ts                          # Main seeder orchestrator
│   ├── core/
│   │   ├── base-seeder.ts               # Abstract base class (SOLID - SRP)
│   │   ├── seed-context.ts              # Context interface
│   │   └── seed-result.ts               # Result types
│   ├── 01-foundation/                   # Core system data (no dependencies)
│   │   ├── roles.seeder.ts
│   │   ├── permissions.seeder.ts
│   │   └── role-permissions.seeder.ts
│   ├── 02-users/                        # User-related seeders
│   │   ├── admin-users.seeder.ts
│   │   ├── instructors.seeder.ts
│   │   └── regular-users.seeder.ts
│   ├── 03-products/                     # Product ecosystem
│   │   ├── suppliers.seeder.ts
│   │   ├── products.seeder.ts
│   │   └── product-reviews.seeder.ts
│   ├── 04-courses/                      # Course ecosystem
│   │   ├── courses.seeder.ts
│   │   ├── course-modules.seeder.ts
│   │   ├── lessons.seeder.ts
│   │   ├── assignments.seeder.ts
│   │   └── course-reviews.seeder.ts
│   ├── 05-commerce/                     # Commerce layer
│   │   ├── carts.seeder.ts
│   │   ├── payments.seeder.ts
│   │   ├── orders.seeder.ts
│   │   └── enrollments.seeder.ts
│   ├── 06-search/                       # Search system
│   │   ├── search-index.seeder.ts
│   │   └── search-suggestions.seeder.ts
│   ├── 07-analytics/                    # Optional analytics data
│   │   └── search-queries.seeder.ts
│   ├── environments/                    # Environment-specific data
│   │   ├── development.ts
│   │   ├── staging.ts
│   │   └── production.ts
│   └── factories/                       # Data factories (faker integration)
│       ├── user.factory.ts
│       ├── product.factory.ts
│       ├── course.factory.ts
│       └── index.ts
```

## Seeding Order & Dependencies

### Phase 1: Foundation (Atomic - No Dependencies)
1. **roles.seeder.ts** → UserRole table
2. **permissions.seeder.ts** → UserPermission table
3. **role-permissions.seeder.ts** → UserRolePermission junction

### Phase 2: Users (Depends on Phase 1)
4. **admin-users.seeder.ts** → Admin users with ADMIN role
5. **instructors.seeder.ts** → Users with INSTRUCTOR role + Instructor profiles
6. **regular-users.seeder.ts** → Users with USER/SUPPLIER roles

### Phase 3: Products (Depends on Phase 2 - Suppliers)
7. **suppliers.seeder.ts** → Supplier-specific user data
8. **products.seeder.ts** → Product catalog
9. **product-reviews.seeder.ts** → Product reviews & ratings

### Phase 4: Courses (Depends on Phase 2 - Instructors)
10. **courses.seeder.ts** → Course catalog
11. **course-modules.seeder.ts** → Course structure
12. **lessons.seeder.ts** → Lesson content
13. **assignments.seeder.ts** → Assignment data
14. **course-reviews.seeder.ts** → Course reviews & ratings

### Phase 5: Commerce (Depends on Phase 2, 3, 4)
15. **carts.seeder.ts** → User shopping carts
16. **payments.seeder.ts** → Payment records
17. **orders.seeder.ts** → Product orders
18. **enrollments.seeder.ts** → Course enrollments

### Phase 6: Search System (Depends on Phase 3, 4)
19. **search-index.seeder.ts** → Search indexing for products/courses
20. **search-suggestions.seeder.ts** → Popular search suggestions

### Phase 7: Analytics (Optional - Depends on all phases)
21. **search-queries.seeder.ts** → Historical search data

## Key Benefits of This Structure

### ✅ SOLID Principles
- **S**ingle Responsibility: Each seeder handles one entity type
- **O**pen/Closed: Easy to extend with new seeders
- **L**iskov Substitution: All seeders implement base interface
- **I**nterface Segregation: Focused interfaces per seeder type
- **D**ependency Inversion: Seeders depend on abstractions

### ✅ ATOMIC Principles
- **A**ll-or-Nothing: Each seeder is transactional
- **T**ransaction Isolation: Proper dependency ordering
- **O**perational Consistency: Rollback capabilities
- **M**utual Exclusion: No concurrent seeding conflicts
- **I**dempotent: Can be run multiple times safely
- **C**onsistent State: Database remains valid at all times

### ✅ Additional Benefits
- **Dependency Management**: Clear execution order
- **Environment Separation**: Different data per environment
- **Factory Pattern**: Reusable data generation
- **Rollback Support**: Easy to undo seed operations
- **Parallel Execution**: Independent phases can run concurrently
- **Testing Friendly**: Each seeder can be tested in isolation

## Mixed-Cart Business Logic Implementation

### Real-World Scenario:
```typescript
// User's cart contains both products and courses
const cartMix = {
  products: [
    { id: 1, name: "Ethiopian Coffee Beans", price: 25.00, quantity: 2 }, // $50
    { id: 5, name: "Pour Over Kit", price: 45.00, quantity: 1 }          // $45
  ],
  courses: [
    { id: 2, name: "Coffee Brewing Mastery", price: 99.00 },             // $99
    { id: 8, name: "Latte Art Basics", price: 79.00 }                    // $79
  ]
  // Total: $273.00
};

// Single payment creates BOTH:
// 1. ProductOrder (for physical shipment)
// 2. CourseEnrollment[] (for immediate digital access)
```

### Updated Core Features:

#### ✅ **Mixed Cart Helpers**
- `createMixedCartItems()` - Generates realistic cart combinations
- `calculateCartTotal()` - Handles mixed pricing logic
- `processPaymentWithSplitFulfillment()` - **ATOMIC** payment processing

#### ✅ **Business Logic Configuration**
- `mixedCartRatio` - Control percentage of mixed carts (0.3 = 30% mixed)
- `averageCartSize` - Realistic cart item counts

#### ✅ **Atomic Transaction Handling**
- Single transaction for: Payment + ProductOrder + CourseEnrollment[]
- Rollback support if any part fails
- Maintains referential integrity

### Key Benefits:
- **Realistic Data**: Matches actual e-commerce behavior
- **ATOMIC Operations**: All-or-nothing cart processing  
- **Flexible Configuration**: Control cart mix ratios per environment
- **Production Ready**: Handles complex business logic properly