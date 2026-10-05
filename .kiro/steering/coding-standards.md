---
inclusion: always
---

# QAForge — Coding Standards

## Language & TypeScript

- TypeScript strict mode is always on (`strict: true`).
- `any` is forbidden. Use `unknown` with type guards, or define explicit types.
- All exported functions and React components must have explicit return types.
- Prefer `interface` for object shapes; `type` for unions, intersections, and aliases.
- Use `readonly` on data structures that should not be mutated.
- Use non-null assertion (`!`) only when the null case is structurally impossible — document why.

```ts
// ✅ Good
interface User {
  id: string;
  email: string;
  createdAt: Date;
}

async function getUser(id: string): Promise<User | null> { ... }

// ❌ Bad
async function getUser(id: any): Promise<any> { ... }
```

## File & Folder Naming

| Target | Convention | Example |
|--------|-----------|---------|
| React components | PascalCase | `Button.tsx`, `ProjectCard.tsx` |
| Utility/lib files | kebab-case | `db.ts`, `format-date.ts` |
| Hooks | camelCase prefixed `use` | `useProjects.ts` |
| Types files | kebab-case | `project.types.ts` |
| Test files | co-located or in `tests/` | `Button.test.tsx` |
| Directories | kebab-case | `project-overview/` |

## React Components

- One component per file.
- Use function components — no class components.
- `"use client"` directive only when the component uses browser APIs, event handlers, or React hooks that require the client.
- Server Components are the default.
- Props interfaces are named `[ComponentName]Props`.

```tsx
// ✅ Good
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps): React.JSX.Element {
  ...
}
```

## Imports

- Use absolute imports via `@/` path alias (configured in `tsconfig.json`).
- Group imports: external libraries → internal `@/` imports → relative imports.
- Do not use `../../../` relative paths beyond one level.

```ts
// ✅ Good
import { clsx } from 'clsx';
import { Button } from '@/components/ui/Button';
import type { Project } from '@/types/project.types';
```

## Async & Error Handling

- Always handle Promise rejections — use `try/catch` in async functions.
- Route Handlers and Server Actions must return structured error responses — never let unhandled errors reach the client.
- Do not swallow errors silently.

```ts
// ✅ Good
try {
  const project = await db.project.findUniqueOrThrow({ where: { id } });
  return project;
} catch (error) {
  console.error('[getProject]', error);
  return null;
}
```

## API / Route Handlers

- All Route Handlers live in `src/app/api/`.
- Return consistent JSON response shapes.
- Validate all incoming request bodies before use — use Zod.
- Never trust client-supplied data.

```ts
// Standard response shape
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

## Environment Variables

- Access env vars only via the validated `src/lib/env.ts` module — never via `process.env` directly in application code.
- `src/lib/env.ts` validates required variables at startup using Zod.
- Never expose server-side env vars to client components.

## Formatting & Linting

- ESLint enforces all rules — no lint warnings committed.
- Prettier (via ESLint plugin) enforces formatting.
- `eslint --max-warnings 0` in CI.
- Trailing commas required.
- Single quotes for strings.
- Semicolons required.

## Comments & Documentation

- Write comments to explain *why*, not *what*.
- Public utility functions and hooks must have JSDoc comments.
- Do not leave `TODO` or `FIXME` comments in committed code without a tracking reference.

```ts
/**
 * Returns the initials of a user's display name.
 * Used in avatar components when no profile image is available.
 */
export function getInitials(name: string): string { ... }
```

## Forbidden Patterns

- No `console.log` in committed production code (use structured logging or remove).
- No hardcoded secrets, credentials, URLs, or environment-specific values.
- No `dangerouslySetInnerHTML` without explicit sanitization.
- No direct DOM manipulation outside of `useEffect` with proper cleanup.
- No `eval` or `new Function()`.
