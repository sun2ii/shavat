# Speaker Attribution System: Architecture Investigation Report

**Date:** 2026-08-12
**Scope:** Read-only investigation of speaker attribution architecture
**Goal:** Determine correct architecture before further implementation

---

## A. Current System

### How It Works

```
Data Flow:
  data/speakers/{book}.json
    └─> lib/speakers.ts (server loader)
        └─> lib/speaker-quotes.ts (tokenizer)
            └─> tokenizeVerse(text, spans) → VerseRun[]
                └─> Component renders runs with speaker styling
```

**Core Algorithm (lib/speaker-quotes.ts:39-60):**

```typescript
for (const span of spans) {
  let idx = text.indexOf(span.quote, cursor);
  if (idx === -1) idx = text.indexOf(span.quote);
  if (idx === -1 || idx < cursor) continue;  // SILENT FAILURE
  // ... render span
}
```

**Key Properties:**
- Quote matching via `indexOf()` substring search
- Forward cursor disambiguates repeated phrases
- Failed matches render as plain text (fail-soft)
- Validation is offline only (`scripts/validate-speakers.ts`)

**Data Format:**
```json
{
  "book": "hosea",
  "speakers": {
    "the-lord": { "name": "The Lord", "color": 8 }
  },
  "chapters": {
    "1": [
      { "verse": 2, "speaker": "the-lord", "quote": "\"Go, marry...\"" }
    ]
  }
}
```

---

## B. Data Provenance

### Bible Text

| Question | Answer | Evidence |
|----------|--------|----------|
| Translation | NIV (New International Version) | README.md line 3 |
| Import date | January 6, 2026 | Git commit `b6459e4` |
| Import method | Pre-formatted JSON, single commit | 67 files, 138,313 lines |
| Original source | **Undocumented** | No API calls, no scripts, no attribution |
| Copyright notice | **Missing** | Risk: NIV is proprietary (Tyndale/Zondervan) |

### Punctuation Encoding

| Character | Unicode | Count | Semantic Role |
|-----------|---------|-------|---------------|
| " (left curly double) | U+201C | 8,640 | Opening outer dialogue |
| " (right curly double) | U+201D | 6,639 | Closing outer dialogue |
| ' (left curly single) | U+2018 | 1,895 | Opening inner/nested dialogue |
| ' (right curly single) | U+2019 | 1 | Closing inner dialogue (rare) |
| ` (backtick) | U+0060 | 4,723 | Possessive apostrophe (Lord`s) |
| " (straight double) | U+0022 | 334,025 | JSON structure only |

**Implication:** Curly quotes encode nesting semantically. Backticks for apostrophes are deliberate.

### Speaker Data

| Question | Answer |
|----------|--------|
| Author | Ben Basuni (you) |
| Method | Hand-authored, no AI generation |
| Timeline | Phase 1: 2 Kings (Aug 8), Phase 2: Hosea/Amos/Jonah (Aug 12) |
| Coverage | 638 spans across 4 books (6% of Bible) |
| Scripts | validate-speakers.ts (validation), fix-hosea-quotes.py (repair) |

---

## C. Domain Model

### Structural Categories Found in Corpus

| Category | Frequency | Example |
|----------|-----------|---------|
| Pure narration | 45%+ of verses | Genesis 1:2 |
| Simple speech | 30%+ of verses | Genesis 1:3: And God said, "Let there be light" |
| Continuation verse | Common in prophets | Amos 2:10 (continues 2:9, no opening quote) |
| Interrupted speech | 18+ instances | Amos 3:15: "...demolished,' declares the Lord." |
| Multiple speakers/verse | 35+ instances | Job 1:7: Lord asks, Satan replies |
| Nested quotation | 60 instances | 1 Kings 1:13: Nathan → Bathsheba → David (3 levels) |
| Collective speaker | 40+ instances | Mark 1:27: "The people...asked each other" |
| Divine in prophetic | Throughout prophets | Isaiah 1:11: Lord speaks through Isaiah |
| Letters/decrees | 8+ instances | Ezra 1:2-4 (royal proclamation) |

### Maximum Observed Nesting Depth: 3 Levels

```
Nathan speaking:
  └─ "Go to David and say:
       └─ 'Did you not swear:
            └─ "Solomon shall be king"?'"
```

### Primitives Required

