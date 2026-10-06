# QAForge V0.1 — Requirements

## Overview

V0.1 establishes the complete technical and product foundation for QAForge. No AI, automation, or advanced feature functionality is included. The goal is a clean, scalable, production-ready scaffold that future versions build upon.

---

## Functional Requirements

### FR-01 — Project Initialization

- FR-01.1: The application must be a Next.js project using the App Router.
- FR-01.2: TypeScript must be configured with strict mode enabled.
- FR-01.3: Tailwind CSS must be configured as the styling solution.
- FR-01.4: ESLint must be configured with rules appropriate for a Next.js + TypeScript project.
- FR-01.5: Absolute import paths must be configured via the `@/` alias.
- FR-01.6: A `package.json` with pinned dependency versions must exist.

### FR-02 — Environment Configuration

- FR-02.1: A `.env.example` file must document all required environment variables with placeholder values.
- FR-02.2: A `src/lib/env.ts` module must validate required environment variables at startup using Zod.
- FR-02.3: Application code must access environment variables only via the validated `env` module — never directly via `process.env`.
- FR-02.4: No secrets, credentials, or environment-specific values may be hard-coded anywhere in the codebase.
- FR-02.5: `.env` and all environment files except `.env.example` must be git-ignored.

### FR-03 — Design System Foundation

- FR-03.1: A `Button` component must be implemented with variants (primary, secondary, ghost, destructive) and sizes (sm, md, lg).
- FR-03.2: An `Input` component must be implemented with label, placeholder, error state, and disabled state support.
- FR-03.3: A `Card` component must be implemented as a reusable container surface.
- FR-03.4: A `Badge` component must be implemented with status variants (default, success, warning, error, info).
- FR-03.5: A `Modal`/`Dialog` component foundation must be implemented (open/close, title, body, footer slots).
- FR-03.6: A `Spinner`/loading state component must be implemented.
- FR-03.7: An `EmptyState` component must be implemented (icon, title, description, optional action).
- FR-03.8: An `ErrorState` component must be implemented (message, optional retry action).
- FR-03.9: All design system components must use design tokens (colors, spacing, typography) defined in `tailwind.config.ts`.
- FR-03.10: All design system components must be accessible (ARIA attributes, keyboard navigation, focus management).

### FR-04 — Application Layout

- FR-04.1: A `Header` component must be implemented with the QAForge logo/wordmark and navigation actions.
- FR-04.2: A `Sidebar` component must be implemented with primary navigation links for the dashboard area.
- FR-04.3: A responsive application shell layout must be implemented that composes header and sidebar.
- FR-04.4: The layout must be responsive — sidebar collapses or transforms on mobile viewports.
- FR-04.5: The layout must support a marketing/public layout (no sidebar) and an app/dashboard layout (with sidebar).

### FR-05 — Landing Page

- FR-05.1: A public landing page must exist at the `/` route.
- FR-05.2: The landing page must include a hero section communicating the core product value proposition.
- FR-05.3: The landing page must include a features/capabilities section.
- FR-05.4: The landing page must include a call-to-action directing users to register or log in.
- FR-05.5: The landing page must use the marketing layout (no dashboard sidebar).
- FR-05.6: The landing page must be fully responsive.

### FR-06 — Authentication UI

- FR-06.1: A login page must exist at `/login` with email and password fields, a submit button, and a link to register.
- FR-06.2: A register page must exist at `/register` with name, email, password, and confirm-password fields, and a link to login.
- FR-06.3: A forgot-password page must exist at `/forgot-password` with an email field and submit action.
- FR-06.4: All auth forms must display validation error states.
- FR-06.5: All auth pages must use the public/auth layout (no dashboard sidebar).
- FR-06.6: Auth forms must be implemented as client components with controlled input state.
- FR-06.7: Auth forms must not submit to real API endpoints in V0.1 — form submission is UI-only with placeholder handlers.

### FR-07 — Dashboard Shell

- FR-07.1: A dashboard shell must exist at `/dashboard` using the app layout (header + sidebar).
- FR-07.2: The dashboard shell must display a welcome/overview area as a placeholder for V0.2+ content.
- FR-07.3: Navigation between dashboard sections must work via the sidebar.
- FR-07.4: The dashboard must be visually complete as a shell even without real data.

