# Shavat — Map & Saved Execution Plan

*Frozen 2026-08-17 after UX discussion. This is the reference document for
executing the two remaining tab surfaces. Today and Read are considered done
(v1). Companion docs: STORY_MAP_PLAN.md (original map vision — still governs,
with one amendment noted below), docs/MOBILE_GUIDELINES.md (UI standards).*

---

## Decided and frozen

- Tab bar: **Today · Read · Map · Saved.** One owner per concept, no duplicates.
- **Saved = what the reader made, three artifact types:**
  - **Highlight** — the text speaking to you (marked verses, optional short
    margin *note* attached). Note stays lightweight and attached — NOT merged
    with reflections.
  - **Reflection** — you speaking back: first-class user writing, always
    **anchored to a passage** (book + chapter, optional verse range). Never
    free-floating; Shavat is not a journaling app. Editable and deletable.
    Private by default — no future feature may assume otherwise.
  - **Bookmark** — a place held, deliberately. Plural and intentional.
    Distinct from the automatic "where I left off" (reading progress), which
    Today's Continue card owns. Saved shows deliberate bookmarks only.
- Authored essays/Writings stay in Read's world (contextual links; optional
  Library shelf later). Never in Saved.
- Saved cards should render the **actual verse text** of a highlight, not
  just the reference — the screen is a readable collection, not a link list.
- Reflections must remain cleanly **exportable** (markdown someday); the data
  model must never make that painful.
- Map: the original STORY_MAP_PLAN vision governs — one scrolling terrain of
  the whole canon in era bands. The current Terrain tab strip becomes
  **jump-to-era anchors** on that single terrain, not separate views.
  **Amendment:** the old plan's "no login / no server database" constraint is
  obsolete (the app has auth + Postgres). Everything else stands — especially
  NO gamification, streaks, percentages, or badges on the map.

---

## Track A — Saved becomes real

**Moved: the authoritative Saved plan is /SAVED_ROADMAP.md at the repo root.**
The outline below is retained for sequence context only — if the two ever
disagree, SAVED_ROADMAP.md wins.

### A1. Schema (one migration, all three types at once)

Tables (all keyed by user email/id, timestamps throughout):

- `highlights` — book, chapter, verse_start, verse_end, color, note (nullable),
  created_at.
- `bookmarks` — book, chapter, verse (nullable), created_at. Plural per user.
- `reflections` — book, chapter, verse_start/verse_end (nullable), body (text),
  created_at, updated_at.

Do the schema for reflections NOW even though its UI ships later — one
coherent model, no bolt-ons.

### A2. API routes

- `/api/highlights` — GET (list), POST (create), DELETE.
- `/api/bookmarks` — REWRITE: currently a legacy JSON-file store
  (bookmarks.json on disk, keyed by clientId). Move to Postgres, plural
  bookmarks, authed.
- `/api/reflections` — GET/POST/PATCH/DELETE (ships with the reflections UI,
  but route shape is decided now).

### A3. Reader wiring

Signed in → highlight/bookmark actions write to the account via API.
Signed out → localStorage exactly as today. One code path, one flag
(isAuthenticated already flows into BookReader).

### A4. The import moment

On sign-in, detect device-local highlights/bookmark and offer ONCE:
"Bring N highlights into your account?" → POST batch, clear local. No silent
migration, no nagging.

### A5. Saved + Today read from the account

Signed in: Saved and Today's "recent highlight" card read from the DB; the
"saved on this device" footnote disappears. Signed out: localStorage view
stays. Then check off ROADMAP.md's two database milestones.

### A-later (explicitly deferred)

- Reflections UI: "Write a reflection" affordance at the end of a
  section/chapter in the reader; edit/delete; Saved gains a third section.
  Someday: reflections subtly visible when re-reading their anchor chapter.
- Markdown export of reflections (and highlights).
- Search/filter within Saved.

---

## Track B — Map becomes the flagship

**Moved: the authoritative Map plan is /MAP_ROADMAP.md at the repo root**
(terrain skeleton shipped 2026-08-17). The outline below is retained for
sequence context only — if the two ever disagree, MAP_ROADMAP.md wins.

### B0. Standing decision (made): one terrain, not tabs

Single scrolling canon terrain, era bands top-to-bottom, per
STORY_MAP_PLAN.md. Tab strip repurposed as jump-to-era anchors.

### B1. Ben's content homework (no code, start anytime)

Enrich ONE era end-to-end in the Notion table "Bible Story Map — Movements":
**Primeval — Creation, Adam & Eve, Noah** (3 movements: Characters, Conflict,
What God Is Doing, Key Passages). Validates the model on real content before
scaling to 151 movements.

### B2. Terrain build (Phase 1 revived)

Render era bands + movement nodes inside the Terrain page from the existing
spine (`lib/eras.ts`, `lib/story-map.ts` — already built, 151 movements,
66 books). "Not yet oriented" state for unenriched movements (40 books have
empty metadata — known). Mobile: nodes sized to MOBILE_GUIDELINES touch
standards; no horizontal scrolling (wrap or vertical flow).

### B3. Movement panel (Phase 2)

Tap a node → panel answering the seven orientation questions + "Enter the
text" into the existing reader. Bottom sheet on the phone. Deep link route
per movement. Unenriched movements show the quiet honest state.

### B4. Enrichment cadence (Phase 3, ongoing)

Ben fills eras in Notion at his own pace → port each batch into the book
metadata JSON. The map shows its gaps honestly throughout — no percentages.

### B5. Polish (Phase 4)

"Where next" links between movements, collapsible legend, keyboard nav
(desktop), era-anchor scroll behavior.

---

## Suggested sequence when execution starts

1. Session 1: A1 + A2 (schema + APIs). Ben starts B1 in Notion in parallel.
2. Session 2: A3 + A4 + A5 — Saved is DONE as a system.
3. Session 3: B2 (terrain render).
4. Session 4: B3 (movement panel). Then B4/B5 cadence.

## Known landmines for whoever executes

- AppShell renders the page TWICE (desktop + mobile branches). Never
  `document.getElementById` under it — resolve elements from the interaction
  target (`closest()`) or refs. (Cost hours on the reader scroll bug.)
- The dev sandbox can't run `next build` to completion — verify with
  `npm run typecheck` + hot-reload eyeballing.
- Native (Swift/storyboard/Info.plist/capacitor.config) changes need
  `npm run ios:sync` + Xcode ⌘R; web changes hot-reload into the app.
