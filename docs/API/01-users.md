## 01 - Users & Auth

| Method | Endpoint       | Description             | Roles Allowed       |
|--------|---------------|------------------------|-------------------|
| POST   | /api/users     | Create new user         | ADMIN             |
| GET    | /api/users/:id | Get user profile        | ADMIN, USER       |
| PATCH  | /api/users/:id | Update user profile     | ADMIN, USER       |
| DELETE | /api/users/:id | Delete user             | ADMIN             |
| POST   | /api/auth/login| Login                   | ALL               |
| POST   | /api/auth/register | Register            | ALL               |

**Examples:**  
- Request: `{ "email": "", "password": "" }`  
- Response: `{ "id": 1, "email": "", "role": "USER" }`

---
