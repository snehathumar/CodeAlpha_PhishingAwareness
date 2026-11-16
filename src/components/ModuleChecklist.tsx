import { useState } from 'react';
import { Download, Printer, ExternalLink, CheckCircle2, PhoneCall, BookOpen } from 'lucide-react';
import {
  BEST_PRACTICE_HABITS,
  IF_YOU_CLICKED_STEPS,
  FURTHER_READING_SOURCES,
} from '../data/phishingData';

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let i = 0; i < words.length; i += 1) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[i] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    ctx.fillText(line.trim(), x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

export function ModuleChecklist() {
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const handlePrintPdf = () => {
    window.print();
  };

  const handleDownloadPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1240;
    canvas.height = 1640;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header band
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, 160);

    ctx.fillStyle = '#93c5fd';
    ctx.font = '600 20px sans-serif';
    ctx.fillText('PHISHGUARD · ONE-PAGE QUICK REFERENCE', 64, 58);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 42px sans-serif';
    ctx.fillText('Phishing Safety Checklist', 64, 112);

    // Measure & draw Section 1: Daily Habits
    ctx.fillStyle = '#1d4ed8';
    ctx.font = '700 24px sans-serif';
    ctx.fillText('1. Daily Prevention Habits (Check Before You Click)', 80, 240);

    let y = 286;
    BEST_PRACTICE_HABITS.forEach((habit, idx) => {
      // Checkbox icon
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(80, y - 18, 22, 22);

      ctx.fillStyle = '#0f172a';
      ctx.font = '700 20px sans-serif';
      ctx.fillText(`${idx + 1}. ${habit.title}`, 118, y);

      ctx.fillStyle = '#475569';
      ctx.font = '400 17px sans-serif';
      y = wrapCanvasText(ctx, habit.detail, 118, y + 26, canvas.width - 210, 24);
      y += 14;
    });

    const sec1Height = y - 190 + 14;
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 190, canvas.width - 96, sec1Height);

    // Section 2: Emergency Response
    const sec2Top = 190 + sec1Height + 28;
    const sec2Height = 500;
    ctx.fillStyle = '#fef2f2';
    ctx.fillRect(48, sec2Top, canvas.width - 96, sec2Height);
    ctx.strokeStyle = '#fecaca';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, sec2Top, canvas.width - 96, sec2Height);

    ctx.fillStyle = '#991b1b';
    ctx.font = '700 24px sans-serif';
    ctx.fillText('2. What To Do If You Clicked or Shared Details', 80, sec2Top + 48);

    let ey = sec2Top + 92;
    IF_YOU_CLICKED_STEPS.forEach((step) => {
      ctx.fillStyle = '#991b1b';
      ctx.font = '700 19px sans-serif';
      ctx.fillText(`${step.step}: ${step.title}`, 80, ey);

      ctx.fillStyle = '#334155';
      ctx.font = '400 17px sans-serif';
      ey = wrapCanvasText(ctx, step.action, 80, ey + 24, canvas.width - 170, 23);
      ey += 14;
    });

    // Footer
    const footerY = sec2Top + sec2Height + 52;
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 20px sans-serif';
    ctx.fillText(
      'India Cyber Crime Helpline: Call 1930  |  Report Online: https://cybercrime.gov.in',
      64,
      footerY
    );
    ctx.fillStyle = '#64748b';
    ctx.font = '400 16px sans-serif';
    ctx.fillText('PhishGuard - Phishing Awareness Training · Safe Static Educational Guide', 64, footerY + 34);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'phishguard-safety-checklist.png';
    link.click();
    setDownloadStatus('Downloaded phishguard-safety-checklist.png');
  };

  return (
    <div className="space-y-8">
      {/* Export Actions Bar (Hidden when printing) */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            One-Page Quick Reference
          </p>
          <p className="text-sm text-slate-700 mt-0.5">
            Save this Phishing Safety Checklist for offline campus or personal reference.
          </p>
          {downloadStatus && (
            <p className="text-xs font-semibold text-emerald-700 mt-1">
              {downloadStatus}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleDownloadPng}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Download PNG</span>
          </button>
          <button
            type="button"
            onClick={handlePrintPdf}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable One-Page Checklist Sheet */}
      <article className="print-only-area bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-5 sm:px-8">
          <p className="text-xs font-medium text-blue-300">
            PhishGuard · One-Page Safety Reference
          </p>
          <h2 className="text-2xl font-bold mt-1">
            Phishing Safety Checklist
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Keep these 8 daily habits and 5 emergency steps handy before clicking links or entering OTPs.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Habits Grid */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Part 1 · Daily Prevention Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {BEST_PRACTICE_HABITS.map((habit, idx) => (
                <div
                  key={habit.id}
                  className="border border-slate-200 rounded-lg p-3.5 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {idx + 1}. {habit.title}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {habit.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Steps */}
          <div className="bg-red-50/60 border border-red-200 rounded-xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-base font-bold text-red-950">
                Part 2 · Emergency Steps If You Clicked
              </h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800">
                <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                <span>India Helpline: 1930 · cybercrime.gov.in</span>
              </span>
            </div>

            <ol className="space-y-2 text-xs sm:text-sm text-slate-800">
              {IF_YOU_CLICKED_STEPS.map((item) => (
                <li key={item.step} className="leading-relaxed">
                  <strong className="text-slate-900">{item.step} — {item.title}:</strong> {item.action}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </article>

      {/* Sources and Further Reading (on the last page) */}
      <section className="no-print bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-700 shrink-0" aria-hidden="true" />
          <h3 className="text-lg font-bold text-slate-900">
            Sources and Further Reading
          </h3>
        </div>
        <p className="text-sm text-slate-600">
          Explore official government portals and cybersecurity education guides to keep learning:
        </p>

        <ul className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
          {FURTHER_READING_SOURCES.map((source) => (
            <li key={source.name} className="p-4 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-slate-900">{source.name}</p>
                <p className="text-xs text-slate-500">
                  {source.organization} · {source.description}
                </p>
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:underline whitespace-nowrap shrink-0"
              >
                <span>Visit Official Site</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
