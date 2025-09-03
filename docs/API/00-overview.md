- **Stack:** Node.js, NestJS, Prisma, PostgreSQL  
- **Authentication:** JWT-based  
- **RBAC Roles:** ADMIN, SUPPLIER, INSTRUCTOR, USER  
- **Ownership Rules:**  
  - Supplier owns their products  
  - Instructor owns their courses, modules, lessons, assignments  
  - Users own their cart, payments, enrollments, submissions

---

### ✅ Notes

1. **RBAC rules** are integrated per route; ownership is indicated as `(owner)` in Roles Allowed.  
2. **Examples**: fill request/response JSON per route in EXAMPLES folder.  
3. **Nested relations** are reflected in routes (e.g., modules → lessons → assignments).  
4. **Polymorphic items** (CartItem: product/course) must be validated in service layer.  