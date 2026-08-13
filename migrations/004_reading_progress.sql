-- Reading progress tracking per user
-- Tracks which chapters a user has completed

CREATE TABLE reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  book TEXT NOT NULL,
  chapter INT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_email, book, chapter)
);

CREATE INDEX idx_reading_progress_user_book ON reading_progress(user_email, book);
