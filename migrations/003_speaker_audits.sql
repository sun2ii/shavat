-- Speaker Audits Schema (stores audit report data for production)
-- Run with: psql $POSTGRES_URL -f migrations/003_speaker_audits.sql

-- Drop existing tables if re-running
DROP TABLE IF EXISTS speaker_audit_verses;
DROP TABLE IF EXISTS speaker_audits;

-- Speaker audits table (one row per book audit)
CREATE TABLE speaker_audits (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book            TEXT NOT NULL UNIQUE,
  timestamp       TIMESTAMPTZ NOT NULL,
  summary         JSONB NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Speaker audit verses (individual verse audit data)
CREATE TABLE speaker_audit_verses (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id            UUID NOT NULL REFERENCES speaker_audits(id) ON DELETE CASCADE,
  book                TEXT NOT NULL,
  chapter             INT NOT NULL,
  verse               INT NOT NULL,
  canonical_text      TEXT NOT NULL,
  previous_verse      TEXT,
  next_verse          TEXT,
  spans               JSONB NOT NULL,
  classification      TEXT NOT NULL CHECK (classification IN ('GREEN', 'YELLOW', 'RED', 'BROKEN')),
  reasons             JSONB NOT NULL,
  current_segments    JSONB NOT NULL,
  proposed_segments   JSONB,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(book, chapter, verse)
);

-- Indexes
CREATE INDEX idx_speaker_audits_book ON speaker_audits (book);
CREATE INDEX idx_speaker_audit_verses_audit_id ON speaker_audit_verses (audit_id);
CREATE INDEX idx_speaker_audit_verses_book ON speaker_audit_verses (book);
CREATE INDEX idx_speaker_audit_verses_book_chapter ON speaker_audit_verses (book, chapter);
CREATE INDEX idx_speaker_audit_verses_classification ON speaker_audit_verses (classification);
