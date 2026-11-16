import { useState } from 'react';
import { ShieldAlert, Mail, UserCheck, Crown, MessageSquareWarning, PhoneCall, Copy, Globe, QrCode, ArrowRight } from 'lucide-react';
import { PHISHING_TYPES } from '../data/phishingData';

interface ModuleWhatIsPhishingProps {
  onNext: () => void;
}

const TYPE_ICONS: Record<string, typeof Mail> = {
  'email-phishing': Mail,
  'spear-phishing': UserCheck,
  whaling: Crown,
  smishing: MessageSquareWarning,
  vishing: PhoneCall,
  'clone-phishing': Copy,
  'fake-websites': Globe,
  'qr-phishing': QrCode,
};

export function ModuleWhatIsPhishing({ onNext }: ModuleWhatIsPhishingProps) {
  const [selectedTypeId, setSelectedTypeId] = useState<string>(PHISHING_TYPES[0].id);
  const activeType = PHISHING_TYPES.find((t) => t.id === selectedTypeId) ?? PHISHING_TYPES[0];
  const ActiveIcon = TYPE_ICONS[activeType.id] ?? ShieldAlert;

  return (
    <div className="space-y-8">
      {/* Definition & Why Attackers Use It */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 md:p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-blue-700 mb-2">
              Core Concept · Human-Layer Cyber Attack
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Understanding the Attack
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-4">
              <strong>Phishing</strong> is a cyber attack where scammers pretend to be a trusted
              person, bank, college office, or company to trick you into handing over sensitive
              information—such as passwords, OTPs, UPI PINs, or bank card numbers—or into
              installing harmful files.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Instead of breaking through strong software firewalls, attackers target human emotions
              like panic, trust, or excitement. One careless click can bypass expensive security tools.
            </p>
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-500">Goal 1</p>
              <p className="text-sm font-semibold text-slate-900">Steal Logins &amp; OTPs</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Goal 2</p>
              <p className="text-sm font-semibold text-slate-900">Steal Money via UPI/Cards</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Goal 3</p>
              <p className="text-sm font-semibold text-slate-900">Install Malware / Ransomware</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Why Attackers Rely on Phishing
            </h3>
            <ul className="space-y-4 text-sm text-slate-700">
              <li className="pb-3 border-b border-slate-100">
                <span className="font-semibold text-slate-900 block mb-0.5">
                  1. Zero Technical Exploit Needed
                </span>
                Sending a convincing message is far easier and cheaper than finding a software bug.
              </li>
              <li className="pb-3 border-b border-slate-100">
                <span className="font-semibold text-slate-900 block mb-0.5">
                  2. Scales to Millions in Seconds
                </span>
                Automated tools can send thousands of fake emails or SMS alerts at almost zero cost.
              </li>
              <li>
                <span className="font-semibold text-slate-900 block mb-0.5">
                  3. Works Across Every Device
                </span>
                Phones, laptops, WhatsApp, email, and printed QR codes can all carry deceptive links.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8 Types of Phishing - Interactive Explorer */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
        <div className="mb-6">
          <p className="text-xs font-medium text-slate-500 mb-1">
            Interactive Reference · Select any type to inspect
          </p>
          <h3 className="text-xl font-bold text-slate-900">
            8 Common Types of Phishing
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2" role="tablist" aria-label="Types of phishing">
            {PHISHING_TYPES.map((type, index) => {
              const Icon = TYPE_ICONS[type.id] ?? ShieldAlert;
              const isSelected = type.id === activeType.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedTypeId(type.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 text-blue-950'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-blue-700' : 'text-slate-400'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-medium text-sm truncate">
                      {String(index + 1).padStart(2, '0')}. {type.name}
                    </span>
                  </span>
                  <span className="text-xs text-slate-500 whitespace-nowrap shrink-0">
                    {type.channel}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
            role="tabpanel"
            aria-label={activeType.name}
          >
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-blue-700 shrink-0">
                  <ActiveIcon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Channel · {activeType.channel}
                  </p>
                  <h4 className="text-xl font-bold text-slate-900">
                    {activeType.name}
                  </h4>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 mb-1">
                  How it works
                </p>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                  {activeType.summary}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-amber-700 mb-1">
                  Typical Student Scenario · SAMPLE (fake)
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeType.example}
                </p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-emerald-800 mb-1">
                  How to stay safe
                </p>
                <p className="text-sm text-emerald-950 leading-relaxed">
                  {activeType.defenseTip}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 tabular-nums">
                Viewing {PHISHING_TYPES.findIndex((t) => t.id === activeType.id) + 1} of{' '}
                {PHISHING_TYPES.length} phishing types
              </span>
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Next: Inspect an Email</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
