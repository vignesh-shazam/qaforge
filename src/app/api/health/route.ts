import { type NextRequest, NextResponse } from "next/server";

interface HealthResponse {
  status: "ok";
  timestamp: string;
  version: string;
}

/**
 * GET /api/health
 *
 * Application health check endpoint.
 * Returns HTTP 200 when the application is running.
 * Used for deployment readiness checks and uptime monitoring.
 */
export function GET(_request: NextRequest): NextResponse<HealthResponse> {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "0.1.0",
  });
}
