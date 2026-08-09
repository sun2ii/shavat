# The Engine of the Cleanup

The numbers are in, and they're stark. Here's the whole arc.

## One invariant drove everything

**One concept, one home.** Every phase was the same move applied to a different concept — find content pretending to be code, move it to its one data address, delete every duplicate representation, let code derive instead of repeat.

| Concept | Was scattered across… | Now lives in… |
| --- | --- | --- |
| Section | 496 constants inside the reader + a regex parser re-reading that source | `data/sections/*.json` |
| Book access | 66 identical wrapper files + a switch | `createBookAccessor(slug)` |
| Landing prose | 64 near-identical page files | `data/books/*.json` + 1 template |
| Commentary map | 138 hand-written ranges | manifest generated at build |
| Division | 3 systems (metadata / genesis-books / psalms-collections) | metadata divisions, one shape |
| Memorial | TS object + hardcoded route + draft | one `.draft.md`, one route |
| Routing | 4 competing schemes | one door per book |

## What was eliminated (measured, not estimated)

| Metric | Before | After | Δ |
| --- | --- | --- | --- |
| TS/TSX lines | 23,688 | 9,290 | −61% |
| `app/` pages | 92 | 20 | −72 files |
| `lib/` modules | 107 | 34 | −73 files |
| Components | 34 | 25 | −9 |
| Reader component | 4,924 ln client-side | 267 ln server-fed | −95% |
| Client JS (reader route) | 181 kB | 154 kB | −27 kB |
| Net diff | | | +1,913 / −32,639 |

The key nuance: **no content was lost.** The ~14,000 deleted lines were code, not prose — the actual words (sections, prose, memorials) moved into `data/` and `.md` files where they belong. Two behavior changes only, both intended: the 1–2 Corinthians slug fix (29 chapters un-hidden), and everything else proven identical against the baseline oracles.

## Why it's structurally cleaner, not just smaller

The old failure modes are now impossible, not just fixed:

- A slug spelled two ways (the 1-Corinthians bug) can't recur — every slug has one home in JSON.
- The commentary list can't drift from the files — it's regenerated every build.
- Renaming something in the reader can't break the TOC — nothing parses source code anymore.
- A fix to the reading route now reaches all 66 books — no bespoke bypasses to miss.

## The generative test

Adding new content is now a data operation. The 1–2 Samuel sections written on the other machine proved it live — dropped into `data/sections/`, and the reader, TOC, and routing picked them up with zero code edits. That's the difference between a codebase you maintain and a system you feed.

## One-line cut

The app went from 66 books hand-wired 4 ways to one data-fed machine — 61% of the code deleted, all five health invariants green, and the remaining work (Phase 4 bookmarks) is the only red left on the map.
