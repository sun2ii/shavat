-- Per-user settings (translation choice, future reader preferences).
-- Same shape as app_settings, keyed additionally by user_email, so the two
-- tables share one mental model: (scope, key) -> jsonb value.
-- Distinct from app_settings, which is global/admin (svg_debug_mode).

CREATE TABLE IF NOT EXISTS user_settings (
  user_email  TEXT NOT NULL,
  key         TEXT NOT NULL,
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_email, key)
);
