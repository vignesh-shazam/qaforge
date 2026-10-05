# QAForge V0.1 — Design & Architecture

## Application Directory Structure

```
qaforge/
├── .kiro/
│   ├── steering/
│   │   ├── product.md
│   │   ├── architecture.md
│   │   ├── coding-standards.md
│   │   ├── testing-standards.md
│   │   ├── security.md
│   │   └── git-workflow.md
│   └── specs/
│       └── v0.1-foundation/
│           ├── requirements.md
│           ├── design.md          ← this file
│           └── tasks.md
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   └── page.tsx                  # Landing page
│   │   ├── (auth)/
│   │   │   ├── layout.tsx                # AuthLayout (minimal centered card)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── forgot-password/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                # Dashboard shell layout
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── projects/
│   │   │       ├── page.tsx              # Projects list
│   │   │       ├── new/
│   │   │       │   └── page.tsx          # Create project
│   │   │       └── [id]/
│   │   │           └── page.tsx          # Project overview
│   │   ├── api/
│   │   │   └── health/
│   │   │       └── route.ts              # Health check endpoint
│   │   ├── layout.tsx                    # Root layout
│   │   ├── globals.css                   # Tailwind entry point
│   │   └── not-found.tsx                 # 404 page
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── ErrorState.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       ├── MarketingLayout.tsx
│   │       └── DashboardLayout.tsx
│   │
│   ├── lib/
│   │   ├── db.ts                         # Prisma client singleton
│   │   ├── env.ts                        # Zod-validated env config
│   │   └── utils.ts                      # General utilities (cn, getInitials, etc.)
│   │
│   ├── hooks/
│   │   └── (empty in V0.1 — placeholder)
│   │
│   ├── types/
│   │   └── index.ts                      # Shared TypeScript types
│   │
│   └── styles/
│       └── (globals.css lives in app/ per Next.js convention)
│
├── tests/
│   ├── e2e/
│   │   └── smoke/
│   │       └── landing.spec.ts
│   └── unit/
│       └── lib/
│           └── utils.test.ts
│
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── playwright.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

---

## Component Architecture

### Design System Layer — `src/components/ui/`

Primitive components that form the visual vocabulary of QAForge. They are:
- Stateless where possible
- Controlled where state is needed (forms)
- Styled via Tailwind + CVA variants
- Accessible by default

| Component | Key Props | Variants |
|-----------|-----------|---------|
| `Button` | `variant`, `size`, `disabled`, `loading`, `children`, `onClick` | primary, secondary, ghost, destructive |
| `Input` | `label`, `placeholder`, `error`, `disabled`, `type`, `...rest` | default, error |
| `Card` | `children`, `className` | — (composable) |
| `Badge` | `variant`, `children` | default, success, warning, error, info |
| `Modal` | `open`, `onClose`, `title`, `children`, `footer` | — |
| `Spinner` | `size`, `className` | sm, md, lg |
| `EmptyState` | `icon`, `title`, `description`, `action` | — |
| `ErrorState` | `message`, `onRetry` | — |

### Layout Layer — `src/components/layout/`

Structural components that compose UI primitives into page shells.

**`MarketingLayout`** — wraps public landing pages. Contains:
- Public `Header` with logo + nav links (Login, Get Started)
- `Footer` with minimal links
- `main` content slot

**`AuthLayout`** — wraps auth pages (login, register, forgot-password). Contains:
- Minimal centered card layout
- QAForge branding (logo/wordmark)
- No full marketing navigation or footer
- Responsive, clean professional SaaS appearance

**`DashboardLayout`** — wraps authenticated app pages. Contains:
- App `Header` with logo + user menu placeholder
- `Sidebar` with primary nav (Dashboard, Projects)
- `main` content area with responsive behavior

### Page Layer — `src/app/`

Pages compose layout + feature components. They are Server Components by default, delegating interactivity to client sub-components (e.g., forms).

---

## Routing Architecture

Next.js App Router with route groups:

| Route Group | Path Prefix | Layout Used |
|-------------|-------------|-------------|
| `(marketing)` | `/` | MarketingLayout |
| `(auth)` | `/login`, `/register`, `/forgot-password` | AuthLayout (minimal centered card, QAForge branding, no marketing nav/footer) |
| `(dashboard)` | `/dashboard`, `/projects/*` | DashboardLayout |

Route groups use parentheses `()` and do **not** appear in URLs.

---

## Database Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String    @id @default(cuid())
  email        String    @unique
  name         String?
  passwordHash String
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  projects     Project[]
}

model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  targetUrl   String?
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Design notes:**
- `cuid()` used for IDs — URL-safe, sortable, avoids UUID generation cost.
- `passwordHash` — never store plain-text passwords. The field name makes this explicit. V0.2 populates it via bcrypt/argon2.
- `targetUrl` is optional in V0.1 — projects can exist before a URL is provided.
- `onDelete: Cascade` — deleting a user removes their projects.

---

## Environment Configuration

### Variables

```bash
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/qaforge_dev

# Authentication (V0.2 — placeholder in V0.1)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Future (V0.4+)
# SSRF_ALLOWED_DOMAINS=
```

### Validated Env Module (`src/lib/env.ts`)

Uses Zod to parse and validate at startup. Server-side variables are not exported to client code. Any missing required variable fails the app at boot with a clear error message.

---

## Design Tokens

Defined in `tailwind.config.ts` and extended as needed:

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `brand.500` | `#6366f1` (indigo) | Primary actions, accents |
| `brand.600` | `#4f46e5` | Hover states |
| `surface.900` | `#0f0f11` | App background (dark) |
| `surface.800` | `#18181b` | Card backgrounds |
| `surface.700` | `#27272a` | Elevated surfaces, borders |
| `surface.600` | `#3f3f46` | Subtle borders |
| `content.primary` | `#fafafa` | Primary text |
| `content.secondary` | `#a1a1aa` | Secondary/muted text |
| `content.tertiary` | `#71717a` | Placeholder, disabled |
| `success` | `#22c55e` | Success states |
| `warning` | `#f59e0b` | Warning states |
| `error` | `#ef4444` | Error states |
| `info` | `#3b82f6` | Informational states |

### Typography

- Font family: `Inter` (Google Fonts / self-hosted via `next/font`)
- Monospace: `JetBrains Mono` for code display (future use)
- Scale: Tailwind default with minor customization

---

## Security Headers (`next.config.ts`)

```ts
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];
```

CSP will be hardened in V0.2+ once auth and third-party integrations are defined.

---

## Testing Architecture

### Playwright Config (`playwright.config.ts`)

- Base URL: `http://localhost:3000`
- Browsers: Chromium (default), Firefox, WebKit (optional in CI)
- Test directory: `tests/e2e/`
- Reporter: `html` (local), `line` (CI)
- Automatic dev server start for local runs

### Vitest Config (`vitest.config.ts`)

- Environment: `jsdom` (for component tests)
- Globals: enabled
- Coverage provider: `v8`
- Include: `src/**/*.test.{ts,tsx}`, `tests/unit/**/*.test.ts`

---

## API Design

### Health Check — `GET /api/health`

Returns application health status. Used for deployment readiness checks.

```json
{ "status": "ok", "timestamp": "2026-10-06T00:00:00.000Z" }
```

All future API routes follow the standard response shape:

```ts
type ApiSuccess<T> = { success: true; data: T };
type ApiError = { success: false; error: string };
type ApiResponse<T> = ApiSuccess<T> | ApiError;
```

---

## Dependency List (Proposed)

### Production

| Package | Purpose |
|---------|---------|
| `next` | Framework |
| `react`, `react-dom` | UI library |
| `typescript` | Language |
| `tailwindcss` | Styling |
| `@prisma/client` | Database ORM client |
| `zod` | Schema validation |
| `clsx` | Conditional class merging |
| `tailwind-merge` | Tailwind class deduplication |
| `class-variance-authority` | Component variant management |

### Development

| Package | Purpose |
|---------|---------|
| `prisma` | ORM CLI and migrations |
| `eslint` | Linting |
| `@eslint/eslintrc` | ESLint config |
| `vitest` | Unit test runner |
| `@vitest/coverage-v8` | Coverage |
| `@testing-library/react` | Component testing |
| `@testing-library/jest-dom` | DOM assertions |
| `@playwright/test` | E2E testing |
| `jsdom` | Browser environment for Vitest |

All versions pinned to exact values in `package.json`.
