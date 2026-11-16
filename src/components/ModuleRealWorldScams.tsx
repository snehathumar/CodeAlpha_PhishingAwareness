import { useState } from 'react';
import { Globe, Smartphone, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { REAL_WORLD_INCIDENTS, INDIA_SCAMS } from '../data/phishingData';

interface ModuleRealWorldScamsProps {
  onNext: () => void;
}

type ScamView = 'all' | 'global' | 'india';

export function ModuleRealWorldScams({ onNext }: ModuleRealWorldScamsProps) {
  const [viewFilter, setViewFilter] = useState<ScamView>('all');

  const showGlobal = viewFilter === 'all' || viewFilter === 'global';
  const showIndia = viewFilter === 'all' || viewFilter === 'india';

  return (
    <div className="space-y-8">
      {/* Segmented Filter Control */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Case Studies &amp; Regional Patterns
          </p>
          <p className="text-sm text-slate-700 mt-0.5">
            Learn from documented global breaches and everyday scams targeting students and families in India.
          </p>
        </div>

        <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto" role="group" aria-label="Filter scam examples">
          <button
            type="button"
            onClick={() => setViewFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              viewFilter === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Show All
          </button>
          <button
            type="button"
            onClick={() => setViewFilter('global')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              viewFilter === 'global'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Global Incidents (5)
          </button>
          <button
            type="button"
            onClick={() => setViewFilter('india')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              viewFilter === 'india'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            India Scams (5)
          </button>
        </div>
      </div>

      {/* Global Documented Incidents */}
      {showGlobal && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-700 shrink-0" aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-900">
              Documented Real-World Phishing Incidents
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {REAL_WORLD_INCIDENTS.map((incident) => (
              <article
                key={incident.id}
                className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500 tabular-nums">
                      {incident.year} · Tactic: {incident.tacticUsed}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      {incident.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">What happened</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {incident.whatHappened}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3.5">
                  <p className="text-xs font-semibold text-blue-900 mb-1">Lesson learned</p>
                  <p className="text-xs sm:text-sm text-blue-950 leading-relaxed">
                    {incident.lessonLearned}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* India-Relevant Scams */}
      {showIndia && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-700 shrink-0" aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-900">
              Common India-Relevant Phishing &amp; Payment Scams
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            All message examples below are fictional training samples clearly labeled{' '}
            <strong>SAMPLE (fake)</strong> using safe <code className="font-mono">.example</code> domains.
          </p>

          <div className="space-y-4">
            {INDIA_SCAMS.map((scam, idx) => (
              <article
                key={scam.id}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {String(idx + 1).padStart(2, '0')}. {scam.category}
                  </h3>
                  <span className="text-xs font-semibold text-amber-800 whitespace-nowrap">
                    Training Demo · SAMPLE (fake)
                  </span>
                </div>

                <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs sm:text-sm leading-relaxed">
                  {scam.sampleMessage}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50/60 border border-red-200 rounded-lg p-4">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-red-800 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>Why this is a scam</span>
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-red-950 list-disc list-inside">
                      {scam.redFlags.map((flag) => (
                        <li key={flag}>{flag}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-4">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>What to do instead</span>
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                      {scam.safeAction}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
        >
          <span>Next: Best Practices &amp; Response</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
