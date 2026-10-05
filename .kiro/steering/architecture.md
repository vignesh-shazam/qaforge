---
inclusion: always
---

# QAForge — Architecture Steering

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend framework | Next.js (App Router) |
| UI library | React |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
| Testing — E2E | Playwright |
| Testing — Unit/Integration | Vitest |
| Runtime | Node.js |

## Application Architecture

QAForge uses the **Next.js App Router** model with a clear separation of concerns:

```
src/
├── app/                    # Next.js App Router — pages, layouts, route handlers
│   ├── (marketing)/        # Route group: public/marketing pages
│   ├── (auth)/             # Route group: login, register, forgot-password
│   ├── (dashboard)/        # Route group: authenticated app shell
│   └── api/                # Route handlers (server-side only)
│
├── components/             # Reusable React components
│   ├── ui/                 # Primitive design system components
│   └── layout/             # Layout components (Header, Sidebar, etc.)
│
├── lib/                    # Shared utilities and infrastructure
│   ├── db.ts               # Prisma client singleton
│   ├── env.ts              # Validated environment configuration
│   └── utils.ts            # General-purpose utilities
│
├── hooks/                  # Custom React hooks
├── types/                  # Shared TypeScript types and interfaces
└── styles/                 # Global CSS (Tailwind entry point)

prisma/
├── schema.prisma           # Database schema
└── migrations/             # Prisma migrations

tests/
├── e2e/                    # Playwright end-to-end tests
└── unit/                   # Vitest unit/integration tests
```

## Architectural Principles

### Separation of Concerns

- **UI layer** — React components in `src/components/` and `src/app/`. No direct DB access.
- **Business logic** — Server Actions or service modules in `src/lib/`. Framework-agnostic where possible.
- **Data access** — All database queries go through Prisma in server-side code only. Never in client components.
- **Infrastructure** — Environment config, Prisma client, third-party clients live in `src/lib/`.

### Server vs Client Boundary

- Default to **Server Components**. Use `"use client"` only where interactivity or browser APIs are required.
- Never import Prisma or server-only modules in client components.
- Never expose secrets, API keys, or DB credentials to the browser.
- Route Handlers (`app/api/`) are always server-side.

### Component Design

- Design system primitives (`src/components/ui/`) are small, composable, and unstyled beyond design tokens.
- Layout components (`src/components/layout/`) compose primitives into structural shells.
- Page-level components live in `src/app/` and compose layout + feature components.
- Avoid prop drilling beyond 2 levels — use composition patterns or React Context for shared UI state.

### TypeScript

- Strict mode enabled — `strict: true` in `tsconfig.json`.
- Avoid `any`. Use `unknown` with narrowing, or define explicit types.
- Prefer `interface` for object shapes, `type` for unions/intersections/aliases.
- All exported functions must have explicit return types.
- Prisma generates types from schema — use them rather than duplicating manually.

### State Management

- V0.1 has no global state requirements beyond auth session (future).
- Use React's built-in `useState`/`useReducer`/`useContext` for local/shared UI state.
- Do not introduce Zustand, Redux, or similar unless there is a clear, present need.

### Styling

- Tailwind CSS utility-first approach.
- Design tokens defined via Tailwind config (`tailwind.config.ts`) — colors, spacing, typography.
- No inline `style` props except for truly dynamic values (e.g., computed widths).
- Component variants managed via `class-variance-authority` (cva) or equivalent utility.

## Environment Strategy

```
LOCAL  →  DEV  →  STAGE  →  PROD
```

- V0.1 implements **LOCAL** and **DEV** only.
- All environment-specific values come from environment variables — never hard-coded.
- A `.env.example` file documents all required variables (no real secrets).
- `.env` and `.env.*` files (except `.env.example`) are git-ignored.

### Environment Files

| File | Purpose |
|------|---------|
| `.env.local` | Local developer overrides (git-ignored) |
| `.env.development` | DEV environment defaults (git-ignored, deployed via secret manager) |
| `.env.example` | Documented template — committed to git |

## Database Architecture

- PostgreSQL accessed exclusively via Prisma ORM.
- Prisma client instantiated as a singleton (`src/lib/db.ts`) — prevents connection exhaustion in dev.
- All schema changes go through Prisma migrations.
- No raw SQL unless Prisma cannot express the query — and even then, use parameterized queries.
- Database access is server-side only (Route Handlers, Server Components, Server Actions).

## Route Structure

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Public | Landing page |
| `/login` | Public | Login UI |
| `/register` | Public | Register UI |
| `/forgot-password` | Public | Forgot password UI |
| `/dashboard` | Protected (future) | Dashboard shell |
| `/projects` | Protected (future) | Projects list |
| `/projects/new` | Protected (future) | Create project |
| `/projects/[id]` | Protected (future) | Project overview |
| `/api/*` | Server | API route handlers |

## Dependency Philosophy

- Prefer the Next.js / React / Tailwind ecosystem.
- Every dependency added must have a clear justification.
- Avoid dependencies that duplicate what the framework already provides.
- Pin exact versions in `package.json` for production dependencies.
