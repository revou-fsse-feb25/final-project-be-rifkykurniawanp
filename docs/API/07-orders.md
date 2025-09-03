## 07 - Product Orders


| Method | Endpoint             | Description           | Roles Allowed         |
|--------|--------------------|----------------------|--------------------|
| GET    | /api/orders         | List product orders  | USER (buyer), ADMIN|
| GET    | /api/orders/:id     | Get order details    | USER (buyer), ADMIN|
| POST   | /api/orders         | Create new order     | USER               |
| PATCH  | /api/orders/:id     | Update order status  | ADMIN              |

---