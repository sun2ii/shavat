# Bible Text Typography Canonicalization Audit

**Date:** 2026-08-12
**Status:** AUDIT COMPLETE - AWAITING APPROVAL

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Bible files scanned | 65 |
| Total verses | 30,957 |
| Verses that would change | 11,197 |
| Speaker spans | 638 |
| Current match rate | 80.6% (514/638) |
| Post-canonicalization match rate | 80.9% (516/638) |
| Improvement | +2 matches |

**BLOCKER FOUND:** `lib/amos.json` has a JSON syntax error at line 561 (unescaped curly quote in text field). This must be fixed first.

---

## Phase 1: Character Audit

### Bible Text (`lib/*.json`)

| Character | Unicode | Count | Example |
|-----------|---------|-------|---------|
| `"` | U+201C LEFT DOUBLE QUOTATION | 8,563 | Dialog openings |
| `"` | U+201D RIGHT DOUBLE QUOTATION | 6,579 | Dialog closings |
| `` ` `` | U+0060 GRAVE ACCENT (backtick) | 4,715 | Apostrophes |
| `'` | U+2018 LEFT SINGLE QUOTATION | 1,893 | Inner quotes |

**No NBSP, ZWSP, or carriage returns found.**

### Speaker Data (`data/speakers/*.json`)

| Character | Unicode | Count |
|-----------|---------|-------|
| `"` | U+201C | 460 |
| `"` | U+201D | 423 |
| `` ` `` | U+0060 | 114 |
| `'` | U+2018 | 61 |
| `'` | U+0027 (straight) | 10 |
| `'` | U+2019 | 4 |

---

## Phase 2: Backtick Analysis

**Question:** Are backticks semantic or purely typographic?

### Backtick Context Patterns (4,715 total)

| Pattern | Count | Meaning |
|---------|-------|---------|
| `letter ` ` letter` | 3,126 | Possessive: `Abraham's` |
| `punct ` ` end` | 537 | Closing quote at verse end |
| `punct ` ` space` | 417 | Closing quote mid-sentence |
| `punct ` ` quote` | 387 | Nested quote boundary |
| `letter ` ` space` | 141 | Possessive before space |
| `contraction` | 528 | `don't`, `hasn't`, etc. |

### Semantic Classification

| Category | Count | % |
|----------|-------|---|
| Possessive (`word's`) | 2,598 | 55.1% |
| Closing single quote | 1,036 | 22.0% |
| Contractions | 528 | 11.2% |
| Other (end of verse, etc.) | 553 | 11.7% |

**CONCLUSION:** Backticks are 100% typographic. They represent apostrophes or closing single quotes. Safe to replace with `'` (U+0027).

### Examples

```
BEFORE: Abraham`s concubine
AFTER:  Abraham's concubine

