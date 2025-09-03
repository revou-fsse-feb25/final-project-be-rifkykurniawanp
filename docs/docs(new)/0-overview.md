# Project Overview

This project is a **hybrid e-commerce and e-learning platform** focused on coffee, tea, and herbal products.  
It combines two main domains:

1. **Marketplace**  
   Users can browse, add to cart, and purchase coffee, tea, herbal products, and related equipment.  
   Suppliers can manage their own products, stock, and orders.

2. **Learning Platform**  
   Instructors can create and manage courses (with video, article, quiz, assignment, or live sessions).  
   Students can enroll in courses, track progress, submit assignments, and earn certificates.

---

## Key Features

- **Role-Based Access Control (RBAC)**  
  Permissions and roles (Admin, Supplier, Instructor, User) define what each user can access and manage.

- **Product Management**  
  Categories, tags, reviews, stock, and supplier dashboards.

- **Order & Payment**  
  Cart system supports both products and courses.  
  Secure checkout with multiple payment statuses.

- **Learning Management**  
  Course modules, lessons, assignments, progress tracking, reviews, and certificates.

- **Scalable Design**  
  Built with Prisma + PostgreSQL schema to ensure future features like live streaming and advanced analytics can be integrated without breaking changes.

---

## Tech Stack

- **Backend**: Node.js, TypeScript, Prisma ORM, PostgreSQL  
- **Frontend**: Next.js (React), TailwindCSS  
- **Auth**: JWT / OAuth2 (configurable)  
- **Deployment**: Vercel (frontend), Supabase/AWS (database + backend)  
- **Docs**: Markdown-based (`/docs` directory)

---

## Target Users

- **Admin**: Manages platform-level operations (users, permissions, monitoring).  
- **Supplier**: Manages products, stock, and sales.  
- **Instructor**: Creates courses, manages lessons, tracks student progress.  
- **User**: Can be a buyer (marketplace) and/or student (courses).
