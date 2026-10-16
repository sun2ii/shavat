import { sql } from '@/lib/db';

export type Season = 1 | 2 | 3;

export const SEASON_COLORS = {
  1: 'gold',
  2: 'purple',
  3: 'green',
} as const;

export const SEASON_LABELS = {
  1: 'First Reading',
  2: 'Second Reading',
  3: 'Third Reading',
} as const;

export type SeasonColor = (typeof SEASON_COLORS)[Season];

export async function getCurrentSeason(userEmail: string): Promise<Season> {
  const rows = await sql`
    SELECT current_season FROM reading_seasons WHERE user_email = ${userEmail}
  `;

  if (rows.length === 0) {
    // Initialize user with season 1
    await sql`
      INSERT INTO reading_seasons (user_email, current_season, started_at)
      VALUES (${userEmail}, 1, NOW())
      ON CONFLICT (user_email) DO NOTHING
    `;
    return 1;
  }

  return rows[0].current_season as Season;
}

export async function getSeasonInfo(userEmail: string): Promise<{
  currentSeason: Season;
  startedAt: Date;
}> {
  const rows = await sql`
    SELECT current_season, started_at FROM reading_seasons WHERE user_email = ${userEmail}
  `;

  if (rows.length === 0) {
    await sql`
      INSERT INTO reading_seasons (user_email, current_season, started_at)
      VALUES (${userEmail}, 1, NOW())
    `;
    return { currentSeason: 1, startedAt: new Date() };
  }

  return {
    currentSeason: rows[0].current_season as Season,
    startedAt: new Date(rows[0].started_at as string),
  };
}

export function nextSeason(current: Season): Season {
  // Cycle: 1 -> 2 -> 3 -> 1
  return ((current % 3) + 1) as Season;
}

export async function startNewSeason(userEmail: string): Promise<{
  previousSeason: Season;
  newSeason: Season;
  archivedCount: number;
}> {
  const currentSeason = await getCurrentSeason(userEmail);
  const newSeason = nextSeason(currentSeason);

  // Archive current progress to reading_history
  const archiveResult = await sql`
    INSERT INTO reading_history (user_email, season, book, chapter, completed_at, archived_at)
    SELECT user_email, season, book, chapter, completed_at, NOW()
    FROM reading_progress
    WHERE user_email = ${userEmail} AND season = ${currentSeason}
    RETURNING id
  `;

  // Delete current season's progress (it's now archived)
  await sql`
    DELETE FROM reading_progress
    WHERE user_email = ${userEmail} AND season = ${currentSeason}
  `;

  // Update to new season
  await sql`
    UPDATE reading_seasons
    SET current_season = ${newSeason}, started_at = NOW()
    WHERE user_email = ${userEmail}
  `;

  return {
    previousSeason: currentSeason,
    newSeason,
    archivedCount: archiveResult.length,
  };
}

export async function getReadingHistory(userEmail: string): Promise<{
  season: Season;
  entries: Array<{
    book: string;
    chapter: number;
    completedAt: Date;
  }>;
}[]> {
  const rows = await sql`
    SELECT season, book, chapter, completed_at
    FROM reading_history
    WHERE user_email = ${userEmail}
    ORDER BY season, completed_at
  `;

  // Group by season
  const bySeasonMap = new Map<Season, Array<{ book: string; chapter: number; completedAt: Date }>>();

  for (const row of rows) {
    const season = row.season as Season;
    if (!bySeasonMap.has(season)) {
      bySeasonMap.set(season, []);
    }
    bySeasonMap.get(season)!.push({
      book: row.book as string,
      chapter: row.chapter as number,
      completedAt: new Date(row.completed_at as string),
    });
  }

  return Array.from(bySeasonMap.entries()).map(([season, entries]) => ({
    season,
    entries,
  }));
}
