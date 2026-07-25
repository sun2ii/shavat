import { DivisionMemorial, MemorialChapter } from '@/lib/types';

/*
  The memorial as source. What the studio commits is an ordinary TypeScript
  module, indistinguishable from the six written by hand — same house style,
  same shape, checked by the same compiler. That is the safety net: a memorial
  that does not type-check fails the build instead of deploying broken.
*/

export function memorialFilePath(bookSlug: string, divisionId: string): string {
  return `lib/writings/${bookSlug}/${divisionId}.ts`;
}

export function draftFilePath(bookSlug: string, divisionId: string): string {
  return `lib/writings/${bookSlug}/${divisionId}.draft.md`;
}

export function pageFilePath(bookSlug: string, divisionId: string): string {
  return `app/writings/${bookSlug}/${divisionId}/page.tsx`;
}

/** unfinished-conquest -> UNFINISHED_CONQUEST */
export function constName(divisionId: string): string {
  return divisionId.replace(/[^a-zA-Z0-9]+/g, '_').toUpperCase();
}

/** unfinished-conquest -> UnfinishedConquest */
export function pascalName(divisionId: string): string {
  return divisionId
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/** A single-quoted TS string literal. Content is typographic, so escapes are rare. */
function str(value: string): string {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
}

/** `key: 'value'` on one line, or broken onto the next when the line runs long. */
function prop(indent: string, key: string, value: string, alwaysBreak = false): string[] {
  const literal = str(value);
  if (!alwaysBreak && `${indent}${key}: ${literal},`.length <= 96) {
    return [`${indent}${key}: ${literal},`];
  }
  return [`${indent}${key}:`, `${indent}  ${literal},`];
}

function arrayProp(indent: string, key: string, values: string[]): string[] {
  if (values.length === 0) {
    return [`${indent}${key}: [],`];
  }
  return [
    `${indent}${key}: [`,
    ...values.map((value) => `${indent}  ${str(value)},`),
    `${indent}],`,
  ];
}

function chapterSource(chapter: MemorialChapter): string[] {
  return [
    '    {',
    `      chapter: ${chapter.chapter},`,
    ...prop('      ', 'anchor', chapter.anchor),
    ...prop('      ', 'theme', chapter.theme),
    // The narrative fields always break, matching the existing files.
    ...prop('      ', 'story', chapter.story, true),
    ...prop('      ', 'tension', chapter.tension, true),
    ...prop('      ', 'revelation', chapter.revelation, true),
    ...arrayProp('      ', 'memorialStones', chapter.memorialStones),
    ...prop('      ', 'quote', chapter.quote, true),
    '    },',
  ];
}

/** Wrap prose for the file's leading comment. */
function wrap(text: string, width: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    if (line === '') {
      line = word;
    } else if (`${line} ${word}`.length <= width) {
      line = `${line} ${word}`;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line !== '') lines.push(line);
  return lines;
}

export function memorialSource(memorial: DivisionMemorial): string {
  const summary = memorial.intro[0] ?? '';

  const lines: string[] = [
    "import { DivisionMemorial } from '@/lib/types';",
    '',
    '/**',
    ` * Content for the ${memorial.title} memorial (${memorial.eyebrow}).`,
  ];

  if (summary) {
    lines.push(' *', ...wrap(summary, 72).map((line) => ` * ${line}`));
  }

  lines.push(
    ' */',
    `export const ${constName(memorial.divisionId)}: DivisionMemorial = {`,
    ...prop('  ', 'bookSlug', memorial.bookSlug),
    ...prop('  ', 'bookName', memorial.bookName),
    ...prop('  ', 'divisionId', memorial.divisionId),
    ...prop('  ', 'eyebrow', memorial.eyebrow),
    ...prop('  ', 'title', memorial.title),
    ...arrayProp('  ', 'intro', memorial.intro),
    '  memorialIntro: {',
    ...prop('    ', 'heading', memorial.memorialIntro.heading),
    ...arrayProp('    ', 'body', memorial.memorialIntro.body),
    '  },',
    '  chapters: [',
    ...memorial.chapters.flatMap(chapterSource),
    '  ],',
    '  synthesis: {',
    ...prop('    ', 'eyebrow', memorial.synthesis.eyebrow),
    ...prop('    ', 'heading', memorial.synthesis.heading),
    ...arrayProp('    ', 'opening', memorial.synthesis.opening),
    '    steps: [',
    ...memorial.synthesis.steps.flatMap((step) => [
      '      {',
      ...prop('        ', 'question', step.question, true),
      ...prop('        ', 'theme', step.theme),
      '      },',
    ]),
    '    ],',
    ...arrayProp('    ', 'closing', memorial.synthesis.closing),
    '  },',
    '  canon: {',
    ...prop('    ', 'title', memorial.canon.title),
    ...arrayProp('    ', 'principles', memorial.canon.principles),
    '  },',
    '};',
    ''
  );

  return lines.join('\n');
}

/** "Joshua 6–8: obedience, holiness, and restoration." */
function description(memorial: DivisionMemorial): string {
  const themes = memorial.chapters.map((chapter) => chapter.theme.toLowerCase()).filter(Boolean);

  const list =
    themes.length <= 1
      ? themes.join('')
      : themes.length === 2
        ? `${themes[0]} and ${themes[1]}`
        : `${themes.slice(0, -1).join(', ')}, and ${themes[themes.length - 1]}`;

  return list ? `${memorial.eyebrow}: ${list}.` : memorial.eyebrow;
}

export function pageSource(memorial: DivisionMemorial): string {
  const title = `Shavat | ${memorial.title}`;

  return [
    "import { Metadata } from 'next';",
    "import DivisionMemorial from '@/components/DivisionMemorial';",
    `import { ${constName(memorial.divisionId)} } from '@/lib/writings/${memorial.bookSlug}/${memorial.divisionId}';`,
    '',
    'export const metadata: Metadata = {',
    `  title: ${str(title)},`,
    `  description: ${str(description(memorial))},`,
    '  openGraph: {',
    `    title: ${str(title)},`,
    "    images: ['/shavat.png'],",
    '  },',
    '};',
    '',
    `export default function ${pascalName(memorial.divisionId)}Page() {`,
    `  return <DivisionMemorial memorial={${constName(memorial.divisionId)}} />;`,
    '}',
    '',
  ].join('\n');
}
