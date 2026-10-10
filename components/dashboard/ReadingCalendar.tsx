'use client';

import { useMemo, useState } from 'react';

type ColorScheme = 'gold' | 'blue';

interface Props {
  /** Map of YYYY-MM-DD -> chapter count */
  data: Record<string, number>;
  /** Color scheme for the calendar cells */
  colorScheme?: ColorScheme;
  /** Number of weeks to show (default 53 = ~1 year) */
  weeks?: number;
}

// Generate calendar days ending on today
function generateCalendarDays(numWeeks: number = 53): Date[] {
  const today = new Date();
  const days: Date[] = [];

  // Start from (numWeeks - 1) weeks ago, aligned to Sunday
  const daysBack = (numWeeks - 1) * 7;
  const start = new Date(today);
  start.setDate(start.getDate() - daysBack - start.getDay());

  // Generate all days up to and including today
  const current = new Date(start);
  while (current <= today) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Map chapter count to intensity level 0-4
function getIntensity(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

// Color schemes following GitHub's contribution pattern (brighter = more)
const COLOR_SCHEMES: Record<ColorScheme, string[]> = {
  gold: [
    'rgb(var(--bg-secondary))',           // 0: empty
    '#7a5806',                            // 1: darkest gold
    '#9a6f08',                            // 2: darker
    '#b8860b',                            // 3: dark goldenrod
    '#d4a54a',                            // 4: brightest gold
  ],
  blue: [
    'rgb(var(--bg-secondary))',           // 0: empty
    '#1e3a5f',                            // 1: darkest blue
    '#2563eb',                            // 2: darker
    '#3b82f6',                            // 3: medium blue
    '#60a5fa',                            // 4: brightest blue
  ],
};

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ReadingCalendar({ data, colorScheme = 'gold', weeks: numWeeks = 53 }: Props) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string; alignRight?: boolean } | null>(null);
  const colors = COLOR_SCHEMES[colorScheme];

  const { weeks, monthMarkers } = useMemo(() => {
    const allDays = generateCalendarDays(numWeeks);

    // Group into weeks (7 days each, starting Sunday)
    const weekGroups: Date[][] = [];
    let currentWeek: Date[] = [];

    for (const day of allDays) {
      if (day.getDay() === 0 && currentWeek.length > 0) {
        weekGroups.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    }
    if (currentWeek.length > 0) {
      weekGroups.push(currentWeek);
    }

    // Find month boundaries for labels
    const markers: { weekIndex: number; month: number }[] = [];
    let lastMonth = -1;

    weekGroups.forEach((week, weekIndex) => {
      const firstDay = week[0];
      const month = firstDay.getMonth();
      if (month !== lastMonth) {
        markers.push({ weekIndex, month });
        lastMonth = month;
      }
    });

    return { weeks: weekGroups, monthMarkers: markers };
  }, [numWeeks]);

  return (
    <div className="relative w-full">
      {/* Month labels */}
      <div
        className="grid text-[11px] text-muted font-sans mb-1.5"
        style={{
          gridTemplateColumns: `24px repeat(${weeks.length}, 1fr)`,
          gap: '3px',
        }}
      >
        <div /> {/* Spacer for day labels column */}
        {weeks.map((week, weekIndex) => {
          const marker = monthMarkers.find((m) => m.weekIndex === weekIndex);
          return (
            <div key={weekIndex} className="text-left">
              {marker ? MONTH_LABELS[marker.month] : ''}
            </div>
          );
        })}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `24px repeat(${weeks.length}, 1fr)`,
          gap: '3px',
        }}
      >
        {/* Day labels column */}
        <div className="flex flex-col gap-[3px] text-[10px] text-muted font-sans justify-between">
          {DAY_LABELS.map((day, i) => (
            <div key={day} className="h-full flex items-center">
              {i % 2 === 1 ? day.charAt(0) : ''}
            </div>
          ))}
        </div>

        {/* Calendar grid - each week is a column */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {/* Pad incomplete first week with empty cells */}
            {weekIndex === 0 &&
              Array.from({ length: 7 - week.length }).map((_, i) => (
                <div key={`pad-${i}`} className="aspect-square rounded-[2px]" />
              ))}
            {week.map((day) => {
              const dateKey = formatDate(day);
              const count = data[dateKey] || 0;
              const intensity = getIntensity(count);

              return (
                <div
                  key={dateKey}
                  className="aspect-square rounded-[2px] cursor-pointer"
                  style={{ backgroundColor: colors[intensity] }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const text =
                      count === 0
                        ? `No chapters on ${formatDisplayDate(day)}`
                        : `${count} chapter${count === 1 ? '' : 's'} on ${formatDisplayDate(day)}`;
                    // If too close to right edge, position tooltip to the left
                    const isNearRight = rect.left > window.innerWidth - 200;
                    setTooltip({
                      x: rect.left + rect.width / 2,
                      y: rect.top - 30,
                      text,
                      alignRight: isNearRight,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2 py-1 text-[11px] font-sans bg-ink text-[rgb(var(--bg-primary))] rounded shadow-lg whitespace-nowrap pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: tooltip.alignRight ? 'translateX(-100%)' : 'translateX(-50%)',
          }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3 text-[11px] text-muted font-sans justify-end">
        <span>Less</span>
        {colors.map((color, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-[2px]"
            style={{ backgroundColor: color }}
          />
        ))}
        <span>More</span>
        <span className="ml-2 text-faint">1–12+</span>
      </div>
    </div>
  );
}
