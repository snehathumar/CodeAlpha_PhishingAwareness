import { useState, useEffect } from 'react';
import {
  Shield,
  CheckCircle2,
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { TRAINING_MODULES, ModuleId } from './data/phishingData';
import { calculateModuleProgress } from './utils/trainingLogic';
import { ModuleWhatIsPhishing } from './components/ModuleWhatIsPhishing';
import { ModuleEmailInspector } from './components/ModuleEmailInspector';
import { ModuleUrlSpotter } from './components/ModuleUrlSpotter';
import { ModuleSocialEngineering } from './components/ModuleSocialEngineering';
import { ModuleRealWorldScams } from './components/ModuleRealWorldScams';
import { ModuleBestPractices } from './components/ModuleBestPractices';
import { ModuleQuiz } from './components/ModuleQuiz';
import { ModuleChecklist } from './components/ModuleChecklist';

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('what-is-phishing');
  const [visitedModules, setVisitedModules] = useState<ModuleId[]>(['what-is-phishing']);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeIndex = TRAINING_MODULES.findIndex((m) => m.id === activeModuleId);
  const activeModule = TRAINING_MODULES[activeIndex] ?? TRAINING_MODULES[0];
  const progress = calculateModuleProgress(visitedModules, TRAINING_MODULES.length);

  const selectModule = (id: ModuleId) => {
    setActiveModuleId(id);
    setVisitedModules((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const goToPrevious = () => {
    if (activeIndex > 0) {
      selectModule(TRAINING_MODULES[activeIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (activeIndex + 1 < TRAINING_MODULES.length) {
      selectModule(TRAINING_MODULES[activeIndex + 1].id);
    }
  };

  const renderModuleContent = () => {
    switch (activeModuleId) {
      case 'what-is-phishing':
        return <ModuleWhatIsPhishing onNext={goToNext} />;
      case 'email-inspector':
        return <ModuleEmailInspector onNext={goToNext} />;
      case 'url-spotter':
        return <ModuleUrlSpotter onNext={goToNext} />;
      case 'social-engineering':
        return <ModuleSocialEngineering onNext={goToNext} />;
      case 'real-world-scams':
        return <ModuleRealWorldScams onNext={goToNext} />;
      case 'best-practices':
        return <ModuleBestPractices onNext={goToNext} />;
      case 'quiz':
        return <ModuleQuiz onNext={goToNext} />;
      case 'checklist':
        return <ModuleChecklist />;
      default:
        return <ModuleWhatIsPhishing onNext={goToNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      {/* Mobile Compact Header (<= 15% mobile height) */}
      <header className="no-print lg:hidden sticky top-0 z-30 h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <Shield className="w-5 h-5 text-blue-700 shrink-0" aria-hidden="true" />
          <span className="font-bold text-base tracking-tight text-slate-900 truncate">
            PhishGuard
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-semibold text-slate-600 tabular-nums whitespace-nowrap">
            {progress.completedCount}/{TRAINING_MODULES.length} · {progress.percentage}%
          </span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close module menu' : 'Open module menu'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
          >
            {mobileMenuOpen ? (
              <>
                <X className="w-4 h-4" aria-hidden="true" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Menu className="w-4 h-4" aria-hidden="true" />
                <span>Modules</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="no-print lg:hidden fixed inset-x-0 top-14 bottom-0 z-20 bg-white border-t border-slate-200 overflow-y-auto p-4">
          <div className="mb-4 pb-4 border-b border-slate-200">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2 tabular-nums">
              <span>Training Progress</span>
              <span>
                {progress.completedCount} of {TRAINING_MODULES.length} modules ({progress.percentage}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-700 transition-transform duration-200 origin-left"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          <nav aria-label="Mobile training modules" className="space-y-1.5">
            {TRAINING_MODULES.map((mod) => {
              const isActive = mod.id === activeModuleId;
              const isVisited = visitedModules.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => selectModule(mod.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-lg border transition-colors flex items-center justify-between gap-2 ${
                    isActive
                      ? 'bg-blue-50 border-blue-600 text-blue-950 font-semibold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm truncate">
                    {mod.number}. {mod.shortTitle}
                  </span>
                  {isVisited && (
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-blue-700' : 'text-emerald-600'
                      }`}
                      aria-label="Visited"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="no-print hidden lg:flex lg:flex-col lg:w-76 lg:shrink-0 bg-white border-r border-slate-200 min-h-screen sticky top-0 max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-blue-700 shrink-0" aria-hidden="true" />
            <span className="text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
              PhishGuard
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Phishing Awareness Training · CodeAlpha Task 2
          </p>

          {/* Progress Bar */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2 tabular-nums">
              <span>Course Progress</span>
              <span>
                {progress.completedCount}/{TRAINING_MODULES.length} ({progress.percentage}%)
              </span>
            </div>
            <div
              className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={progress.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Course completion progress"
            >
              <div
                className="h-full bg-blue-700 transition-all duration-200"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        </div>

        <nav aria-label="Training modules" className="p-4 space-y-1 flex-1">
          {TRAINING_MODULES.map((mod) => {
            const isActive = mod.id === activeModuleId;
            const isVisited = visitedModules.includes(mod.id);
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => selectModule(mod.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg border transition-colors flex items-center justify-between gap-2 ${
                  isActive
                    ? 'bg-blue-50 border-blue-600 text-blue-950 font-semibold'
                    : 'bg-transparent border-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                <span className="text-sm truncate">
                  {mod.number}. {mod.shortTitle}
                </span>
                {isVisited && (
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-blue-700' : 'text-emerald-600'
                    }`}
                    aria-label="Module explored"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-5 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
          Static educational sandbox. Uses <code className="font-mono">.example</code> domains
          only. No login, tracking, or personal data stored.
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-8">
          {/* Active Module Header */}
          <header className="no-print space-y-2 pb-6 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 tabular-nums">
              <span className="font-semibold text-blue-700 whitespace-nowrap">
                Module {activeModule.number} of {String(TRAINING_MODULES.length).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">{activeModule.estimatedTime}</span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span className="hidden sm:inline whitespace-nowrap">Students &amp; Beginners</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {activeModule.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              {activeModule.subtitle}
            </p>
          </header>

          {/* Module Body */}
          <div>{renderModuleContent()}</div>

          {/* Bottom Module Navigation */}
          <footer className="no-print pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goToPrevious}
              disabled={activeIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Previous Module</span>
            </button>

            <span className="hidden sm:inline text-xs text-slate-500 tabular-nums">
              {activeIndex + 1} / {TRAINING_MODULES.length}
            </span>

            <button
              type="button"
              onClick={goToNext}
              disabled={activeIndex === TRAINING_MODULES.length - 1}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0"
            >
              <span>Next Module</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}