1. **Segment** — contiguous text with single attribution
2. **Speaker** — identity of who is speaking
3. **Narration** — text with no speaker (implicit or explicit)
4. **Nesting Level** — for quotes within quotes
5. **Continuation** — speech spanning verse boundaries

---

## D. Current Failure Analysis

### Audit Results

| Book | Total Spans | Passing | Failing | Rate |
|------|-------------|---------|---------|------|
| 2 Kings | 411 | 411 | 0 | 100% |
| Hosea | 73 | 73 | 0 | 100% |
| Jonah | 32 | 30 | 2 | 93.8% |
| Amos | 122 | 0 | 122 | 0% (JSON error) |
| **Total** | **638** | **514** | **124** | **80.6%** |

### Failure Categories

| Category | Count | Severity | Example |
|----------|-------|----------|---------|
| malformed_json | 122 | **Critical** | lib/amos.json line 561 has unescaped curly quote |
| typography_mismatch | 2 | Minor | Jonah 2:4, 2:9: closing quote character differs |
| missing_quote | 0 | — | — |
| wrong_verse | 0 | — | — |
| narrator_included | 0 | — | — |
| semantic_error | Unknown | **Unknown** | Not audited (see below) |

### Critical Finding: Amos Blocker

`lib/amos.json` line 561 contains invalid JSON:
```json
"text": ""In that day the lovely young women...
```
The leading curly quote inside the JSON string is unescaped. This blocks all 122 Amos spans from validation.

---

## E. Hidden Errors (Semantic Failures That Pass indexOf)

**This is the core problem you identified.**

A quote can match perfectly while being semantically wrong:

```
Verse: "In that day," declares the Lord, "you will call me..."

WRONG (single span, passes indexOf):
  { speaker: "the-lord", quote: "\"In that day,\" declares the Lord, \"you will call me...\"" }

CORRECT (three segments):
  { type: "speech", speaker: "the-lord", text: "\"In that day,\"" }
  { type: "narration", text: " declares the Lord, " }
  { type: "speech", speaker: "the-lord", text: "\"you will call me...\"" }
```

**Current system cannot detect this.** indexOf succeeds for the wrong span.

### Audit Sample (30 spans from 2 Kings)

Semantic review of 30 randomly sampled spans that pass indexOf:
- **30/30 correct** — 2 Kings is historical narrative with clean dialogue boundaries
- But: 2 Kings was the careful first-pass; prophetic books have more complex structures

### Estimated Hidden Error Rate

- 2 Kings: ~0% (clean narrative)
- Minor Prophets: ~5-15% (interrupted speech patterns like "declares the Lord")
- Gospels (if added): ~5-10% (Jesus quoting Scripture)
- Letters (if added): ~2-5% (epistolary frames)

**Without structured segments, hidden semantic errors cannot be detected programmatically.**

---

## F. Required Invariants

### Must Always Be True

| Invariant | Description | Currently Enforced? |
|-----------|-------------|---------------------|
| **Text Reconstruction** | `segments.map(s => s.text).join("") === canonicalVerseText` | No |
| **Complete Coverage** | Every character belongs to exactly one segment | No |
| **No Overlap** | Segments cannot share characters | Partial (cursor) |
| **Speaker Validity** | Every speech segment references known speaker | Yes |
| **No Silent Failure** | Invalid attribution fails build, not render | **No** |
| **Round-Trip Integrity** | Structure → plain text reproduces canonical Scripture | No |
| **Canonical Preservation** | Structural layer never mutates Scripture wording | Implicit |

### Currently Missing

1. **Explicit narration segments** — narration is inferred from absence
2. **Build-time validation** — validation is manual, offline
3. **Text reconstruction check** — no guarantee spans cover full verse
4. **Semantic validation** — no way to detect narrator-in-speech errors

---

## G. Architecture Comparison

### Option A: Current Quote Matching

```json
{ "verse": 16, "speaker": "the-lord", "quote": "\"In that day,\"" }
```

