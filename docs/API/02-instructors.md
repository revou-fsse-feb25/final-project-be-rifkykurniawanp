## 02 - Instructors

| Method | Endpoint                     | Description                    | Roles Allowed               |
|--------|------------------------------|--------------------------------|----------------------------|
| GET    | /api/instructors/:id         | Get instructor profile         | ALL                        |
| PATCH  | /api/instructors/:id         | Update profile                 | INSTRUCTOR, ADMIN          |
| GET    | /api/instructors/:id/courses | List instructor's courses      | ALL                        |

**Notes:** Only instructors or admins can update profile.

---