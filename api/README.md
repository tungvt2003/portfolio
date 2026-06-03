# portfolio-api

NestJS + Prisma API for `portfolio-web`.

## Stack
- NestJS
- Prisma ORM
- PostgreSQL
- JWT auth (access token)
- class-validator / class-transformer

## Quick Start
1. Copy `.env.example` to `.env` and update values.
2. Install dependencies:
   - `npm install`
3. Generate Prisma client:
   - `npm run prisma:generate`
4. (Optional) Run migrations:
   - `npm run prisma:migrate`
5. Start dev server:
   - `npm run start:dev`

API base URL: `http://localhost:3001/api`
Hello World: `http://localhost:3001/`
Swagger UI: `http://localhost:3001/docs`
Swagger JSON: `http://localhost:3001/docs-json`

## Auth Flow
- `POST /api/auth/login`
  - body: `{ "email": "...", "password": "..." }`
  - returns access token
- Use `Authorization: Bearer <accessToken>` for all `/api/admin/*` routes.

## Public Endpoints
- `GET /api/profile`
- `GET /api/projects`
- `GET /api/projects/:slug`
- `GET /api/experiences`
- `GET /api/skills`
- `GET /api/settings`

## Admin Endpoints
- `GET /api/admin/profile`
- `PATCH /api/admin/profile`
- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `PATCH /api/admin/projects/:id`
- `DELETE /api/admin/projects/:id`
- `GET /api/admin/experiences`
- `POST /api/admin/experiences`
- `PATCH /api/admin/experiences/:id`
- `DELETE /api/admin/experiences/:id`
- `GET /api/admin/skills`
- `POST /api/admin/skills`
- `PATCH /api/admin/skills/:id`
- `DELETE /api/admin/skills/:id`
- `GET /api/admin/settings`
- `PATCH /api/admin/settings`

## Notes
- Services currently use in-memory seed data aligned with CV content.
- Prisma schema is included and ready for database-backed implementation.
