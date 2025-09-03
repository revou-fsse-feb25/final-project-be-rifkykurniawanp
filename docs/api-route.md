# API Routes & RBAC Documentation

| Module / Endpoint                        | Method | Description                                      | Roles Allowed                     |
|-----------------------------------------|--------|-------------------------------------------------|----------------------------------|
| **User**                                 |        |                                                 |                                  |
| /api/users                               | POST   | Create new user                                  | ADMIN                            |
| /api/users/:id                            | GET    | Get user profile                                 | ADMIN, USER                       |
| /api/users/:id                            | PATCH  | Update user profile                              | ADMIN, USER                       |
| /api/users/:id                            | DELETE | Delete user                                      | ADMIN                             |
| /api/auth/login                           | POST   | User login                                       | ALL                               |
| /api/auth/register                        | POST   | User registration                                | ALL                               |
| **Instructor**                            |        |                                                 |                                  |
| /api/instructors/:id                      | GET    | Get instructor profile                            | ALL                               |
| /api/instructors/:id                      | PATCH  | Update instructor profile                         | INSTRUCTOR, ADMIN                 |
| /api/instructors/:id/courses              | GET    | Get courses by instructor                         | ALL                               |
| **Product**                               |        |                                                 |                                  |
| /api/products                             | GET    | Get all products (with filters)                  | ALL                               |
| /api/products/:id                         | GET    | Get product details                               | ALL                               |
| /api/products                             | POST   | Create new product                                | SUPPLIER, ADMIN                   |
| /api/products/:id                         | PATCH  | Update product                                   | SUPPLIER (owner), ADMIN           |
| /api/products/:id                         | DELETE | Delete product                                   | SUPPLIER (owner), ADMIN           |
| /api/products/:id/reviews                 | GET    | Get product reviews                               | ALL                               |
| /api/products/:id/reviews                 | POST   | Add product review                                | USER                              |
| **Course**                                |        |                                                 |                                  |
| /api/courses                              | GET    | Get all courses (with filters)                    | ALL                               |
| /api/courses/:id                          | GET    | Get course details (modules+lessons)             | ALL                               |
| /api/courses                              | POST   | Create new course                                  | INSTRUCTOR, ADMIN                 |
| /api/courses/:id                          | PATCH  | Update course                                     | INSTRUCTOR (owner), ADMIN         |
| /api/courses/:id                          | DELETE | Delete course                                     | INSTRUCTOR (owner), ADMIN         |
| /api/courses/:id/reviews                  | GET    | Get course reviews                                | ALL                               |
| /api/courses/:id/reviews                  | POST   | Add course review                                 | USER, STUDENT                     |
| **Course Module & Lesson**                |        |                                                 |                                  |
| /api/courses/:courseId/modules            | POST   | Create module                                     | INSTRUCTOR (owner), ADMIN         |
| /api/modules/:id                           | PATCH  | Update module                                     | INSTRUCTOR (owner), ADMIN         |
| /api/modules/:id                           | DELETE | Delete module                                     | INSTRUCTOR (owner), ADMIN         |
| /api/modules/:moduleId/lessons            | POST   | Create lesson                                     | INSTRUCTOR (owner), ADMIN         |
| /api/lessons/:id                           | PATCH  | Update lesson                                     | INSTRUCTOR (owner), ADMIN         |
| /api/lessons/:id                           | DELETE | Delete lesson                                     | INSTRUCTOR (owner), ADMIN         |
| /api/lessons/:id/progress                  | GET    | Get lesson progress for user                       | USER, STUDENT                     |
| /api/lessons/:id/progress                  | POST   | Update lesson progress                             | USER, STUDENT                     |
| **Assignment**                             |        |                                                 |                                  |
| /api/lessons/:lessonId/assignments        | POST   | Create assignment                                  | INSTRUCTOR (owner), ADMIN         |
| /api/assignments/:id                       | PATCH  | Update assignment                                  | INSTRUCTOR (owner), ADMIN         |
| /api/assignments/:id                       | DELETE | Delete assignment                                  | INSTRUCTOR (owner), ADMIN         |
| /api/assignments/:id/submissions          | POST   | Submit assignment                                  | USER, STUDENT                     |
| /api/assignments/:id/submissions          | GET    | Get submissions                                   | INSTRUCTOR (owner), ADMIN         |
| **Cart & Payment**                          |        |                                                 |                                  |
| /api/cart                                  | GET    | Get current user’s cart                            | USER                              |
| /api/cart/items                             | POST   | Add item to cart                                   | USER                              |
| /api/cart/items/:id                         | PATCH  | Update quantity or item                             | USER                              |
| /api/cart/items/:id                         | DELETE | Remove item                                        | USER                              |
| /api/payments                               | POST   | Create payment                                    | USER                              |
| /api/payments/:id                           | GET    | Get payment details                                | USER, ADMIN                        |
| /api/payments/:id                           | PATCH  | Update payment status                               | ADMIN                              |
| **Product Order**                           |        |                                                 |                                  |
| /api/orders                                 | GET    | Get all product orders (buyer)                     | USER (buyer), ADMIN               |
| /api/orders/:id                             | GET    | Get order details                                  | USER (buyer), ADMIN               |
| /api/orders                                 | POST   | Create new order                                   | USER                              |
| /api/orders/:id                             | PATCH  | Update order status                                | ADMIN                              |
| **Course Enrollment & Certificate**        |        |                                                 |                                  |
| /api/courses/:id/enroll                     | POST   | Enroll in course                                   | USER                              |
| /api/courses/:id/enrollments               | GET    | Get enrollment details                              | USER, INSTRUCTOR, ADMIN           |
| /api/certificates/:enrollmentId            | GET    | Get certificate details                             | USER, ADMIN                        |
| **Search**                                  |        |                                                 |                                  |
| /api/search                                 | GET    | Unified search across products, courses, instructors | ALL                               |
