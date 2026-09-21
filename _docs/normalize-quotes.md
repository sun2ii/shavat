# Normalize Quotes for Speaker Data

## Task
Add verse-range speaker attribution for [BOOK NAME] to enable speaker legends across all translations.

## Two-Layer Speaker System

**Layer 1: verseSpeakers (translation-agnostic)** - Do this first
- Maps verse ranges to speaker IDs
- Shows speaker dots in section headers
- Works across any Bible translation

**Layer 2: chapters/quotes (translation-specific)** - Do later
- Exact substring matching for inline text highlighting
- Requires matching quote characters exactly
- Can be added per-translation over time

## Quote Characters in This Codebase

The Bible text uses these characters (must match exactly for quote highlighting):
- `"` (U+201C) - left curly double quote
- `"` (U+201D) - right curly double quote
- `'` (U+2018) - left curly single quote
- `` ` `` (U+0060) - backtick (used as apostrophe)
- `—` (U+2014) - em dash

## File Structure

```
data/speakers/{book}.json
```

## Schema

```json
{
  "book": "{book-slug}",
  "speakers": {
    "{speaker-id}": {
      "name": "Display Name",
      "color": 1
    }
  },
  "verseSpeakers": {
    "{chapter}": {
      "{verse-range}": ["{speaker-id}", "{speaker-id}"]
    }
  },
  "chapters": {
    "{chapter}": [
      {
        "verse": 1,
        "speaker": "{speaker-id}",
        "quote": "Exact quote text with curly quotes"
      }
    ]
  }
}
```

## Speaker Colors (1-12)

| Color | RGB Variable | Typical Use |
|-------|--------------|-------------|
| 1 | --speaker-1 | Protagonist (blue) |
| 2 | --speaker-2 | Antagonist (crimson) |
| 3 | --speaker-3 | Supporting (emerald) |
| 4 | --speaker-4 | Supporting (violet) |
| 5 | --speaker-5 | Supporting (teal) |
| 6 | --speaker-6 | Supporting (magenta) |
| 7 | --speaker-7 | Supporting (sienna) |
| 8 | --speaker-8 | God/Divine (gold) |
| 9 | --speaker-9 | Minor |
| 10-12 | | Additional |

## Verse Range Format

- Single verse: `"5": ["job"]`
- Range: `"7-12": ["the-lord", "satan"]`
- Multiple speakers in same range = dialogue between them

## Steps

1. **Check verse counts per chapter**
```bash
python3 << 'EOF'
import json
with open('lib/{book}.json', 'r') as f:
    data = json.load(f)
for ch in data['chapters']:
    print(f"Ch {ch['chapter']}: {len(ch['verses'])} verses")
EOF
```

2. **Identify speakers and their chapters**
- Read the book or use a Bible commentary
- Note which speakers appear in which verse ranges

3. **Create speaker file with verseSpeakers**
```json
{
  "book": "{book-slug}",
  "speakers": {
    "speaker-id": { "name": "Name", "color": N }
  },
  "verseSpeakers": {
    "1": { "1-10": ["speaker-id"] }
  }
}
```

4. **Register the book** in `lib/hasSpeakers.ts`:
```typescript
const SPEAKER_BOOKS = new Set([..., '{book-slug}']);
```

5. **Validate JSON**
```bash
python3 -c "import json; json.load(open('data/speakers/{book}.json')); print('Valid')"
```

## Example: Job

**Speakers:**
- job (1), the-lord (8), satan (2)
- eliphaz (3), bildad (4), zophar (9), elihu (7)
- messenger (5), jobs-wife (6)

**Structure:**
- Ch 1-2: Prologue (heavenly court + tragedy)
- Ch 3-31: Three debate cycles (Job vs friends)
- Ch 32-37: Elihu speaks
- Ch 38-41: The Lord from the storm
- Ch 42: Epilogue

## Books with Significant Dialogue

Priority books for speaker data:
- Genesis (God, Adam, Eve, serpent, patriarchs)
- Exodus (God, Moses, Pharaoh)
- 1-2 Samuel (Samuel, Saul, David)
- 1-2 Kings (prophets, kings)
- Jonah, Amos, Hosea (already done)
- Job (done)
- Gospels (Jesus, disciples, crowds)
- Acts (Peter, Paul, various)
