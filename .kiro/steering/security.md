---
inclusion: always
---

# QAForge — Security Standards

## Principles

Security-conscious patterns are established from V0.1. Even where full security features are not yet implemented, the architecture must not introduce patterns that would undermine security in future versions.

## Secrets Management

- **Never** hard-code secrets, API keys, database credentials, or environment-specific URLs.
- All secrets live in environment variables.
- `.env` and `.env.*` files (except `.env.example`) are always git-ignored.
- `.env.example` documents all required variables with placeholder values — it is safe to commit.
- Secrets are loaded and validated at application startup via `src/lib/env.ts` (Zod-validated).
- Server-side secrets are **never** prefixed with `NEXT_PUBLIC_` — that would expose them to the browser bundle.

```
# ✅ Server-side only (never exposed to browser)
DATABASE_URL=
NEXTAUTH_SECRET=

# ✅ Safe to expose to browser
NEXT_PUBLIC_APP_URL=
```

## Input Validation

- Validate **all** user input and external data before use — at the API boundary (Route Handlers / Server Actions).
- Use **Zod** for runtime schema validation.
- Never trust client-supplied IDs, types, or roles without server-side verification.
- Validate query parameters, path parameters, and request bodies.

```ts
// ✅ Good — validate at the boundary
const schema = z.object({
  name: z.string().min(1).max(100),
  url: z.string().url(),
});

const result = schema.safeParse(await request.json());
if (!result.success) {
  return Response.json({ success: false, error: 'Invalid input' }, { status: 400 });
}
```

## Database Access

- All database access is **server-side only** — Route Handlers, Server Components, Server Actions.
- Use Prisma ORM exclusively — no raw SQL unless Prisma cannot express the query.
- When raw SQL is unavoidable, use **parameterized queries only** — never string-interpolated SQL.
- Prisma's type-safe query builder prevents most SQL injection by design.

```ts
// ✅ Safe — parameterized via Prisma
await db.project.findUnique({ where: { id: projectId } });

// ❌ Never — SQL injection risk
await db.$queryRawUnsafe(`SELECT * FROM projects WHERE id = '${projectId}'`);
```

## Authentication & Authorization

- V0.1 establishes **UI foundations only** — login, register, forgot-password are UI shells.
- Real authentication is implemented in V0.2.
- Even in V0.1, the architecture must not introduce patterns that bypass auth (e.g., trusting client-side role claims).
- Authorization checks must always be **server-side** — middleware or server components — never rely on client-side routing guards alone.
- Prepare the session/auth module structure so V0.2 slots in cleanly.

## HTTP Security Headers

- Next.js `next.config.ts` must define security headers for production:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` (restrictive defaults)
  - `Content-Security-Policy` (to be hardened in V0.2+)

## XSS Prevention

- React's JSX escapes content by default — do not bypass this with `dangerouslySetInnerHTML`.
- If `dangerouslySetInnerHTML` is ever required, sanitize the content with DOMPurify first.

## SSRF Preparation

- V0.4 will introduce URL crawling, which creates SSRF risk.
- V0.1 must **not** implement any URL-fetching functionality.
- When URL input is introduced in V0.4+, it must go through a dedicated SSRF-protection layer:
  - Block private IP ranges (RFC 1918, loopback, link-local)
  - Block cloud metadata endpoints (169.254.169.254, etc.)
  - Use an allowlist or strict validation of schemes and hosts
- Do not implement this system in V0.1 — but do not introduce patterns that would conflict with it.

## Rate Limiting Preparation

- V0.1 does not implement rate limiting.
- Future versions will rate-limit authentication endpoints and API routes.
- Design Route Handlers so rate limiting middleware can be applied cleanly in a later version.

## Dependency Security

- Pin dependency versions in `package.json`.
- Run `npm audit` regularly and before each release.
- Do not introduce dependencies with known high/critical vulnerabilities.
- Prefer well-maintained, widely-used packages.

## Error Handling

- Never expose internal error details, stack traces, or database errors to API responses.
- Log errors server-side; return generic error messages to clients.

```ts
// ✅ Good
catch (error) {
  console.error('[createProject]', error);
  return Response.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
}

// ❌ Bad — leaks internals
catch (error) {
  return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
}
```
