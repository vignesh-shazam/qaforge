---
inclusion: always
---

# QAForge — Product Steering

## Product Vision

> "QAForge turns your web application into a production-ready automation framework."

## Core Product Direction

```
URL → Discover → Design → Generate → Validate → Repair → Export → Execute
```

QAForge is an AI-powered QA engineering SaaS platform that helps QA Engineers, SDETs, Automation Engineers, and development teams produce high-quality Playwright automation frameworks from their existing web applications.

## Primary Users

- QA Engineers
- SDET Engineers
- Automation Engineers
- QA Leads
- Software Development Teams

## Version Roadmap (Summary)

| Version | Theme | Status |
|---------|-------|--------|
| V0.1 | Foundation — project scaffold, design system, auth UI, dashboard shell, DB schema | **In Progress** |
| V0.2 | Authentication — real auth flows, session management, user accounts | Planned |
| V0.3 | Project management — full CRUD, workspace, settings | Planned |
| V0.4 | Discovery — URL crawling, DOM analysis, SSRF-safe browser worker | Planned |
| V0.5 | Generation — AI test generation, Playwright code output | Planned |
| V0.6 | Validation & Repair — code quality scoring, AI repair engine | Planned |
| V0.7 | Export & Execute — CI/CD, GitHub integration, execution engine | Planned |

## V0.1 Scope Boundary

V0.1 is the **technical and product foundation only**.

### In Scope

- Next.js application initialization
- React + TypeScript
- Tailwind CSS global styling
- ESLint and code quality configuration
- Reusable design system (buttons, inputs, cards, badges, modals, loading/empty/error states)
- Application layout (header, sidebar, responsive shell)
- Landing page
- Authentication UI (login, register, forgot password — UI only, no real auth)
- Dashboard shell
- Projects page + create project UI + project overview foundation
- PostgreSQL + Prisma setup + initial schema foundation
- Environment configuration (LOCAL + DEV only)
- Testing configuration (Playwright + unit)
- Documentation foundation
- Kiro steering and specification structure

### Out of Scope for V0.1

The following must **not** be implemented in V0.1:

- AI generation of any kind
- AI agents
- URL crawling or website scanning
- SSRF browser worker
- DOM or accessibility discovery
- Locator intelligence
- Playwright automation generation
- Test Flow Recorder
- Code generation or repair engine
- Monaco code workspace
- Automation quality score
- GitHub integration
- CI/CD execution
- Billing, payments, or subscriptions
- Multi-framework support (Selenium, Cypress)
- Enterprise features
- Mobile application

## Design Direction

QAForge targets professional QA and automation engineers. The UI must reflect that:

- **Dark-first** visual direction
- Professional, clean, technical aesthetic
- Strong visual hierarchy
- Developer-focused — not a generic AI chatbot look
- Enterprise-ready
- Minimal unnecessary decoration
- Fully responsive

## Product Rule

The product requirements are the source of truth. Do not silently change scope, architecture, technology choices, version boundaries, Git strategy, or environment strategy. If a conflict or ambiguity is identified, stop and report it before implementing.
