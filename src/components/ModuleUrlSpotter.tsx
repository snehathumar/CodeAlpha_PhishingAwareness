import { useState } from 'react';
import { ShieldCheck, ShieldAlert, Lock, Unlock, Search, RotateCcw, ArrowRight } from 'lucide-react';
import { URL_CHALLENGES } from '../data/phishingData';
import { evaluateUrlAnswer, parseUrlAnatomy } from '../utils/trainingLogic';

interface ModuleUrlSpotterProps {
  onNext: () => void;
}

export function ModuleUrlSpotter({ onNext }: ModuleUrlSpotterProps) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [hoveredPreviewUrl, setHoveredPreviewUrl] = useState<string>(
    'Hover or focus any sample link below to see its true destination...'
  );

  const answeredCount = Object.keys(answers).length;
  const correctCount = URL_CHALLENGES.reduce((acc, item) => {
    const userChoice = answers[item.id];
    if (userChoice === undefined) return acc;
    return evaluateUrlAnswer(userChoice, item.isFake).isCorrect ? acc + 1 : acc;
  }, 0);

  const handleClassify = (id: string, userSelectedFake: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: userSelectedFake }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  const sampleAnatomy = parseUrlAnatomy('https://login.mybank.com.verify-account-now.example/auth');

  return (
    <div className="space-y-8">
      {/* How to Read a URL Guide */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
        <div className="mb-5">
          <p className="text-xs font-medium text-blue-700 mb-1">
            Core Skill · Read Domains Right-to-Left
          </p>
          <h2 className="text-xl font-bold text-slate-900">
            How to Inspect Any Website Link Safely
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Before clicking a link, hover your mouse over it (or long-press on mobile) to preview the
            real address. Always look at the <strong>root domain</strong> directly before the first single{' '}
            <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">/</code>.
          </p>
        </div>

        {/* Visual URL Anatomy Breakdown */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <p className="text-xs font-semibold text-slate-500">
            Example Deceptive URL Breakdown · SAMPLE (fake)
          </p>
          <div className="font-mono text-sm sm:text-base bg-white border border-slate-200 rounded-lg p-4 overflow-x-auto flex flex-wrap items-center gap-1">
            <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              {sampleAnatomy.protocol}
            </span>
            <span className="px-2 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200">
              {sampleAnatomy.subdomain}.
            </span>
            <span className="px-2 py-1 rounded bg-red-50 text-red-800 border border-red-300 font-semibold">
              {sampleAnatomy.rootDomain}
            </span>
            <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {sampleAnatomy.path}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <p className="font-semibold text-emerald-800 mb-1">1. Protocol (https://)</p>
              <p className="text-slate-600">
                Encrypts traffic, but <strong>even fake sites can have HTTPS</strong>. A padlock alone never proves a site is genuine.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <p className="font-semibold text-amber-800 mb-1">2. Fake Subdomain</p>
              <p className="text-slate-600">
                Attackers place trusted names like <code className="font-mono">login.mybank.com</code> at the front to fool quick glances.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <p className="font-semibold text-red-800 mb-1">3. Real Root Domain</p>
              <p className="text-slate-600">
                This is who truly owns the site: <code className="font-mono">verify-account-now.example</code> — NOT mybank!
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <p className="font-semibold text-slate-800 mb-1">4. Path (/auth)</p>
              <p className="text-slate-600">
                Everything after the first single slash is just a folder or page on that attacker’s server.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hover-to-Inspect Simulator */}
      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Hover-to-Inspect Link Simulator
            </h3>
            <p className="text-xs text-slate-600">
              Move your mouse over (or tap/focus) these masked text buttons—notice how the link text hides the real destination in the browser preview bar below.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <button
            type="button"
            onMouseEnter={() => setHoveredPreviewUrl('https://portal.university.example/results')}
            onFocus={() => setHoveredPreviewUrl('https://portal.university.example/results')}
            onClick={() => setHoveredPreviewUrl('https://portal.university.example/results')}
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
          >
            View Semester Results (Official)
          </button>
          <button
            type="button"
            onMouseEnter={() => setHoveredPreviewUrl('http://university-results.verify-now.example/login')}
            onFocus={() => setHoveredPreviewUrl('http://university-results.verify-now.example/login')}
            onClick={() => setHoveredPreviewUrl('http://university-results.verify-now.example/login')}
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
          >
            View Semester Results (Masked Trap)
          </button>
        </div>

        <div className="bg-slate-900 text-slate-100 font-mono text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 overflow-x-auto">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
          <span className="truncate">{hoveredPreviewUrl}</span>
        </div>
      </section>

      {/* Spot the Fake URL Interactive Exercise */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Exercise · Fictional .example domains only
            </p>
            <h3 className="text-xl font-bold text-slate-900">
              Spot the Fake URL ({answeredCount}/{URL_CHALLENGES.length} answered · {correctCount} correct)
            </h3>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Exercise</span>
          </button>
        </div>

        <div className="space-y-4">
          {URL_CHALLENGES.map((item, idx) => {
            const anatomy = parseUrlAnatomy(item.url);
            const userChoice = answers[item.id];
            const hasAnswered = userChoice !== undefined;
            const evalResult = hasAnswered ? evaluateUrlAnswer(userChoice, item.isFake) : null;

            return (
              <div
                key={item.id}
                className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-slate-50/50 space-y-3"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs font-medium text-slate-500">
                      {String(idx + 1).padStart(2, '0')}. {item.scenario} · {item.displayText}
                    </p>
                    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 overflow-x-auto">
                      {anatomy.isHttps ? (
                        <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-label="HTTPS" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5 text-red-600 shrink-0" aria-label="Insecure HTTP" />
                      )}
                      <span className="text-slate-900 break-all">{item.url}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleClassify(item.id, false)}
                      aria-label={`Mark URL ${idx + 1} as Safe`}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                        userChoice === false
                          ? 'bg-emerald-700 text-white border-emerald-800'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      Looks Safe
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClassify(item.id, true)}
                      aria-label={`Mark URL ${idx + 1} as Fake`}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                        userChoice === true
                          ? 'bg-red-700 text-white border-red-800'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      Fake / Phishing
                    </button>
                  </div>
                </div>

                {hasAnswered && evalResult && (
                  <div
                    className={`rounded-lg border p-3.5 text-sm ${
                      evalResult.isCorrect
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : 'bg-red-50/70 border-red-200 text-red-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs mb-1">
                      {evalResult.isCorrect ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                      ) : (
                        <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" aria-hidden="true" />
                      )}
                      <span>
                        {evalResult.label} · {item.isFake ? 'Fake URL' : 'Legitimate Example'} ({item.trickType})
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed">{item.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-5 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Next: Social Engineering Tactics</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
