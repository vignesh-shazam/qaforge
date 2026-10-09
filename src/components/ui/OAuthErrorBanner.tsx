"use client";

import { useSearchParams } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
  google_cancelled: "Google sign-in was cancelled. Please try again.",
  invalid_callback: "Invalid OAuth callback. Please try again.",
  invalid_state: "Security check failed. Please try again.",
  oauth_not_configured: "Google sign-in is not available right now.",
  oauth_failed: "Google sign-in failed. Please try email/password instead.",
  no_id_token: "Could not verify your Google identity. Please try again.",
  unverified_email: "Your Google email is not verified. Please verify it first.",
  email_exists: "An account with this email already exists. Please sign in with email and password.",
};

export function OAuthErrorBanner(): React.JSX.Element | null {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  if (!error) return null;

  const message = ERROR_MESSAGES[error] ?? "An error occurred. Please try again.";

  return (
    <div
      className="rounded-xl px-4 py-3 text-sm"
      role="alert"
      aria-live="assertive"
      style={{
        background: "rgba(239,68,68,0.1)",
        border: "1px solid rgba(239,68,68,0.3)",
        color: "#fca5a5",
      }}
    >
      {message}
    </div>
  );
}