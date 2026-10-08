// Reader keyboard contract, in one place so the two components that share
// it (ChapterNav, BookReader) cannot drift.
//
//   ↓ / ↑   next / previous verse (crosses sections, ↓ past the end → next chapter)
//   ← / →   previous / next chapter
//   Enter   toggle selection of the cursor verse (commentary + highlight toolbar)
//   h       toggle the highlight toolbar on the cursor verse
//   b       toggle bookmark on this chapter
//   r       toggle mark-as-read on this chapter
//
// Chapter navigation appends this hash so the chapter that loads opens the
// section containing verse 1 with the cursor on it. A URL hash (not a
// one-shot flag) because the shell renders the page twice and dev StrictMode
// doubles effects: every copy must read the same answer.
export const FIRST_VERSE_HASH = '#v1';