| Aspect | Rating | Notes |
|--------|--------|-------|
| Simplicity | ★★★★★ | One field, substring match |
| Duplicated text | ★★☆☆☆ | Quote duplicates verse substring |
| Silent failure risk | ★☆☆☆☆ | indexOf returns -1, renders plain |
| Semantic validation | ★☆☆☆☆ | Cannot detect narrator-in-speech |
| Narrator handling | ★★☆☆☆ | Implicit (non-speech = narration) |
| Nested quotes | ★★★☆☆ | Works if spans don't overlap |
| Continuation verses | ★★★★☆ | Works with whole-verse spans |
| Maintainability | ★★☆☆☆ | Drift between quote and verse text |

**Verdict:** Simple but fundamentally cannot guarantee semantic correctness.

---

### Option B: Character Offsets

```json
{ "verse": 16, "segments": [{ "start": 0, "end": 14, "speaker": "the-lord" }] }
```

| Aspect | Rating | Notes |
|--------|--------|-------|
| Simplicity | ★★★☆☆ | More fields, integer math |
| Duplicated text | ★★★★★ | Zero duplication |
| Silent failure risk | ★★☆☆☆ | Off-by-one renders wrong text |
| Semantic validation | ★★☆☆☆ | Can validate coverage, not meaning |
| Narrator handling | ★★★★☆ | Gaps = narration (explicit) |
| Nested quotes | ★★★★☆ | Natural with start/end |
| Continuation verses | ★★★★☆ | Works |
| Maintainability | ★☆☆☆☆ | **Any verse text change breaks offsets** |
| Unicode issues | ★★☆☆☆ | Codepoint vs byte vs grapheme |

**Verdict:** Brittle. Offsets desync if canonical text is ever corrected.

---

### Option C: Fully Structured Verse Segments

```json
{
  "verse": 16,
  "segments": [
    { "type": "speech", "speaker": "the-lord", "text": "\"In that day,\"" },
    { "type": "narration", "text": " declares the Lord, " },
    { "type": "speech", "speaker": "the-lord", "text": "\"you will call me...\"" }
  ]
}
```

**Invariant:** `segments.map(s => s.text).join("") === canonicalVerseText`

| Aspect | Rating | Notes |
|--------|--------|-------|
| Simplicity | ★★★☆☆ | More verbose, explicit |
| Duplicated text | ★★☆☆☆ | Full verse text duplicated in segments |
| Silent failure risk | ★★★★★ | **Reconstruction check catches all drift** |
| Semantic validation | ★★★★☆ | Explicit narration, clear boundaries |
| Narrator handling | ★★★★★ | Explicit type: "narration" |
| Nested quotes | ★★★★☆ | Add nesting_level field if needed |
| Continuation verses | ★★★★★ | Explicit continuation state |
| Maintainability | ★★★★☆ | Self-contained, versionable |

**Verdict:** Best semantic correctness guarantees. Duplication is acceptable for integrity.

---

### Option D: Canonical Text + Generated AST

```
lib/hosea.json (canonical, untouched)
    ↓ build step
data/speakers/hosea.json (attribution rules)
    ↓ merge + validate
.next/speaker-ast/hosea.json (generated, consumed by renderer)
```

| Aspect | Rating | Notes |
|--------|--------|-------|
| Simplicity | ★★☆☆☆ | Build step required |
| Duplicated text | ★★★★★ | Generated, not stored |
| Silent failure risk | ★★★★★ | Build fails on any mismatch |
| Semantic validation | ★★★★☆ | Same as Option C |
| Maintainability | ★★★★★ | Canonical text is source of truth |

**Verdict:** Best of both worlds, but adds build complexity.

---

### Option E: External Authoritative Dataset

**Investigated:** No publicly available, licensed, machine-readable NIV speaker attribution dataset exists.

- Bible.is API: Has text, no speaker metadata
- YouVersion: Has text, no speaker metadata
- OpenBible.info: ESV only, no speaker metadata
- Logos: Proprietary, not accessible

**Verdict:** Must create our own. No shortcut available.

---

### Option F: Hybrid (Recommended)

**Architecture:**

```
CANONICAL TEXT (lib/{book}.json)
  └─ Source of truth, never modified for speaker purposes

SPEAKER RULES (data/speakers/{book}.json)
  └─ Segments with embedded text + type + speaker
  └─ Invariant: segments.join("") === verse.text

BUILD VALIDATION (scripts/validate-speakers.ts)
  └─ Fails build if reconstruction doesn't match
  └─ Fails build if unknown speaker
  └─ Warns on verses with quotes but no spans

RUNTIME (lib/speaker-quotes.ts)
  └─ Receives pre-validated segments
  └─ No indexOf, no guessing
  └─ Direct render: segment.text with segment.speaker styling
```

