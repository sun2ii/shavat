# Shavat — Map / Terrain Roadmap

*Updated 2026-08-17, the day the skeleton shipped. The authoritative plan for
finishing the Map tab. Companions: STORY_MAP_PLAN.md (original vision — the
seven orientation questions live there), SAVED_ROADMAP.md (the Saved track),
docs/MOBILE_GUIDELINES.md (UI standards).*

---

## The one-line philosophy

**Read is space. Map is time.** The library is the shelf (where is the
thing?); the terrain is the story (where am I in it?). Jonah belongs inside
the fall of the kingdom, not on a shelf marked Prophets. The Map is an
orientation instrument — never a tracker, never a second library.

Presentation rule: **calm.** Collapsed act bands at rest, one layer at a
time, never 151 nodes at once. No percentages, streaks, badges, or
completion states — ever (STORY_MAP_PLAN.md §9 still governs; only its old
"no login / no database" line is obsolete).

---

## Done (v1 skeleton, 2026-08-17)

- Ten act bands from `lib/eras.ts` (`BOOK_PLACEMENTS`: every book placed as
  spine / voice / wisdom, with taglines and anchor lines), rendered by
  `components/terrain/StoryTerrain.tsx` via `getStoryMap({ includeSlotIns: true })`.
- Collapsed at rest — whole story on one screen. Tap an act to open it.
- Spine story cards (Genesis split into its movements; other books one card
  with tagline). Unenriched cards say "not yet oriented" — the honest gap map.
- **"Meanwhile, in this act"** — voices/wisdom anchored inside their act
  (Jonah under The Kingdom Falls; Paul's letters under The Church).
- **You are here** — gold dot on the act band and movement card containing
  the reader's current position (from reading progress). Location, not
  progress. The here-act starts open; everything else folded.
- Every card and row links straight into the reader. The map is a door.
- Old Events/Characters/tab-strip stub deleted.

---

## Remaining work, in order

### 1. Ben's content — Primeval first (no code; the pacing item)

In the Notion table "Bible Story Map — Movements": fill the four columns
(Characters · Conflict · What God Is Doing · Key Passages) for the three
Primeval movements — **Creation, Adam & Eve, Noah**. This validates the
format on real content before writing the other ~148. Then era by era, at
whatever pace — the map shows its gaps honestly the whole time.

### 2. Port the enrichment (small code task, repeats per batch)

Copy each finished Notion batch into the book metadata JSON (the optional
division fields: `characters`, `conflict`, `whatGodIsDoing`, `keyPassages`,
`next`). `isOriented()` in `lib/story-map.ts` flips automatically — cards
stop saying "not yet oriented" the moment their fields exist.

### 3. The movement panel (the next build)

Tap a node → panel answering the seven orientation questions (see
STORY_MAP_PLAN.md §6) + "Enter the text" buttons into the reader.
- Bottom sheet on the phone; side panel or overlay on desktop.
- Deep-linkable route per movement (`/map/[movementId]` or equivalent under
  /terrain) so a movement can be shared-by-URL-to-self.
- Unenriched movements get the quiet honest state, never an error.
- Build this AFTER Primeval content exists, so it's designed against real
  words, not lorem ipsum.

### 4. "Where next" (Phase 4 of the original plan)

`next[]` links between movements rendered at the bottom of the panel —
the wander mechanic. Falls back to next-in-order when absent.

### 5. Characters & Places on the map (Ben's ask, 2026-08-17)

"Who" and "where" ARE orientation questions, so they belong here. A quiet
search on the terrain: type "Elijah" or "Jericho" and land in the story —
the acts/movements where they appear, then into the panel or the reader.
The app already has /characters and /places pages (and per-verse place
links in the reader): the map search should RESOLVE into those, not
duplicate them — one owner per concept. Design it after the movement panel
exists, since results want to open a panel. Keep it calm: a small search
affordance, not a search bar dominating the terrain.

### 6. Polish (when the bones prove right)

- Jump-to-era anchors if the band list ever grows past one screen at rest.
- Collapsible legend for the spine/voice/wisdom distinction (only if users
  actually ask what the sections mean — try without it first).
- Keyboard navigation on desktop (reuse the library's arrow-key pattern).
- The literal "terrain" visual metaphor (elevation, a river of story) —
  explicitly LATER; the editorial-card language must prove itself first.

---

## Deliberately out (do not add)

- Progress of any kind on the map: percentages, checkmarks, completed
  tints. Today owns progress; the map owns location.
- A second browsing hierarchy that duplicates Read.
- A graph/canvas engine or new dependencies — CSS is enough.

---

## Landmines for whoever executes

- AppShell renders every page TWICE (desktop + mobile branches) — never
  `document.getElementById`; resolve elements from the interaction target
  (`closest()`) or refs.
- The dev sandbox can't run `next build` — verify with `npm run typecheck`
  + hot-reload eyeballing on device.
- Web changes hot-reload into the iOS app; only native-layer changes need
  `npm run ios:sync` + Xcode ⌘R.
- Data quirks (see project memory): genesis metadata uses a `books` key
  (handled in `readDivisions`); contentType values in metadata exceed the
  TS union; bible-index categories contain hyphens.
