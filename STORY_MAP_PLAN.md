# Shavat — Bible Story Map MVP

*Implementation plan. Local-first, contemplative, terrain-before-depth. Built on the existing Next.js app and existing per-book `divisions` metadata. No redesign.*

---

## 1. Product thesis

Shavat opens not on a reading assignment but on a **clickable map of the whole biblical story.** Within ten seconds a reader can see where they are in the story, what era they're standing in, who's involved, what the conflict is, what God is doing, which passages to enter, and where to go next.

The map is an **orientation instrument, not a tracker.** It rewards exploration and ownership, not completion. Its job is pastoral formation: to let the terrain be held in the mind as a single shape before any one part is studied in depth. Everything that would turn study into a scoreboard — streaks, percentages, badges, social — is deliberately excluded.

The map is a *new lens over content you already have.* Your `divisions` (Creation, Adam & Eve, Noah, Moses, The Exodus…) are already authored. The MVP makes them walkable.

---

## 2. Information architecture

```
Story Map  (the home terrain — the whole canon as ordered movements)
   │
   ├─ Era band            e.g. "Primeval" · "Patriarchs" · "Exodus & Law" · "Gospels" …
   │     └─ Movement node  e.g. "Creation", "Noah", "The Exodus"
   │            │
   │            └─ Movement panel  (the 7 orientation questions, answered)
   │                   └─ "Enter the text" → existing reader route
   │
   └─ (later) Movement → Movement links ("where next")
```

One screen is the spine: an **ordered, era-grouped field of movement nodes** spanning Genesis → Revelation. Selecting a node opens a **panel** (not a new page reload) that answers the seven orientation questions and offers entry points into the text you already render. The reader always returns to the map — the map is home.

---

## 3. Core routes / pages

Keep it to three. Reuse everything else.

| Route | Purpose |
|---|---|
| `/map` | The Story Map terrain. The new home of the app (`/` redirects here instead of `/library`). |
| `/map/[movementId]` | Deep-linkable movement panel — same panel as on the map, but addressable so a movement can be bookmarked/shared-by-URL-to-self. Renders the map behind it. |
| *(existing reader routes)* | `/[book]/[...slug]`, `/genesis/...`, `/psalms/...` — **unchanged.** "Enter the text" links here. |

`/library` stays exactly as is — it becomes the "index/shelf" view, secondary to the map.

---

## 4. Data model for movements

The movement **is** the existing division, lightly extended. Do **not** create a parallel dataset. Add optional fields to the division schema; the map degrades gracefully when they're absent.

Existing division fields (keep): `id`, `title`, `chapters[]`, `theme`, `summary`, `contentType`.

New optional fields on a division:

```ts
interface MovementExtension {
  era?: string;            // grouping band, e.g. "primeval", "patriarchs"
  characters?: string[];   // main figures
  conflict?: string;       // the core tension in one line
  whatGodIsDoing?: string; // the theological action, one line
  keyPassages?: {          // entry points into the text
    ref: string;           // human label, e.g. "Genesis 1:1–2:3"
    href: string;          // existing reader route
  }[];
  next?: string[];         // ids of movements to go to next
}
```

A thin aggregation module — `lib/story-map.ts` — reads every book's metadata, flattens all `divisions` into one canonical **ordered** list (canon order, then chapter order), assigns each to an `era` (from the field, or inferred by book), and exposes:

```ts
getStoryMap(): EraGroup[]          // ordered eras, each with its movements
getMovement(id): Movement | null   // single movement, with book context
```

Eras are defined once in `lib/eras.ts` as an ordered list (id, label, book range) so the map has a stable spine even before every movement is enriched.

---

## 5. Component list

All new components are presentational and local-first. No new dependencies.

- `StoryMap` — the terrain container; lays out era bands top-to-bottom.
- `EraBand` — one labeled horizontal band holding its movement nodes.
- `MovementNode` — a single clickable card on the map (title, theme, chapter count, a content-type tint reusing your existing color language).
- `MovementPanel` — the slide-over/overlay answering the seven questions; "Enter the text" buttons.
- `OrientationField` — small labeled row used inside the panel (Era / Characters / Conflict / What God is doing).
- `KeyPassageLink` — a single entry-point link into the reader.
- `NextMovements` — the "where next" row at the bottom of the panel.
- `MapLegend` — quiet key for the content-type tints (narrative / law / poetry…). Optional, collapsible.

Reuse as-is: `Header`, `Breadcrumbs`, `ScrollToTop`, and your existing card/tint styling.

---

## 6. Minimum fields each movement must have

For a movement to render usefully on the map, it must answer the seven questions. Mapped to fields:

