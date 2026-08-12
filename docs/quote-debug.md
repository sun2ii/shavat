# Speaker Quote Fixing Prompt

Use this when voice highlighting is broken for a book.

## The Rule

The `quote` field in `data/speakers/{book}.json` must be an **exact substring** of the verse text in `lib/{book}.json`.

If `verse_text.indexOf(quote) === -1`, the quote won't highlight.

## Diagnosis (run once)

```bash
python3 << 'PYEOF'
import json
BOOK = "hosea"  # change this

with open(f'lib/{BOOK}.json') as f:
    book = json.load(f)
with open(f'data/speakers/{BOOK}.json') as f:
    speakers = json.load(f)

verses = {}
for ch in book['chapters']:
    verses[str(ch['chapter'])] = {int(v['verse']): v['text'] for v in ch['verses']}

for ch_num, spans in speakers['chapters'].items():
    for span in spans:
        v, q = span['verse'], span['quote']
        vt = verses.get(ch_num, {}).get(v, '')
        if q not in vt:
            print(f"Ch{ch_num}v{v} MISMATCH")
            print(f"  quote: {repr(q)}")
            print(f"  verse: {repr(vt)}")
            print()
PYEOF
```

## Fix Prompt (copy to ChatGPT/Claude)

```
Fix the speaker quotes in data/speakers/{BOOK}.json to match the verse text exactly.

THE RULE: The quote field must be a verbatim substring of the verse text.

Here are the mismatches. For each one, I'm showing the current quote and the actual verse text.
Extract the dialogue portion from the verse text and use that exact string.

[PASTE MISMATCHES HERE]

Output: For each mismatch, give me the corrected quote value (the exact substring from the verse text).
```

## Common Issues

| Problem | Fix |
|---------|-----|
| Quote has `"` but verse starts with `"` | Remove leading quote mark |
| Quote has `` ` `` but verse has `'` | Replace backtick with curly quote |
| Quote ends with `.` but verse ends with `;` | Match the verse punctuation |
| Quote has nested `"..."` but verse has `"..."` | Copy exact characters from verse |

## Verification

Run the diagnostic again. No output = all quotes match.
