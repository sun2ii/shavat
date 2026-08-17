# Shavat — Saved Roadmap

*Frozen 2026-08-17. The authoritative plan for making the Saved tab real.
Companion: docs/MOBILE_GUIDELINES.md (UI standards). The Map plan lives in
STORY_MAP_PLAN.md + docs/MAP_AND_SAVED_PLAN.md.*

---

## What Saved is

Everything the reader made with their own hand, three artifact types:

- **Highlight** — the text speaking to you: marked verses, with an optional
  short margin **note** attached. The note stays lightweight and attached —
  it is NOT merged with reflections.
- **Reflection** — you speaking back: first-class user writing, potentially
  paragraphs. Always **anchored to a passage** (book + chapter, optional
  verse range) — never free-floating; Shavat is not a journaling app.
  Editable and deletable. **Private by default** — no future feature may
  assume otherwise. Must remain cleanly exportable (markdown someday); the
  data model must never make export painful.
- **Bookmark** — a place held, deliberately. Plural and intentional.
  Distinct from the automatic "where I left off" (reading progress), which
  Today's Continue card owns. Saved shows deliberate bookmarks only.

Authored essays/Writings are the app's voice, not the reader's — they live
in Read's world and never appear in Saved.

UI principle: Saved cards render the **actual verse text** of a highlight
(the app has the text as static content), not just the reference — the
screen is a readable collection, not a link list.

---

## Current state (why this work exists)

- Highlights: localStorage only (`shavat:highlights`) — stuck on one device.
- Bookmark: single overwrite-only localStorage value, plus a legacy
  file-on-disk API (`/api/bookmarks` → bookmarks.json keyed by clientId).
- Reflections: do not exist yet.
- The Saved screen (v1 template) exists and reads localStorage, with an
  honest "saved on this device" footnote.
- ROADMAP.md lists "Bookmarks system" and "Highlights system" as the two
  unchecked Database Milestones — this roadmap is those checkboxes.

---

## Phase 1 — Schema (one migration, all three types at once)

Tables keyed by user, timestamps throughout:

- `highlights` — book, chapter, verse_start, verse_end, color,
  note (nullable), created_at.
- `bookmarks` — book, chapter, verse (nullable), created_at. Plural.
- `reflections` — book, chapter, verse_start/verse_end (nullable),
  body (text), created_at, updated_at.

Reflections gets its table NOW even though its UI ships later — one coherent
model, no bolt-ons, no second migration.

## Phase 2 — API routes

- `/api/highlights` — GET (list), POST (create), DELETE.
- `/api/bookmarks` — full rewrite off the JSON-file store onto Postgres;
  plural bookmarks; authed.
- `/api/reflections` — GET/POST/PATCH/DELETE (route shape decided now,
  ships with the reflections UI).

## Phase 3 — Reader wiring

Signed in → highlight/bookmark actions write to the account via the API.
Signed out → localStorage exactly as today. One code path, one flag
(isAuthenticated already flows into BookReader).

## Phase 4 — The import moment

On sign-in, detect device-local highlights/bookmark and offer ONCE:
"Bring N highlights into your account?" → batch POST, clear local storage.
No silent migration, no nagging.

## Phase 5 — Saved + Today read from the account

Signed in: the Saved screen and Today's "recent highlight" card read from
the DB; the "saved on this device" footnote disappears. Signed out: the
localStorage view stays. Then check off ROADMAP.md's two milestones.

---

## Later (explicitly deferred, in order of likely value)

1. **Reflections UI** — "Write a reflection" affordance at the end of a
   section/chapter in the reader; edit/delete; Saved gains its third
   section. Someday: reflections subtly visible when re-reading their
   anchor chapter (meeting your own past thoughts in the margin).
2. Markdown export of reflections (and highlights).
3. Search/filter within Saved.

---

## Landmines for whoever executes

- AppShell renders every page TWICE (desktop + mobile branches) — never
  `document.getElementById` under it; resolve elements from the interaction
  target (`closest()`) or refs.
- The dev sandbox can't run `next build` to completion — verify with
  `npm run typecheck` + hot-reload eyeballing on device.
- Web changes hot-reload into the iOS app; only native-layer changes need
  `npm run ios:sync` + Xcode ⌘R.
