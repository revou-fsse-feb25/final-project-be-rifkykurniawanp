## 04 - Courses, Modules, Lessons, Reviews

| Method | Endpoint                              | Description                               | Roles Allowed                       |
|--------|---------------------------------------|------------------------------------------|------------------------------------|
| GET    | /api/courses                           | List all courses                          | ALL                                |
| GET    | /api/courses/:id                       | Course details (modules & lessons)       | ALL                                |
| POST   | /api/courses                           | Create course                             | INSTRUCTOR, ADMIN                  |
| PATCH  | /api/courses/:id                       | Update course                             | INSTRUCTOR (owner), ADMIN          |
| DELETE | /api/courses/:id                       | Delete course                             | INSTRUCTOR (owner), ADMIN          |
| GET    | /api/courses/:id/reviews               | List reviews                              | ALL                                |
| POST   | /api/courses/:id/reviews               | Add review                                | USER, STUDENT                      |
| POST   | /api/courses/:courseId/modules         | Create module                             | INSTRUCTOR (owner), ADMIN          |
| PATCH  | /api/modules/:id                        | Update module                             | INSTRUCTOR (owner), ADMIN          |
| DELETE | /api/modules/:id                        | Delete module                             | INSTRUCTOR (owner), ADMIN          |
| POST   | /api/modules/:moduleId/lessons         | Create lesson                             | INSTRUCTOR (owner), ADMIN          |
| PATCH  | /api/lessons/:id                        | Update lesson                             | INSTRUCTOR (owner), ADMIN          |
| DELETE | /api/lessons/:id                        | Delete lesson                             | INSTRUCTOR (owner), ADMIN          |
| GET    | /api/lessons/:id/progress               | Get lesson progress                       | USER, STUDENT                      |
| POST   | /api/lessons/:id/progress               | Update lesson progress                    | USER, STUDENT                      |

---
