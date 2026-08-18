-- Bookmarks: deliberate places held by user
-- Plural bookmarks per user, distinct from auto "where I left off" (reading_progress)

CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  book TEXT NOT NULL,
  chapter INT NOT NULL,
  verse INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_email, book, chapter)
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_email);
