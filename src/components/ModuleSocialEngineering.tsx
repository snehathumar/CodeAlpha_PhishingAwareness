import { useState } from 'react';
import { Brain, ArrowRight, ShieldCheck } from 'lucide-react';
import { SOCIAL_TACTICS } from '../data/phishingData';

interface ModuleSocialEngineeringProps {
  onNext: () => void;
}

export function ModuleSocialEngineering({ onNext }: ModuleSocialEngineeringProps) {
  const [filterText, setFilterText] = useState('');
  const [selectedTacticId, setSelectedTacticId] = useState<string | null>(null);

  const filtered = SOCIAL_TACTICS.filter((t) => {
    const q = filterText.trim().toLowerCase();
    if (!q) return true;
    return (
      t.name.toLowerCase().includes(q) ||
      t.howItWorks.toLowerCase().includes(q) ||
      t.realLifeExample.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-700">
            <Brain className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="text-xs font-semibold">Human Psychology · 9 Core Manipulation Triggers</span>
          </div>
          <p className="text-sm text-slate-600 max-w-2xl">
            Social engineering is the art of manipulating people into breaking normal security habits.
            Learn these 9 triggers so you recognize them the moment you feel pressured.
          </p>
        </div>

        <div className="w-full sm:w-64 shrink-0">
          <label htmlFor="tactic-search" className="sr-only">
            Filter social engineering tactics
          </label>
          <input
            id="tactic-search"
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search tactics (e.g. urgency, USB)..."
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
          <p className="text-sm text-slate-600 mb-3">No tactics match "{filterText}".</p>
          <button
            type="button"
            onClick={() => setFilterText('')}
            className="px-4 py-2 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((tactic, idx) => {
            const showCounter = selectedTacticId === tactic.id;
            return (
              <article
                key={tactic.id}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 tabular-nums">
                      Tactic {String(idx + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900">
                      {tactic.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {tactic.howItWorks}
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                    <p className="text-xs font-semibold text-amber-800 mb-1">
                      Real-Life Style Example · SAMPLE (fake)
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {tactic.realLifeExample}
                    </p>
                  </div>
                </div>

                <div>
                  {showCounter ? (
                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3 text-xs sm:text-sm text-emerald-950 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{tactic.counterMove}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedTacticId(tactic.id)}
                      className="w-full px-3.5 py-2 text-xs font-medium text-blue-700 bg-blue-50/70 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Show Defense Move
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
        >
          <span>Next: Real-World &amp; India Scams</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
