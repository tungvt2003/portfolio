# Project Progress Report

Date: 2026-04-26  
Workspace: `d:\VanTung\Web\Portfolio`  
Scope reviewed: `api` + `portfolio-ui-design`

## 1) Executive summary

- Backend API has a clear module structure and full public/admin route skeletons.
- Current API behavior is still in-memory (mock-like), not yet connected to PostgreSQL/Prisma client.
- Frontend public site and admin UI are mostly built, but data source is local static/mock files.
- FE and API are not integrated yet (no runtime API calls found in FE).
- Current stage: UI + API contract-ready foundation, pending real data integration and production hardening.

## 2) API status (`api`)

### Done

- NestJS app bootstrapped with:
  - global prefix `/api`
  - global validation pipe
  - global exception filter
  - JWT auth guard and current-user decorator
- Modules implemented:
  - `auth`
  - `profile`
  - `projects`
  - `experiences`
  - `skills`
  - `settings`
- Public + admin endpoint groups are present for content domains.
- DTO validation exists for create/update/login flows.
- Prisma schema is defined for main entities:
  - `AdminUser`, `Profile`, `Project`, `Experience`, `Skill`, `Setting`
- Swagger bootstrap exists in `main.ts` with fallback handling.

### In progress / not done yet

- Data persistence not implemented:
  - Services currently read/write in-memory arrays/objects.
  - `PrismaService` is still placeholder lifecycle hooks.
- Auth uses env credentials (`ADMIN_EMAIL`, `ADMIN_PASSWORD`), not DB user records.
- No visible automated test setup for API behavior.

### Risks / notes

- `.env` currently sets `PORT=3001`, while README default docs mention `4000`.
- API contract is ready enough for FE integration, but data will reset on server restart until Prisma repository layer is implemented.

## 3) Frontend status (`portfolio-ui-design`)

### Done

- Public portfolio pages implemented:
  - Hero, Projects, Experience, Education, Skills, Contact, Header, Footer
- Locale routing is implemented via `app/[locale]` (`en`, `vi`).
- Theme switching and responsive UI patterns are implemented.
- Admin area exists with:
  - Dashboard (`/admin`)
  - Projects management UI (`/admin/projects`)
  - Project create/edit sheet form (bilingual fields, tags, status, order, media URLs)

### In progress / not done yet

- FE is not calling backend yet:
  - No `fetch`/`axios`/runtime API call usage detected.
  - Data currently comes from:
    - `lib/data.ts` (public)
    - `lib/admin-types.ts` + `mockProjects` (admin)
- Admin "Settings" menu item exists in layout, but page file is missing:
  - `/admin/settings` currently has no implemented page.
- Project save/delete/update in admin are local state updates only (non-persistent).
- `app/admin/projects/loading.tsx` returns `null` (no loading UX).

### Risks / notes

- `next.config.mjs` has `typescript.ignoreBuildErrors = true`:
  - Build can pass even when TypeScript errors exist.
  - This is risky before production deployment.
- CLI output showed Vietnamese text rendering issues in some strings; verify file encoding is consistent UTF-8 in editor and browser rendering.

## 4) Integration gap (current blocker to "real deploy")

- API has route contracts but no database persistence layer.
- FE has polished UI but no API wiring.
- Result: full stack is not yet end-to-end functional with persistent content management.

## 5) Recommended next implementation plan

### Phase 1 (priority: unblock end-to-end data flow)

1. Implement Prisma in API services (replace in-memory data in all modules).
2. Add seed/migration for initial profile/projects/skills/experiences/settings/admin user.
3. Create FE API client layer (`baseURL`, auth token handling, typed responses).
4. Replace `lib/data.ts` and `mockProjects` usage with server data fetching/mutations.

### Phase 2 (priority: stabilize admin workflow)

1. Implement `/admin/settings` page.
2. Add auth flow in FE admin (login + protected routes + token persistence).
3. Add optimistic UI + error handling for CRUD actions.
4. Add non-empty loading and empty states for admin pages.

### Phase 3 (priority: production hardening)

1. Turn off `ignoreBuildErrors`, fix all TS errors.
2. Add smoke tests for key API routes and critical FE flows.
3. Align env/docs/ports between FE and API.
4. Add deployment checklist and rollback notes.

## 6) File evidence reviewed

- API:
  - `src/main.ts`
  - `src/app.module.ts`
  - `src/prisma/prisma.service.ts`
  - `src/modules/*` (controllers/services/dto)
  - `prisma/schema.prisma`
  - `.env`, `.env.example`, `README.md`
- FE:
  - `app/[locale]/*`
  - `components/public/*`
  - `app/admin/*`
  - `components/admin/project-sheet.tsx`
  - `lib/data.ts`
  - `lib/admin-types.ts`
  - `next.config.mjs`

## 7) Confidence

- Assessment method: static code review only (no runtime test executed in this pass).
- Confidence level: high for architecture/data-flow status, medium for runtime behavior details.
