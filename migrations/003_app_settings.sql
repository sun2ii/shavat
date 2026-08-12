-- App Settings Schema
-- Run with: psql $POSTGRES_URL -f migrations/003_app_settings.sql

-- Simple key-value store for global app settings
CREATE TABLE IF NOT EXISTS app_settings (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default SVG debug mode (off)
INSERT INTO app_settings (key, value)
VALUES ('svg_debug_mode', 'false'::jsonb)
ON CONFLICT (key) DO NOTHING;
