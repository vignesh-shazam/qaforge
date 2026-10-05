---
inclusion: always
---

# QAForge — Git Workflow

## Branch Strategy

```
main
└── develop
      └── feat/*
      └── fix/*
      └── chore/*
      └── docs/*
```

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only. Never commit directly. |
| `develop` | Integration branch. All feature branches merge here. |
| `feat/*` | New features — branched from `develop`. |
| `fix/*` | Bug fixes — branched from `develop` (or `main` for hotfixes). |
| `chore/*` | Non-functional changes (deps, config, tooling). |
| `docs/*` | Documentation-only changes. |

## Current Branch

The active development branch for V0.1 is:

```
feat/project-foundation
```

This branch must be kept off `develop` until V0.1 is complete and reviewed.

## Commit Standards

Use **Conventional Commits** format:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types

| Type | When to use |
|------|------------|
| `feat` | A new feature or user-visible capability |
| `fix` | A bug fix |
| `chore` | Build process, dependency, config changes |
| `docs` | Documentation only |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code restructuring — no feature change, no bug fix |
| `test` | Adding or updating tests |
| `ci` | CI/CD configuration |

### Examples

```
feat(auth): add login page UI
feat(projects): scaffold project list page
fix(button): correct focus ring color on dark background
chore(deps): install and configure Prisma
docs(readme): add local development setup instructions
test(utils): add unit tests for getInitials
```

### Rules

- Subject line: 72 characters max, imperative mood, no trailing period.
- Reference issue/ticket numbers in the footer when applicable.
- Do not mix unrelated changes in a single commit.
- Commits must leave the codebase in a working state (no broken builds committed).

## Pull Requests

- All changes to `develop` and `main` go through Pull Requests — no direct commits.
- PR titles follow Conventional Commits format.
- PR descriptions must include:
  - Summary of changes
  - What was tested
  - Any decisions or trade-offs made
  - Blocked or deferred items (if any)
- At least one reviewer approval required before merge (future team policy).
- Squash merge into `develop` to keep history clean.

## What Must Not Be Committed

- `.env`, `.env.local`, `.env.development`, `.env.production`, `.env.staging`
- `node_modules/`
- `.next/` build output
- Any file containing real secrets, API keys, or credentials

The `.gitignore` at repo root already covers these. Do not remove those entries.

## Tagging & Releases

- Version tags use semantic versioning: `v0.1.0`, `v0.2.0`, etc.
- Tags are applied to `main` after a version is merged and verified.
- V0.1 tag: `v0.1.0` — applied after V0.1 implementation is complete and merged to `main`.
