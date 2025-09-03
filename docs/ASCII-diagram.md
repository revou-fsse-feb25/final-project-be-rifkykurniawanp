## ASCII diagram of the database

[Roles] ──▶ [Users] ──▶ [Instructors] ──▶ [Courses] ──▶ [Modules] ──▶ [Lessons] ──▶ [Assignments] ──▶ [Submissions]
                 │                │
                 │                └────▶ [CourseReviews]
                 │
                 ├────▶ [Products] ──▶ [ProductReviews]
                 │          │
                 │          └────▶ [ProductOrders] ──▶ [OrderItems]
                 │
                 ├────▶ [Carts] ──▶ [CartItems]
                 │
                 └────▶ [Payments] ──▶ [Enrollments] ──▶ [Certificates]