### FR-08 — Project Management Foundation

- FR-08.1: A projects list page must exist at `/projects`.
- FR-08.2: The projects page must display an empty state when no projects exist.
- FR-08.3: A create project page or modal must exist at `/projects/new` or as an overlay from `/projects`.
- FR-08.4: The create project form must include fields for project name, description, and target URL (UI only in V0.1).
- FR-08.5: A project overview page foundation must exist at `/projects/[id]`.
- FR-08.6: The project overview must display a placeholder shell for V0.2+ content.

### FR-09 — Database Foundation

- FR-09.1: Prisma must be installed and configured with a PostgreSQL provider.
- FR-09.2: A `prisma/schema.prisma` file must define the initial schema.
- FR-09.3: The initial schema must include a `User` model with `id`, `email`, `name`, `passwordHash`, `createdAt`, `updatedAt`.
- FR-09.4: The initial schema must include a `Project` model with `id`, `name`, `description`, `targetUrl`, `userId` (owner), `createdAt`, `updatedAt`.
- FR-09.5: A Prisma client singleton must exist at `src/lib/db.ts` to prevent connection pool exhaustion in development.
- FR-09.6: A migration must be created for the initial schema (for local development use).
- FR-09.7: A `prisma/seed.ts` file must exist as a placeholder for future test data seeding.

### FR-10 — Testing Foundation

- FR-10.1: Playwright must be installed and configured via `playwright.config.ts`.
- FR-10.2: Vitest must be installed and configured via `vitest.config.ts`.
- FR-10.3: At minimum one Playwright smoke test must verify the landing page loads successfully.
- FR-10.4: At minimum one Vitest unit test must verify a utility function.
- FR-10.5: Both test runners must execute successfully with `npm run test:e2e` and `npm run test:unit`.

### FR-11 — Documentation Foundation

- FR-11.1: A `README.md` must exist at the repository root with local development setup instructions.
- FR-11.2: The README must document required environment variables (referencing `.env.example`).
- FR-11.3: The README must document available npm scripts.
- FR-11.4: The README must document the Git branching strategy.

---

## Non-Functional Requirements

### NFR-01 — Performance

- NFR-01.1: The landing page must achieve a Lighthouse performance score of ≥ 85 in development (target baseline).
- NFR-01.2: Server Components must be used by default; client components only where interaction is required.
- NFR-01.3: No unnecessary third-party scripts or fonts that block rendering.

### NFR-02 — Accessibility

- NFR-02.1: All interactive components must be keyboard-navigable.
- NFR-02.2: All form inputs must have associated labels.
- NFR-02.3: Color contrast must meet WCAG AA minimum (4.5:1 for normal text).
- NFR-02.4: All images must have meaningful `alt` attributes.
- NFR-02.5: Semantic HTML elements must be used throughout (`nav`, `main`, `header`, `footer`, `section`, etc.).

### NFR-03 — Security

- NFR-03.1: No secrets may be committed to git.
- NFR-03.2: All environment variables must be validated at startup.
- NFR-03.3: Database access must be server-side only.
- NFR-03.4: HTTP security headers must be configured in `next.config.ts`.
- NFR-03.5: No `dangerouslySetInnerHTML` without sanitization.

### NFR-04 — Code Quality

- NFR-04.1: TypeScript strict mode must pass with zero errors.
- NFR-04.2: ESLint must pass with zero warnings (`--max-warnings 0`).
- NFR-04.3: All exported functions must have explicit return types.
- NFR-04.4: No `any` types in committed code.

### NFR-05 — Developer Experience

- NFR-05.1: Local development setup must be achievable with `npm install` + environment file setup + `npm run dev`.
- NFR-05.2: All npm scripts must be documented in `README.md`.
- NFR-05.3: The project must be understandable to a new developer without oral knowledge transfer.

### NFR-06 — Maintainability

- NFR-06.1: Component responsibilities must be clearly separated.
- NFR-06.2: No circular dependencies between modules.
- NFR-06.3: Design tokens must be centralised in Tailwind config — not scattered as magic values.
