# Project Structure Guide (NestJS + Prisma)

This document proposes a scalable, maintainable directory structure for your NestJS + Prisma project, aligned with clean architecture, domain-driven grouping, and NestJS best practices.

The structure below is tailored to your current modules (auth, users, courses, lessons, commerce modules, etc.) and separates cross-cutting concerns from domain modules.

---

## Table of Contents
- High-level Directory Tree
- Feature Module Template
- Domain Grouping (Mapping)
- Conventions
  - DTOs, Entities, Repositories
  - Guards/Interceptors/Filters
  - Naming
- Shared and Infrastructure Layers
- Configuration and Bootstrap
- Testing Layout
- Path Aliases (tsconfig)
- Migration Checklist (from current tree)
- Optional Enhancements

---

## High-level Directory Tree

```text
src/
  main.ts
  app.module.ts

  bootstrap/
    swagger.ts
    global-pipes.ts
    global-filters.ts
    global-interceptors.ts

  config/
    config.module.ts
    configuration.ts
    validation.ts
    constants.ts

  shared/                       # cross-cutting utilities (was `common/`)
    decorators/
    filters/
    guards/
    interceptors/
    middleware/
    pipes/
    utils/
    types/

  infrastructure/
    prisma/
      prisma.module.ts
      prisma.service.ts
      prisma-exceptions.mapper.ts
      base.repository.ts
    http/
    storage/
    mail/
    queue/

  modules/
    identity/
      users/
        users.module.ts
        users.controller.ts
        users.service.ts
        users.repository.ts
        dtos/
          requests/
          responses/
        entities/
        mappers/
        tests/
      auth/
        auth.module.ts
        auth.controller.ts
        auth.service.ts
        guards/
        strategies/
        dtos/
        tests/

    learning/
      courses/
      course-modules/
      lessons/
      lesson-progresses/
      assignments/
      assignments-submissions/
      certificates/
      course-enrollments/
      # each module follows the same pattern as `users/`

    commerce/
      products/
      product-reviews/
      product-orders/
      product-order-items/
      carts/
      payments/
      # each module follows the same pattern as `users/`

prisma/
  schema.prisma
  merge-schema.ts
  seeds/
    seed.ts
    factories/
  migrations/

test/
  e2e/
    jest-e2e.json
    specs/
    utils/
  fixtures/

doc/
  project-structure.md

scripts/
```

---

## Feature Module Template

Use this template for every feature under `src/modules/<domain>/<feature>/`.

```text
<feature>/
  <feature>.module.ts
  <feature>.controller.ts
  <feature>.service.ts
  <feature>.repository.ts
  dtos/
    requests/
      create-<feature>.dto.ts
      update-<feature>.dto.ts
      list-<feature>.query.dto.ts
    responses/
      <feature>.response.dto.ts
  entities/
    <feature>.entity.ts
  mappers/
    <feature>.mapper.ts
  tests/
    <feature>.controller.spec.ts
    <feature>.service.spec.ts
```

---

## Domain Grouping (Mapping)

- identity
  - auth → `src/modules/identity/auth`
  - users → `src/modules/identity/users`

- learning
  - courses → `src/modules/learning/courses`
  - course-modules → `src/modules/learning/course-modules`
  - lessons → `src/modules/learning/lessons`
  - lesson-progresses → `src/modules/learning/lesson-progresses`
  - assignments → `src/modules/learning/assignments`
  - assignments-submissions → `src/modules/learning/assignments-submissions`
  - certificates → `src/modules/learning/certificates`
  - course-enrollments → `src/modules/learning/course-enrollments`

- commerce
  - products → `src/modules/commerce/products`
  - product-reviews → `src/modules/commerce/product-reviews`
  - product-orders → `src/modules/commerce/product-orders`
  - product-order-items → `src/modules/commerce/product-order-items`
  - carts → `src/modules/commerce/carts`
  - payments → `src/modules/commerce/payments`

---

## Conventions

### DTOs, Entities, Repositories
- DTOs
  - Split into `requests/` and `responses/` to avoid leaking internal models to the API contract.
  - Use `class-validator` and `class-transformer`. Add Swagger decorators for clear docs.
- Entities
  - Thin domain models decoupled from Prisma models. Convert via mappers to avoid coupling.
- Repositories
  - Encapsulate all Prisma queries. Services do not call Prisma directly.
  - Provide pagination, soft-delete, and transactions via a shared `base.repository.ts` in `infrastructure/prisma`.

### Guards, Interceptors, Filters
- Global ones live in `src/shared/*` and are wired in `bootstrap/*`.
- Module-specific ones live inside the respective feature module.

### Naming
- Files: kebab-case (e.g., `user-profile.service.ts`).
- Classes: PascalCase (e.g., `UserProfileService`).
- Injection tokens: CONST_CASE when necessary.

---

## Shared and Infrastructure Layers

- `src/shared`: cross-cutting utilities (decorators, filters, guards, interceptors, middleware, pipes, utils, types).
- `src/infrastructure/prisma`: Prisma integration for Nest.
  - `prisma.service.ts`: Prisma client provider (with shutdown hooks, transaction helpers).
  - `prisma-exceptions.mapper.ts`: Map Prisma errors to HTTP-friendly exceptions.
  - `base.repository.ts`: Common helpers for repositories.
