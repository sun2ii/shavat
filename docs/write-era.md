# How to Create a Terrain Era

## Overview

Terrain eras are the backbone of the biblical narrative in Shavat. Each era is a modal that displays:
- **Header**: Era name, scripture range, tagline, color legend
- **Backbone**: 5 movements showing WHAT IS HAPPENING (not who)
- **Transition**: Question leading to next era + scripture quote + next era button

## Architecture

```
lib/terrain.ts           -> Data: EraContent with movements, people, places
components/terrain/
  StoryTerrain.tsx       -> BackboneModal component renders any era
  Terrain.tsx            -> Tab navigation (Story, Characters, Places, Timeline)
```

## Data Model

### EraContent Interface (lib/terrain.ts)

```typescript
interface EraContent {
  id: EraId;                    // 'origins' | 'patriarchs' | 'exodus' | etc.
  tagline: string;              // One-line era statement
  introduction: string[];       // Usually empty []
  movements: EraMovement[];     // Exactly 5 backbone movements
  people?: EraPerson[];         // Characters in this era
  places?: EraPlaceFull[];      // Locations in this era
  transition?: EraTransition;   // Question + scripture leading to next era
  nextEra?: {                   // Link to next era
    id: EraId;
    name: string;
    bookNote: string;           // e.g., "Exodus-Deuteronomy"
  };
}
```

### EraMovement Interface

```typescript
interface EraMovement {
  number: string;               // '01', '02', '03', '04', '05'
  title: string;                // WHAT is happening (not WHO)
  scripture: string;            // e.g., 'Genesis 12-14'
  people?: EraPersonRef[];      // { id, name } references
  places?: EraPlace[];          // { id, name, precision? }
  body: string[];               // 2-4 sentences, joined with spaces
  closingInsight?: string;      // Italic gold key idea
}
```

### EraPerson Interface (full character data)

```typescript
interface EraPerson {
  id: string;                   // Unique slug: 'abraham', 'noah'
  name: string;                 // Display name: 'Abraham', 'Adam . Eve'
  scripture: string;            // Where they appear: 'Genesis 12-25'
  backbone: string[];           // Lowercase movement titles: ['the call', 'the promise']
  description: string;          // 1-2 sentences
  relation?: 'root' | 'child' | 'generation-gap' | 'branch';
}
```

### EraPlaceFull Interface

```typescript
interface EraPlaceFull {
  id: string;                   // Unique slug: 'canaan', 'egypt'
  name: string;                 // Display name
  scripture: string;            // Where mentioned
  description: string;          // 1-2 sentences
  precision?: 'exact' | 'region' | 'traditional' | 'uncertain';
}
```

## Step-by-Step: Adding a New Era

### Step 1: Add EraContent to lib/terrain.ts

Add after the previous era's content (e.g., after `PATRIARCHS_CONTENT`):

```typescript
export const EXODUS_CONTENT: EraContent = {
  id: 'exodus',
  tagline: "A family becomes a nation through liberation and law.",
  introduction: [],
  movements: [
    {
      number: '01',
      title: 'Oppression',           // WHAT, not WHO
      scripture: 'Exodus 1-6',
      people: [
        { id: 'moses', name: 'Moses' },
        { id: 'pharaoh-exodus', name: 'Pharaoh' },
      ],
      places: [
        { id: 'egypt', name: 'Egypt', precision: 'region' },
      ],
      body: [
        "A new king arises who did not know Joseph.",
        "Israel multiplies but is enslaved. Moses is born and preserved.",
      ],
      closingInsight: "God hears the groaning of His people.",
    },
    // ... 4 more movements
  ],
  people: [
    {
      id: 'moses',
      name: 'Moses',
      scripture: 'Exodus-Deuteronomy',
      backbone: ['oppression', 'deliverance', 'sinai', 'wilderness', 'the edge'],
      description: "Led Israel out of Egypt and received the Law at Sinai.",
      relation: 'root',
    },
    // ... more people
  ],
  places: [
    {
      id: 'sinai',
      name: 'Sinai',
      scripture: 'Exodus 19-40',
      description: "The mountain where God gave the Law to Moses.",
      precision: 'traditional',
    },
    // ... more places
  ],
  transition: {
    question: 'How does a delivered nation become a settled people?',
    scripture: 'Joshua 1',
    scriptureText: '"Be strong and courageous..."',
    explanation: [],
    closing: '',
  },
  nextEra: {
    id: 'tribes',
    name: 'Tribes',
    bookNote: 'Joshua-Ruth',
  },
};
```

### Step 2: Update getEraContent()

