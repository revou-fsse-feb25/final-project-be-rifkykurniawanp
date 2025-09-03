## 03 - Products & Product Reviews

| Method | Endpoint                        | Description                        | Roles Allowed                   |
|--------|---------------------------------|-----------------------------------|--------------------------------|
| GET    | /api/products                    | Get all products                   | ALL                            |
| GET    | /api/products/:id                | Get product details                | ALL                            |
| POST   | /api/products                    | Create product                     | SUPPLIER, ADMIN                |
| PATCH  | /api/products/:id                | Update product                     | SUPPLIER (owner), ADMIN        |
| DELETE | /api/products/:id                | Delete product                     | SUPPLIER (owner), ADMIN        |
| GET    | /api/products/:id/reviews        | List reviews                       | ALL                            |
| POST   | /api/products/:id/reviews        | Add review                          | USER                           |

---