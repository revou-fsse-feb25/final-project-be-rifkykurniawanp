# Database Schema Reference

> This document is a textual reference for the database schema.  
> Primary visual reference: `ERD.png` in the `DATABASE/` folder.  
> Includes types, defaults, enums, soft-delete flags, relations, and ownership notes.

---

## **User**
- **id**: Int (PK, auto-increment)  
- **email**: String (unique)  
- **password**: String  
- **firstName**: String?  
- **lastName**: String?  
- **phone**: String?  
- **address**: String?  
- **role**: RoleName [ADMIN, SUPPLIER, INSTRUCTOR, USER]  
- **isBuyer**: Boolean (default: false)  
- **isStudent**: Boolean (default: false)  
- **createdAt**: DateTime (default: now)  
- **updatedAt**: DateTime (auto-updated)  
- **deletedAt**: DateTime? (soft delete)  
- **Relations**:  
  - AssignmentSubmissions[]  
  - Carts[]  
  - CourseEnrollments[]  
  - LessonProgresses[]  
  - Payments[]  
  - Products[] (as supplier, SUPPLIER role)  
  - ProductOrders[] (as buyer, USER role)  
  - ProductReviews[]  
  - CourseReviews[]  
  - Instructor? (one-to-one, INSTRUCTOR role)  

---

## **Instructor**
- **id**: Int (PK, auto-increment)  
- **userId**: Int (unique, FK → User.id)  
- **bio**: String?  
- **profileImage**: String?  
- **expertise**: String[] (array)  
- **experience**: String?  
- **socialLinks**: Json?  
- **isVerified**: Boolean (default: false)  
- **rating**: Decimal(2,1) (default: 0)  
- **totalStudents**: Int (default: 0)  
- **totalCourses**: Int (default: 0)  
- **createdAt**: DateTime (default: now)  
- **updatedAt**: DateTime (auto-updated)  
- **Relations**:  
  - User (one-to-one, ownership)  
  - Courses[] (one-to-many, owned by instructor)  

---

## **Product**
- **id**: Int (PK)  
- **slug**: String (unique)  
- **name**: String  
- **description**: String?  
- **price**: Decimal(12,2)  
- **stock**: Int (default: 0)  
- **images**: String[] (array)  
- **category**: ProductCategory [COFFEE, TEA, HERBAL, EQUIPMENT]  
- **status**: ProductStatus [ACTIVE, OUT_OF_STOCK, DRAFT, DISCONTINUED]  
- **supplierId**: Int (FK → User.id, SUPPLIER role)  
- **rating**: Decimal(2,1) (default: 0)  
- **reviewCount**: Int (default: 0)  
- **origin**: ProductOrigin [INDONESIA, VIETNAM, BRAZIL, ETHIOPIA, COLOMBIA, GUATEMALA, KENYA, OTHER]  
- **weight**: String?  
- **tags**: ProductTagName[] [enum array]  
- **createdAt**: DateTime (default: now)  
- **updatedAt**: DateTime (auto-updated)  
- **deletedAt**: DateTime?  
- **Relations**:  
  - Supplier → User (ownership)  
  - CartItems[]  
  - ProductOrderItems[]  
  - ProductReviews[]  

---

## **ProductReview**
- **id**: Int (PK)  
- **productId**: Int (FK → Product.id)  
- **userId**: Int (FK → User.id)  
- **rating**: Int (1-5)  
- **comment**: String?  
- **createdAt**: DateTime (default: now)  
- **Unique Constraint**: [productId, userId] → one review per user per product  

---

## **Course**
- **id**: Int (PK)  
- **title**: String  
- **slug**: String (unique)  
- **description**: String?  
- **shortDescription**: String?  
- **syllabus**: String?  
- **price**: Decimal(12,2)  
- **instructorId**: Int (FK → Instructor.id)  
- **rating**: Decimal(2,1) (default: 0)  
- **reviewCount**: Int (default: 0)  
- **students**: Int (default: 0)  
- **level**: CourseLevel [BEGINNER, INTERMEDIATE, ADVANCED, EXPERT]  
- **category**: CourseCategory [COFFEE_BREWING, COFFEE_ROASTING, …]  
- **language**: String (default: "id")  
- **subtitles**: String[] (default: [])  
- **thumbnail**: String?  
- **previewVideo**: String?  
- **whatYouWillLearn**: String[] (default: [])  
- **requirements**: String[] (default: [])  
- **targetAudience**: String[] (default: [])  
- **totalDuration**: Int?  
- **totalLessons**: Int?  
- **certificate**: Boolean (default: false)  
- **status**: CourseStatus [DRAFT, REVIEW, PUBLISHED, ARCHIVED]  
- **isPublished**: Boolean (default: false)  
- **maxStudents**: Int?  
- **createdAt**: DateTime (default: now)  
- **updatedAt**: DateTime (auto-updated)  
- **deletedAt**: DateTime?  
- **Relations**:  
  - Instructor (ownership)  
  - CartItems[]  
  - Enrollments[]  
  - Modules[]  
  - Reviews[]  

---

## **CourseModule**
- **id**: Int (PK)  
- **courseId**: Int (FK → Course.id)  
- **title**: String  
- **description**: String?  
- **orderNumber**: Int  
- **isPublished**: Boolean (default: false)  
- **createdAt**: DateTime (default: now)  
- **updatedAt**: DateTime (auto-updated)  
- **deletedAt**: DateTime?  
- **Relations**:  
  - Course (ownership)  
  - Lessons[]  

---

