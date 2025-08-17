# API Routes Documentation
**Coffee & Tea Learning Platform**

---

## Table of Contents
- [Authentication & Users](#authentication--users)
- [Users Management](#users-management) 
- [Products Management](#products-management)
- [Product Reviews](#product-reviews)
- [Courses Management](#courses-management)
- [Course Modules & Lessons](#course-modules--lessons)
- [Assignments](#assignments)
- [Cart Management](#cart-management)
- [Payments](#payments)
- [Orders Management](#orders-management)
- [Course Enrollments](#course-enrollments)
- [Certificates](#certificates)
- [Dashboard & Analytics](#dashboard--analytics)
- [File Upload](#file-upload)

---

## Authentication & Users

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| POST | `/api/auth/register` | Register new user | No | - |
| POST | `/api/auth/login` | User login | No | - |
| POST | `/api/auth/logout` | User logout | Yes | All |
| POST | `/api/auth/refresh` | Refresh access token | Yes | All |
| GET | `/api/auth/me` | Get current user profile | Yes | All |
| PUT | `/api/auth/me` | Update current user profile | Yes | All |
| PUT | `/api/auth/password` | Change password | Yes | All |

---

## Users Management

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/users` | Get all users with pagination | Yes | ADMIN |
| GET | `/api/users/{id}` | Get user by ID | Yes | ADMIN, Own User |
| POST | `/api/users` | Create new user | Yes | ADMIN |
| PUT | `/api/users/{id}` | Update user | Yes | ADMIN, Own User |
| DELETE | `/api/users/{id}` | Delete user | Yes | ADMIN |
| GET | `/api/users/{id}/orders` | Get user's product orders | Yes | ADMIN, Own User |
| GET | `/api/users/{id}/enrollments` | Get user's course enrollments | Yes | ADMIN, Own User |
| GET | `/api/users/{id}/certificates` | Get user's certificates | Yes | ADMIN, Own User |

---

## Products Management

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/products` | Get all products with filters | No | - |
| GET | `/api/products/{id}` | Get product by ID | No | - |
| GET | `/api/products/slug/{slug}` | Get product by slug | No | - |
| POST | `/api/products` | Create new product | Yes | ADMIN, SUPPLIER |
| PUT | `/api/products/{id}` | Update product | Yes | ADMIN, Own SUPPLIER |
| DELETE | `/api/products/{id}` | Delete product | Yes | ADMIN, Own SUPPLIER |
| GET | `/api/products/search` | Search products | No | - |
| GET | `/api/products/category/{category}` | Get products by category | No | - |
| GET | `/api/products/supplier/{supplierId}` | Get products by supplier | No | - |
| GET | `/api/products/origin/{origin}` | Get products by origin | No | - |

### Product Query Parameters
- `page` (number) - Page number for pagination
- `limit` (number) - Number of items per page  
- `category` (enum) - Filter by category: `COFFEE`, `TEA`, `HERBAL`, `EQUIPMENT`
- `origin` (enum) - Filter by origin: `INDONESIA`, `VIETNAM`, `BRAZIL`, `ETHIOPIA`, `OTHER`
- `status` (enum) - Filter by status: `ACTIVE`, `OUT_OF_STOCK`, `DRAFT`
- `supplierId` (number) - Filter by supplier ID
- `minPrice` (number) - Minimum price filter
- `maxPrice` (number) - Maximum price filter
- `tags` (array) - Filter by tags: `ARABICA`, `ROBUSTA`, `GREEN_TEA`, `HERBAL`, `EQUIPMENT`
- `search` (string) - Search by name or description

---

## Product Reviews

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/products/{productId}/reviews` | Get product reviews | No | - |
| POST | `/api/products/{productId}/reviews` | Add product review | Yes | USER (Buyer) |
| GET | `/api/products/{productId}/reviews/average` | Get average rating | No | - |
| GET | `/api/reviews/{id}` | Get review by ID | No | - |
| PUT | `/api/reviews/{id}` | Update review | Yes | ADMIN, Own USER |
| DELETE | `/api/reviews/{id}` | Delete review | Yes | ADMIN, Own USER |
| GET | `/api/users/{userId}/reviews` | Get user's reviews | Yes | ADMIN, Own USER |

---

## Courses Management

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/courses` | Get all courses with filters | No | - |
| GET | `/api/courses/{id}` | Get course by ID | No | - |
| GET | `/api/courses/slug/{slug}` | Get course by slug | No | - |
| POST | `/api/courses` | Create new course | Yes | ADMIN, INSTRUCTOR |
| PUT | `/api/courses/{id}` | Update course | Yes | ADMIN, Own INSTRUCTOR |
| DELETE | `/api/courses/{id}` | Delete course | Yes | ADMIN, Own INSTRUCTOR |
| GET | `/api/courses/search` | Search courses | No | - |
| GET | `/api/courses/category/{category}` | Get courses by category | No | - |
| GET | `/api/courses/instructor/{instructorId}` | Get courses by instructor | No | - |
| GET | `/api/courses/level/{level}` | Get courses by level | No | - |

### Course Query Parameters
- `page` (number) - Page number for pagination
- `limit` (number) - Number of items per page
- `category` (enum) - Filter by category: `COFFEE_BREWING`, `TEA_TASTING`, `HERBAL_HEALTH`
- `level` (enum) - Filter by level: `BEGINNER`, `INTERMEDIATE`, `ADVANCED`
- `instructorId` (number) - Filter by instructor ID
- `minPrice` (number) - Minimum price filter
- `maxPrice` (number) - Maximum price filter
- `certificate` (boolean) - Filter courses with certificates
- `search` (string) - Search by title or description

---

## Course Modules & Lessons

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/courses/{courseId}/modules` | Get course modules | Yes | Enrolled USER, INSTRUCTOR, ADMIN |
| GET | `/api/modules/{id}` | Get module by ID | Yes | Enrolled USER, INSTRUCTOR, ADMIN |
| POST | `/api/courses/{courseId}/modules` | Create new module | Yes | ADMIN, Own INSTRUCTOR |
| PUT | `/api/modules/{id}` | Update module | Yes | ADMIN, Own INSTRUCTOR |
| DELETE | `/api/modules/{id}` | Delete module | Yes | ADMIN, Own INSTRUCTOR |
| GET | `/api/modules/{moduleId}/lessons` | Get module lessons | Yes | Enrolled USER, INSTRUCTOR, ADMIN |
| GET | `/api/lessons/{id}` | Get lesson by ID | Yes | Enrolled USER, INSTRUCTOR, ADMIN |
| GET | `/api/lessons/slug/{slug}` | Get lesson by slug | Yes | Enrolled USER, INSTRUCTOR, ADMIN |
| POST | `/api/modules/{moduleId}/lessons` | Create new lesson | Yes | ADMIN, Own INSTRUCTOR |
| PUT | `/api/lessons/{id}` | Update lesson | Yes | ADMIN, Own INSTRUCTOR |
| DELETE | `/api/lessons/{id}` | Delete lesson | Yes | ADMIN, Own INSTRUCTOR |

### Lesson Progress

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/lessons/{lessonId}/progress` | Get lesson progress | Yes | ADMIN, Own USER |
| POST | `/api/lessons/{lessonId}/complete` | Mark lesson as completed | Yes | USER (Student) |
| GET | `/api/users/{userId}/progress` | Get user's learning progress | Yes | ADMIN, Own USER |
| GET | `/api/courses/{courseId}/progress` | Get course progress | Yes | ADMIN, Enrolled USER |

---

## Assignments

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/lessons/{lessonId}/assignments` | Get lesson assignments | Yes | Enrolled USER, INSTRUCTOR, ADMIN |
| GET | `/api/assignments/{id}` | Get assignment by ID | Yes | Enrolled USER, INSTRUCTOR, ADMIN |
| POST | `/api/lessons/{lessonId}/assignments` | Create new assignment | Yes | ADMIN, Own INSTRUCTOR |
| PUT | `/api/assignments/{id}` | Update assignment | Yes | ADMIN, Own INSTRUCTOR |
| DELETE | `/api/assignments/{id}` | Delete assignment | Yes | ADMIN, Own INSTRUCTOR |
| GET | `/api/assignments/{id}/submissions` | Get assignment submissions | Yes | ADMIN, Own INSTRUCTOR |
| POST | `/api/assignments/{id}/submit` | Submit assignment | Yes | USER (Student) |
| GET | `/api/submissions/{id}` | Get submission by ID | Yes | ADMIN, INSTRUCTOR, Own USER |
| PUT | `/api/submissions/{id}` | Update submission | Yes | ADMIN, Own USER |
| DELETE | `/api/submissions/{id}` | Delete submission | Yes | ADMIN, Own USER |
| PUT | `/api/submissions/{id}/grade` | Grade submission | Yes | ADMIN, Own INSTRUCTOR |

---

## Cart Management

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/carts` | Get user's cart | Yes | All |
| POST | `/api/carts` | Create new cart | Yes | All |
| DELETE | `/api/carts/{id}` | Clear cart | Yes | Own USER, ADMIN |
| GET | `/api/carts/{cartId}/items` | Get cart items | Yes | Own USER, ADMIN |
| POST | `/api/carts/{cartId}/items` | Add item to cart | Yes | Own USER |
| PUT | `/api/carts/{cartId}/items/{itemId}` | Update cart item | Yes | Own USER |
| DELETE | `/api/carts/{cartId}/items/{itemId}` | Remove item from cart | Yes | Own USER |
| POST | `/api/carts/{cartId}/checkout` | Proceed to checkout | Yes | Own USER |

---

## Payments

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/payments` | Get all payments | Yes | ADMIN |
| GET | `/api/payments/{id}` | Get payment by ID | Yes | ADMIN, Own USER |
| POST | `/api/payments` | Create payment record | Yes | USER |
| PUT | `/api/payments/{id}` | Update payment status | Yes | ADMIN |
| GET | `/api/users/{userId}/payments` | Get user payments | Yes | ADMIN, Own USER |
| POST | `/api/payments/{id}/verify` | Verify payment | Yes | ADMIN |
| POST | `/api/payments/webhook` | Payment gateway webhook | No | System |
| POST | `/api/payments/{id}/cancel` | Cancel payment | Yes | ADMIN, Own USER |

---

## Orders Management

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/orders` | Get all orders | Yes | ADMIN |
| GET | `/api/orders/{id}` | Get order by ID | Yes | ADMIN, Own USER |
| POST | `/api/orders` | Create new order | Yes | USER (Buyer) |
| PUT | `/api/orders/{id}` | Update order status | Yes | ADMIN, SUPPLIER |
| DELETE | `/api/orders/{id}` | Cancel order | Yes | ADMIN, Own USER |
| GET | `/api/orders/{id}/items` | Get order items | Yes | ADMIN, Own USER |
| GET | `/api/orders/user/{userId}` | Get orders by user | Yes | ADMIN, Own USER |
| GET | `/api/orders/supplier/{supplierId}` | Get orders by supplier | Yes | ADMIN, Own SUPPLIER |
| GET | `/api/orders/status/{status}` | Get orders by status | Yes | ADMIN |

---

## Course Enrollments

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/enrollments` | Get all enrollments | Yes | ADMIN |
| GET | `/api/enrollments/{id}` | Get enrollment by ID | Yes | ADMIN, Own USER |
| POST | `/api/courses/{courseId}/enroll` | Enroll in course | Yes | USER (Student) |
| DELETE | `/api/enrollments/{id}` | Unenroll from course | Yes | ADMIN, Own USER |
| GET | `/api/courses/{courseId}/enrollments` | Get course enrollments | Yes | ADMIN, Own INSTRUCTOR |
| GET | `/api/users/{userId}/enrollments` | Get user enrollments | Yes | ADMIN, Own USER |
| PUT | `/api/enrollments/{id}/progress` | Update course progress | Yes | System |
| GET | `/api/enrollments/{id}/certificate` | Get enrollment certificate | Yes | ADMIN, Own USER |

---

## Certificates

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/certificates` | Get all certificates | Yes | ADMIN |
| GET | `/api/certificates/{id}` | Get certificate by ID | Yes | ADMIN, Own USER |
| POST | `/api/certificates/generate` | Generate certificate | Yes | System |
| GET | `/api/users/{userId}/certificates` | Get user certificates | Yes | ADMIN, Own USER |
| GET | `/api/courses/{courseId}/certificates` | Get course certificates | Yes | ADMIN, Own INSTRUCTOR |
| GET | `/api/certificates/{id}/download` | Download certificate PDF | Yes | ADMIN, Own USER |
| PUT | `/api/certificates/{id}/verify` | Verify certificate eligibility | Yes | System |

---

## Dashboard & Analytics

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| GET | `/api/dashboard/admin` | Admin dashboard data | Yes | ADMIN |
| GET | `/api/dashboard/instructor` | Instructor dashboard data | Yes | INSTRUCTOR |
| GET | `/api/dashboard/supplier` | Supplier dashboard data | Yes | SUPPLIER |
| GET | `/api/dashboard/user` | User dashboard data | Yes | USER |
| GET | `/api/analytics/sales` | Sales analytics | Yes | ADMIN, SUPPLIER |
| GET | `/api/analytics/courses` | Course analytics | Yes | ADMIN, INSTRUCTOR |
| GET | `/api/analytics/users` | User analytics | Yes | ADMIN |
| GET | `/api/analytics/products` | Product analytics | Yes | ADMIN, SUPPLIER |
| GET | `/api/analytics/enrollments` | Enrollment analytics | Yes | ADMIN, INSTRUCTOR |

---

## File Upload

| Method | Route | Description | Auth Required | Roles |
|--------|-------|-------------|---------------|-------|
| POST | `/api/upload/image` | Upload image file | Yes | All |
| POST | `/api/upload/video` | Upload video file | Yes | INSTRUCTOR, ADMIN |
| POST | `/api/upload/document` | Upload document | Yes | All |
| DELETE | `/api/upload/{filename}` | Delete uploaded file | Yes | ADMIN, Owner |
| GET | `/api/upload/{filename}` | Get uploaded file URL | Yes | All |

---

## Route Parameters Legend

- `{id}` - Entity ID (integer)
- `{slug}` - URL-friendly string identifier
- `{userId}` - User ID
- `{courseId}` - Course ID  
- `{productId}` - Product ID
- `{orderId}` - Order ID
- `{lessonId}` - Lesson ID
- `{assignmentId}` - Assignment ID
- `{cartId}` - Cart ID
- `{paymentId}` - Payment ID

---

## Auth Roles Explanation

- **ADMIN** - Full system access, can manage all resources
- **SUPPLIER** - Can manage own products, view related orders and analytics
- **INSTRUCTOR** - Can manage own courses, lessons, assignments, view enrollments
- **USER** - Basic user with buyer/student capabilities
- **Own USER/INSTRUCTOR/SUPPLIER** - Can only access their own resources
- **Enrolled USER** - Can only access courses they are enrolled in
- **System** - Internal system operations (automated processes)

---

## HTTP Status Codes

- **200** - OK (Success)
- **201** - Created (Resource created successfully)
- **204** - No Content (Success with no response body)
- **400** - Bad Request (Invalid request data)
- **401** - Unauthorized (Authentication required)
- **403** - Forbidden (Insufficient permissions)
- **404** - Not Found (Resource not found)
- **409** - Conflict (Resource already exists)
- **422** - Unprocessable Entity (Validation errors)
- **500** - Internal Server Error (Server error)

---

## Data Models Reference

### Enums
```typescript
RoleName: 'ADMIN' | 'SUPPLIER' | 'INSTRUCTOR' | 'USER'
ProductCategory: 'COFFEE' | 'TEA' | 'HERBAL' | 'EQUIPMENT'  
ProductOrigin: 'INDONESIA' | 'VIETNAM' | 'BRAZIL' | 'ETHIOPIA' | 'OTHER'
ProductStatus: 'ACTIVE' | 'OUT_OF_STOCK' | 'DRAFT'
ProductTagName: 'ARABICA' | 'ROBUSTA' | 'GREEN_TEA' | 'HERBAL' | 'EQUIPMENT'
CourseCategory: 'COFFEE_BREWING' | 'TEA_TASTING' | 'HERBAL_HEALTH'
CourseLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
CartItemType: 'PRODUCT' | 'COURSE'
LessonType: 'VIDEO' | 'ARTICLE' | 'QUIZ' | 'ASSIGNMENT'
PayableType: 'PRODUCT' | 'COURSE'
PaymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
OrderStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
```

---

*Last Updated: August 17, 2025*