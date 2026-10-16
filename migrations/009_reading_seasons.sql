-- Reading seasons: track which "read-through" the user is on
-- Season 1 = Gold, Season 2 = Purple, Season 3 = Green, then cycles

-- Track user's current season
CREATE TABLE reading_seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL UNIQUE,
  current_season INT NOT NULL DEFAULT 1 CHECK (current_season BETWEEN 1 AND 3),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reading_seasons_user ON reading_seasons(user_email);

-- Add season column to existing reading_progress
-- Default to 1 for existing data (first read-through)
ALTER TABLE reading_progress ADD COLUMN season INT NOT NULL DEFAULT 1;

-- Drop the old unique constraint and create a new one that includes season
ALTER TABLE reading_progress DROP CONSTRAINT reading_progress_user_email_book_chapter_key;
ALTER TABLE reading_progress ADD CONSTRAINT reading_progress_user_email_book_chapter_season_key
  UNIQUE(user_email, book, chapter, season);

-- Archive table for completed seasons
-- When user starts a new season, current progress moves here
CREATE TABLE reading_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  season INT NOT NULL CHECK (season BETWEEN 1 AND 3),
  book TEXT NOT NULL,
  chapter INT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL,
  archived_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reading_history_user_season ON reading_history(user_email, season);
CREATE INDEX idx_reading_history_user ON reading_history(user_email);
