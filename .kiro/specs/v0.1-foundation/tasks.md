# QAForge V0.1 — Implementation Tasks

## Status Key

- `[ ]` Not started
- `[~]` In progress
- `[x]` Complete

---

## Phase 1 — Project Initialization

### TASK-01: Initialize Next.js Application

**Priority:** Critical — blocks all other tasks

- [ ] Run `create-next-app` with TypeScript, Tailwind CSS, ESLint, App Router, and `src/` directory options
- [ ] Verify `tsconfig.json` has `strict: true` and `@/` path alias configured
- [ ] Verify `tailwind.config.ts` is present
- [ ] Verify `eslint.config.mjs` is present
- [ ] Remove Next.js boilerplate content (default page, styles, assets)
- [ ] Confirm `npm run dev` starts without errors

**Acceptance criteria:**
- `npm run dev` starts the dev server on port 3000
- `npm run build` completes without TypeScript or ESLint errors
- `@/` imports resolve correctly

---

### TASK-02: Configure TypeScript

**Depends on:** TASK-01

- [ ] Confirm `strict: true` in `tsconfig.json`
- [ ] Add `noUncheckedIndexedAccess: true`
- [ ] Confirm `@/` path alias maps to `./src`
- [ ] Verify `tsc --noEmit` passes cleanly

**Acceptance criteria:**
- `tsc --noEmit` exits with zero errors on the clean scaffold

---

### TASK-03: Configure ESLint

**Depends on:** TASK-01

- [ ] Configure ESLint with Next.js recommended rules
- [ ] Add TypeScript strict rules
- [ ] Add `import/order` rule for consistent import grouping
- [ ] Verify `eslint --max-warnings 0` passes on the clean scaffold
- [ ] Add `lint` and `lint:fix` scripts to `package.json`

**Acceptance criteria:**
- `npm run lint` exits with zero warnings on clean scaffold

---

### TASK-04: Configure Environment System

**Depends on:** TASK-01

- [ ] Create `.env.example` with all required variable placeholders and comments
- [ ] Create `src/lib/env.ts` with Zod validation for all server-side env vars
- [ ] Create `src/lib/env.client.ts` (or extend `env.ts`) for any `NEXT_PUBLIC_` vars
- [ ] Verify startup fails with a clear error if a required variable is missing
- [ ] Confirm `.env` is git-ignored (already in `.gitignore`)

**Acceptance criteria:**
- Missing `DATABASE_URL` causes a descriptive startup error
- `.env.example` documents every variable used in the application

---

## Phase 2 — Design System

### TASK-05: Configure Design Tokens

**Depends on:** TASK-01

- [ ] Define color palette (brand, surface, content, semantic) in `tailwind.config.ts`
- [ ] Configure Inter font via `next/font/google` in root layout
- [ ] Define typography scale extensions if needed
- [ ] Verify tokens are accessible via Tailwind class names in components

**Acceptance criteria:**
- `bg-surface-900`, `text-content-primary`, `bg-brand-500` etc. resolve correctly in Tailwind

---

### TASK-06: Build UI Primitives

**Depends on:** TASK-05

- [ ] Implement `Button` component (variants: primary, secondary, ghost, destructive; sizes: sm, md, lg; loading state)
- [ ] Implement `Input` component (label, placeholder, error, disabled, helper text)
- [ ] Implement `Card` component (composable container with optional padding/border variants)
- [ ] Implement `Badge` component (variants: default, success, warning, error, info)
- [ ] Implement `Spinner` component (sizes: sm, md, lg)
- [ ] Implement `EmptyState` component (icon, title, description, optional CTA)
- [ ] Implement `ErrorState` component (message, optional retry callback)
- [ ] Implement `Modal`/`Dialog` component (open, onClose, title, body, footer slots; focus trap; Escape to close)
- [ ] Export all components from `src/components/ui/index.ts`

**Acceptance criteria:**
- Each component renders correctly in isolation
- `Button` shows loading spinner when `loading` prop is true
- `Modal` traps focus and closes on Escape key
- All components pass TypeScript strict check

---

## Phase 3 — Application Layout

### TASK-07: Build Marketing Layout and Auth Layout

**Depends on:** TASK-06

- [ ] Implement public `Header` component (logo/wordmark, Login and Get Started nav links)
- [ ] Implement `Footer` component (minimal: copyright, links)
- [ ] Implement `MarketingLayout` composing Header + main slot + Footer — applied to `(marketing)` route group only
- [ ] Implement `AuthLayout` — minimal centered card layout with QAForge branding, no marketing nav or footer — applied to `(auth)` route group
- [ ] `AuthLayout` must be responsive and present a clean, professional SaaS centered card appearance

