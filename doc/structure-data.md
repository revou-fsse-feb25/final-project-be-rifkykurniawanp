src/
├── main.ts
├── app.module.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── auth.repository.ts
│   ├── interfaces/
│   │   └── auth.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── login.dto.ts
│       │   ├── register.dto.ts
│       │   └── refresh-token.dto.ts
│       └── response/
│           ├── auth-response.dto.ts
│           └── token-response.dto.ts
│
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   ├── users.repository.ts
│   ├── interfaces/
│   │   └── users.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-user.dto.ts
│       │   ├── update-user.dto.ts
│       │   └── change-password.dto.ts
│       └── response/
│           ├── user-response.dto.ts
│           └── paginated-user-response.dto.ts
│
├── roles/
│   ├── roles.module.ts
│   ├── roles.service.ts
│   ├── roles.controller.ts
│   ├── roles.repository.ts
│   ├── interfaces/
│   │   └── roles.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-role.dto.ts
│       │   └── update-role.dto.ts
│       └── response/
│           ├── role-response.dto.ts
│           └── paginated-role-response.dto.ts
│
├── products/
│   ├── products.module.ts
│   ├── products.service.ts
│   ├── products.controller.ts
│   ├── products.repository.ts
│   ├── interfaces/
│   │   └── products.repository.interface.ts
│   ├── dto/
│   │   ├── request/
│   │   │   ├── create-product.dto.ts
│   │   │   ├── update-product.dto.ts
│   │   │   └── filter-product.dto.ts
│   │   └── response/
│   │       ├── product-response.dto.ts
│   │       └── paginated-product-response.dto.ts
│   ├── reviews/
│   │   ├── reviews.module.ts
│   │   ├── reviews.service.ts
│   │   ├── reviews.controller.ts
│   │   ├── reviews.repository.ts
│   │   ├── interfaces/
│   │   │   └── reviews.repository.interface.ts
│   │   └── dto/
│   │       ├── request/
│   │       │   ├── create-review.dto.ts
│   │       │   └── update-review.dto.ts
│   │       └── response/
│   │           ├── review-response.dto.ts
│   │           └── paginated-review-response.dto.ts
│   └── tags/
│       ├── tags.module.ts
│       ├── tags.service.ts
│       ├── tags.controller.ts
│       ├── tags.repository.ts
│       ├── interfaces/
│       │   └── tags.repository.interface.ts
│       └── dto/
│           ├── request/
│           │   ├── create-tag.dto.ts
│           │   └── update-tag.dto.ts
│           └── response/
│               ├── tag-response.dto.ts
│               └── paginated-tag-response.dto.ts
│
├── courses/
│   ├── courses.module.ts
│   ├── courses.service.ts
│   ├── courses.controller.ts
│   ├── courses.repository.ts
│   ├── interfaces/
│   │   └── courses.repository.interface.ts
│   ├── dto/
│   │   ├── request/
│   │   │   ├── create-course.dto.ts
│   │   │   ├── update-course.dto.ts
│   │   │   └── filter-course.dto.ts
│   │   └── response/
│   │       ├── course-response.dto.ts
│   │       └── paginated-course-response.dto.ts
│   ├── details/
│   │   ├── course-details.module.ts
│   │   ├── course-details.service.ts
│   │   ├── course-details.controller.ts
│   │   ├── course-details.repository.ts
│   │   ├── interfaces/
│   │   │   └── course-details.repository.interface.ts
│   │   └── dto/
│   │       ├── request/
│   │       │   ├── create-course-detail.dto.ts
│   │       │   └── update-course-detail.dto.ts
│   │       └── response/
│   │           └── course-detail-response.dto.ts
│   ├── modules/
│   │   ├── course-modules.module.ts
│   │   ├── course-modules.service.ts
│   │   ├── course-modules.controller.ts
│   │   ├── course-modules.repository.ts
│   │   ├── interfaces/
│   │   │   └── course-modules.repository.interface.ts
│   │   └── dto/
│   │       ├── request/
│   │       │   ├── create-course-module.dto.ts
│   │       │   └── update-course-module.dto.ts
│   │       └── response/
│   │           └── course-module-response.dto.ts
│   ├── lessons/
│   │   ├── lessons.module.ts
│   │   ├── lessons.service.ts
│   │   ├── lessons.controller.ts
│   │   ├── lessons.repository.ts
│   │   ├── interfaces/
│   │   │   └── lessons.repository.interface.ts
│   │   └── dto/
│   │       ├── request/
│   │       │   ├── create-lesson.dto.ts
│   │       │   └── update-lesson.dto.ts
│   │       └── response/
│   │           └── lesson-response.dto.ts
│   └── progresses/
│       ├── lesson-progress.module.ts
│       ├── lesson-progress.service.ts
│       ├── lesson-progress.controller.ts
│       ├── lesson-progress.repository.ts
│       ├── interfaces/
│       │   └── lesson-progress.repository.interface.ts
│       └── dto/
│           ├── request/
│           │   ├── update-progress.dto.ts
│           │   └── mark-complete.dto.ts
│           └── response/
│               └── progress-response.dto.ts
│
├── assignments/
│   ├── assignments.module.ts
│   ├── assignments.service.ts
│   ├── assignments.controller.ts
│   ├── assignments.repository.ts
│   ├── interfaces/
│   │   └── assignments.repository.interface.ts
│   ├── dto/
│   │   ├── request/
│   │   │   ├── create-assignment.dto.ts
│   │   │   ├── update-assignment.dto.ts
│   │   │   └── grade-assignment.dto.ts
│   │   └── response/
│   │       └── assignment-response.dto.ts
│   └── submissions/
│       ├── submissions.module.ts
│       ├── submissions.service.ts
│       ├── submissions.controller.ts
│       ├── submissions.repository.ts
│       ├── interfaces/
│       │   └── submissions.repository.interface.ts
│       └── dto/
│           ├── request/
│           │   ├── create-submission.dto.ts
│           │   └── update-submission.dto.ts
│           └── response/
│               └── submission-response.dto.ts
│
├── carts/
│   ├── carts.module.ts
│   ├── carts.service.ts
│   ├── carts.controller.ts
│   ├── carts.repository.ts
│   ├── interfaces/
│   │   └── carts.repository.interface.ts
│   ├── dto/
│   │   ├── request/
│   │   │   ├── add-to-cart.dto.ts
│   │   │   ├── update-cart.dto.ts
│   │   │   └── remove-from-cart.dto.ts
│   │   └── response/
│   │       └── cart-response.dto.ts
│   └── items/
│       ├── cart-items.module.ts
│       ├── cart-items.service.ts
│       ├── cart-items.controller.ts
│       ├── cart-items.repository.ts
│       ├── interfaces/
│       │   └── cart-items.repository.interface.ts
│       └── dto/
│           ├── request/
│           │   ├── create-cart-item.dto.ts
│           │   └── update-cart-item.dto.ts
│           └── response/
│               └── cart-item-response.dto.ts
│
├── payments/
│   ├── payments.module.ts
│   ├── payments.service.ts
│   ├── payments.controller.ts
│   ├── payments.repository.ts
│   ├── interfaces/
│   │   └── payments.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-payment.dto.ts
│       │   ├── update-payment.dto.ts
│       │   └── confirm-payment.dto.ts
│       └── response/
│           └── payment-response.dto.ts
│
├── orders/
│   ├── orders.module.ts
│   ├── orders.service.ts
│   ├── orders.controller.ts
│   ├── orders.repository.ts
│   ├── interfaces/
│   │   └── orders.repository.interface.ts
│   ├── dto/
│   │   ├── request/
│   │   │   ├── create-order.dto.ts
│   │   │   ├── update-order.dto.ts
│   │   │   └── cancel-order.dto.ts
│   │   └── response/
│   │       ├── order-response.dto.ts
│   │       └── paginated-order-response.dto.ts
│   └── items/
│       ├── order-items.module.ts
│       ├── order-items.service.ts
│       ├── order-items.controller.ts
│       ├── order-items.repository.ts
│       ├── interfaces/
│       │   └── order-items.repository.interface.ts
│       └── dto/
│           ├── request/
│           │   ├── create-order-item.dto.ts
│           │   └── update-order-item.dto.ts
│           └── response/
│               └── order-item-response.dto.ts
│
├── enrollments/
│   ├── enrollments.module.ts
│   ├── enrollments.service.ts
│   ├── enrollments.controller.ts
│   ├── enrollments.repository.ts
│   ├── interfaces/
│   │   └── enrollments.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-enrollment.dto.ts
│       │   ├── update-enrollment.dto.ts
│       │   └── complete-enrollment.dto.ts
│       └── response/
│           └── enrollment-response.dto.ts
│
└── certificates/
    ├── certificates.module.ts
    ├── certificates.service.ts
    ├── certificates.controller.ts
    ├── certificates.repository.ts
    ├── interfaces/
    │   └── certificates.repository.interface.ts
    └── dto/
        ├── request/
        │   ├── complete-enrollment.dto.ts
        │   ├── issue-certificate.dto.ts
        │   └── update-certificate.dto.ts
        └── response/
            └── certificate-response.dto.ts
