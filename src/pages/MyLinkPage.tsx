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
            SHARE ON WHATSAPP →
          </a>
        </div>
      </section>

      <section className="jf-box bg-white p-6">
        <h2 className="headline text-2xl sm:text-3xl">USE THIS EVERYWHERE</h2>
        <div className="mt-4 grid gap-4">
          <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
            <p className="text-sm font-black uppercase text-[var(--ink)]">WhatsApp</p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">Send it to anyone who asks for a quote. They fill in 3 questions — you get a scored lead so you know if it&apos;s worth your time before you drive out.</p>
          </div>
          <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
            <p className="text-sm font-black uppercase text-[var(--ink)]">Instagram bio &amp; social</p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">Put it in your bio so enquiries arrive pre-scored — no chaotic DM threads, no time-wasters.</p>
          </div>
          <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
            <p className="text-sm font-black uppercase text-[var(--ink)]">On the phone</p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">&ldquo;Send me your job details on that link and I&apos;ll know if it&apos;s worth a visit before I drive out.&rdquo;</p>
          </div>
          <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
            <p className="text-sm font-black uppercase text-[var(--ink)]">Leaflets &amp; van sticker</p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">Print it as a QR code. Anyone who scans it lands on your intake page — not a generic job board that forwards the same job to five other trades.</p>
          </div>
        </div>
      </section>

      <Link className="jf-button bg-[var(--navy)] text-white" href={path}>OPEN CUSTOMER LINK →</Link>
    </main>
  );
}
