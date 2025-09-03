## 05 - Assignments & Submissions


| Method | Endpoint                                  | Description                     | Roles Allowed                   |
|--------|-------------------------------------------|---------------------------------|--------------------------------|
| POST   | /api/lessons/:lessonId/assignments        | Create assignment               | INSTRUCTOR (owner), ADMIN      |
| PATCH  | /api/assignments/:id                       | Update assignment               | INSTRUCTOR (owner), ADMIN      |
| DELETE | /api/assignments/:id                       | Delete assignment               | INSTRUCTOR (owner), ADMIN      |
| POST   | /api/assignments/:id/submissions          | Submit assignment               | USER, STUDENT                  |
| GET    | /api/assignments/:id/submissions          | View submissions                | INSTRUCTOR (owner), ADMIN      |

---