## **Lesson**
- **id**: Int (PK)  
- **moduleId**: Int (FK → CourseModule.id)  
- **slug**: String (unique)  
- **title**: String  
- **description**: String?  
- **duration**: Int? (minutes)  
- **type**: LessonType [VIDEO, ARTICLE, QUIZ, ASSIGNMENT, LIVE_SESSION]  
- **videoUrl**: String?  
- **content**: String?  
- **quizQuestions**: Json?  
- **passingScore**: Decimal(5,2) (default: 70)  
- **orderNumber**: Int  
- **isPreview**: Boolean (default: false)  
- **isPublished**: Boolean (default: false)  
- **createdAt**: DateTime (default: now)  
- **updatedAt**: DateTime (auto-updated)  
- **deletedAt**: DateTime?  
- **Relations**:  
  - Module (ownership)  
  - Assignments[]  
  - LessonProgress[]  

---

## **Assignment**
- **id**: Int (PK)  
- **lessonId**: Int (FK → Lesson.id)  
- **title**: String  
- **instructions**: String  
- **dueDate**: DateTime?  
- **maxScore**: Decimal(5,2)?  
- **createdAt**: DateTime (default: now)  
- **updatedAt**: DateTime (auto-updated)  
- **deletedAt**: DateTime?  
- **Relations**:  
  - Lesson (ownership)  
  - AssignmentSubmissions[]  

---

## **AssignmentSubmission**
- **id**: Int (PK)  
- **assignmentId**: Int (FK → Assignment.id)  
- **userId**: Int (FK → User.id)  
- **content**: String?  
- **attachments**: String[] (default: [])  
- **grade**: Decimal(5,2)?  
- **feedback**: String?  
- **submittedAt**: DateTime (default: now)  
- **gradedAt**: DateTime?  
- **Relations**:  
  - Assignment  
  - User  

---

## **Cart & CartItem**
- **Cart**: one per user, FK → User.id  
- **CartItem**: polymorphic, either `productId` OR `courseId` (enforced in service)  
- **CartItem fields**: quantity, priceSnapshot, addedAt, deletedAt  
- **Relations**:  
  - Cart → User (ownership)  
  - Product?  
  - Course?  

---

## **Payment**
- **id**: Int (PK)  
- **userId**: Int (FK → User.id)  
- **cartId**: Int (FK → Cart.id)  
- **amount**: Decimal(12,2)  
- **paymentMethod**: String  
- **status**: PaymentStatus [PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED, REFUNDED]  
- **transactionId**: String?  
- **paidAt**: DateTime?  
- **Relations**:  
  - User (ownership)  
  - Cart  
  - ProductOrders[]  
  - CourseEnrollments[]  

---

## **ProductOrder & ProductOrderItem**
- **ProductOrder**: id, buyerId, paymentId, totalPrice, status, createdAt, updatedAt, deletedAt  
- **ProductOrderItem**: id, orderId (FK → ProductOrder), productId (FK → Product), quantity, priceEach  
- **Relations**:  
  - ProductOrder → Buyer (User)  
  - Payment  
  - ProductOrderItems[]  

---

## **CourseEnrollment & Certificate**
- **CourseEnrollment**: id, courseId, studentId, paymentId, pricePaid, progress (0-100), certificateAwarded, enrolledAt, completedAt, lastAccessedAt  
- **Unique Constraint**: [courseId, studentId]  
- **Relations**:  
  - Course  
  - Student (User)  
  - Payment  
  - Certificate?  

- **Certificate**: id, enrollmentId (unique), certificateNumber (unique), finalLessonsCompleted, finalAssignmentsCompleted, eligible, issuedAt, certificateUrl  
- **Relations**: Enrollment (ownership)  

---

## **Enums**
- **RoleName**: ADMIN, SUPPLIER, INSTRUCTOR, USER  
- **ProductCategory**: COFFEE, TEA, HERBAL, EQUIPMENT  
- **ProductOrigin**: INDONESIA, VIETNAM, BRAZIL, ETHIOPIA, COLOMBIA, GUATEMALA, KENYA, OTHER  
- **ProductStatus**: ACTIVE, OUT_OF_STOCK, DRAFT, DISCONTINUED  
- **ProductTagName**: ARABICA, ROBUSTA, GREEN_TEA, BLACK_TEA, WHITE_TEA, HERBAL, EQUIPMENT, ORGANIC, FAIR_TRADE, SINGLE_ORIGIN  
- **CourseCategory**: COFFEE_BREWING, COFFEE_ROASTING, COFFEE_BUSINESS, TEA_BREWING, TEA_CEREMONY, TEA_CULTURE, HERBAL_PREPARATION, HERBAL_MEDICINE, HERBAL_GARDENING, EQUIPMENT_USAGE, BARISTA_SKILLS  
- **CourseLevel**: BEGINNER, INTERMEDIATE, ADVANCED, EXPERT  
- **CourseStatus**: DRAFT, REVIEW, PUBLISHED, ARCHIVED  
- **CartItemType**: PRODUCT, COURSE  
- **LessonType**: VIDEO, ARTICLE, QUIZ, ASSIGNMENT, LIVE_SESSION  
- **PaymentStatus**: PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED, REFUNDED  
- **OrderStatus**: PENDING, PROCESSING, SHIPPED, DELIVERED, COMPLETED, CANCELLED, REFUNDED  

---

## **Notes**
- All `deletedAt` fields indicate **soft-delete support**.  
- Polymorphic relations (CartItem) must be **enforced in service layer**.  
- Ownership and RBAC rules are applied per model/service (see API docs).  
- Default values and enums are **as defined in Prisma schema**.  
