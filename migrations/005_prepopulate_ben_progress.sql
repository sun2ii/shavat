-- Prepopulate reading progress for ben@binary1702.com
-- Run this after 004_reading_progress.sql

-- Torah (Pentateuch) - All 5 books complete
INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'genesis', generate_series(1, 50)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'exodus', generate_series(1, 40)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'leviticus', generate_series(1, 27)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'numbers', generate_series(1, 36)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'deuteronomy', generate_series(1, 34)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

-- Historical Books: Joshua, Judges, Ruth, 1-2 Samuel, 1-2 Kings
INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'joshua', generate_series(1, 24)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'judges', generate_series(1, 21)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'ruth', generate_series(1, 4)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', '1-samuel', generate_series(1, 31)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', '2-samuel', generate_series(1, 24)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', '1-kings', generate_series(1, 22)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', '2-kings', generate_series(1, 25)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

-- Minor Prophets: Jonah, Amos (complete), Hosea (first 2 sections = chapters 1-8)
INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'jonah', generate_series(1, 4)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'amos', generate_series(1, 9)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'hosea', generate_series(1, 8)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

-- Gospels - All 4 complete
INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'matthew', generate_series(1, 28)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'mark', generate_series(1, 16)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'luke', generate_series(1, 24)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'john', generate_series(1, 21)
ON CONFLICT (user_email, book, chapter) DO NOTHING;

-- Acts - Complete
INSERT INTO reading_progress (user_email, book, chapter)
SELECT 'ben@binary1702.com', 'acts', generate_series(1, 28)
ON CONFLICT (user_email, book, chapter) DO NOTHING;
