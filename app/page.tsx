'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAllBooks } from '@/lib/genesis-collections';
import { getAllCollections } from '@/lib/psalms-collections';

export default function LibraryPage() {
  const [psalmsExpanded, setPsalmsExpanded] = useState(false);
  const [genesisExpanded, setGenesisExpanded] = useState(false);
  const [exodusExpanded, setExodusExpanded] = useState(false);
  const [leviticusExpanded, setLeviticusExpanded] = useState(false);
  const [numbersExpanded, setNumbersExpanded] = useState(false);
  const [deuteronomyExpanded, setDeuteronomyExpanded] = useState(false);

  const genesisBooks = getAllBooks();
  const psalmsCollections = getAllCollections();

  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      {/* Genesis Section */}
      <section className="mb-12">
        <button
          onClick={() => setGenesisExpanded(!genesisExpanded)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-4 hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <span>{genesisExpanded ? '▼' : '▶'}</span>
          Genesis
        </button>
        {genesisExpanded && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {genesisBooks.map((book) => (
              <Link
                key={book.id}
                href={`/genesis/${book.id}/${book.chapters[0]}`}
                className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
              >
                <h3 className="text-sm font-light text-[rgb(var(--text-primary))] mb-1 leading-tight">
                  {book.title.replace('The Book of ', '')} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {book.chapters.length}</span>
                </h3>
                <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
                  {book.theme}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Exodus Section */}
      <section className="mb-12">
        <button
          onClick={() => setExodusExpanded(!exodusExpanded)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-4 hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <span>{exodusExpanded ? '▼' : '▶'}</span>
          Exodus
        </button>
        {exodusExpanded && (
          <div className="p-4 border border-[rgb(var(--border))] rounded text-center opacity-50">
            <p className="text-sm text-[rgb(var(--text-secondary))]">Coming soon - 40 chapters</p>
          </div>
        )}
      </section>

      {/* Leviticus Section */}
      <section className="mb-12">
        <button
          onClick={() => setLeviticusExpanded(!leviticusExpanded)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-4 hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <span>{leviticusExpanded ? '▼' : '▶'}</span>
          Leviticus
        </button>
        {leviticusExpanded && (
          <div className="p-4 border border-[rgb(var(--border))] rounded text-center opacity-50">
            <p className="text-sm text-[rgb(var(--text-secondary))]">Coming soon - 27 chapters</p>
          </div>
        )}
      </section>

      {/* Numbers Section */}
      <section className="mb-12">
        <button
          onClick={() => setNumbersExpanded(!numbersExpanded)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-4 hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <span>{numbersExpanded ? '▼' : '▶'}</span>
          Numbers
        </button>
        {numbersExpanded && (
          <div className="p-4 border border-[rgb(var(--border))] rounded text-center opacity-50">
            <p className="text-sm text-[rgb(var(--text-secondary))]">Coming soon - 36 chapters</p>
          </div>
        )}
      </section>

      {/* Deuteronomy Section */}
      <section className="mb-12">
        <button
          onClick={() => setDeuteronomyExpanded(!deuteronomyExpanded)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-4 hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <span>{deuteronomyExpanded ? '▼' : '▶'}</span>
          Deuteronomy
        </button>
        {deuteronomyExpanded && (
          <div className="p-4 border border-[rgb(var(--border))] rounded text-center opacity-50">
            <p className="text-sm text-[rgb(var(--text-secondary))]">Coming soon - 34 chapters</p>
          </div>
        )}
      </section>

      {/* Psalms Section */}
      <section>
        <button
          onClick={() => setPsalmsExpanded(!psalmsExpanded)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-4 hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <span>{psalmsExpanded ? '▼' : '▶'}</span>
          Psalms
        </button>
        {psalmsExpanded && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {psalmsCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/psalms/${collection.id}/${collection.psalms[0]}`}
                className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
              >
                <h3 className="text-sm font-light text-[rgb(var(--text-primary))] mb-1 leading-tight">
                  {collection.title.replace('Psalms of ', '')} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {collection.psalms.length}</span>
                </h3>
                <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
                  {collection.theme}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
