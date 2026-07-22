# Writing a Division Memorial

Instructional prompt for authoring a memorial page — the permanent record of one
movement of a book (e.g. Joshua 9–12, "Possess the Land").

A memorial is **passive**. It is read, not worked through. No prompts, no
journaling fields, no exercises. It exists so a truth can be returned to years
later and still land.

---

## 1. Primitives

Five elements. Everything on the page is one of these.

| Primitive | What it is | Voice |
|---|---|---|
| **Division** | The movement being memorialized: book, chapter range, title | Editorial |
| **Chapter unit** | One chapter, carried through the four-beat pattern below | Narrative |
| **Memorial stone** | One durable truth, one sentence | Scriptural |
| **Question** | What a chapter asks; answered by a single word | Interrogative |
| **Canon** | The distilled imperatives of the whole division | Imperative |

## 2. The composition rule

Every chapter unit follows the pattern the book itself uses. This order is
invariant — a stone that appears before its story has not been earned.

```
Story        what happened
  ↓
Tension      the question the narrative is asking
  ↓
Revelation   what the chapter reveals, answering the tension
  ↓
Memorial     the stones left behind
```

The division as a whole follows the same shape one level up:

```
Hero            the movement named
  ↓
Progression     the chapters as a sequence of one-word themes
  ↓
Chapter units   story → tension → revelation → memorial, repeated
  ↓
Synthesis       the theological movement: each chapter as a question answered
  ↓
Canon           the whole division reduced to imperatives
```

## 3. Schema

Content lives in `lib/writings/<book>/<division-id>.ts` and satisfies
`DivisionMemorial` in `lib/types.ts`. The page file renders it and holds no prose.

```ts
{
  bookSlug, bookName, divisionId,
  eyebrow,        // "Joshua 9–12"
  title,          // "Possess the Land"
  intro: string[],
  memorialIntro: { heading, body: string[] },

  chapters: [{
    chapter, anchor, theme,   // anchor: "discernment" — the theme, lowercased
    story, tension, revelation,
    memorialStones: string[],
    quote,
  }],

  synthesis: {
    eyebrow, heading,
    opening: string[],
    steps: [{ question, theme }],   // one per chapter, in order
    closing: string[],
  },

  canon: { title, principles: string[] },
}
```

## 4. Field laws

**theme** — one word. A capacity being formed (Discernment, Courage,
Dependence, Remembrance), never an event or a place. The theme is also the
anchor id and the answer to that chapter's synthesis question. These three must
agree.

**story** — 2–4 sentences of what happened. Concrete narrative detail earns the
stones: worn sacks and cracked wineskins, marching all night from Gilgal,
hamstrung horses. Name people, distances, numbers. No application, no
interpretation.

**tension** — one sentence, phrased as a question, in the narrative's own terms.
It is what the chapter is *asking*, not what the reader should *do*.

- Yes: "Will Israel keep a costly covenant, even one obtained by deception?"
- No: "How can we keep our commitments when it is hard?"

**revelation** — 2–4 sentences answering the tension. What the chapter reveals
about God, the covenant, or what possessing a promise requires. This is the
hinge: stones that do not follow from the revelation do not belong.

**memorialStones** — 5–8 sentences, each standing alone. A stone is a truth
Joshua leaves for a later generation, not advice. Each must be traceable to a
specific detail in the story.

- Yes: "Captured horses and chariots become tomorrow's trust, so they were hamstrung and burned."
- No: "Don't rely on your own resources."

**quote** — one short line from the chapter, quiet. It sits under the stones and
must not outweigh them. Rendered without attribution; the section already names
the chapter.

**synthesis** — the theological movement, not a summary. `opening` states what
the division is really about; `steps` pose each chapter as a question whose
answer is that chapter's one-word theme; `closing` says what the division formed
in the people, not what it teaches the reader.

**canon** — 5 imperatives, one line each, phrased in the book's own vocabulary
("Inquire of the Lord before you commit," not "Do your due diligence").

## 5. Voice

Biblical, literary, timeless. The page should read as a record preserved by the
author of the book, not as notes taken about it.

Forbidden: modern business or leadership vocabulary (leverage, alignment,
stakeholders, execution, blind spots as a management term, "levels"), self-help
cadence, emoji, exclamation, second-person exhortation, any claim not grounded
in the text.

Preferred: the book's own nouns and images. If Joshua says stones, say stones.

## 6. Failure modes

| Failure | Signature | Fix |
|---|---|---|
| Unearned stones | The stone would be true without the chapter | Trace it to a detail in `story`, or cut it |
| Tension as application | The question addresses the reader, not Israel | Rewrite in the narrative's terms |
| Theme drift | Anchor, theme, and synthesis answer disagree | One word, used in all three |
| Generic register | The sentence could appear in a management book | Rewrite with the book's vocabulary |
| Quote dominance | The pull quote reads as the point | Shorten it; the stones carry the section |
| Redundant canon | The canon restates stones verbatim | Distill to imperatives, one per chapter's capacity |
| Prose in JSX | Sentences living in the component | All prose belongs in the data file |

## 7. Route and files

| Concern | Location |
|---|---|
| Content | `lib/writings/<book>/<division-id>.ts` |
| Route | `app/writings/<book>/<division-id>/page.tsx` (metadata + one render call) |
| Rendering | `components/DivisionMemorial.tsx` — shared, do not fork per division |
| URL | `/writings/<book>/<division-id>` |
| Reached from | The division label in `ChapterNav`, above its chapter numbers |

Division ids match `lib/<book>-metadata.json`. Adding a division memorial never
changes the reading routes or the chapter pages.

## 8. Design constraints

Existing tokens only: `ink`, `muted`, `faint`, `paper`, `paper-2`, `hairline`,
`gold-ink`. Serif (Cardo) for headings, prose, and stones; sans (Public Sans)
for eyebrows, labels, and numerals. Reading width `max-w-[760px]`.

Hairlines, numerals, and vertical space carry the structure — not cards,
shadows, gradients, or color. Anchored sections take `scroll-mt-24`. Semantic
`<section>`, `<nav>`, `<header>`, `<blockquote>`; heading order never skips.

## 9. Checklist

- [ ] Every chapter has story, tension, revelation, stones, quote — in that order
- [ ] Each tension is a question in the narrative's terms
- [ ] Each revelation answers its tension
- [ ] Every stone traces to a detail in its story
- [ ] Theme = anchor = synthesis answer, one word, for all chapters
- [ ] Synthesis explains the movement; closing names what was formed
- [ ] Canon is 5 imperatives in the book's vocabulary
- [ ] No prose in the component; no new dependency; no new color
- [ ] Reads as a memorial, not as notes
