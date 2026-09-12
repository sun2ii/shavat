'use client';

import { tokenizeWords } from '@/lib/word-tokenize';
import WordWithDefinition from './WordWithDefinition';

interface Props {
  text: string;
}

export default function TextWithDefinitions({ text }: Props) {
  const tokens = tokenizeWords(text);

  return (
    <>
      {tokens.map((token, i) =>
        token.isWord ? (
          <WordWithDefinition key={i} word={token.text} />
        ) : (
          <span key={i}>{token.text}</span>
        )
      )}
    </>
  );
}