- Other infrastructure (`http/`, `storage/`, `mail/`, `queue/`) host integrations with external systems.

---

## Configuration and Bootstrap

- `config/config.module.ts`: wraps `@nestjs/config` and sets `isGlobal: true`.
- `config/configuration.ts`: returns typed configuration slices (db, jwt, cache, pagination, etc.).
- `config/validation.ts`: validates environment variables (Joi or class-validator).
- `bootstrap/*`: centralize app-level setup and keep `main.ts` clean.
  - `swagger.ts`: SwaggerModule setup and options.
  - `global-pipes.ts`: `ValidationPipe` and transformation defaults.
  - `global-filters.ts`: `HttpExceptionFilter`, `PrismaExceptionFilter`.
  - `global-interceptors.ts`: `ClassSerializer`, `Logging`, `Timeout`.

---

## Testing Layout

- Unit tests co-located in each module’s `tests/` directory.
- E2E tests under `test/e2e` with a dedicated test DB.
- Reusable fixtures in `test/fixtures` and `prisma/seeds/factories`.

---

## Path Aliases (tsconfig)

Suggested aliases to avoid deep relative imports:

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/*"],
      "@config/*": ["src/config/*"],
      "@shared/*": ["src/shared/*"],
      "@infra/*": ["src/infrastructure/*"],
      "@modules/*": ["src/modules/*"],
      "@prisma/*": ["src/infrastructure/prisma/*"]
    }
  }
}
```

Remember to enable `tsconfig-paths` at runtime if needed (already in devDeps) and configure Nest CLI accordingly if using path aliases at build time.

---

## Migration Checklist (from current tree)

1) Prepare top-level folders
- Create: `src/bootstrap`, `src/config`, `src/shared`, `src/infrastructure/prisma`, `src/modules/{identity,learning,commerce}`.

2) Move cross-cutting utilities
- `src/common/*` → `src/shared/*` (preserve `interceptors`, `middleware`, `utils`).

3) Centralize Prisma integration
- If you have `src/prisma/*`, move to `src/infrastructure/prisma/*`.
- Keep Prisma schema/migrations/seeds under top-level `prisma/` (already present).
- Add `prisma-exceptions.mapper.ts` and `base.repository.ts` (new files).

4) Group features by domain
- `src/auth/*` → `src/modules/identity/auth/*`.
- `src/users/*` → `src/modules/identity/users/*`.
- `src/courses/*` → `src/modules/learning/courses/*`.
- `src/course-modules/*` → `src/modules/learning/course-modules/*`.
- `src/lessons/*` → `src/modules/learning/lessons/*`.
- `src/lesson-progresses/*` → `src/modules/learning/lesson-progresses/*`.
- `src/assignments/*` → `src/modules/learning/assignments/*`.
- `src/assignments-submissions/*` → `src/modules/learning/assignments-submissions/*`.
- `src/certificates/*` → `src/modules/learning/certificates/*`.
- `src/course-enrollments/*` → `src/modules/learning/course-enrollments/*`.
- `src/products/*` → `src/modules/commerce/products/*`.
- `src/product-reviews/*` → `src/modules/commerce/product-reviews/*`.
- `src/product-orders/*` → `src/modules/commerce/product-orders/*`.
- `src/product-order-items/*` → `src/modules/commerce/product-order-items/*`.
- `src/carts/*` → `src/modules/commerce/carts/*`.
- `src/payments/*` → `src/modules/commerce/payments/*`.

5) Normalize each feature folder
- Ensure each module contains: `module`, `controller`, `service`, `repository`, `dtos/requests`, `dtos/responses`, `entities`, `mappers`, `tests`.
- Convert any Prisma calls inside services to repositories.

6) Bootstrap and config
- Create `bootstrap/` files and import them in `main.ts`.
- Create `config/` files and register global config.

7) Update imports
- Introduce path aliases in `tsconfig.json` and update imports accordingly.

8) Tests
- Co-locate unit tests under each module’s `tests/`.
- Keep e2e specs under `test/e2e` and ensure a dedicated test DB. Use `db:reset` to re-seed for e2e.

9) Lint/Format
- Run `npm run lint` and `npm run format` to normalize the codebase after refactor.

---

## Optional Enhancements

- Prisma error mapping
  - Add a `PrismaExceptionFilter` using `prisma-exceptions.mapper.ts` to translate known Prisma errors into `BadRequestException`, `ConflictException`, etc.
- Base repository helpers
  - Provide common pagination, ordering, and soft-delete helpers in `base.repository.ts` and extend it in feature repositories.
- Swagger
  - Centralize Swagger setup in `bootstrap/swagger.ts` and annotate DTOs for accurate API docs.
- Health checks
  - Add a `/health` module (or controller) and integrate with Nest Terminus if desired.

---

This layout clarifies domain boundaries, enforces consistent module structure, and scales as features grow while staying idiomatic to NestJS and Prisma.
