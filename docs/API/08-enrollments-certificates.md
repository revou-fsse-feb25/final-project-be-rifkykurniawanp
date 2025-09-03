## 08 - Course Enrollments & Certificates

| Method | Endpoint                            | Description                   | Roles Allowed                   |
|--------|-------------------------------------|-------------------------------|--------------------------------|
| POST   | /api/courses/:id/enroll             | Enroll in course             | USER                           |
| GET    | /api/courses/:id/enrollments        | Get enrollment details        | USER, INSTRUCTOR, ADMIN       |
| GET    | /api/certificates/:enrollmentId     | Get certificate              | USER, ADMIN                    |

---