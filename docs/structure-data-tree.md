src/
├── user/
│   ├── user.module.ts
│   ├── user.service.ts
│   ├── user.controller.ts
│   ├── user.repository.ts
│   └── interfaces/
│       └── user-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-user.dto.ts
│       │   └── update-user.dto.ts
│       └── response/
│           ├── user.dto.ts
│           └── user-profile.dto.ts
│
├── instructor/
│   ├── instructor.module.ts
│   ├── instructor.service.ts
│   ├── instructor.controller.ts
│   ├── instructor.repository.ts
│   └── interfaces/
│       └── instructor-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   └── update-instructor.dto.ts
│       └── response/
│           └── instructor-profile.dto.ts
│
├── product/
│   ├── product.module.ts
│   ├── product.service.ts
│   ├── product.controller.ts
│   ├── product.repository.ts
│   └── interfaces/
│       └── product-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-product.dto.ts
│       │   └── update-product.dto.ts
│       └── response/
│           ├── product.dto.ts
│           └── product-list.dto.ts
│
├── product-review/
│   ├── product-review.module.ts
│   ├── product-review.service.ts
│   ├── product-review.controller.ts
│   ├── product-review.repository.ts
│   └── interfaces/
│       └── product-review-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   └── create-review.dto.ts
│       └── response/
│           └── review.dto.ts
│
├── course/
│   ├── course.module.ts
│   ├── course.service.ts
│   ├── course.controller.ts
│   ├── course.repository.ts
│   └── interfaces/
│       └── course-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-course.dto.ts
│       │   └── update-course.dto.ts
│       └── response/
│           ├── course.dto.ts
│           └── course-list.dto.ts
│
├── course-module/
│   ├── course-module.module.ts
│   ├── course-module.service.ts
│   ├── course-module.controller.ts
│   ├── course-module.repository.ts
│   └── interfaces/
│       └── course-module-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   └── create-module.dto.ts
│       └── response/
│           └── module.dto.ts
│
├── lesson/
│   ├── lesson.module.ts
│   ├── lesson.service.ts
│   ├── lesson.controller.ts
│   ├── lesson.repository.ts
│   └── interfaces/
│       └── lesson-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   └── create-lesson.dto.ts
│       └── response/
│           └── lesson.dto.ts
│
├── lesson-progress/
│   ├── lesson-progress.module.ts
│   ├── lesson-progress.service.ts
│   ├── lesson-progress.controller.ts
│   ├── lesson-progress.repository.ts
│   └── interfaces/
│       └── lesson-progress-repository.interface.ts
│   └── dto/
│       └── response/
│           └── lesson-progress.dto.ts
│
├── assignment/
│   ├── assignment.module.ts
│   ├── assignment.service.ts
│   ├── assignment.controller.ts
│   ├── assignment.repository.ts
│   └── interfaces/
│       └── assignment-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   ├── create-assignment.dto.ts
│       │   └── submit-assignment.dto.ts
│       └── response/
│           └── assignment.dto.ts
│
├── cart/
│   ├── cart.module.ts
│   ├── cart.service.ts
│   ├── cart.controller.ts
│   ├── cart.repository.ts
│   └── interfaces/
│       └── cart-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   └── add-to-cart.dto.ts
│       └── response/
│           └── cart.dto.ts
│
├── payment/
│   ├── payment.module.ts
│   ├── payment.service.ts
│   ├── payment.controller.ts
│   ├── payment.repository.ts
│   └── interfaces/
│       └── payment-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   └── create-payment.dto.ts
│       └── response/
│           └── payment.dto.ts
│
├── product-order/
│   ├── product-order.module.ts
│   ├── product-order.service.ts
│   ├── product-order.controller.ts
│   ├── product-order.repository.ts
│   └── interfaces/
│       └── product-order-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   └── create-order.dto.ts
│       └── response/
│           └── order.dto.ts
│
├── course-enrollment/
│   ├── course-enrollment.module.ts
│   ├── course-enrollment.service.ts
│   ├── course-enrollment.controller.ts
│   ├── course-enrollment.repository.ts
│   └── interfaces/
│       └── course-enrollment-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   └── enroll-course.dto.ts
│       └── response/
│           └── enrollment.dto.ts
│
├── certificate/
│   ├── certificate.module.ts
│   ├── certificate.service.ts
│   ├── certificate.controller.ts
│   ├── certificate.repository.ts
│   └── interfaces/
│       └── certificate-repository.interface.ts
│   └── dto/
│       └── response/
│           └── certificate.dto.ts
│
├── search/
│   ├── search.module.ts
│   ├── search.service.ts
│   ├── search.controller.ts
│   ├── search.repository.ts
│   └── interfaces/
│       └── search-repository.interface.ts
│   └── dto/
│       ├── request/
│       │   └── unified-search.dto.ts
│       └── response/
│           └── search-results.dto.ts
