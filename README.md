# QAForge

> "QAForge turns your web application into a production-ready automation framework."

QAForge is an AI-powered QA engineering SaaS platform that helps QA Engineers, SDETs, and automation engineers produce high-quality Playwright automation frameworks from their existing web applications.

**Current version:** V0.1 — Foundation

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL + Prisma ORM |
| Unit testing | Vitest |
| E2E testing | Playwright |
| Runtime | Node.js 20+ |

---

## Prerequisites

- **Node.js** 20 or higher (`node --version`)
- **npm** 10 or higher (`npm --version`)
- **PostgreSQL** 14 or higher running locally (for database features)

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd qaforge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the required values:

```bash
# Minimum required for local development
DATABASE_URL=postgresql://postgres:password@localhost:5432/qaforge_dev
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

See `.env.example` for full documentation of all variables.

### 4. Set up the database

Ensure PostgreSQL is running, then:

```bash
# Create and apply the initial migration
npm run prisma:migrate

# Generate the Prisma client (also runs automatically on install)
npm run prisma:generate
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint (zero warnings enforced) |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run type-check` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm run test:unit` | Run Vitest unit tests (single run) |
| `npm run test:unit:watch` | Run Vitest in watch mode |
| `npm run test:unit:coverage` | Run unit tests with coverage report |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Run Playwright with interactive UI |
| `npm run prisma:generate` | Regenerate Prisma client after schema changes |
| `npm run prisma:migrate` | Create and apply a new migration |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |
| `npm run prisma:seed` | Seed the database with development data |

---

## Environment Variables

All variables are documented in `.env.example`. The application validates required variables at startup — a missing required variable will cause a clear error message.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public base URL of the application |
| `NEXTAUTH_URL` | V0.2 | Auth callback URL (not used in V0.1) |
| `NEXTAUTH_SECRET` | V0.2 | Auth secret (not used in V0.1) |

**Never commit `.env.local` or any file with real credentials.**

---

## Project Structure

```
qaforge/
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Database seed script
│   └── migrations/          # Prisma migration files
│
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (marketing)/     # Public landing page
│   │   ├── (auth)/          # Login, register, forgot-password
│   │   ├── (dashboard)/     # Authenticated app shell
│   │   └── api/             # Route handlers
│   │
│   ├── components/
│   │   ├── ui/              # Design system primitives
│   │   └── layout/          # Layout components
│   │
│   ├── lib/
│   │   ├── db.ts            # Prisma client singleton
│   │   ├── env.ts           # Validated environment config
│   │   └── utils.ts         # Utility functions
│   │
│   └── types/               # Shared TypeScript types
│
├── tests/
│   ├── e2e/                 # Playwright E2E tests
│   └── unit/                # Vitest unit tests
│
├── .env.example             # Environment variable template
├── next.config.ts           # Next.js configuration
├── playwright.config.ts     # Playwright configuration
├── vitest.config.ts         # Vitest configuration
└── tsconfig.json            # TypeScript configuration
```

---

## Git Branching Strategy

```
main                   ← production-ready releases only
└── develop            ← integration branch
      └── feat/*       ← feature branches
      └── fix/*        ← bug fixes
      └── chore/*      ← tooling / config changes
```

- **Never commit directly to `main` or `develop`.**
- All changes go through Pull Requests.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) format.

Current branch: `feat/project-foundation` (V0.1)

---

## Running Tests

### Unit tests

```bash
npm run test:unit
```

### E2E tests

First install Playwright browsers (one-time setup):

```bash
npx playwright install chromium
```

Then run tests (requires the dev server or a running app instance):

```bash
npm run test:e2e
```

The Playwright config automatically starts the dev server when running locally.

---

## Version Roadmap

| Version | Theme |
|---------|-------|
| **V0.1** | Foundation — scaffold, design system, auth UI, dashboard shell ← *current* |
| V0.2 | Authentication — real auth flows, session management |
| V0.3 | Project management — full CRUD, workspace |
| V0.4 | Discovery — URL crawling, DOM analysis |
| V0.5 | Generation — AI test generation, Playwright output |
| V0.6 | Validation & Repair — quality scoring, self-healing |
| V0.7 | Export & Execute — CI/CD, GitHub integration |

---

## Security

- Secrets are never committed to version control
- All environment variables are validated at startup
- Database access is server-side only
- See `.kiro/steering/security.md` for the full security standards

---

## Contributing

See `.kiro/steering/` for coding standards, architecture decisions, and git workflow guidelines. All contributors should read these before submitting changes.
