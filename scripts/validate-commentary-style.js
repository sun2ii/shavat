const fs = require('fs');
const path = require('path');

// Normalize text for comparison - keep only a-z letters
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z]/g, '');
}

// Check if commentary starts with verse repetition
function hasVerseRepetition(verseText, commentary) {
  const normalizedVerse = normalize(verseText);
  const searchLength = Math.min(Math.floor(verseText.length * 1.5), commentary.length);
  const commentaryPrefix = commentary.slice(0, searchLength);
  const normalizedPrefix = normalize(commentaryPrefix);

  return normalizedPrefix.startsWith(normalizedVerse);
}

// Check if commentary starts with "This verse..." pattern
function hasThisVersePattern(commentary) {
  const patterns = [
    /^this verse/i,
    /^the verse/i,
    /^here\s+(jesus|paul|peter|john|moses)/i,
    /^in this (verse|passage)/i
  ];

  return patterns.some(pattern => pattern.test(commentary.trim()));
}

// Check for em-dash (prohibited character)
function hasEmDash(commentary) {
  return commentary.includes('—') || commentary.includes('–');
}

// Check if commentary is too short
function isTooShort(commentary, minLength = 50) {
  return commentary.trim().length < minLength;
}

// Check if commentary is only Greek/Hebrew without insight
function isOnlyGreekHebrew(commentary) {
  // Simple heuristic: if more than 50% is Greek/Hebrew characters or transliterations in parentheses
  const greekHebrewPattern = /[\u0370-\u03FF\u0590-\u05FF]|[\u0370-\u03FFa-zA-Z]+\s*\([^)]+\)/g;
  const matches = commentary.match(greekHebrewPattern);

  if (matches) {
    const greekHebrewLength = matches.join('').length;
    return greekHebrewLength > commentary.length * 0.5;
  }

  return false;
}

// Validate a single verse
function validateVerse(bookName, chapter, verseNum, verseText, commentary) {
  const violations = [];

  if (hasVerseRepetition(verseText, commentary)) {
    violations.push({
      type: 'verse_repetition',
      message: 'Commentary starts with verse repetition',
      excerpt: commentary.slice(0, 100) + (commentary.length > 100 ? '...' : '')
    });
  }

  if (hasThisVersePattern(commentary)) {
    violations.push({
      type: 'this_verse_pattern',
      message: 'Commentary starts with "This verse..." pattern',
      excerpt: commentary.slice(0, 100)
    });
  }

  if (hasEmDash(commentary)) {
    violations.push({
      type: 'em_dash',
      message: 'Commentary contains prohibited em-dash character (—)',
      excerpt: commentary
    });
  }

  if (isTooShort(commentary)) {
    violations.push({
      type: 'too_short',
      message: `Commentary is too short (${commentary.length} chars)`,
      excerpt: commentary
    });
  }

  if (isOnlyGreekHebrew(commentary)) {
    violations.push({
      type: 'only_greek_hebrew',
      message: 'Commentary appears to be mostly Greek/Hebrew without English insight',
      excerpt: commentary
    });
  }

  return violations.map(v => ({
    location: `${bookName} ${chapter}:${verseNum}`,
    ...v
  }));
}

// Validate a single book
function validateBook(bookName) {
  const bookSlug = bookName.toLowerCase();
  const violations = [];

  // Load the book's canonical text
  const bookPath = path.join(__dirname, `../lib/${bookSlug}.json`);
  if (!fs.existsSync(bookPath)) {
    console.log(`⚠ Book file not found: ${bookPath}`);
    return violations;
  }

  const book = JSON.parse(fs.readFileSync(bookPath, 'utf-8'));
  const chapterCount = book.count || book.chapters.length;

  // Check each chapter
  for (let chapterNum = 1; chapterNum <= chapterCount; chapterNum++) {
    const commentaryPath = path.join(__dirname, `../lib/commentary/${bookSlug}/`);

    // Try both file naming patterns
    let commentaryFile = path.join(commentaryPath, `${bookSlug}-${chapterNum}.json`);
    if (!fs.existsSync(commentaryFile)) {
      // Try old pattern (for genesis)
      commentaryFile = path.join(__dirname, `../lib/commentary/${bookSlug}-${chapterNum}.json`);
    }

    if (!fs.existsSync(commentaryFile)) {
      continue; // Skip chapters without commentary
    }

    const commentary = JSON.parse(fs.readFileSync(commentaryFile, 'utf-8'));
    const bookChapter = book.chapters.find(ch => parseInt(ch.chapter) === chapterNum);

    if (!bookChapter) {
      continue;
    }

    // Validate each verse
    for (const commentaryVerse of commentary.verses) {
      const bookVerse = bookChapter.verses.find(v => parseInt(v.verse) === commentaryVerse.verse);

      if (bookVerse && commentaryVerse.commentary) {
        const verseViolations = validateVerse(
          bookName,
          chapterNum,
          commentaryVerse.verse,
          bookVerse.text,
          commentaryVerse.commentary
        );

        violations.push(...verseViolations);
      }
    }
  }

  return violations;
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const targetBook = args[0] || 'all';

  console.log('=== Commentary Style Validation ===\n');

  let booksToValidate = [];

  if (targetBook === 'all') {
    // Check all books with commentary
    const commentaryDir = path.join(__dirname, '../lib/commentary');
    const entries = fs.readdirSync(commentaryDir, { withFileTypes: true });

    // Get directories (new pattern) and files (old pattern like genesis-1.json)
    const directories = entries.filter(e => e.isDirectory()).map(e => e.name);
    booksToValidate = directories;

    // Also check for old pattern files
    const oldPatternBooks = new Set();
    entries
      .filter(e => e.isFile() && e.name.endsWith('.json'))
      .forEach(e => {
        const match = e.name.match(/^([a-z]+)-\d+\.json$/);
        if (match) {
          oldPatternBooks.add(match[1]);
        }
      });

    booksToValidate.push(...Array.from(oldPatternBooks));
    booksToValidate = [...new Set(booksToValidate)]; // Remove duplicates
  } else {
    booksToValidate = [targetBook];
  }

  console.log(`Validating books: ${booksToValidate.join(', ')}\n`);

  const allViolations = {};
  let totalViolations = 0;

  for (const book of booksToValidate) {
    const bookViolations = validateBook(book.charAt(0).toUpperCase() + book.slice(1));
    if (bookViolations.length > 0) {
      allViolations[book] = bookViolations;
      totalViolations += bookViolations.length;
    }
  }

  // Print results
  if (totalViolations === 0) {
    console.log('✓ No style violations found!');
    process.exit(0);
  }

  console.log(`Found ${totalViolations} violations:\n`);

  for (const [book, violations] of Object.entries(allViolations)) {
    console.log(`\n=== ${book.toUpperCase()} (${violations.length} violations) ===`);

    // Group by violation type
    const byType = {};
    violations.forEach(v => {
      if (!byType[v.type]) byType[v.type] = [];
      byType[v.type].push(v);
    });

    for (const [type, typeViolations] of Object.entries(byType)) {
      console.log(`\n${type} (${typeViolations.length}):`);
      typeViolations.slice(0, 5).forEach(v => {
        console.log(`  ${v.location}: ${v.message}`);
        console.log(`    "${v.excerpt.slice(0, 80)}${v.excerpt.length > 80 ? '...' : ''}"`);
      });
      if (typeViolations.length > 5) {
        console.log(`  ... and ${typeViolations.length - 5} more`);
      }
    }
  }

  console.log(`\n\nTotal: ${totalViolations} violations`);
  process.exit(1);
}

// Run the script
main();
