| Route        | ADMIN        | SUPPLIER     | INSTRUCTOR   | USER |
# RBAC per Route (HTTP Method)

## User Management
| Route        | ADMIN        | SUPPLIER     | INSTRUCTOR   | USER |
|--------------|-------------|--------------|--------------|------|
| GET /users   | ✅ semua     | ❌           | ❌           | ❌   |
| GET /users/:id | ✅ semua   | ✅ self      | ✅ self      | ✅ self |
| POST /users  | ✅           | ✅ register  | ✅ register  | ✅ register |
| PATCH /users/:id | ✅ semua | ✅ self      | ✅ self      | ✅ self |
| DELETE /users/:id | ✅ semua | ❌           | ❌           | ❌   |

---

## Product
| Route                   | ADMIN      | SUPPLIER     | INSTRUCTOR | USER |
|--------------------------|-----------|--------------|------------|------|
| GET /products            | ✅ semua   | ✅ own+list  | ❌         | ✅ list |
| GET /products/:id        | ✅ semua   | ✅ own       | ❌         | ✅ detail |
| POST /products           | ✅         | ✅ create own | ❌         | ❌   |
| PATCH /products/:id      | ✅ semua   | ✅ own       | ❌         | ❌   |
| DELETE /products/:id     | ✅ semua   | ✅ own       | ❌         | ❌   |

---

## Product Review
| Route                      | ADMIN      | SUPPLIER        | INSTRUCTOR | USER |
|-----------------------------|-----------|-----------------|------------|------|
| GET /products/:id/reviews   | ✅ semua   | ✅ own product  | ❌         | ✅ list |
| POST /products/:id/reviews  | ✅         | ❌              | ❌         | ✅ (if purchased) |
| PATCH /reviews/:id          | ✅ semua   | ❌              | ❌         | ✅ self |
| DELETE /reviews/:id         | ✅ semua   | ✅ own product  | ❌         | ✅ self |

---

## Course
| Route               | ADMIN      | SUPPLIER | INSTRUCTOR    | USER |
|----------------------|-----------|----------|---------------|------|
| GET /courses         | ✅ semua   | ❌        | ✅ own+list   | ✅ list |
| GET /courses/:id     | ✅ semua   | ❌        | ✅ own        | ✅ detail |
| POST /courses        | ✅         | ❌        | ✅ create own | ❌   |
| PATCH /courses/:id   | ✅ semua   | ❌        | ✅ own        | ❌   |
| DELETE /courses/:id  | ✅ semua   | ❌        | ✅ own        | ❌   |

---

## Lesson / Module
| Route                        | ADMIN      | SUPPLIER | INSTRUCTOR    | USER |
|-------------------------------|-----------|----------|---------------|------|
| GET /courses/:id/modules      | ✅ semua   | ❌        | ✅ own course | ✅ if enrolled |
| POST /courses/:id/modules     | ✅         | ❌        | ✅ create own | ❌   |
| PATCH /modules/:id            | ✅ semua   | ❌        | ✅ own        | ❌   |
| DELETE /modules/:id           | ✅ semua   | ❌        | ✅ own        | ❌   |

---

## Assignment & Submission
| Route                            | ADMIN      | SUPPLIER | INSTRUCTOR    | USER |
|---------------------------------|-----------|----------|---------------|------|
| GET /lessons/:id/assignments    | ✅ semua   | ❌        | ✅ own        | ✅ if enrolled |
| POST /lessons/:id/assignments   | ✅         | ❌        | ✅ create own | ❌   |
| PATCH /assignments/:id           | ✅ semua   | ❌        | ✅ own        | ❌   |
| DELETE /assignments/:id          | ✅ semua   | ❌        | ✅ own        | ❌   |
| GET /assignments/:id/submissions | ✅ semua   | ❌        | ✅ own course | ✅ self |
| POST /assignments/:id/submit     | ❌         | ❌        | ❌            | ✅ self |
| PATCH /submissions/:id           | ✅ semua   | ❌        | ✅ grade      | ✅ self (edit before due) |

---

## Cart
| Route              | ADMIN      | SUPPLIER | INSTRUCTOR | USER |
|---------------------|-----------|----------|------------|------|
| GET /cart           | ✅ semua   | ❌        | ❌          | ✅ self |
| POST /cart/items    | ❌         | ❌        | ❌          | ✅ self |
| PATCH /cart/items/:id | ❌       | ❌        | ❌          | ✅ self |
| DELETE /cart/items/:id | ❌      | ❌        | ❌          | ✅ self |

---

## Payment & Order
| Route                   | ADMIN      | SUPPLIER         | INSTRUCTOR        | USER |
|--------------------------|-----------|------------------|------------------|------|
| GET /payments            | ✅ semua   | ✅ related       | ✅ related        | ✅ self |
| POST /payments           | ❌         | ❌               | ❌               | ✅ self |
| GET /orders/products     | ✅ semua   | ✅ own products  | ❌               | ✅ self |
| GET /orders/courses      | ✅ semua   | ❌               | ✅ own courses   | ✅ self |
| PATCH /orders/:id/status | ✅ semua   | ✅ own products  | ✅ own courses   | ❌   |

---

## Certificate
| Route                        | ADMIN      | SUPPLIER | INSTRUCTOR        | USER |
|-------------------------------|-----------|----------|------------------|------|
| GET /certificates             | ✅ semua   | ❌        | ✅ own course    | ✅ self |
| POST /certificates/issue      | ✅         | ❌        | ✅ validate/issue | ❌   |
| PATCH /certificates/:id       | ✅ semua   | ❌        | ✅ own course    | ❌   |
| DELETE /certificates/:id      | ✅ semua   | ❌        | ❌              | ❌   |