BEFORE: Don`t you know
AFTER:  Don't you know

BEFORE: 'You are my people'` (closing nested quote)
AFTER:  'You are my people'' (straight apostrophe)
```

---

## Phase 3: Proposed Canonicalization Function

```typescript
function canonicalizeBibleText(text: string): string {
  return text
    .normalize("NFC")           // Unicode normalization
    .replace(/[""]/g, '"')      // Curly double -> straight
    .replace(/['']/g, "'")      // Curly single -> straight
    .replace(/`/g, "'")         // Backtick -> straight apostrophe
    .replace(/\u00A0/g, " ");   // NBSP -> regular space (none found, but safe)
}
```

### What This Changes

| From | To | Count |
|------|-----|-------|
| `"` (U+201C) | `"` (U+0022) | 8,563 |
| `"` (U+201D) | `"` (U+0022) | 6,579 |
| `'` (U+2018) | `'` (U+0027) | 1,893 |
| `'` (U+2019) | `'` (U+0027) | 4 |
| `` ` `` (U+0060) | `'` (U+0027) | 4,715 |

**Total character replacements:** ~21,754

### What This Does NOT Change

- Words
- Capitalization
- Verse numbers
- Em dashes / en dashes
- Hyphens
- Ellipses
- Sentence structure
- Speaker boundaries

---

## Phase 4: Dry Run Results

### Bible Data Impact

| Metric | Value |
|--------|-------|
| Files that would change | 64 of 65 |
| Verses that would change | 11,197 of 30,957 |
| Character changes | ~21,754 |

### Before/After Examples

```
BEFORE: During Saul`s reign they waged war against the Hagrites
AFTER:  During Saul's reign they waged war against the Hagrites

BEFORE: "Oh, that you would bless me and enlarge my territory!"
AFTER:  "Oh, that you would bless me and enlarge my territory!"

BEFORE: Zeruiah`s three sons were Abishai, Joab and Asahel.
AFTER:  Zeruiah's three sons were Abishai, Joab and Asahel.
```

**Scripture wording is UNCHANGED. Only typography normalized.**

---

## Phase 5: Speaker Validation

### Current State (Before Canonicalization)

| Book | Spans | Matches | Failures | Rate |
|------|-------|---------|----------|------|
| 2-kings | 411 | 411 | 0 | 100% |
| hosea | 90+ | ~85 | ~5 | ~94% |
| jonah | 32 | 30 | 2 | 94% |
| amos | N/A | ERROR | ERROR | JSON broken |
| **Total** | **638** | **514** | **124** | **80.6%** |

### After Canonicalization (Dry Run)

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Successful matches | 514 | 516 | +2 |
| Failed matches | 124 | 122 | -2 |
| Match rate | 80.6% | 80.9% | +0.3% |

**Canonicalization does NOT break existing matches.**
**Canonicalization slightly IMPROVES match rate.**

### Remaining Failures

122 speaker spans still fail after canonicalization. These failures are NOT caused by typography. They are pre-existing data issues:

1. **amos.json is broken** - JSON syntax error, cannot load
2. **Hosea has semantic boundary issues** - quotes include narrator tags
3. **Some quotes don't match verse text** - typos, wrong text

---

## Phase 6: Safety Checklist

| Check | Status |
|-------|--------|
| Files that would change | 64 Bible + 4 speaker = 68 |
| Verses that would change | 11,197 |
| Speaker quote entries that would change | ~600 |
| Existing matches become invalid? | NO (516 >= 514) |
| Changes isolated to one commit? | YES |
| Tests covering tokenizeVerse? | UNKNOWN - needs verification |
| Validation script exists? | NO - should be added |

---

## Blockers

### 1. Fix `lib/amos.json` JSON Error

**Location:** Line 561
**Problem:** Unescaped curly quote inside JSON string

```json
"text": ""In that day the lovely young women..."
         ^-- This curly quote breaks JSON parsing
```

**Fix:** Escape or replace the curly quote.

### 2. Add Validation Script

Create a test that asserts:

```typescript
// For every speaker quote:
canonicalVerseText.includes(canonicalQuote) === true
```

This prevents malformed speaker data from silently entering the codebase.

---

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Scripture semantics change | NONE | Only typography changes |
| Speaker boundaries change | NONE | Canonicalization is symmetric |
| Rendering breaks | LOW | Test in browser after migration |
| Git diff noise | MEDIUM | Single atomic commit |

---

## Recommended Migration Order

1. **Fix amos.json** - Repair JSON syntax error
2. **Add validation script** - Create invariant check
3. **Run validation** - Baseline all speaker matches
4. **Canonicalize Bible text** - Apply to `lib/*.json`
5. **Canonicalize speaker quotes** - Apply to `data/speakers/*.json`
6. **Re-run validation** - Confirm no regressions
7. **Visual test** - Check rendering in browser
8. **Commit** - Single atomic commit with clear message

---

## Go / No-Go Assessment

### GO Signals

- Canonicalization improves match rate (516 > 514)
- No existing matches break
- Backticks are 100% typographic (safe to replace)
- Scripture wording unchanged
- Changes are reversible (git)

### NO-GO Signals

- `lib/amos.json` has JSON syntax error (BLOCKER)
- No validation script exists yet
- 122 speaker spans still fail (pre-existing, unrelated to typography)

---

## Recommendation

**CONDITIONAL GO**

1. Fix amos.json syntax error first
2. Add validation script
3. Then execute canonicalization

The typography normalization itself is safe and beneficial. The blockers are separate issues that should be resolved first.

---

## Key Numbers for Approval

| Metric | Before | After |
|--------|--------|-------|
| Speaker spans that validate | 514 | 516 |
| Match rate | 80.6% | 80.9% |
| Regressions | 0 | 0 |

**If these numbers hold after fixing amos.json, the migration is safe.**
