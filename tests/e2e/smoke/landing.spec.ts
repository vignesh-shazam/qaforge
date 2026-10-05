import { test, expect } from "@playwright/test";

/**
 * Smoke tests — verify the application starts and core pages load.
 * These are the baseline E2E tests for QAForge V0.1.
 */

test.describe("Landing page", () => {
  test("loads and displays the hero headline", async ({ page }) => {
    await page.goto("/");

    // Page title
    await expect(page).toHaveTitle(/QAForge/);

    // Hero headline is visible
    await expect(
      page.getByRole("heading", { level: 1 }),
    ).toBeVisible();

    // CTA link is present
    await expect(
      page.getByRole("link", { name: /get started/i }).first(),
    ).toBeVisible();
  });

  test("navigation links are present in the header", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: /log in/i })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /get started/i }).first(),
    ).toBeVisible();
  });

  test("pipeline section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /pipeline/i }),
    ).toBeVisible();
  });
});

test.describe("Authentication pages", () => {
  test("login page loads with email and password fields", async ({ page }) => {
    await page.goto("/login");

    await expect(page).toHaveTitle(/Log in/i);
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i).first()).toBeVisible();
    await expect(
      page.getByRole("button", { name: /log in/i }),
    ).toBeVisible();
  });

  test("register page loads with all fields", async ({ page }) => {
    await page.goto("/register");

    await expect(page).toHaveTitle(/Create account/i);
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
  });

  test("forgot password page loads", async ({ page }) => {
    await page.goto("/forgot-password");

    await expect(page).toHaveTitle(/Reset password/i);
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /send reset link/i }),
    ).toBeVisible();
  });
});

test.describe("Dashboard", () => {
  test("dashboard page loads", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveTitle(/Dashboard/i);
    await expect(
      page.getByRole("heading", { name: /dashboard/i, level: 1 }),
    ).toBeVisible();
  });

  test("projects page loads with empty state", async ({ page }) => {
    await page.goto("/projects");

    await expect(page).toHaveTitle(/Projects/i);
    await expect(
      page.getByText(/no projects yet/i),
    ).toBeVisible();
  });
});

test.describe("404 page", () => {
  test("unknown route shows 404 page", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");

    await expect(page.getByText(/page not found/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /go home/i })).toBeVisible();
  });
});

test.describe("API", () => {
  test("health check endpoint returns ok", async ({ request }) => {
    const response = await request.get("/api/health");

    expect(response.status()).toBe(200);

    const body = await response.json() as { status: string; timestamp: string; version: string };
    expect(body.status).toBe("ok");
    expect(body.version).toBe("0.1.0");
    expect(typeof body.timestamp).toBe("string");
  });
});
