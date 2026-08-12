-- Speaker Reviews Schema
-- Run with: psql $POSTGRES_URL -f migrations/002_speaker_reviews.sql

-- Drop existing table if re-running
DROP TABLE IF EXISTS speaker_reviews;

-- Speaker reviews table (tracks review status for each verse)
CREATE TABLE speaker_reviews (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email              TEXT NOT NULL,
  book                    TEXT NOT NULL,
  chapter                 INT NOT NULL,
  verse                   INT NOT NULL,
  status                  TEXT NOT NULL CHECK (status IN ('approved', 'rejected', 'unsure')),
  comment                 TEXT,
  classification_at_review TEXT,
  proposed_segments       JSONB,
  reviewed_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Each user can only have one review per verse
  UNIQUE(user_email, book, chapter, verse)
);

-- Indexes for common queries
CREATE INDEX idx_speaker_reviews_user_email ON speaker_reviews (user_email);
CREATE INDEX idx_speaker_reviews_book ON speaker_reviews (book);
CREATE INDEX idx_speaker_reviews_book_chapter ON speaker_reviews (book, chapter);
CREATE INDEX idx_speaker_reviews_status ON speaker_reviews (status);
