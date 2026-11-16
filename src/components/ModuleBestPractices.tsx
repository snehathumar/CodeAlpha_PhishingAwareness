import { useState } from 'react';
import { CheckSquare, Square, ShieldAlert, PhoneCall, Globe, ArrowRight } from 'lucide-react';
import { BEST_PRACTICE_HABITS, IF_YOU_CLICKED_STEPS } from '../data/phishingData';
import { toggleChecklistItem } from '../utils/trainingLogic';

interface ModuleBestPracticesProps {
  onNext: () => void;
}

export function ModuleBestPractices({ onNext }: ModuleBestPracticesProps) {
  const [checkedHabits, setCheckedHabits] = useState<string[]>([
    'verify-sender',
    'never-share-otp',
  ]);

  const handleToggle = (id: string) => {
    setCheckedHabits((prev) => toggleChecklistItem(prev, id));
  };

  return (
    <div className="space-y-8">
      {/* Daily Best Practices Interactive Checklist */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <p className="text-xs font-medium text-blue-700 mb-1">
              Prevention · Check off the habits you already follow
            </p>
            <h2 className="text-xl font-bold text-slate-900">
              8 Essential Anti-Phishing Best Practices
            </h2>
          </div>
          <span className="text-sm font-semibold text-slate-700 tabular-nums whitespace-nowrap">
            {checkedHabits.length} / {BEST_PRACTICE_HABITS.length} habits checked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BEST_PRACTICE_HABITS.map((habit) => {
            const isChecked = checkedHabits.includes(habit.id);
            return (
              <button
                key={habit.id}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => handleToggle(habit.id)}
                className={`text-left p-4 rounded-xl border transition-colors flex items-start gap-3 ${
                  isChecked
                    ? 'bg-emerald-50/60 border-emerald-300 text-slate-900'
                    : 'bg-slate-50/50 border-slate-200 text-slate-800 hover:bg-slate-50'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <div>
                  <span className="font-semibold text-sm block text-slate-900">
                    {habit.title}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1 block">
                    {habit.detail}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* What To Do If You Clicked */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-red-700 mb-1">
              <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold">Incident Response Plan</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              What to Do If You Accidentally Clicked or Shared Details
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Do not panic or hide it—acting quickly in the first few minutes can save your account and money.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 shrink-0">
            <p className="text-xs font-semibold text-red-800 mb-1">
              India Emergency Cyber Reporting
            </p>
            <div className="flex flex-col gap-1 text-sm font-semibold text-red-950">
              <span className="inline-flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-red-700" aria-hidden="true" />
                <span>Helpline: 1930</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs">
                <Globe className="w-4 h-4 text-red-700" aria-hidden="true" />
                <span>cybercrime.gov.in</span>
              </span>
            </div>
          </div>
        </div>

        <ol className="space-y-3">
          {IF_YOU_CLICKED_STEPS.map((item) => (
            <li
              key={item.step}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-3"
            >
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 self-start">
                {item.step}
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                  {item.action}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Next: Take the 10-Question Quiz</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
