-- Restore Christian Readings history from reading_history back to reading_progress
-- Christian Readings always use season 1

-- Insert archived Christian Readings back to reading_progress
-- Uses ON CONFLICT to handle any duplicates (keeps the most recent completed_at)
INSERT INTO reading_progress (user_email, book, chapter, season, completed_at)
SELECT
  user_email,
  book,
  chapter,
  1 as season,  -- Christian Readings always use season 1
  completed_at
FROM reading_history
WHERE
  -- Match Christian Readings: confessions-*, imitation-*, conversations, letters
  book LIKE 'confessions-%'
  OR book LIKE 'imitation-%'
  OR book = 'conversations'
  OR book = 'letters'
ON CONFLICT (user_email, book, chapter, season)
DO UPDATE SET completed_at = GREATEST(reading_progress.completed_at, EXCLUDED.completed_at);

-- Optionally: Remove the restored Christian Readings from reading_history
-- Uncomment if you want to clean up the archive after restore
-- DELETE FROM reading_history
-- WHERE
--   book LIKE 'confessions-%'
--   OR book LIKE 'imitation-%'
--   OR book = 'conversations'
--   OR book = 'letters';
