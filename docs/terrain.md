# Shavat Terrain

**Status:** Frozen for v1 implementation

## Purpose

The Terrain is Shavat's spatial model of Scripture.

It answers:

> Where am I in the biblical world?

Shavat has three primary navigation modes:

- **Library** — What do I want to read?
- **Terrain** — Where am I in the biblical world?
- **Writings** — How can I explore Scripture by literary form?

The Terrain is fixed. It represents the underlying biblical world.

- **Dimensions** are different ways of viewing that world.
- **Layers** add optional context without altering the Terrain.
- **Collections** are expandable groups of books used for navigation.
- **Tags** provide interpretation, themes, and metadata.

## Frozen Conceptual Model

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                                  SHAVAT                                      │
│                                                                              │
│                    LIBRARY        TERRAIN        WRITINGS                    │
└──────────────────────────────────────────────────────────────────────────────┘

                                   TERRAIN
                      The spatial model of Scripture

               ┌─────────────────────────────────────────┐
               │              DIMENSIONS                 │
               │                                         │
               │   [ Story ]   People   Places   Timeline│
               │                                         │
               │   Same biblical world.                  │
               │   Different ways of seeing it.          │
               └─────────────────────────────────────────┘

┌──────────────────────────────── STORY ───────────────────────────────────────┐
│                                                                              │
│  TORAH                                                                       │
│  ▸ Genesis                                                                   │
│  ▸ Exodus                                                                    │
│  ▸ Leviticus                                                                 │
│  ▸ Numbers                                                                   │
│  ▸ Deuteronomy                                                               │
│       │                                                                      │
│       ▼                                                                      │
│  JOSHUA • JUDGES • RUTH                                                      │
│  ▸ Joshua                                                                    │
│  ▸ Judges                                                                    │
│  ▸ Ruth                                                                      │
│       │                                                                      │
│       ▼                                                                      │
│  SAMUEL & KINGS                                                              │
│  ▸ 1 Samuel                                                                  │
│  ▸ 2 Samuel                                                                  │
│  ▸ 1 Kings                                                                   │
│  ▸ 2 Kings                                                                   │
│       │                                                                      │
│       ├──────────────────────► CHRONICLES                                    │
│       │                         ▸ 1 Chronicles                               │
│       │                         ▸ 2 Chronicles                               │
│       │                         Parallel retelling                           │
│       ▼                                                                      │
│  EZRA • NEHEMIAH • ESTHER                                                    │
│  ▸ Ezra                                                                      │
│  ▸ Nehemiah                                                                  │
│  ▸ Esther                                                                    │
│                                                                              │
│  ─────────────────────────── 400 YEARS ───────────────────────────────────   │
│                                                                              │
│       ▼                                                                      │
│  GOSPELS                                                                     │
│  ▸ Matthew                                                                   │
│  ▸ Mark                                                                      │
│  ▸ Luke                                                                      │
│  ▸ John                                                                      │
│       │                                                                      │
│       ▼                                                                      │
│  ACTS                                                                        │
│  ▸ Jerusalem                                                                 │
│  ▸ Judea & Samaria                                                           │
│  ▸ Paul's Journeys                                                           │
│  ▸ Rome                                                                      │
│       │                                                                      │
│       ▼                                                                      │
│  LETTERS                                                                     │
│  ▸ Paul's Letters                                                            │
│      ▸ Romans                 ▸ Philippians         ▸ 1–2 Timothy            │
│      ▸ 1–2 Corinthians        ▸ Colossians          ▸ Titus                  │
│      ▸ Galatians              ▸ 1–2 Thessalonians   ▸ Philemon               │
│      ▸ Ephesians                                                             │
│                                                                              │
│  ▸ General Letters                                                           │
│      ▸ Hebrews                ▸ 1–2 Peter           ▸ 1–3 John               │
│      ▸ James                                        ▸ Jude                   │
│       │                                                                      │
│       ▼                                                                      │
│  REVELATION                                                                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

                         OPTIONAL CONTEXT LAYERS

        ┌───────────────┬─────────────────────────────────────────┐
        │ Prophets      │ Who was speaking into this period?      │
        │ Wisdom        │ What wisdom and worship belong here?    │
        │ People        │ Who appears, and how are they related?  │
        │ Places        │ Where did these events happen?          │
        │ Timeline      │ When did these events occur?            │
        │ Journeys      │ How did people move through the story?  │
        │ Themes        │ What ideas recur across Scripture?      │
        │ Cross-Refs    │ Where else is this connected?           │
        └───────────────┴─────────────────────────────────────────┘

Example: turning on the PROPHETS layer does not alter the Story terrain.

  SAMUEL & KINGS
       │
       ├─ Isaiah
       ├─ Hosea
       ├─ Amos
       ├─ Micah
       ├─ Jeremiah
       ├─ Ezekiel
       └─ Daniel

  EZRA • NEHEMIAH • ESTHER
       │
       ├─ Haggai
       ├─ Zechariah
       └─ Malachi

┌────────────────────────────── CORE MODEL ────────────────────────────────────┐
│                                                                              │
│  LIBRARY                                                                     │
│  “What do I want to read?”                                                   │
│                                                                              │
│  TERRAIN                                                                     │
│  “Where am I in the biblical world?”                                         │
│                                                                              │
│  WRITINGS                                                                    │
│  “How can I explore Scripture by literary form?”                             │
│                                                                              │
│  Inside Terrain:                                                             │
│                                                                              │
│  DIMENSION = the perspective                                                 │
│  Story · People · Places · Timeline                                          │
│                                                                              │
│  LAYER = optional context added to that perspective                          │
│  Prophets · Wisdom · Themes · Journeys · Cross-References                    │
│                                                                              │
│  TERRAIN IS FIXED. LAYERS NEVER REWRITE IT.                                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

## V1 Scope

Implement now:

1. Rename the current Map navigation item and page to Terrain.
2. Add the Terrain dimensions:
    - Story
    - People
    - Places
    - Timeline
3. Make Story the active and implemented dimension.
4. Display the fixed Story terrain.
5. Make every Collection expandable and collapsible.
6. Allow a user to select an individual book from an expanded Collection.
7. Represent Chronicles as a parallel retelling connected to Samuel & Kings rather than as the next chronological stage.
8. Preserve the 400-year transition between the Hebrew Scriptures and the Gospels.

Scaffold but do not implement:

- People dimension
- Places dimension
- Timeline dimension
- Context Layers

Unimplemented dimensions should have restrained placeholders rather than fabricated content.

## Design Direction

The interface should feel:

- calm
- editorial
- spatial
- premium
- minimal
- easy to scan
- consistent with the current Shavat design language

Avoid:

- dashboard aesthetics
- dense cards
- heavy borders
- excessive controls
- decorative complexity
- treating the page like a traditional file tree

The connecting lines should communicate narrative movement. Expandable controls should provide access to books without overpowering the overall terrain.

## Architectural Rules

1. The Terrain is fixed.
2. Dimensions change perspective, not the underlying biblical world.
3. Layers add context without rewriting the Terrain.
4. Collections organize books for navigation.
5. Tags provide interpretation and metadata.
6. Orientation comes before interpretation.
7. One concept has one home.
8. Do not invent theological data merely to complete the interface.
