#!/usr/bin/env python3
"""
Fix speaker quotes to match exact verse text substrings.
"""
import json
import re

with open('lib/hosea.json') as f:
    hosea_data = json.load(f)

with open('data/speakers/hosea.json') as f:
    speakers = json.load(f)

# Build verse lookup
verses = {}
for ch in hosea_data['chapters']:
    ch_num = str(ch['chapter'])
    verses[ch_num] = {int(v['verse']): v['text'] for v in ch['verses']}


def find_dialogue_in_verse(verse_text, hint_words):
    """Find dialogue portion in verse using hint words from the quote."""
    # Try to find a substring starting with a quote mark that contains the hint words
    for i, c in enumerate(verse_text):
        if c in '"\u201c':
            # Found a quote start, extract until end of verse or closing quote
            remaining = verse_text[i:]
            # Check if hint words are present
            if all(w.lower() in remaining.lower() for w in hint_words[:3]):
                return remaining
    # No quote found, just return the part containing hint words
    for i in range(len(verse_text)):
        remaining = verse_text[i:]
        if all(w.lower() in remaining.lower() for w in hint_words[:3]):
            return remaining
    return None


def auto_fix(verse_text, quote):
    """Try to fix a quote to match the verse text."""
    if quote in verse_text:
        return quote

    # Strip outer quotes
    stripped = quote
    if stripped and stripped[0] in '"\u201c\u201d\u2018\u2019':
        stripped = stripped[1:]
    if stripped and stripped[-1] in '"\u201c\u201d\u2018\u2019`':
        stripped = stripped[:-1]

    if stripped in verse_text:
        return stripped

    # Try replacing backticks with curly quotes
    fixed = stripped.replace('`', '\u2019')  # Replace backtick with right single quote
    if fixed in verse_text:
        return fixed

    # Try other quote conversions
    fixed = stripped.replace('`', "'")
    if fixed in verse_text:
        return fixed

    return None


# Manual fixes: define the exact substrings to extract
# Format: (chapter, verse, start_marker, end_marker_or_none)
# We'll extract the substring from start_marker to end of verse (or end_marker if specified)

manual_extractions = {
    # (ch, v): (start_text, end_text or None for end of verse)
    (1, 6): ('\u201cCall her Lo-Ruhamah', None),
    (1, 9): ('\u201cCall him Lo-Ammi', None),
    (1, 10): ('\u201cYet the Israelites', None),
    (2, 1): ('\u201cSay of your brothers', None),
    (2, 16): ('\u201cIn that day,\u201d declares the Lord', None),
    (2, 21): ('\u201cIn that day I will respond', None),
    (2, 23): ('I will plant her for myself', None),
    (4, 15): ('\u201cThough you, Israel', None),
    (13, 10): ('Where is your king', None),
    (14, 2): ('Take words with you', None),
    (14, 3): ('Assyria cannot save us', None),
    (14, 5): ('I will be like the dew', None),
}


def extract_substring(verse_text, start_text, end_text=None):
    """Extract exact substring from verse_text."""
    start_idx = verse_text.find(start_text)
    if start_idx == -1:
        return None
    if end_text:
        end_idx = verse_text.find(end_text, start_idx)
        if end_idx == -1:
            return verse_text[start_idx:]
        return verse_text[start_idx:end_idx + len(end_text)]
    return verse_text[start_idx:]


# Process each chapter
fixed_count = 0
errors = []

for ch_num in sorted(speakers['chapters'].keys(), key=int):
    spans = speakers['chapters'][ch_num]
    ch_verses = verses.get(ch_num, {})

    for i, span in enumerate(spans):
        verse_num = span['verse']
        quote = span['quote']
        verse_text = ch_verses.get(verse_num, '')

        if quote in verse_text:
            continue  # Already matches

        key = (int(ch_num), verse_num)

        # Try manual extraction first
        if key in manual_extractions:
            start_text, end_text = manual_extractions[key]
            new_quote = extract_substring(verse_text, start_text, end_text)
            if new_quote and new_quote in verse_text:
                speakers['chapters'][ch_num][i]['quote'] = new_quote
                fixed_count += 1
                print(f"Ch{ch_num}v{verse_num}: MANUAL EXTRACT")
                continue

        # Try auto-fix
        fixed = auto_fix(verse_text, quote)
        if fixed:
            speakers['chapters'][ch_num][i]['quote'] = fixed
            fixed_count += 1
            print(f"Ch{ch_num}v{verse_num}: AUTO-FIXED")
        else:
            errors.append((ch_num, verse_num))
            print(f"Ch{ch_num}v{verse_num}: NO FIX")
            print(f"  Quote: {repr(quote[:50])}")
            print(f"  Verse: {repr(verse_text[:50])}")

# Validate all quotes match
print("\n=== Validation ===")
all_match = True
for ch_num in sorted(speakers['chapters'].keys(), key=int):
    spans = speakers['chapters'][ch_num]
    ch_verses = verses.get(ch_num, {})
    for span in spans:
        verse_num = span['verse']
        quote = span['quote']
        verse_text = ch_verses.get(verse_num, '')
        if quote not in verse_text:
            all_match = False
            print(f"STILL BROKEN: Ch{ch_num}v{verse_num}")
            print(f"  Quote: {repr(quote[:60])}")
            print(f"  Verse: {repr(verse_text[:60])}")

if all_match:
    print("All quotes match!")
    with open('data/speakers/hosea.json', 'w') as f:
        json.dump(speakers, f, indent=2, ensure_ascii=False)
    print("\nSaved to data/speakers/hosea.json")
else:
    print("\nSome quotes still don't match. NOT saving.")

print(f"\nFixed: {fixed_count}")
print(f"Errors: {len(errors)}")