---

## H. Recommended Architecture

### Data Format

```json
{
  "book": "hosea",
  "speakers": {
    "the-lord": { "name": "The Lord", "color": 8 },
    "hosea": { "name": "Hosea", "color": 1 }
  },
  "chapters": {
    "2": {
      "16": {
        "segments": [
          { "type": "speech", "speaker": "the-lord", "text": "\"In that day,\"" },
          { "type": "narration", "text": " declares the Lord, " },
          { "type": "speech", "speaker": "the-lord", "text": "\"you will call me 'my husband'; you will no longer call me 'my master.'\"" }
        ]
      }
    }
  }
}
```

### Invariants Enforced

```typescript
// Build-time validation
for (const [verseNum, verseData] of Object.entries(chapterData)) {
  const reconstructed = verseData.segments.map(s => s.text).join("");
  const canonical = getVerseText(book, chapter, verseNum);

  if (reconstructed !== canonical) {
    throw new Error(`${book} ${chapter}:${verseNum} reconstruction mismatch`);
  }

  for (const segment of verseData.segments) {
    if (segment.type === "speech" && !speakers[segment.speaker]) {
      throw new Error(`Unknown speaker: ${segment.speaker}`);
    }
  }
}
```

### Runtime Simplification

```typescript
// No indexOf, no guessing
function renderVerse(segments: Segment[]): JSX.Element {
  return segments.map((seg, i) =>
    seg.type === "speech"
      ? <span key={i} className={speakerClass(seg.speaker)}>{seg.text}</span>
      : <span key={i}>{seg.text}</span>
  );
}
```

---

## I. Canonical Typography

### Current State

Mixed encoding:
- Curly double quotes (U+201C/U+201D) for dialogue
- Backticks (U+0060) for apostrophes
- Left curly single (U+2018) for nested dialogue opening
- Right curly single (U+2019) almost never used

### Normalization Safety

| Normalization | Safe? | Risk |
|---------------|-------|------|
| Curly double → straight double | **Unsafe** | Loses nesting distinction in 60+ verses |
| Curly single → straight single | Moderate | Loses inner quote marker |
| Backtick → straight single | Safe | Functionally equivalent for apostrophes |
| All → straight | **Unsafe** | Complete loss of semantic layering |

### Recommendation

**Do not normalize curly quotes.** They encode semantic information.

If normalization is required for other reasons:
1. Normalize backticks to U+2019 (right single curly) for apostrophes
2. Keep curly doubles (U+201C/U+201D) for dialogue
3. Keep curly singles (U+2018/U+2019) for nested dialogue

---

## J. Accuracy Boundary

### What Can Be Mathematically Guaranteed

| Property | Guarantee Level | Method |
|----------|-----------------|--------|
| Segments reconstruct verse exactly | **100%** | String equality check |
| Every character in exactly one segment | **100%** | Coverage + no-overlap check |
| Every speaker ID exists | **100%** | Lookup validation |
| No silent render failures | **100%** | Fail build, not render |
| Round-trip integrity | **100%** | Reconstruction invariant |

### What Requires Editorial Judgment

| Property | Guarantee Level | Why |
|----------|-----------------|-----|
| Correct speaker for each segment | **Cannot guarantee** | Semantic interpretation |
| Correct dialogue boundaries | **Cannot guarantee** | Some are ambiguous in source |
| Where God's speech ends in prophecy | **Cannot guarantee** | Scholarly disagreement |
| Whether inner quote is attributed | **Cannot guarantee** | Product decision |

### Ambiguous Cases in Scripture

Biblical manuscripts generally lack quotation marks. Modern translations impose boundaries based on scholarly interpretation. Examples of genuine ambiguity:

1. **John 3:16** — Does Jesus speak this, or is it John's commentary?
2. **Prophetic endings** — Where does the Lord's speech end in many prophetic passages?
3. **Nested attribution** — When Jesus quotes Moses, is Moses the speaker of the inner quote?

**These require explicit editorial decisions, not algorithmic inference.**

---

## K. Golden Dataset Strategy

### Process