**Acceptance criteria:**
- Public header renders on the landing page with logo and nav links
- Auth pages render within a centered card layout with branding only (no marketing nav/footer)
- Marketing layout and auth layout are fully separate components

---

### TASK-08: Build Dashboard Layout

**Depends on:** TASK-06

- [ ] Implement app `Header` component (logo, page title area, user avatar/menu placeholder)
- [ ] Implement `Sidebar` component with navigation items: Dashboard, Projects
- [ ] Implement active link highlighting in sidebar
- [ ] Implement `DashboardLayout` composing app Header + Sidebar + main content slot
- [ ] Implement responsive behavior: sidebar collapses on mobile (hamburger menu)
- [ ] Apply `DashboardLayout` to the `(dashboard)` route group layout

**Acceptance criteria:**
- Dashboard layout renders with header + sidebar at desktop breakpoints
- Sidebar collapses/toggles correctly at mobile breakpoints
- Active nav link is visually distinguished

---

## Phase 4 — Pages

### TASK-09: Landing Page

**Depends on:** TASK-07

- [ ] Implement hero section with headline, subheadline, and CTA buttons (Get Started, Learn More)
- [ ] Implement features/capabilities section (3–4 feature cards using design system components)
- [ ] Implement a product pipeline section visualizing `URL → Discover → Generate → Execute`
- [ ] Implement CTA section at the bottom
- [ ] Ensure full responsiveness (mobile, tablet, desktop)
- [ ] Verify page renders as a Server Component

**Acceptance criteria:**
- Landing page loads at `/`
- All sections render correctly at 375px, 768px, 1280px viewports
- No client-side JS required for rendering (Server Component)

---

### TASK-10: Authentication Pages

**Depends on:** TASK-07, TASK-06

- [ ] Implement `/login` page: email + password form, submit button, "Forgot password?" link, "Create account" link
- [ ] Implement `/register` page: name + email + password + confirm-password form, "Already have an account?" link
- [ ] Implement `/forgot-password` page: email field, submit button, back-to-login link
- [ ] Add form validation (client-side): required fields, email format, password length, password match
- [ ] Display validation error messages using `Input` error state
- [ ] Form submission shows loading state then a placeholder success/error state (no real API in V0.1)
- [ ] All auth pages use `AuthLayout` (minimal centered card, QAForge branding, no marketing nav/footer)

**Acceptance criteria:**
- All three auth pages render at their respective routes
- Client-side validation fires before submission
- Loading state displays on submit
- No network requests made on submission in V0.1

---

### TASK-11: Dashboard Shell

**Depends on:** TASK-08

- [ ] Implement `/dashboard` page with welcome message and placeholder overview cards
- [ ] Display placeholder stats (e.g., "Projects: —", "Tests: —") as empty/loading state
- [ ] Ensure navigation from sidebar to `/dashboard` works

**Acceptance criteria:**
- `/dashboard` renders within the dashboard shell layout
- Page is visually complete as a shell

---

### TASK-12: Projects Pages

**Depends on:** TASK-08, TASK-06

- [ ] Implement `/projects` page showing `EmptyState` when no projects exist
- [ ] Add "New Project" button that navigates to create project
- [ ] Implement `/projects/new` page with create project form (name, description, target URL)
- [ ] Add client-side validation to create project form
- [ ] Form submission shows loading state then returns to projects list (placeholder — no API in V0.1)
- [ ] Implement `/projects/[id]` page with a project overview shell (name header, placeholder sections)

**Acceptance criteria:**
- `/projects` renders with empty state
- `/projects/new` form validates and shows loading on submit
- `/projects/[id]` renders a shell without crashing for any `id`

---

### TASK-13: 404 Page

**Depends on:** TASK-07

- [ ] Implement `src/app/not-found.tsx` with a branded 404 page
- [ ] Include navigation back to the landing page or dashboard

**Acceptance criteria:**
- Navigating to a non-existent route shows the custom 404 page

---

## Phase 5 — Database Foundation

### TASK-14: Prisma Setup

**Depends on:** TASK-01, TASK-04

- [ ] Install `prisma` and `@prisma/client`
- [ ] Run `prisma init` to create `prisma/schema.prisma` and `.env` reference
- [ ] Configure `schema.prisma` with PostgreSQL provider and `env("DATABASE_URL")`
- [ ] Define `User` model per design spec
- [ ] Define `Project` model per design spec
- [ ] Create Prisma client singleton at `src/lib/db.ts` (with Next.js dev hot-reload guard)
- [ ] Create `prisma/seed.ts` placeholder
- [ ] Add `prisma:generate`, `prisma:migrate`, `prisma:studio`, `prisma:seed` scripts to `package.json`

