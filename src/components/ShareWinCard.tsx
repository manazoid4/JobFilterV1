"use client";

import { useRef, useState } from 'react';
import { Download, Share2, X } from 'lucide-react';

type Props = {
  wonCount: number;
  wonValueFormatted: string;
  winRate: number;
  onClose: () => void;
};

const CANVAS_SIZE = 1080;

function drawCard(canvas: HTMLCanvasElement, props: Omit<Props, 'onClose'>) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const ink = '#080808';
  const yellow = '#E3B72A';
  const paper = '#FFFDF4';

  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const border = 16;
  ctx.strokeStyle = ink;
  ctx.lineWidth = border;
  ctx.strokeRect(border / 2, border / 2, CANVAS_SIZE - border, CANVAS_SIZE - border);

  // Yellow micro-label band
  ctx.fillStyle = yellow;
  ctx.fillRect(border, border, CANVAS_SIZE - border * 2, 90);
  ctx.fillStyle = ink;
  ctx.font = '900 36px Arial';
  ctx.textBaseline = 'middle';
  ctx.fillText('JOB WON — VERIFIED LEAD', border + 36, border + 45);

  // Big won count
  ctx.fillStyle = ink;
  ctx.font = '900 220px Arial';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(String(props.wonCount), border + 36, 470);

  ctx.font = '900 64px Arial';
  ctx.fillText(props.wonCount === 1 ? 'JOB WON' : 'JOBS WON', border + 36, 555);

  // Won value box
  const boxY = 620;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 8;
  ctx.strokeRect(border + 36, boxY, CANVAS_SIZE - (border + 36) * 2, 180);
  ctx.font = '900 30px Arial';
  ctx.fillStyle = '#2F2F2A';
  ctx.fillText('TOTAL VALUE WON', border + 76, boxY + 60);
  ctx.font = '900 96px Arial';
  ctx.fillStyle = ink;
  ctx.fillText(props.wonValueFormatted, border + 76, boxY + 145);

  // Win rate
  ctx.font = '900 40px Arial';
  ctx.fillStyle = '#2F2F2A';
  ctx.fillText(`${Math.round(props.winRate)}% WIN RATE`, border + 36, boxY + 270);

  // Footer wordmark
  const footerTop = CANVAS_SIZE - border - 90;
  ctx.fillStyle = ink;
  ctx.fillRect(border, footerTop, CANVAS_SIZE - border * 2, 90);
  ctx.fillStyle = paper;
  ctx.font = '900 26px Arial';
  ctx.fillText('Real leads. No chasing.', border + 36, footerTop + 36);
  ctx.fillStyle = yellow;
  ctx.font = '900 40px Arial';
  ctx.fillText('JOBFILTER.UK', border + 36, footerTop + 78);
}

export function ShareWinCard({ wonCount, wonValueFormatted, winRate, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  function handleCanvasRef(node: HTMLCanvasElement | null) {
    canvasRef.current = node;
    if (node) {
      drawCard(node, { wonCount, wonValueFormatted, winRate });
      setReady(true);
    }
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `jobfilter-win-${wonCount}-jobs.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  async function share() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `jobfilter-win-${wonCount}-jobs.png`, { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: 'JobFilter — Job Won', text: `${wonCount} jobs won via JobFilter — ${wonValueFormatted} total value.` });
          return;
        } catch {
          /* user cancelled or share unsupported — fall through to download */
        }
      }
      download();
    }, 'image/png');
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-sm">
        <div className="jf-box bg-[var(--paper)] p-5 text-[var(--ink)] shadow-[8px_8px_0_var(--yellow)]">
          <div className="flex items-start justify-between gap-4">
            <p className="micro-label text-[var(--orange)]">SHARE YOUR WIN</p>
            <button
              type="button"
              className="grid h-9 w-9 shrink-0 place-items-center text-[var(--muted)] hover:bg-[var(--ink)]/5 hover:text-[var(--ink)] transition-colors rounded-sm"
              onClick={onClose}
              aria-label="Close share card"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          <canvas
            ref={handleCanvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="mt-3 w-full border-2 border-[var(--line)]"
          />

          <p className="mt-3 text-sm text-[var(--muted)]">
            Post it on Instagram, Facebook, or your trade WhatsApp groups. Proof beats promises — show the work you&apos;ve won.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" disabled={!ready} className="jf-button bg-[var(--yellow)] text-[var(--ink)] flex items-center justify-center gap-2" onClick={share}>
              <Share2 size={16} strokeWidth={2.5} /> SHARE
            </button>
            <button type="button" disabled={!ready} className="jf-button bg-white text-[var(--ink)] flex items-center justify-center gap-2" onClick={download}>
              <Download size={16} strokeWidth={2.5} /> DOWNLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