```
PHASE 1: CANONICAL TEXT VERIFICATION
  └─ Confirm lib/*.json matches authoritative NIV
  └─ Fix amos.json line 561
  └─ Document typography decisions

PHASE 2: STRUCTURE MIGRATION
  └─ Convert existing 638 spans to segment format
  └─ Run reconstruction validation
  └─ Identify verses needing segment splitting (interrupted speech)

PHASE 3: SEMANTIC REVIEW
  └─ Review each segment for correct speaker attribution
  └─ Flag ambiguous cases for explicit editorial decision
  └─ Document decisions (e.g., "John 3:16 attributed to Jesus per NIV paragraph structure")

PHASE 4: EXPANSION
  └─ Generate candidate segments for remaining books (AI-assisted)
  └─ Human review every segment
  └─ Validate reconstruction
  └─ Approve and lock

PHASE 5: CONTINUOUS ENFORCEMENT
  └─ Build fails if any reconstruction mismatch
  └─ Build fails if unknown speaker
  └─ Regression test for every discovered bug
```

### One-Time Cost vs Forever Cost

| Approach | One-Time | Forever |
|----------|----------|---------|
| Current (indexOf patching) | Low | **Unbounded** (endless edge cases) |
| Structured segments | **Higher** | Zero (validation is automatic) |

---

## L. Validation & Testing

### Build-Time Validation

```typescript
// scripts/validate-speakers.ts enhanced
for (const verse of annotatedVerses) {
  // Reconstruction check
  assert(verse.segments.map(s => s.text).join("") === canonicalText);

  // Coverage check
  assert(totalLength(verse.segments) === canonicalText.length);

  // Speaker validity
  for (const seg of verse.segments.filter(s => s.type === "speech")) {
    assert(speakers.has(seg.speaker));
  }
}
```

### Test Categories

| Category | Purpose | Example |
|----------|---------|---------|
| Unit tests | Segment parsing/rendering | Segment array → JSX |
| Reconstruction tests | Round-trip integrity | Every annotated verse |
| Golden fixtures | Representative structures | Simple, interrupted, nested, collective |
| Regression tests | Every bug becomes permanent | Hosea 2:16 interrupted speech |
| Visual tests | Styling matches structure | Screenshot comparison |

### CI Integration

```yaml
# .github/workflows/validate.yml
- name: Validate speaker data
  run: npx tsx scripts/validate-speakers.ts
  # Fails build on any error
```

---

## M. Migration Plan

### Phase 1: Fix Blockers (1 day)

1. Fix lib/amos.json line 561 (escape curly quote)
2. Run validation, confirm 638/638 pass indexOf

### Phase 2: Schema Migration (2-3 days)

1. Define new segment schema with TypeScript types
2. Write migration script: span → segments
3. For simple spans (no interruption): single segment
4. For verses needing review: flag for manual splitting
5. Add reconstruction validation

### Phase 3: Identify Interrupted Speech (1-2 days)

Search corpus for patterns requiring segment splitting:
- "declares the Lord"
- "says the Lord"
- "the Lord declares"
- "he said...he continued"

Estimate: ~50-100 verses in current 4 books need splitting.

### Phase 4: Manual Review (3-5 days)

1. Review all 638 spans for semantic correctness
2. Split interrupted speech into proper segments
3. Verify each segment's speaker attribution
4. Document ambiguous cases

### Phase 5: Renderer Update (1 day)

1. Update tokenizeVerse to consume segments directly
2. Remove indexOf logic
3. Fail loudly if segments don't exist

### Phase 6: Expansion Process (ongoing)

For each new book:
1. AI generates candidate segments
2. Run reconstruction validation (automatic)
3. Human reviews speaker attribution
4. Approve and commit
5. Build validates continuously

---

## N. Estimated Scope

### Current Data

| Metric | Value |
|--------|-------|
| Books with speaker data | 4 |
| Total spans | 638 |
| Spans needing segment split | ~50-100 (estimate) |
| Books in Bible | 66 |
| Estimated total speech segments Bible-wide | ~5,000-8,000 |

### Migration Effort (4 books)

| Task | Effort |
|------|--------|
| Fix blockers | 1 day |
| Schema + migration script | 2-3 days |
| Manual review of 638 spans | 3-5 days |
| Renderer update | 1 day |
| Testing | 1-2 days |
| **Total** | **8-12 days** |

### Expansion Effort (per book)

