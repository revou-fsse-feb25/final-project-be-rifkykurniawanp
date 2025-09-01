# RUIND EDU-COMMERCE Backend

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-131415?style=flat&logo=railway&logoColor=white)

A comprehensive e-commerce and education platform backend that combines product marketplace with online learning management system, specializing in coffee, tea, and herbal products education.

## 🚀 Live Demo

- **API Base URL**: [https://final-project-be-rifkykurniawanp-production.up.railway.app/](https://final-project-be-rifkykurniawanp-production.up.railway.app/)
- **API Documentation**: [Swagger UI](https://final-project-be-rifkykurniawanp-production.up.railway.app/api)
- **Database Schema**: [DBDocs](https://dbdocs.io/krifky14/simplier-ruind-database)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Role-Based Access Control](#role-based-access-control)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### E-Commerce Platform
- **Product Management**: Coffee, tea, herbal products, and equipment
- **Multi-vendor Support**: Suppliers can manage their own products
- **Shopping Cart**: Add products and courses to cart
- **Order Management**: Complete order processing with payment integration
- **Product Reviews**: Customer review and rating system
- **Inventory Management**: Stock tracking and status management

### Learning Management System (LMS)
- **Course Management**: Structured courses with modules and lessons
- **Multiple Content Types**: Video, article, quiz, and assignment lessons
- **Progress Tracking**: Individual lesson and course progress monitoring
- **Assignment System**: Create, submit, and grade assignments
- **Certification**: Automated certificate generation upon course completion
- **Multi-level Learning**: Beginner, intermediate, and advanced courses

### User Management
- **Role-Based Access**: Admin, Supplier, Instructor, and User roles
- **Dual User Types**: Users can be both buyers (isBuyer) and students (isStudent)
- **Authentication**: JWT-based authentication with refresh tokens
- **Profile Management**: Comprehensive user profile system

## 🛠 Tech Stack

- **Framework**: NestJS v11
- **Language**: TypeScript v5.8
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma v6.14
- **Authentication**: JWT with Passport
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Deployment**: Railway
- **Testing**: Jest

## 📋 Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **PostgreSQL**: >= 14.0 (or Supabase account)
- **Git**: For version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd final-project-be-rifkykurniawanp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Generate Prisma client**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:migrate
   ```

6. **Seed the database** (optional)
   ```bash
   # Seed with sample data
   npm run db:seed:samples
   
   # Seed core data only
   npm run db:seed:core
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Application Configuration
NODE_ENV=development
HOST=localhost
PORT=3002
API_BASE_URL=http://localhost:3002

# Database Configuration (Supabase)
DATABASE_URL="postgresql://postgres.xxx:xxx@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxx:xxx@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Security
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Database Seeding
SEED_SAMPLES=true
```

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development`, `production` |
| `PORT` | Server port | `3002` |
| `DATABASE_URL` | Supabase connection string (pooled) | `postgresql://...` |
| `DIRECT_URL` | Supabase direct connection (migrations) | `postgresql://...` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `JWT_EXPIRES_IN` | JWT expiration time | `24h`, `7d` |

## 🗄 Database Setup

### Using Supabase

1. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your connection strings from Settings > Database

2. **Configure connection strings**
   ```env
   # Pooled connection for application
   DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   
   # Direct connection for migrations
   DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
   ```

3. **Run migrations**
   ```bash
   npm run prisma:migrate
   ```

### Local PostgreSQL (Alternative)

If you prefer local development:

```bash
# Install PostgreSQL and create database
createdb be-final-project

# Update .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/be-final-project?schema=public"
DIRECT_URL="postgresql://postgres:password@localhost:5432/be-final-project?schema=public"
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

The application will be available at `http://localhost:3002`

## 📚 API Documentation

### Swagger Documentation
Access the interactive API documentation at: `http://localhost:3002/api`

### Available Scripts
```bash
# Development
npm run start:dev          # Start with file watching
npm run start:debug        # Start in debug mode

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run database migrations
npm run db:seed           # Seed database with sample data
npm run db:reset          # Reset database and reseed

# Code Quality
npm run format            # Format code with Prettier
npm run lint              # Lint and fix with ESLint

# Testing
npm run test              # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:cov          # Run tests with coverage
npm run test:e2e          # Run end-to-end tests
```

## 🗃 Database Schema

The application uses Prisma ORM with PostgreSQL. Key entities include:

### Core Models
- **User**: Multi-role user system (Admin, Supplier, Instructor, User)
- **Product**: Coffee, tea, herbal products and equipment
- **Course**: Educational courses with structured learning paths
- **Cart & Payment**: E-commerce shopping and payment processing
- **Certificate**: Automated certificate generation system

### Business Logic Models
- **ProductReview**: Customer product ratings and reviews
- **CourseModule & Lesson**: Hierarchical course content structure
- **LessonProgress**: Individual learning progress tracking
- **Assignment & AssignmentSubmission**: Learning assessment system
- **CourseEnrollment**: Course enrollment and progress management
- **ProductOrder & ProductOrderItem**: Order processing system

For detailed schema documentation, visit: [DBDocs Schema](https://dbdocs.io/krifky14/simplier-ruind-database)

## 📁 Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root application module
├── prisma/                # Database configuration
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── auth/                  # Authentication system
├── users/                 # User management
├── products/              # Product management
├── product-reviews/       # Product review system
├── courses/               # Course management
├── course-modules/        # Course module management
├── lessons/               # Lesson management
├── lesson-progresses/     # Learning progress tracking
├── assignments/           # Assignment system
├── assignment-submissions/ # Assignment submission handling
├── carts/                 # Shopping cart functionality
├── payments/              # Payment processing
├── product-orders/        # Product order management
├── product-order-items/   # Order item details
├── course-enrollments/    # Course enrollment system
└── certificates/          # Certificate management

# Each module follows NestJS structure:
module-name/
├── module-name.module.ts       # NestJS module definition
├── module-name.service.ts      # Business logic
├── module-name.controller.ts   # HTTP endpoints
├── module-name.repository.ts   # Database operations
├── interfaces/                 # TypeScript interfaces
│   └── repository.interface.ts
└── dto/                       # Data Transfer Objects
    ├── request/               # Request DTOs
    └── response/              # Response DTOs
```

## 🔐 Role-Based Access Control (RBAC)

The application implements comprehensive role-based access control:

### Roles
- **ADMIN**: Full system access and management
- **SUPPLIER**: Product management and related order tracking
- **INSTRUCTOR**: Course, lesson, and assignment management
- **USER**: Basic user with buyer and/or student capabilities

### User Flags
- **isBuyer**: Can purchase products and leave reviews
- **isStudent**: Can enroll in courses and access learning content

### Permission Matrix
- **Resource Ownership**: Users can only modify their own resources
- **Enrollment-Based Access**: Course content requires active enrollment
- **Purchase-Based Reviews**: Product reviews require verified purchases
- **Hierarchical Access**: Admins have full access, others have scoped access

For detailed permission matrix, see the RBAC documentation in the codebase.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:cov

# Run end-to-end tests
npm run test:e2e

# Debug tests
npm run test:debug
```

## 🚀 Deployment

### Railway Deployment

The application is deployed on Railway with automatic deployments:

1. **Production URL**: `https://final-project-be-rifkykurniawanp-production.up.railway.app/`
2. **Database**: Supabase PostgreSQL with connection pooling
3. **Environment**: Production environment variables configured in Railway

### Deployment Process
```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Environment Configuration
- **Database**: Supabase with pgBouncer connection pooling
- **CORS**: Configured for frontend domain
- **Security**: JWT tokens with secure secret keys
- **Logging**: Production-ready logging configuration

## 📖 API Usage Examples

### Authentication
```bash
# Register new user
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","firstName":"John"}'

# Login
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Products
```bash
# Get all products with filters
curl "http://localhost:3002/api/products?category=COFFEE&origin=INDONESIA&page=1&limit=10"

# Get product by slug
curl "http://localhost:3002/api/products/slug/arabica-premium-beans"
```

### Courses
```bash
# Get courses by category
curl "http://localhost:3002/api/courses?category=COFFEE_BREWING&level=BEGINNER"

# Enroll in course (authenticated)
curl -X POST http://localhost:3002/api/courses/1/enroll \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔄 Database Operations

### Migrations
```bash
# Create new migration
npm run prisma:migrate

# Reset database
npm run db:reset

# Generate Prisma client
npm run prisma:generate
```

### Seeding
```bash
# Seed with sample data (includes users, products, courses)
npm run db:seed:samples

# Seed only core data (minimal required data)
npm run db:seed:core

# Custom seed script
tsx prisma/seeds/seed.ts
```

## 🏗 Architecture Patterns

### Repository Pattern
Each module implements the repository pattern for clean separation of concerns:
- **Controller**: HTTP request handling and validation
- **Service**: Business logic and orchestration
- **Repository**: Database operations and queries
- **Interface**: Type safety and testability

### DTO Pattern
Comprehensive Data Transfer Object pattern:
- **Request DTOs**: Input validation and transformation
- **Response DTOs**: Output formatting and serialization
- **Validation**: class-validator decorators for type safety

### Module-Based Architecture
NestJS modular architecture with clear boundaries:
- **Feature Modules**: Self-contained business domains
- **Shared Modules**: Common services like Prisma and Auth
- **Guard-Protected Routes**: Authentication and authorization

## 🔍 Key Features Detail

### Multi-Vendor E-Commerce
- Suppliers can manage their own products
- Order tracking and management
- Review and rating system
- Inventory management with stock tracking

### Learning Management System
- Structured course content with modules and lessons
- Progress tracking per user and course
- Assignment creation, submission, and grading
- Automated certificate generation
- Multiple lesson types: video, article, quiz, assignment

### Unified Cart & Payment
- Single cart for both products and courses
- Payment processing with status tracking
- Order fulfillment workflows
- Enrollment automation upon payment

## 🛡 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Authorization**: Fine-grained permission system
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configured for allowed origins

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   ```bash
   # Check database connectivity
   npx prisma db pull
   ```

2. **Migration Problems**
   ```bash
   # Reset and recreate
   npm run db:reset
   ```

3. **Environment Variables**
   ```bash
   # Verify all required variables are set
   node -e "console.log(process.env.DATABASE_URL ? 'DB configured' : 'DB missing')"
   ```

## 📝 Development Guidelines

### Code Style
- **ESLint**: Configured with NestJS recommended rules
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking enabled

### Naming Conventions
- **Files**: kebab-case (`user-management.service.ts`)
- **Classes**: PascalCase (`UserManagementService`)
- **Methods**: camelCase (`getUserById`)
- **Constants**: UPPER_SNAKE_CASE (`JWT_SECRET`)

### Git Workflow
- Feature branches for new development
- Pull requests for code review
- Conventional commit messages

## 📊 Performance Considerations

### Database Optimization
- **Connection Pooling**: Supabase pgBouncer integration
- **Prisma Accelerate**: Database connection optimization
- **Proper Indexing**: Optimized queries for large datasets
- **Soft Deletes**: Data preservation with `deletedAt` fields

### API Performance
- **Pagination**: Implemented on list endpoints
- **Filtering**: Query optimization with proper indexing
- **Caching Strategy**: Ready for Redis integration
- **Response Optimization**: Minimal data transfer

## 🔗 Related Resources

- **Frontend Repository**: [Link to frontend repo if available]
- **Design System**: [Link to design documentation]
- **API Postman Collection**: [Link to Postman workspace]
- **Project Documentation**: [Additional docs]

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Run tests before committing
npm run test

# Format code
npm run format
```

## 📄 License

This project is licensed under UNLICENSED - see the package.json file for details.

## 👨‍💻 Author

**Rifky Kurniawan**
- Railway: [final-project-be-rifkykurniawanp-production](https://final-project-be-rifkykurniawanp-production.up.railway.app/)

---

## 🗺 API Quick Reference

### Base Endpoints
- **Auth**: `/api/auth/*` - Authentication and user management
- **Products**: `/api/products/*` - Product catalog and management
- **Courses**: `/api/courses/*` - Course and learning content
- **Cart**: `/api/cart/*` - Shopping cart operations
- **Payments**: `/api/payments/*` - Payment processing
- **Dashboard**: `/api/dashboard/*` - Analytics and reporting

### Response Format
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful",
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

For complete API documentation with request/response examples, visit the [Swagger UI](https://final-project-be-rifkykurniawanp-production.up.railway.app/api).

---

*Built with ❤️ using NestJS and modern TypeScript practices*