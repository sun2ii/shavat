# Adding Chapter Sections to a Book

## Overview

Chapter sections provide collapsible, color-coded divisions within each chapter for easier navigation. Sections appear as colored cards in the BookReader UI.

## The Two-File System

Sections data lives in **two separate locations**:

### 1. Source: `lib/{book}-metadata.json`

Contains the minimal section data (verse ranges and titles):

```json
{
  "divisions": [...],
  "chapterSummaries": {},
  "chapterSections": {
    "1": [
      { "verses": "1-4", "title": "David's old age" },
      { "verses": "5-10", "title": "Adonijah exalts himself" },
      { "verses": "11-31", "title": "Nathan and Bathsheba intervene" }
    ],
    "2": [
      { "verses": "1-9", "title": "David's charge to Solomon" },
      { "verses": "10-12", "title": "David's death" }
    ]
  }
}
```

### 2. UI Output: `data/sections/{book}.json`

Contains the full UI data with colors (auto-generated from metadata):

```json
{
  "book": "1-kings",
  "chapters": {
    "1": [
      {
        "title": "David's old age",
        "verseRange": [1, 4],
        "color": "bg-amber-50 dark:bg-amber-950/20",
        "borderColor": "border-amber-400"
      }
    ]
  }
}
```

## Process

```
1. Add chapterSections to metadata file
   ↓
   lib/{book}-metadata.json

2. Run generation script
   ↓
   scripts/generate-{book}-sections.ts
   OR
   scripts/generate-sections.ts {book}

3. Script outputs UI file
   ↓
   data/sections/{book}.json

4. Restart dev server (clear cache)
   ↓
   Sections appear in UI
```

## Steps to Add Sections

### Step 1: Add `chapterSections` to metadata

Edit `lib/{book}-metadata.json` and add the `chapterSections` object after `chapterSummaries`:

```json
{
  "divisions": [...],
  "chapterSummaries": {},
  "chapterSections": {
    "1": [
      { "verses": "1-8", "title": "Section title here" },
      { "verses": "9-15", "title": "Another section" }
    ],
    "2": [...]
  }
}
```

**Format:**
- Keys are chapter numbers (as strings)
- Each chapter has an array of sections
- Each section has:
  - `verses`: String like `"1-8"` or `"9"` (single verse)
  - `title`: String, the section heading

### Step 2: Create or update generation script

Option A: **Use existing script** (if it accepts book parameter)

```bash
npx tsx scripts/generate-sections.ts {book}
```

Option B: **Create book-specific script**

Copy `scripts/generate-kings-sections.ts` and modify:

```typescript
// At the bottom, change:
convertBook('1-kings');
convertBook('2-kings');

// To:
convertBook('your-book');
```

Then run:

```bash
npx tsx scripts/generate-{book}-sections.ts
```

### Step 3: Verify output

Check that `data/sections/{book}.json` was created:

```bash
ls -lh data/sections/{book}.json
```

### Step 4: Restart dev server

The sections cache must be cleared:

```bash
# Stop and restart your dev server
npm run dev
```

### Step 5: Verify in UI

Visit: `http://localhost:3000/{testament}/{book}/{division}/{chapter}`

You should see:
- Collapsible colored section cards
- Each section with its own color (rotates through 6-color palette)
- Expand/collapse arrows
- Copy button on section titles

## Color Palette

Sections automatically rotate through these colors:

1. Amber (`bg-amber-50`, `border-amber-400`)
2. Blue (`bg-blue-50`, `border-blue-400`)
3. Green (`bg-green-50`, `border-green-400`)
4. Purple (`bg-purple-50`, `border-purple-400`)
5. Rose (`bg-rose-50`, `border-rose-400`)
6. Cyan (`bg-cyan-50`, `border-cyan-400`)

## Quick Reference

### Example Prompt for Claude

```
Add chapter sections to {book}.

Use this structure for each chapter:
- Chapter 1: [list sections with verse ranges]
- Chapter 2: [list sections with verse ranges]
...

Then run the generation script to create the UI files.
```

### Files to Modify

1. `lib/{book}-metadata.json` - Add `chapterSections`
2. `scripts/generate-sections.ts` - Run to generate UI file
3. `data/sections/{book}.json` - Auto-generated output

### Verification Checklist

- [ ] `chapterSections` added to metadata file
- [ ] Script created or updated
- [ ] Script executed successfully
- [ ] Output file created in `data/sections/`
- [ ] Dev server restarted
- [ ] Sections visible in browser

## Technical Details

### Data Flow

```
BookReadingRoute (server)
  ↓
  getChapterSections(book, chapter)  [lib/sections.ts]
  ↓
  Reads data/sections/{book}.json
  ↓
  Returns Section[] with colors
  ↓
  BookPageClient (passes to BookReader)
  ↓
  BookReader renders colored section cards
```

### Cache Note

`lib/sections.ts` caches all sections in memory on first read. If you update `data/sections/*.json` files, you **must restart the dev server** to see changes.

### Why Two Files?

- **Metadata file** (`lib/*-metadata.json`): Single source of truth, version controlled, easy to edit
- **Sections file** (`data/sections/*.json`): Optimized for UI rendering with colors and formatting

The generation script is the bridge between them.