**Acceptance criteria:**
- `npx prisma generate` completes without errors
- `src/lib/db.ts` exports a typed Prisma client
- `prisma/schema.prisma` defines `User` and `Project` models

---

### TASK-15: Initial Migration

**Depends on:** TASK-14

- [ ] Run `prisma migrate dev --name init` against a local PostgreSQL instance
- [ ] Verify migration file is created in `prisma/migrations/`
- [ ] Verify `prisma studio` opens and shows the User and Project tables

**Acceptance criteria:**
- Migration file exists in `prisma/migrations/`
- Tables visible in Prisma Studio

> **Note:** Requires a running local PostgreSQL instance. Document setup in README.

---

## Phase 6 — API Foundation

### TASK-16: Health Check Endpoint

**Depends on:** TASK-01

- [ ] Implement `src/app/api/health/route.ts`
- [ ] Return `{ status: "ok", timestamp: <ISO string> }` on `GET`
- [ ] Verify it returns HTTP 200

**Acceptance criteria:**
- `GET /api/health` returns `200` with the expected JSON body

---

## Phase 7 — Testing Foundation

### TASK-17: Configure Vitest

**Depends on:** TASK-01

- [ ] Install `vitest`, `@vitest/coverage-v8`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`
- [ ] Create `vitest.config.ts` with jsdom environment and path alias support
- [ ] Add `test:unit` and `test:unit:coverage` scripts to `package.json`
- [ ] Write unit test for `getInitials` utility in `tests/unit/lib/utils.test.ts`
- [ ] Verify `npm run test:unit` passes

**Acceptance criteria:**
- `npm run test:unit` runs and passes

---

### TASK-18: Configure Playwright

**Depends on:** TASK-01

- [ ] Install `@playwright/test`
- [ ] Run `playwright install` to install browser binaries
- [ ] Create `playwright.config.ts` with base URL, test directory, and dev server config
- [ ] Add `test:e2e` script to `package.json`
- [ ] Write smoke test: landing page loads and displays the hero headline
- [ ] Verify `npm run test:e2e` passes

**Acceptance criteria:**
- `npm run test:e2e` runs and the smoke test passes

---

## Phase 8 — Documentation & Polish

### TASK-19: README

**Depends on:** All implementation tasks

- [ ] Write `README.md` covering:
  - Project overview and tech stack
  - Prerequisites (Node.js version, PostgreSQL)
  - Local setup steps (`git clone`, `npm install`, env setup, DB setup, `npm run dev`)
  - Available npm scripts table
  - Environment variables guide (referencing `.env.example`)
  - Git branching strategy
  - Testing instructions

**Acceptance criteria:**
- A new developer can set up the project locally by following README alone

---

### TASK-20: Final Verification

**Depends on:** All previous tasks

- [ ] `npm run build` completes with zero TypeScript errors
- [ ] `npm run lint` passes with zero warnings
- [ ] `tsc --noEmit` passes
- [ ] `npm run test:unit` passes
- [ ] `npm run test:e2e` passes
- [ ] Landing page, auth pages, dashboard, and projects pages all load correctly
- [ ] Responsive layout verified at mobile, tablet, and desktop breakpoints
- [ ] No `.env` files with real values committed
- [ ] All design system components render correctly

---

## Task Dependency Order

```
TASK-01 (Next.js init)
  ├── TASK-02 (TypeScript config)
  ├── TASK-03 (ESLint config)
  ├── TASK-04 (Environment system)
  │     └── TASK-14 (Prisma setup)
  │           └── TASK-15 (Initial migration)
  ├── TASK-16 (Health check API)
  ├── TASK-17 (Vitest config)
  └── TASK-18 (Playwright config)
        └── (requires TASK-09 for smoke test)

TASK-05 (Design tokens)
  └── TASK-06 (UI primitives)
        ├── TASK-07 (Marketing layout)
        │     ├── TASK-09 (Landing page)
        │     └── TASK-10 (Auth pages)
        │           └── TASK-13 (404 page)
        └── TASK-08 (Dashboard layout)
              ├── TASK-11 (Dashboard shell)
              └── TASK-12 (Projects pages)

TASK-19 (README) — after all implementation
TASK-20 (Final verification) — last
```

---

## Out of Scope Reminder

The following must not appear in any V0.1 task or implementation:

- AI generation, agents, or inference
- URL crawling or scanning
- DOM/accessibility discovery
- Playwright test generation
- Code repair
- CI/CD pipelines
- Billing or payments
- Real authentication (V0.2)
- GitHub integration
