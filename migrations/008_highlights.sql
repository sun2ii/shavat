-- Highlights: a colored mark over a verse range, with an optional note.
-- Account-backed twin of the localStorage highlights in lib/storage.ts.
-- Invariant (enforced in the API, not the schema): one highlight per verse —
-- saving over an overlapping range in the same chapter replaces it.

CREATE TABLE IF NOT EXISTS highlights (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email  TEXT NOT NULL,
  book        TEXT NOT NULL,
  chapter     INT  NOT NULL,
  verse_start INT  NOT NULL,
  verse_end   INT  NOT NULL,
  color       TEXT NOT NULL,
  note        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_highlights_user_chapter ON highlights(user_email, book, chapter);