| Orientation question | Field | Required for MVP? |
|---|---|---|
| Where am I in the story? | position in ordered list + `era` | yes |
| What movement/era is this? | `title`, `theme`, `era` | yes |
| Who are the main characters? | `characters[]` | yes |
| What is the core conflict? | `conflict` | yes |
| What is God doing here? | `whatGodIsDoing` | yes |
| What key passages can I enter? | `keyPassages[]` (≥1) | yes |
| Where can I go next? | `next[]` | optional (falls back to next in order) |

`summary` and `chapters[]` already exist and stay. If a movement lacks the new fields, the node still appears (using `theme`/`summary`) but is visibly marked "not yet oriented" — which doubles as your honest gap map, without a percentage in sight.

---

## 7. Sample movement object — Genesis / Creation

```json
{
  "id": "creation",
  "title": "The Book of Creation",
  "chapters": [1, 2],
  "theme": "Order from chaos",
  "summary": "Creation of the heavens and the earth; order, purpose, blessing.",
  "contentType": "narrative",

  "era": "primeval",
  "characters": ["God", "Adam", "Eve"],
  "conflict": "Formless emptiness awaiting order; will the creature keep the one boundary given?",
  "whatGodIsDoing": "Speaking a good and ordered world into being and blessing it; making humanity in his image to keep it.",
  "keyPassages": [
    { "ref": "Genesis 1:1–2:3", "href": "/genesis/creation/1" },
    { "ref": "Genesis 2:4–25",  "href": "/genesis/creation/2" }
  ],
  "next": ["adam-and-eve"]
}
```

This is the existing Genesis `creation` division with five fields added. Nothing was replaced.

---

## 8. Phased implementation plan (for Claude Code)

**Phase 0 — Schema + spine (no UI).**
Add the optional fields to the division/movement TypeScript types. Create `lib/eras.ts` (ordered era list) and `lib/story-map.ts` (`getStoryMap`, `getMovement`) that flatten existing metadata into ordered, era-grouped movements. Verify in a script that all 66 books flatten without error and every movement lands in an era.

**Phase 1 — Read-only map.**
Build `StoryMap` → `EraBand` → `MovementNode` rendering the full canon from `getStoryMap()`. Nodes show title/theme/chapter count and content-type tint. No panel yet — clicking a node just routes to the first chapter (proves wiring). Make `/map` the route; do **not** repoint `/` yet.

**Phase 2 — Movement panel.**
Build `MovementPanel` + `OrientationField` + `KeyPassageLink`. Clicking a node opens the panel with the seven answers; "Enter the text" links into the existing reader. Add `/map/[movementId]` for deep links. Movements missing fields render with a quiet "not yet oriented" state.

**Phase 3 — Enrichment pass (content, not code).**
Fill the new fields for one full era end-to-end first (suggest: Primeval — Creation, Adam & Eve, Noah). This validates the model against real content before scaling. Then enrich era by era.

**Phase 4 — Make it home.**
Add `next`/"where next" links. Repoint `/` from `/library` to `/map`. Add the collapsible `MapLegend`. Final polish: keyboard nav reusing your existing arrow-key pattern from the library page.

Each phase is independently shippable and reversible.

---

## 9. What NOT to build yet

- No streaks, no "days in a row," no reminders.
- No completion percentages, progress bars, or "X of 66."
- No badges, levels, or gamification of any kind.
- No social sharing, comments, or accounts.
- No login, no cloud sync, no server database — stays local-first.
- No new third-party libraries or a graph/canvas engine — CSS grid/flex is enough for the MVP.
- No editing UI for movements — enrich via JSON by hand for now.
- No search, no AI features, no full rewrite of the library or reader.
- No mobile-specific map redesign until the desktop terrain feels right.

---

## 10. Acceptance criteria for the MVP

1. Visiting `/map` shows the **entire canon** as ordered, era-grouped movement nodes, with no console errors, drawn entirely from existing metadata.
2. Within ten seconds and without scrolling instructions, a first-time viewer can point to "where Creation is" and name the era it belongs to.
3. Clicking any movement opens a panel that answers all seven orientation questions for at least the fully-enriched era, and links into the existing reader at the correct chapter.
4. "Enter the text" always lands on the right passage in the existing reader, and the reader's existing highlight/note/bookmark behavior is unchanged.
5. Movements not yet enriched still appear and are honestly marked "not yet oriented" — with **no** percentage or score anywhere in the UI.
6. All data remains in the browser; clearing the network/server changes nothing about the map.
7. None of the items in section 9 exist in the build.
8. `/library` and all reader routes work exactly as before.
```

