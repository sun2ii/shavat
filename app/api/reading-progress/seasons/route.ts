import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getSeasonInfo, startNewSeason, getReadingHistory, SEASON_COLORS, SEASON_LABELS } from '@/lib/seasons';

// GET: Get current season info and history
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const seasonInfo = await getSeasonInfo(user.email);
    const history = await getReadingHistory(user.email);

    return NextResponse.json({
      currentSeason: seasonInfo.currentSeason,
      seasonColor: SEASON_COLORS[seasonInfo.currentSeason],
      seasonLabel: SEASON_LABELS[seasonInfo.currentSeason],
      startedAt: seasonInfo.startedAt.toISOString(),
      history: history.map((h) => ({
        season: h.season,
        color: SEASON_COLORS[h.season],
        label: SEASON_LABELS[h.season],
        entries: h.entries.map((e) => ({
          book: e.book,
          chapter: e.chapter,
          completedAt: e.completedAt.toISOString(),
        })),
      })),
    });
  } catch (err) {
    console.error('Error fetching season info:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// POST: Start a new season (archive current progress, move to next color)
export async function POST() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await startNewSeason(user.email);

    return NextResponse.json({
      success: true,
      previousSeason: {
        number: result.previousSeason,
        color: SEASON_COLORS[result.previousSeason],
        label: SEASON_LABELS[result.previousSeason],
      },
      newSeason: {
        number: result.newSeason,
        color: SEASON_COLORS[result.newSeason],
        label: SEASON_LABELS[result.newSeason],
      },
      archivedChapters: result.archivedCount,
    });
  } catch (err) {
    console.error('Error starting new season:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
