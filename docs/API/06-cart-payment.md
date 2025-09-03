## 06 - Cart & Payment

| Method | Endpoint                 | Description                 | Roles Allowed         |
|--------|--------------------------|----------------------------|--------------------|
| GET    | /api/cart                | Get user cart              | USER               |
| POST   | /api/cart/items          | Add item to cart           | USER               |
| PATCH  | /api/cart/items/:id      | Update item quantity       | USER               |
| DELETE | /api/cart/items/:id      | Remove item from cart      | USER               |
| POST   | /api/payments            | Create payment             | USER               |
| GET    | /api/payments/:id        | Get payment details        | USER, ADMIN        |
| PATCH  | /api/payments/:id        | Update payment status      | ADMIN              |

---