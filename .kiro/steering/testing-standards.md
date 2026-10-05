---
inclusion: always
---

# QAForge — Testing Standards

## Testing Stack

| Type | Tool | Scope |
|------|------|-------|
| End-to-end | Playwright | Full user flows through the browser |
| Unit / Integration | Vitest | Utilities, hooks, components, API logic |
| Component (future) | Vitest + Testing Library | UI component behavior |

## Test File Location

```
tests/
├── e2e/                    # Playwright tests
│   ├── auth/               # Login, register, forgot-password flows
│   ├── dashboard/          # Dashboard navigation
│   └── projects/           # Project management flows
└── unit/                   # Vitest unit tests
    ├── lib/                # Utility function tests
    └── components/         # Component tests (future)

# Co-located unit tests also accepted:
src/lib/format-date.test.ts
src/components/ui/Button.test.tsx
```

## General Principles

- Tests must be **deterministic** — they must not depend on external services or network in unit tests.
- Tests must be **independent** — no shared mutable state between test cases.
- Tests must be **readable** — test names describe the scenario and expected outcome in plain English.
- Avoid testing implementation details — test observable behavior.
- One assertion concept per test (multiple `expect` calls are fine when testing the same concept).

## Naming Convention

```ts
// Pattern: describe("subject") → it("behavior under condition")

describe('Button', () => {
  it('renders with primary variant by default', () => { ... });
  it('applies disabled styles when disabled prop is true', () => { ... });
  it('calls onClick handler when clicked', () => { ... });
});

describe('getInitials', () => {
  it('returns two uppercase letters for a full name', () => { ... });
  it('returns a single letter for a single-word name', () => { ... });
  it('handles empty string gracefully', () => { ... });
});
```

## Unit Tests (Vitest)

- Test all utility functions in `src/lib/`.
- Test custom React hooks in isolation using `renderHook`.
- Test validation schemas (Zod) for both valid and invalid inputs.
- Mock external dependencies (DB, API calls) — unit tests must not hit real infrastructure.
- Run with `vitest --run` for single execution (not watch mode in CI).

```ts
// ✅ Good — focused, clear, no infrastructure
import { describe, it, expect } from 'vitest';
import { getInitials } from '@/lib/utils';

describe('getInitials', () => {
  it('returns initials from a full name', () => {
    expect(getInitials('Jane Doe')).toBe('JD');
  });
});
```

## Playwright E2E Tests

- Tests live in `tests/e2e/`.
- Use the Page Object Model (POM) pattern — page interaction logic lives in page object classes, not inline in tests.
- Test files test user flows, not individual DOM elements.
- Use `data-testid` attributes for reliable selectors — do not depend on CSS classes or text that may change.
- Tests must clean up any data they create (use API routes or DB seed/teardown helpers).
- Run against a known seed state where possible.

```ts
// ✅ Good — POM pattern
// tests/e2e/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password');
  await expect(page).toHaveURL('/dashboard');
});
```

## V0.1 Testing Scope

V0.1 establishes the **testing configuration and foundation** only.

- Configure Playwright (`playwright.config.ts`)
- Configure Vitest (`vitest.config.ts`)
- Write a baseline smoke test (e.g., landing page renders)
- Write unit tests for any utility functions created
- Do not write extensive test suites for features not yet implemented

Full test coverage is a V0.2+ concern, built incrementally alongside features.

## Coverage

- Coverage reporting configured in Vitest.
- No minimum coverage threshold enforced in V0.1 — foundation first.
- Coverage thresholds will be introduced in V0.2+.

## CI Testing (Future)

- Tests will run in CI on every PR to `develop` and `main`.
- `vitest --run` and `playwright test` will both be required to pass.
- V0.1 does not configure CI pipelines — that is V0.2+.
