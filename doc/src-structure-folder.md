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
│   └── dto/
│       ├── request/
│       │   ├── login.dto.ts
│       │   └── register.dto.ts
│       └── response/
│           └── auth.response.dto.ts
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
│       │   └── update-user.dto.ts
│       └── response/
│           └── user.response.dto.ts
│
├── products/
│   ├── products.module.ts
│   ├── products.service.ts
│   ├── products.controller.ts
│   ├── products.repository.ts
│   ├── interfaces/
│   │   └── products.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-product.dto.ts
│       │   └── update-product.dto.ts
│       └── response/
│           └── product.response.dto.ts
│
├── product-reviews/
│   ├── product-reviews.module.ts
│   ├── product-reviews.service.ts
│   ├── product-reviews.controller.ts
│   ├── product-reviews.repository.ts
│   ├── interfaces/
│   │   └── product-reviews.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-review.dto.ts
│       │   └── update-review.dto.ts
│       └── response/
│           └── review.response.dto.ts
│
├── courses/
│   ├── courses.module.ts
│   ├── courses.service.ts
│   ├── courses.controller.ts
│   ├── courses.repository.ts
│   ├── interfaces/
│   │   └── courses.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-course.dto.ts
│       │   └── update-course.dto.ts
│       └── response/
│           └── course.response.dto.ts
│
├── course-modules/
│   ├── course-modules.module.ts
│   ├── course-modules.service.ts
│   ├── course-modules.controller.ts
│   ├── course-modules.repository.ts
│   ├── interfaces/
│   │   └── course-modules.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-module.dto.ts
│       │   └── update-module.dto.ts
│       └── response/
│           └── module.response.dto.ts
│
├── lessons/
│   ├── lessons.module.ts
│   ├── lessons.service.ts
│   ├── lessons.controller.ts
│   ├── lessons.repository.ts
│   ├── interfaces/
│   │   └── lessons.repository.interface.ts
│       └── dto/
│           ├── request/
│           │   ├── create-lesson.dto.ts
│           │   └── update-lesson.dto.ts
│           └── response/
│               └── lesson.response.dto.ts
│
├── lesson-progresses/
│   ├── lesson-progresses.module.ts
│   ├── lesson-progresses.service.ts
│   ├── lesson-progresses.controller.ts
│   ├── lesson-progresses.repository.ts
│   ├── interfaces/
│   │   └── lesson-progresses.repository.interface.ts
│   └── dto/
│       └── response/
│           └── lesson-progress.response.dto.ts
│
├── assignments/
│   ├── assignments.module.ts
│   ├── assignments.service.ts
│   ├── assignments.controller.ts
│   ├── assignments.repository.ts
│   ├── interfaces/
│   │   └── assignments.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-assignment.dto.ts
│       │   └── update-assignment.dto.ts
│       └── response/
│           └── assignment.response.dto.ts
│
├── assignment-submissions/
│   ├── assignment-submissions.module.ts
│   ├── assignment-submissions.service.ts
│   ├── assignment-submissions.controller.ts
│   ├── assignment-submissions.repository.ts
│   ├── interfaces/
│   │   └── assignment-submissions.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── submit-assignment.dto.ts
│       │   └── update-submission.dto.ts
│       └── response/
│           └── submission.response.dto.ts
│
├── carts/
│   ├── carts.module.ts
│   ├── carts.service.ts
│   ├── carts.controller.ts
│   ├── carts.repository.ts
│   ├── interfaces/
│   │   └── carts.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── add-to-cart.dto.ts
│       │   └── update-cart.dto.ts
│       └── response/
│           └── cart.response.dto.ts
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
│       │   └── update-payment.dto.ts
│       └── response/
│           └── payment.response.dto.ts
│
├── product-orders/
│   ├── product-orders.module.ts
│   ├── product-orders.service.ts
│   ├── product-orders.controller.ts
│   ├── product-orders.repository.ts
│   ├── interfaces/
│   │   └── product-orders.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-order.dto.ts
│       │   └── update-order.dto.ts
│       └── response/
│           └── order.response.dto.ts
│
├── product-order-items/
│   ├── product-order-items.module.ts
│   ├── product-order-items.service.ts
│   ├── product-order-items.controller.ts
│   ├── product-order-items.repository.ts
│   ├── interfaces/
│   │   └── product-order-items.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-order-item.dto.ts
│       │   └── update-order-item.dto.ts
│       └── response/
│           └── order-item.response.dto.ts
│
├── course-enrollments/
│   ├── course-enrollments.module.ts
│   ├── course-enrollments.service.ts
│   ├── course-enrollments.controller.ts
│   ├── course-enrollments.repository.ts
│   ├── interfaces/
│   │   └── course-enrollments.repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── enroll-course.dto.ts
│       │   └── update-enrollment.dto.ts
│       └── response/
│           └── enrollment.response.dto.ts
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
        │   └── issue-certificate.dto.ts
        └── response/
            └── certificate.response.dto.ts
