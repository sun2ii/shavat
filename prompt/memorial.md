# Write a memorial

Point at this file. Fill in the skeleton. Paste it into `/studio` and press
Write the files.

The long spec — voice, failure modes, design constraints — is `writings.md`.
This is the whole of what you have to do.

---

## 1. The shape

Four moving parts, and only the third repeats.

```
Division      book, chapter range, title, and why the movement matters
   ↓
Stones intro  what these chapters left behind, in two paragraphs
   ↓
Chapter unit  story → tension → revelation → stones → quote      ×N
   ↓
Synthesis     each chapter as a question, answered by its one-word theme
   ↓
Canon         the whole division as five imperatives
```

The chapter unit's order is invariant. A stone that arrives before its story has
not been earned.

## 2. The skeleton

Copy this. `book` and `division` must match `lib/<book>-metadata.json` — the
studio's dropdown fills them for you and will refuse anything else.

```
book: judges
division: unfinished-conquest
eyebrow: Judges 1–2
title: The Unfinished Conquest

# Intro
Two paragraphs. What the movement is, and what it costs.

The second paragraph says what these chapters do that the ones before did not.

# Memorial Stones
Two paragraphs introducing why these particular stones.

# Chapter 1 — Theme
## Story
2–4 sentences. What happened. Names, distances, numbers, objects.
## Tension
One question, in the narrative’s own terms.
## Revelation
2–4 sentences answering it.
## Stones
- Five to eight, each a whole truth in one line.
## Quote
One short line from the chapter.

# Chapter 2 — Theme
…same five sub-headings…

# Synthesis
eyebrow: The Movement
heading: A phrase naming what happened across the whole division
## Opening
What the division is really about. Then: “Each chapter answers a different question.”
## Steps
- One question per chapter, in order. The answer is that chapter’s theme.
## Closing
What this formed in the people — not what it teaches the reader.

# Canon — The <Title> Canon
- Five imperatives, in the book’s own vocabulary.
```

**Blank line between paragraphs. `- ` starts a list item.** That is the entire
syntax.

## 3. The five rules that decide whether it is good

**Theme is one word, and it is a disposition.** Obedience, Holiness,
Restoration, Compromise, Forgetting. Never an event and never a place. It
becomes the anchor id and the answer to that chapter's synthesis question — the
studio derives both, so you write it once and they cannot drift.

**Tension asks what the chapter asks.** Not what the reader should do.

> Yes — *Will Israel finish taking the land it has already been given?*
> No — *How do we follow through on our commitments?*

**Every stone traces to a detail in its own story.** If the sentence would be
true without the chapter, it is not a stone.

> Yes — *Chariots of iron are named as the reason; the God who dried the Jordan is not.*
> No — *Don't let obstacles stop you.*

**The quote is quiet.** It sits under the stones and must not outweigh them.
Rendered without attribution — the section already names the chapter.

**The canon speaks the book's language.** *Ask the Lord who shall go up first,
before you go up* — not *do your due diligence*.

## 4. A finished chapter unit

From `lib/writings/judges/unfinished-conquest.draft.md`. This is the register.

```
# Chapter 1 — Compromise
## Story
Judah went up first and took Bezek, and Adoni-Bezek, who had gathered seventy
kings with their thumbs and big toes cut off to glean under his table, was given
the same and said so. Caleb gave Achsah the upper and lower springs when she
asked, because a field in the Negeb without water is no inheritance. Then the
chapter turns and does not turn back: Judah could not drive out those of the
plain, for they had chariots of iron; Benjamin left the Jebusites in Jerusalem;
Manasseh left Beth-shean and Taanach and Megiddo.
## Tension
Will Israel finish taking the land it has already been given?
## Revelation
The chapter records no defeat. It records a stopping. Every tribe named had
strength enough to begin and not will enough to finish, and when Israel later
grew strong it put the Canaanites to forced labor instead of driving them out —
a bargain that has the shape of victory and none of its substance.
## Stones
- Judah went up first because the Lord was asked first.
- Adoni-Bezek measured his own judgment by the seventy kings under his table.
- Achsah asked for springs, because land without water is a promise you cannot live on.
- Chariots of iron are named as the reason; the God who dried the Jordan is not.
- Forced labor is what a people call a conquest they did not finish.
- Dan was pressed back into the hills, for ground not taken becomes ground lost.
## Quote
They did not drive them out.
```

Working memorials to read for voice: `lib/writings/joshua/*.ts` — six of them,
and `first-tests.ts` is the shortest.

## 5. What happens when you press the button

`npm run dev`, open `/studio`, pick the book and the movement, paste, save. The
studio writes three files and you commit them:

| | |
|---|---|
| `lib/writings/<book>/<division>.ts` | the memorial, type-checked at build |
| `lib/writings/<book>/<division>.draft.md` | this text, so it loads back for editing |
| `app/writings/<book>/<division>/page.tsx` | the route |

It refuses to save while anything is red: a chapter that is not in the division,
a theme longer than one word, a synthesis that does not answer every chapter, an
empty section. Amber notes — stones outside 5–8, a canon that is not five, a
tension that does not end in a question mark, straight quotes — are yours to
judge. **Fix typography** converts `' "` into `’ “ ”` and hyphens between
numerals into en dashes, so the page matches every other one.

The studio only runs under `npm run dev`. It writes into the repository, which
a deployed server cannot do.
