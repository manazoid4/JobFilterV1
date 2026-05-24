"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';


export function MyLinkPage() {
  const [username, setUsername] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem('jobfilter.username');
    if (stored) {
      setUsername(stored);
    } else {
      const generated = 'trader-' + Math.random().toString(36).slice(2, 8);
      setUsername(generated);
      (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem('jobfilter.username', generated);
    }
  }, []);

  const path = `/intake/${username}`;
  const origin = typeof window === 'undefined' ? 'https://jobfilter.uk' : window.location.origin;
  const link = `${origin}${path}`;

  async function copyLink() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  }

  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-white p-7">
        <p className="micro-label text-[var(--orange)]">MY LINK</p>
        <h1 className="headline mt-4 text-4xl leading-none sm:text-5xl md:text-7xl">SEND THIS. FILTER EVERYTHING.</h1>
        <div className="mt-6 break-all border-2 border-[var(--line)] bg-[var(--bg-main)] p-4 text-lg font-black sm:text-xl">
          {link}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" onClick={() => void copyLink()}>
            {copied ? 'COPIED' : 'COPY'}
          </button>
          <a className="jf-button bg-[var(--navy)] text-white" href={`https://wa.me/?text=${encodeURIComponent(link)}`} target="_blank" rel="noreferrer">
            SHARE WHATSAPP
          </a>
        </div>
      </section>

      <section className="jf-box bg-white p-6">
        <h2 className="headline text-2xl sm:text-3xl">USE THIS EVERYWHERE</h2>
        <div className="mt-4 grid gap-3 text-lg font-black">
          <p>WhatsApp</p>
          <p>Instagram</p>
          <p>Calls</p>
        </div>
      </section>

      <Link className="jf-button bg-[var(--navy)] text-white" href={path}>OPEN CUSTOMER LINK</Link>
    </main>
  );
}
