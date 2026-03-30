const fs = require('fs');
const path = require('path');

// Normalize text for comparison - keep only a-z letters
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z]/g, '');
}

// Find sentence boundary after a given position
function findSentenceBoundary(text, startPos) {
  // Look for period, exclamation, or question mark followed by space and capital letter (or quote + capital)
  const pattern = /[.!?](?=\s+[A-Z"])/g;
  pattern.lastIndex = startPos;
  const match = pattern.exec(text);

  if (match) {
    // Return position after the punctuation mark
    return match.index + 1;
  }

  // If no clear boundary, return the start position (safety fallback)
  return startPos;
}

// Tokenize into words for comparison
function tokenize(text) {
  return normalize(text).split(/\s+/).filter(w => w.length > 0);
}

// Calculate how many verse words appear in order at start of commentary
function calculateOverlap(verseWords, commentaryWords) {
  let matchCount = 0;
  let commentaryIndex = 0;

  for (const verseWord of verseWords) {
    // Look for this verse word in remaining commentary words
    while (commentaryIndex < commentaryWords.length) {
      if (commentaryWords[commentaryIndex] === verseWord) {
        matchCount++;
        commentaryIndex++;
        break;
      }
      commentaryIndex++;
      // If we've gone too far past where the match should be, stop
      if (commentaryIndex > verseWords.length * 2) {
        return matchCount;
      }
    }
  }

  return matchCount;
}

// Detect if commentary starts with verse repetition
function detectRepetition(verseText, commentary) {
  // First try exact match (faster)
  const normalizedVerse = normalize(verseText);
  const searchLength = Math.min(Math.floor(verseText.length * 1.5), commentary.length);
  const commentaryPrefix = commentary.slice(0, searchLength);
  const normalizedPrefix = normalize(commentaryPrefix);

  if (normalizedPrefix.startsWith(normalizedVerse)) {
    const endIndex = findSentenceBoundary(commentary, verseText.length);
    const maxStrip = verseText.length * 2;
    const safeEndIndex = Math.min(endIndex, maxStrip);
    return { isRepeating: true, endIndex: safeEndIndex };
  }

  // Try word-based fuzzy matching
  const verseWords = tokenize(verseText);
  const commentaryWords = tokenize(commentary.slice(0, verseText.length * 2));

  // Need at least 70% of verse words to match in order
  const matchCount = calculateOverlap(verseWords, commentaryWords);
  const matchRatio = matchCount / verseWords.length;

  if (matchRatio >= 0.7 && verseWords.length >= 5) {
    // Find sentence boundary after approximate verse length
    const endIndex = findSentenceBoundary(commentary, verseText.length);
    const maxStrip = verseText.length * 2.5; // Allow more for fuzzy matches
    const safeEndIndex = Math.min(endIndex, maxStrip);
    return { isRepeating: true, endIndex: safeEndIndex };
  }

  return { isRepeating: false, endIndex: 0 };
}

// Strip repetition from commentary
function stripRepetition(commentary, endIndex) {
  const cleaned = commentary.slice(endIndex).trim();

  // Safety: ensure we have substantive content remaining
  if (cleaned.length < 20) {
    // If stripping leaves too little, return original
    return commentary;
  }

  return cleaned;
}

// Process a single chapter
function processChapter(bookSlug, chapterNum, bookData, commentaryPath, dryRun = false) {
  if (!fs.existsSync(commentaryPath)) {
    return { fixed: [], unchanged: [], skipped: true };
  }

  const commentary = JSON.parse(fs.readFileSync(commentaryPath, 'utf-8'));
  const report = { fixed: [], unchanged: [], skipped: false };

  // Get the chapter from book data
  const bookChapter = bookData.chapters.find(ch => parseInt(ch.chapter) === chapterNum);
  if (!bookChapter) {
    return { fixed: [], unchanged: [], skipped: true };
  }

  // Process each verse
  for (let i = 0; i < commentary.verses.length; i++) {
    const commentaryVerse = commentary.verses[i];
    const bookVerse = bookChapter.verses.find(v => parseInt(v.verse) === commentaryVerse.verse);

    if (!bookVerse) {
      continue;
    }

    const detection = detectRepetition(bookVerse.text, commentaryVerse.commentary);

    if (detection.isRepeating) {
      const original = commentaryVerse.commentary;
      const cleaned = stripRepetition(commentaryVerse.commentary, detection.endIndex);

      // Only update if actually different
      if (cleaned !== original) {
        commentaryVerse.commentary = cleaned;
        report.fixed.push({
          verse: commentaryVerse.verse,
          before: original.slice(0, 100) + (original.length > 100 ? '...' : ''),
          after: cleaned.slice(0, 100) + (cleaned.length > 100 ? '...' : '')
        });
      } else {
        report.unchanged.push(commentaryVerse.verse);
      }
    } else {
      report.unchanged.push(commentaryVerse.verse);
    }
  }

  // Write back to file (unless dry run)
  if (!dryRun && report.fixed.length > 0) {
    fs.writeFileSync(commentaryPath, JSON.stringify(commentary, null, 2) + '\n', 'utf-8');
  }

  return report;
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const bookName = args[0];
  const dryRun = args.includes('--dry-run');

  if (!bookName) {
    console.log('Usage: node fix-commentary.js <book> [--dry-run]');
    console.log('Example: node fix-commentary.js genesis');
    process.exit(1);
  }

  const bookSlug = bookName.toLowerCase();

  console.log(`=== ${bookName.charAt(0).toUpperCase() + bookName.slice(1)} Commentary Repetition Fix ===\n`);

  if (dryRun) {
    console.log('🔍 DRY RUN MODE (no files will be modified)\n');
  }

  // Load book data
  const bookPath = path.join(__dirname, `../lib/${bookSlug}.json`);
  if (!fs.existsSync(bookPath)) {
    console.log(`❌ Book file not found: ${bookPath}`);
    process.exit(1);
  }

  const bookData = JSON.parse(fs.readFileSync(bookPath, 'utf-8'));
  const chapterCount = bookData.count || bookData.chapters.length;

  // Determine commentary file pattern
  const commentaryDir = path.join(__dirname, `../lib/commentary`);
  const useNewPattern = fs.existsSync(path.join(commentaryDir, bookSlug));

  // Create backup directory if not dry run
  if (!dryRun) {
    const backupDir = path.join(__dirname, '../.backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    // Backup all commentary files
    for (let i = 1; i <= chapterCount; i++) {
      let sourcePath;
      if (useNewPattern) {
        sourcePath = path.join(commentaryDir, bookSlug, `${bookSlug}-${i}.json`);
      } else {
        sourcePath = path.join(commentaryDir, `${bookSlug}-${i}.json`);
      }

      if (fs.existsSync(sourcePath)) {
        const backupPath = path.join(backupDir, `${bookSlug}-${i}.json`);
        fs.copyFileSync(sourcePath, backupPath);
      }
    }

    console.log('✓ Created backups in .backup/ directory\n');
  }

  // Process all chapters
  const totalReport = {
    totalVerses: 0,
    totalFixed: 0,
    totalUnchanged: 0,
    samples: []
  };

  for (let chapterNum = 1; chapterNum <= chapterCount; chapterNum++) {
    let commentaryPath;
    if (useNewPattern) {
      commentaryPath = path.join(commentaryDir, bookSlug, `${bookSlug}-${chapterNum}.json`);
    } else {
      commentaryPath = path.join(commentaryDir, `${bookSlug}-${chapterNum}.json`);
    }

    const report = processChapter(bookSlug, chapterNum, bookData, commentaryPath, dryRun);

    if (!report.skipped) {
      totalReport.totalVerses += report.fixed.length + report.unchanged.length;
      totalReport.totalFixed += report.fixed.length;
      totalReport.totalUnchanged += report.unchanged.length;

      // Collect samples (first 3 from each chapter with fixes)
      if (report.fixed.length > 0 && totalReport.samples.length < 10) {
        report.fixed.slice(0, 3).forEach(fix => {
          totalReport.samples.push({ chapter: chapterNum, ...fix });
        });
      }

      if (report.fixed.length > 0) {
        console.log(`Chapter ${chapterNum}: ${report.fixed.length} fixed, ${report.unchanged.length} unchanged`);
      }
    }
  }

  // Print summary
  console.log('\n=== Summary ===');
  console.log(`Total verses processed: ${totalReport.totalVerses}`);
  console.log(`Repetitions fixed: ${totalReport.totalFixed}`);
  console.log(`Verses unchanged: ${totalReport.totalUnchanged}`);
  console.log(`Fix rate: ${((totalReport.totalFixed / totalReport.totalVerses) * 100).toFixed(1)}%`);

  // Print samples
  if (totalReport.samples.length > 0) {
    console.log('\n=== Sample Changes ===');
    totalReport.samples.slice(0, 5).forEach(sample => {
      console.log(`\n${bookName.charAt(0).toUpperCase() + bookName.slice(1)} ${sample.chapter}:${sample.verse}`);
      console.log(`BEFORE: ${sample.before}`);
      console.log(`AFTER:  ${sample.after}`);
    });
  }

  if (dryRun) {
    console.log('\n🔍 This was a dry run. Run without --dry-run to apply changes.');
  } else {
    console.log('\n✓ All changes applied successfully!');
    console.log('💾 Original files backed up to .backup/ directory');
  }
}

// Run the script
main();
