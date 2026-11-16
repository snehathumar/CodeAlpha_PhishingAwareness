import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Eye, RotateCcw, Paperclip, ExternalLink, ArrowRight } from 'lucide-react';
import { EMAIL_RED_FLAGS, EmailRedFlag } from '../data/phishingData';
import { toggleRedFlag } from '../utils/trainingLogic';

interface ModuleEmailInspectorProps {
  onNext: () => void;
}

export function ModuleEmailInspector({ onNext }: ModuleEmailInspectorProps) {
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [selectedFlagId, setSelectedFlagId] = useState<string | null>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const totalFlags = EMAIL_RED_FLAGS.length;
  const allFound = foundIds.length === totalFlags;

  const handleInspectFlag = (flagId: string) => {
    setFoundIds((prev) => toggleRedFlag(prev, flagId));
    setSelectedFlagId(flagId);
  };

  const handleRevealAll = () => {
    setFoundIds(EMAIL_RED_FLAGS.map((f) => f.id));
    setSelectedFlagId(EMAIL_RED_FLAGS[0].id);
  };

  const handleReset = () => {
    setFoundIds([]);
    setSelectedFlagId(null);
  };

  const activeFlag: EmailRedFlag | undefined =
    EMAIL_RED_FLAGS.find((f) => f.id === selectedFlagId) ??
    (foundIds.length > 0 ? EMAIL_RED_FLAGS.find((f) => f.id === foundIds[foundIds.length - 1]) : undefined);

  const getZoneClass = (flagId: string) => {
    const isFound = foundIds.includes(flagId);
    const isSelected = selectedFlagId === flagId;
    if (isSelected) {
      return 'ring-2 ring-red-600 bg-red-50 border-red-400 text-slate-900';
    }
    if (isFound) {
      return 'bg-red-50/70 border-red-300 text-slate-900';
    }
    return 'bg-slate-50/70 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 text-slate-900';
  };

  return (
    <div className="space-y-6">
      {/* Control & Status Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Interactive Email Demo · Click suspicious parts inside the message below
          </p>
          <p className="text-base font-semibold text-slate-900 mt-0.5 tabular-nums">
            Red Flags Found: {foundIds.length} / {totalFlags}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleRevealAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reveal All 6 Flags</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Two-Zone Sandbox Layout: Left Email Stage, Right Clue Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Email Client Simulation */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-4">
            <span className="text-xs font-semibold text-slate-700">
              SAMPLE (fake) · Fictional Student Banking Email
            </span>
            <span className="text-xs text-slate-500">
              Click highlighted areas to inspect
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {/* Email Headers */}
            <div className="space-y-2 pb-4 border-b border-slate-200 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500 w-16 shrink-0">From:</span>
                <button
                  type="button"
                  onClick={() => handleInspectFlag('sender-mismatch')}
                  aria-label="Inspect sender domain mismatch"
                  className={`text-left px-3 py-1.5 rounded-lg border transition-colors text-xs font-mono break-words ${getZoneClass('sender-mismatch')}`}
                >
                  FinTrust Bank Security &lt;alerts@fintrust-verify-login.example&gt;
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500 w-16 shrink-0">To:</span>
                <span className="text-xs sm:text-sm text-slate-600 font-mono px-1">
                  student.user@campus.example
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500 w-16 shrink-0">Subject:</span>
                <button
                  type="button"
                  onClick={() => handleInspectFlag('urgent-tone')}
                  aria-label="Inspect urgent tone in subject line"
                  className={`text-left px-3 py-1.5 rounded-lg border transition-colors text-sm font-semibold ${getZoneClass('urgent-tone')}`}
                >
                  URGENT ACTION REQUIRED: Your bank account will be suspended in 2 hours!
                </button>
              </div>
            </div>

            {/* Email Body */}
            <div className="space-y-4 text-sm text-slate-800 leading-relaxed">
              <div>
                <button
                  type="button"
                  onClick={() => handleInspectFlag('generic-greeting')}
                  aria-label="Inspect generic greeting"
                  className={`text-left px-3 py-1.5 rounded-lg border transition-colors font-medium ${getZoneClass('generic-greeting')}`}
                >
                  Dear Valued Customer,
                </button>
              </div>

              <p className="text-slate-700">
                Our automated security system noticed irregular login activity on your student savings profile.
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => handleInspectFlag('spelling-errors')}
                  aria-label="Inspect spelling and grammar errors"
                  className={`text-left px-3 py-2 rounded-lg border transition-colors leading-relaxed ${getZoneClass('spelling-errors')}`}
                >
                  Please kindly <strong>varify</strong> your account <strong>credentails</strong>{' '}
                  <strong>imediately</strong> within 2 hours to avoid{' '}
                  <strong>permenant closer</strong> of your debit card and online access.
                </button>
              </div>

              {/* Suspicious CTA Button */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => handleInspectFlag('suspicious-link')}
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                  onFocus={() => setIsHoveringLink(true)}
                  onBlur={() => setIsHoveringLink(false)}
                  aria-label="Inspect suspicious link button"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                    foundIds.includes('suspicious-link')
                      ? 'bg-red-700 text-white border-red-800'
                      : 'bg-blue-700 text-white border-blue-800 hover:bg-blue-800'
                  }`}
                >
                  <span>Verify My Account Now</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </button>
                <p className="mt-2 text-xs font-mono text-slate-500">
                  {isHoveringLink || foundIds.includes('suspicious-link')
                    ? 'Link preview: http://fintrust-secure-update.example/login (Safe demo — does not open)'
                    : 'Tip: Hover or click the button to inspect its true destination URL'}
                </p>
              </div>

              {/* Suspicious Attachment */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-500 mb-2">Attachment (1 file)</p>
                <button
                  type="button"
                  onClick={() => handleInspectFlag('unexpected-attachment')}
                  aria-label="Inspect unexpected attachment"
                  className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg border text-xs font-mono transition-colors ${getZoneClass('unexpected-attachment')}`}
                >
                  <Paperclip className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                  <span>Account_Hold_Form.html (142 KB)</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 pt-2">
                Sincerely,<br />
                Automated Security Compliance Team
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Explanation & Checklist Deck */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Clue Explanation */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
            {activeFlag ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="text-xs font-semibold">
                    Red Flag Detected · {activeFlag.shortTag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeFlag.label}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeFlag.explanation}
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                  <p className="text-xs font-semibold text-slate-700 mb-1">
                    What to check next time
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {activeFlag.whatToCheck}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-900">
                  Start Inspecting the Sample Email
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Click any dashed section inside the fake email—such as the sender address,
                  subject line, greeting, spelling mistakes, login button, or attachment—to
                  reveal why attackers use it and how to spot it.
                </p>
              </div>
            )}
          </div>

          {/* All 6 Flags Progress List */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              6 Phishing Clues in This Email
            </h4>
            <ul className="space-y-2">
              {EMAIL_RED_FLAGS.map((flag) => {
                const isFound = foundIds.includes(flag.id);
                return (
                  <li key={flag.id}>
                    <button
                      type="button"
                      onClick={() => handleInspectFlag(flag.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg border text-xs sm:text-sm flex items-center justify-between gap-2 transition-colors ${
                        isFound
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            isFound ? 'text-emerald-600' : 'text-slate-300'
                          }`}
                          aria-hidden="true"
                        />
                        <span className="truncate font-medium">{flag.label}</span>
                      </span>
                      <span className="text-xs whitespace-nowrap shrink-0">
                        {isFound ? 'Found' : 'Unchecked'}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {allFound && (
              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-emerald-700">
                  All 6 clues inspected!
                </span>
                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Next: Spot Fake URLs</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