| Book Type | Effort |
|-----------|--------|
| Historical (1-2 Kings, Samuel) | 1-2 days each |
| Prophets (Isaiah, Jeremiah) | 2-3 days each |
| Gospels (Matthew, Mark, Luke, John) | 2-3 days each |
| Epistles | 0.5-1 day each |
| Wisdom (Job, Proverbs) | 1-2 days each |

---

## O. Risks

### Technical Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| lib/amos.json broken | **High** | Fix immediately (simple escape) |
| Reconstruction validation too strict | Medium | Allow explicit whitespace normalization |
| Migration script bugs | Medium | Test on 2 Kings first (100% passing) |
| Build time increase | Low | Validation is O(n) string comparison |

### Textual Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Hidden semantic errors in current data | **High** | Full manual review of all 638 spans |
| Ambiguous speaker boundaries | Medium | Document as explicit editorial decisions |
| Typography changes break reconstruction | Medium | Canonicalize before migration |

### Legal Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| No NIV copyright attribution | **High** | Add LICENSE file immediately |
| NIV terms may restrict derivative data | Medium | Review Tyndale/Zondervan licensing |

### Maintenance Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Reviewer fatigue during expansion | Medium | Process in batches, AI assists |
| Drift between canonical text and segments | **Eliminated** | Reconstruction validation |

---

## P. Final Recommendation

### Do This

1. **Adopt structured segments** (Option C/F) as the data format
2. **Enforce reconstruction invariant** at build time
3. **Eliminate indexOf** from the renderer
4. **Fix amos.json** immediately
5. **Migrate existing 638 spans** to segment format
6. **Manual review all segments** for semantic correctness
7. **Document ambiguous cases** as explicit editorial decisions
8. **Add NIV copyright attribution**

### Why This Is Worth It

The current system has **unbounded maintenance cost**. Every edge case discovered requires:
- Investigation
- Manual patching
- Hope that the patch doesn't break something else
- No guarantee more edge cases won't appear

The segment system has **bounded migration cost** and **zero ongoing maintenance**:
- Pay once to structure the data correctly
- Reconstruction validation catches all drift automatically
- Renderer becomes trivial
- New books follow the same validated process

### What Not To Do

- Don't keep patching individual speaker entries
- Don't normalize typography without understanding the semantics
- Don't use character offsets (too brittle)
- Don't trust indexOf for semantic correctness
- Don't expand to more books without fixing the architecture first

---

## Q. Decisions Needed From You

### Must Decide (Blocking)

1. **Nested quote attribution:** When Jesus quotes Moses, should the inner quote be styled as:
   - Moses (the original speaker)?
   - Jesus (the current speaker)?
   - Distinct "quotation" style (neither)?

2. **Ambiguous boundaries:** For passages where scholarly opinion differs on where speech ends, what is the editorial standard?
   - Follow NIV paragraph structure?
   - Follow majority scholarly opinion?
   - Flag as "uncertain" with visual indicator?

3. **Coverage scope:** Is the goal:
   - All 66 books?
   - Specific books (which)?
   - Phased rollout (what order)?

### Should Decide (Important)

4. **Typography normalization:** Proceed with backtick-to-apostrophe normalization, or keep current encoding?

5. **Build integration:** Should speaker validation block deployment, or just warn?

### Can Defer

6. **AI generation process:** Details of how to generate candidate segments for new books
7. **Visual ambiguity indicator:** How to style uncertain attributions (if any)

---

## Appendix: Current File Locations

**Bible Text:**
- `lib/*.json` (67 books)
- Blocker: `lib/amos.json:561` (JSON syntax error)

**Speaker Data:**
- `data/speakers/2-kings.json` (411 spans, 100% passing)
- `data/speakers/hosea.json` (73 spans, 100% passing)
- `data/speakers/jonah.json` (32 spans, 93.8% passing)
- `data/speakers/amos.json` (122 spans, blocked by Bible file error)

**Implementation:**
- `lib/speaker-quotes.ts` (tokenizer with indexOf)
- `lib/speakers.ts` (server loader)
- `scripts/validate-speakers.ts` (offline validation)
- `scripts/fix-hosea-quotes.py` (repair script)

**Documentation:**
- `docs/quote-debug-report.md` (previous audit)
- `docs/quote-report2.md` (this report)
