"use client";

import { useState, useCallback, FormEvent } from 'react';
import { searchDocuments, type DocumentSearchResult, type KeywordTag } from '../lib/documentSearch';

const POPULAR_KEYWORDS = [
  'extension',
  'loft conversion',
  'heat pump',
  'solar panels',
  'EV charger',
  'kitchen',
  'bathroom',
  'timber frame',
  'velux windows',
  'two storey',
  'garage conversion',
  'rewire',
];

interface KeywordSearchProps {
  onSearch: (results: DocumentSearchResult[], query: string) => void;
  searchesRemaining?: number;
  isPro?: boolean;
}

export function KeywordSearch({ onSearch, searchesRemaining = 3, isPro = false }: KeywordSearchProps) {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (keyword: string) => {
    if (!keyword.trim()) return;
    if (!isPro && searchesRemaining <= 0) return;

    setSearching(true);
    setHasSearched(true);
    const cleanKeyword = keyword.trim();
    const results = await searchDocuments(cleanKeyword);
    setSearching(false);
    onSearch(results, cleanKeyword);
  }, [isPro, searchesRemaining, onSearch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void handleSearch(query);
  };

  const handleKeywordClick = (kw: string) => {
    setQuery(kw);
    void handleSearch(kw);
  };

  return (
    <section className="jf-box bg-white p-6">
      <p className="micro-label text-[var(--orange)]">DOCUMENT SEARCH — PRO FEATURE</p>
      <h2 className="headline mt-2 text-2xl leading-none sm:text-3xl">SEARCH PLANNING DOCUMENTS BY KEYWORD</h2>
      <p className="mt-2 max-w-2xl font-black text-[var(--muted)]">
        Type a keyword. We scan planning docs for matches. Find jobs that fit your exact capability.
      </p>

      {!isPro && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="badge bg-[var(--yellow)] text-[var(--ink)] text-xs font-black">
            {searchesRemaining} FREE SEARCH{searchesRemaining !== 1 ? 'ES' : ''} LEFT
          </span>
          <span className="text-xs font-black text-[var(--muted)]">
            Upgrade to Pro for unlimited searches
          </span>
        </div>
      )}

      {isPro && (
        <div className="mt-3">
          <span className="badge bg-[var(--green)] text-white text-xs font-black">UNLIMITED SEARCHES</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="field-input flex-1"
          placeholder="e.g. extension, loft, heat pump"
          disabled={searching || (!isPro && searchesRemaining <= 0)}
        />
        <button
          type="submit"
          disabled={searching || !query.trim() || (!isPro && searchesRemaining <= 0)}
          className="jf-button bg-[var(--navy)] text-white disabled:opacity-60 sm:self-end sm:w-auto"
        >
          {searching ? 'SEARCHING...' : 'SEARCH'}
        </button>
      </form>

      <div className="mt-4">
        <p className="micro-label text-[var(--muted)]">POPULAR KEYWORDS</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {POPULAR_KEYWORDS.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => handleKeywordClick(kw)}
              disabled={searching || (!isPro && searchesRemaining <= 0)}
              className={`px-3 py-1.5 text-xs font-black border-2 border-[var(--navy)] transition disabled:opacity-40 ${
                query === kw
                  ? 'bg-[var(--yellow)] text-[var(--ink)]'
                  : 'bg-white text-[var(--ink)] hover:bg-[var(--yellow)]'
              }`}
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {!isPro && searchesRemaining <= 0 && (
        <div className="mt-4 jf-box border-2 border-[var(--yellow)] bg-[var(--yellow)]/10 p-4 text-center">
          <p className="font-black text-[var(--ink)]">FREE SEARCHES USED UP.</p>
          <p className="mt-1 text-sm font-black text-[var(--muted)]">
            Upgrade to Pro for unlimited document searches + WhatsApp alerts for new keyword matches.
          </p>
        </div>
      )}
    </section>
  );
}

export function KeywordSearchResults({ results, query }: { results: DocumentSearchResult[]; query: string }) {
  if (!results.length) {
    return (
      <section className="jf-box bg-[var(--navy)] p-6 text-center text-white">
        <p className="micro-label text-[var(--yellow)]">NO MATCHES</p>
        <h3 className="headline mt-2 text-2xl">NO PLANNING DOCS FOUND FOR "{query.toUpperCase()}"</h3>
        <p className="mt-2 font-black text-white/90">
          Try a different keyword or widen your search area.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      <div className="jf-box bg-[var(--yellow)] p-4">
        <p className="micro-label text-[var(--ink)]">SEARCH RESULTS</p>
        <p className="mt-1 font-black text-[var(--ink)]">
          {results.length} match{results.length !== 1 ? 'es' : ''} for "{query}" in planning documents
        </p>
      </div>

      {results.map((result) => (
        <KeywordResultCard key={result.id} result={result} />
      ))}
    </section>
  );
}

function KeywordResultCard({ result }: { key?: string; result: DocumentSearchResult }) {
  const { id, title, location, source, docType, matchedKeywords, snippet, score, detectedTags, planningRef } = result;

  return (
    <article className="jf-box grid gap-4 bg-white p-4 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_220px]">
      <div className={`w-14 h-14 flex items-center justify-center font-black text-lg ${
        score >= 80 ? 'bg-[var(--green)] text-white' : score >= 55 ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-[var(--muted)] text-white'
      }`}>
        {score}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge bg-[var(--navy)] text-white text-[10px] font-black">{docType}</span>
          {matchedKeywords.map((kw) => (
            <span key={kw} className="badge bg-[var(--yellow)] text-[var(--ink)] text-[10px] font-black">{kw}</span>
          ))}
          {detectedTags.map((tag) => (
            <span key={tag} className="badge bg-[var(--bg-main)] text-[var(--ink)] text-[10px] font-black">{tag}</span>
          ))}
        </div>

        <h3 className="mt-2 text-xl font-black leading-tight">{title}</h3>
        <p className="mt-1 text-sm font-black text-[var(--muted)]">{location} &middot; {source}</p>

        {snippet && (
          <div className="mt-3 p-3 bg-[var(--bg-main)] border-2 border-[var(--line)]">
            <p className="text-sm text-[var(--ink)]">{snippet.replace(/<[^>]*>/g, '')}</p>
          </div>
        )}

        {planningRef && (
          <p className="mt-2 text-xs font-black text-[var(--navy)]">Planning ref: {planningRef}</p>
        )}
      </div>

      <div className="grid gap-3 md:self-start">
        <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
          <p className="micro-label text-[10px] text-[var(--muted)]">DETECTED TRADES</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {detectedTags.filter(isTradeTag).map((tag) => (
              <span key={tag} className="text-xs font-black text-[var(--navy)]">{tag}</span>
            ))}
            {detectedTags.filter(isTradeTag).length === 0 && (
              <span className="text-xs font-black text-[var(--muted)]">General</span>
            )}
          </div>
        </div>

        <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
          <p className="micro-label text-[10px] text-[var(--muted)]">DOCUMENT TYPE</p>
          <p className="mt-1 text-xs font-black text-[var(--ink)]">{docType}</p>
        </div>

        <button className="jf-button w-full bg-[var(--navy)] text-white text-xs">
          VIEW FULL DOCUMENT
        </button>

        <button className="jf-button w-full bg-[var(--green)] text-white text-xs">
          TRACK THIS LEAD
        </button>
      </div>
    </article>
  );
}

function isTradeTag(tag: KeywordTag): boolean {
  const tradeTags = ['building', 'electrical', 'plumbing', 'roofing', 'carpentry', 'hvac', 'landscaping', 'painting'];
  return tradeTags.includes(tag.toLowerCase());
}