```typescript
export function getEraContent(eraId: EraId): EraContent | undefined {
  if (eraId === 'origins') return ORIGINS_CONTENT;
  if (eraId === 'patriarchs') return PATRIARCHS_CONTENT;
  if (eraId === 'exodus') return EXODUS_CONTENT;  // ADD THIS
  return undefined;
}
```

### Step 3: Update getAllPeople() and getAllPlaces()

Add the new era's people/places to the aggregation:

```typescript
export function getAllPeople(): EraPerson[] {
  const originsPeople = ORIGINS_CONTENT.people || [];
  const patriarchsPeople = PATRIARCHS_CONTENT.people || [];
  const exodusPeople = EXODUS_CONTENT.people || [];  // ADD THIS
  // ... dedupe logic
}
```

### Step 4: Add Section Navigation Map

In `components/terrain/StoryTerrain.tsx`, add to `SECTION_MAPS`:

```typescript
const SECTION_MAPS: Record<string, Record<string, { section: string; chapter: number }>> = {
  origins: { /* ... */ },
  patriarchs: { /* ... */ },
  exodus: {
    '01': { section: 'oppression', chapter: 1 },
    '02': { section: 'plagues', chapter: 7 },
    '03': { section: 'sinai', chapter: 19 },
    '04': { section: 'wilderness', chapter: 1 },  // Numbers 1
    '05': { section: 'edge', chapter: 1 },        // Deuteronomy 1
  },
};
```

### Step 5: Add Era Header Metadata

In `components/terrain/StoryTerrain.tsx`, add to `ERA_HEADERS`:

```typescript
const ERA_HEADERS: Record<string, { bookNote: string; name: string }> = {
  origins: { bookNote: 'Genesis 1-11', name: 'Origins' },
  patriarchs: { bookNote: 'Genesis 12-50', name: 'Patriarchs' },
  exodus: { bookNote: 'Exodus-Deuteronomy', name: 'Exodus' },  // ADD
};
```

## Content Guidelines

### Backbone Movement Titles

**DO**: Describe WHAT IS HAPPENING
- The Call, The Promise, The Flood, Oppression, Deliverance, Sinai

**DON'T**: Name WHO is carrying it
- Abraham, Moses, David (these are PEOPLE, not BACKBONE)

### Body Text

- 2-4 sentences max
- Describe the narrative arc
- No theological essays
- Keep it scannable

### Closing Insight

- One sentence in italics
- The "so what" of this movement
- Should feel like wisdom, not summary

### People

- Only include people essential for orientation
- Use `relation` to show genealogical structure
- `backbone` array uses lowercase movement titles

### Places

- Use appropriate `precision`:
  - `exact`: Archaeological certainty (Hebron, Jerusalem)
  - `region`: General area (Canaan, Egypt)
  - `traditional`: Traditional but uncertain (Eden, Sinai)
  - `uncertain`: Debated location (Nod)

### Transition

- Pose the narrative question the next era answers
- Include a key scripture verse with reference
- Should create forward momentum

## The Seven Eras

| Era | Books | Backbone Focus |
|-----|-------|----------------|
| Origins | Genesis 1-11 | Creation, Fall, Flood, Babel |
| Patriarchs | Genesis 12-50 | Call, Promise, Israel, Joseph, Egypt |
| Exodus | Exodus-Deuteronomy | Oppression, Deliverance, Sinai, Wilderness, Edge |
| Tribes | Joshua-Ruth | Conquest, Inheritance, Cycles, Chaos, Faithfulness |
| Kingdom | 1 Samuel-2 Kings | Transition, David, Solomon, Division, Judah Alone |
| Exile | Lamentations, Ezekiel, Daniel | Destruction, Judgment, Nations, Restoration, Faithfulness |
| Return | Ezra, Nehemiah, Esther | Return, Reform, Walls, Renewal, Preservation |

## Verification

1. `npm run build` should compile without errors
2. Navigate to `/terrain` and click the era dot
3. Modal should display with all 5 movements
4. Click "Next" button should navigate to next era
5. People/place links should work (blue = characters, olive = places)
6. Characters/Places tabs should show new entries

## Files Modified Per Era

1. `lib/terrain.ts`
   - Add `{ERA}_CONTENT` constant
   - Update `getEraContent()`
   - Update `getAllPeople()` / `getAllPlaces()`

2. `components/terrain/StoryTerrain.tsx`
   - Add to `SECTION_MAPS`
   - Add to `ERA_HEADERS`

That's it. The `BackboneModal` component automatically renders any era with content.
