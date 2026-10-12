/*
  Chapter grid invariant. Every list of chapter numbers in the app
  (reader nav row, division dropdown, book map, readings map) renders with
  these, so the eye learns one layout and reuses it everywhere:

    column = position within the group mod 10
    row    = position within the group div 10

  Ten fixed-width cells, left-packed: 1–10 over 11–20 over 21–24. The grid
  block is centered; the cells inside it never are. 34px × 10 = 340px, which
  still fits a 375px phone with the nav's padding.

  Any panel that contains the grid must be at least CHAPTER_GRID_WIDTH plus
  its own horizontal padding, or columns 1 and 10 spill past its edges.
*/

export const CHAPTER_CELL_PX = 34;
export const CHAPTER_GRID_WIDTH = `${CHAPTER_CELL_PX * 10}px`;

export const CHAPTER_GRID_CLASS =
  'grid justify-center gap-x-0 gap-y-1 font-serif text-[15px] leading-none';
export const CHAPTER_GRID_STYLE = {
  gridTemplateColumns: `repeat(10, ${CHAPTER_CELL_PX}px)`,
} as const;
export const CHAPTER_CELL_CLASS = 'w-[34px] min-h-[32px]';

/** Popover panel sized to the grid: 340px + p-4 on both sides. */
export const CHAPTER_PANEL_WIDTH_CLASS = 'w-[calc(340px+2rem)]';
