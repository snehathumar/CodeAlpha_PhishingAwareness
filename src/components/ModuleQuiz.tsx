import { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/phishingData';
import { getQuizBadge } from '../utils/trainingLogic';

interface ModuleQuizProps {
  onNext: () => void;
}

export function ModuleQuiz({ onNext }: ModuleQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showSummary, setShowSummary] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const chosenOption = selectedAnswers[currentQuestion.id];
  const hasAnsweredCurrent = chosenOption !== undefined;

  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const badge = getQuizBadge(score, totalQuestions);

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowSummary(false);
  };

  if (showSummary) {
    return (
      <div className="space-y-6">
        <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 text-center space-y-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 mx-auto">
            <Award className="w-7 h-7" aria-hidden="true" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <p className="text-xs font-medium text-slate-500">
              Quiz Completed · 10 Scenarios
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
              Your Score: {score} / {totalQuestions}
            </h2>
            <p className="text-base font-semibold text-blue-800">
              Badge Earned: {badge.level}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {badge.summary}
            </p>
          </div>

          {/* Badge Tier Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left pt-2">
            <div
              className={`p-3.5 rounded-lg border ${
                badge.level === 'Beginner'
                  ? 'bg-amber-50 border-amber-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <p className="text-xs font-bold text-slate-900">0–4 · Beginner</p>
              <p className="text-xs text-slate-600 mt-0.5">Learning core warning signs</p>
            </div>
            <div
              className={`p-3.5 rounded-lg border ${
                badge.level === 'Aware'
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <p className="text-xs font-bold text-slate-900">5–7 · Aware</p>
              <p className="text-xs text-slate-600 mt-0.5">Spots common email &amp; SMS traps</p>
            </div>
            <div
              className={`p-3.5 rounded-lg border ${
                badge.level === 'Phishing Expert'
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <p className="text-xs font-bold text-slate-900">8–10 · Phishing Expert</p>
              <p className="text-xs text-slate-600 mt-0.5">Strong defense across all channels</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Retry Quiz</span>
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
            >
              <span>Next: Printable Safety Checklist</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* Answer Review Breakdown */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Question-by-Question Review</h3>
          <div className="space-y-3">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className="border border-slate-200 rounded-lg p-4 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      Question {idx + 1} · {q.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${
                        isCorrect ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{q.question}</p>
                  <p className="text-xs sm:text-sm text-slate-600">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress & Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-semibold text-blue-700 tabular-nums">
            Question {currentIndex + 1} of {totalQuestions} · {currentQuestion.category}
          </span>
          <span className="text-xs font-medium text-slate-600 tabular-nums">
            Current Score: {score} / {Object.keys(selectedAnswers).length}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-700 transition-transform duration-200 origin-left"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Active Question Card */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3" role="radiogroup" aria-label={`Question ${currentIndex + 1} options`}>
          {currentQuestion.options.map((option, idx) => {
            const isSelected = chosenOption === idx;
            const isCorrectOption = idx === currentQuestion.correctIndex;

            let optionStyle =
              'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300';
            if (hasAnsweredCurrent) {
              if (isCorrectOption) {
                optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium';
              } else if (isSelected && !isCorrectOption) {
                optionStyle = 'bg-red-50 border-red-500 text-red-950';
              } else {
                optionStyle = 'bg-slate-50 border-slate-200 text-slate-500';
              }
            }

            return (
              <button
                key={option}
                type="button"
                disabled={hasAnsweredCurrent}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-colors flex items-center justify-between gap-3 ${optionStyle}`}
              >
                <span className="flex items-start gap-3">
                  <span className="font-mono text-xs font-semibold text-slate-500 mt-0.5 shrink-0">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span>{option}</span>
                </span>
                {hasAnsweredCurrent && isCorrectOption && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-label="Correct answer" />
                )}
                {hasAnsweredCurrent && isSelected && !isCorrectOption && (
                  <XCircle className="w-4 h-4 text-red-700 shrink-0" aria-label="Your incorrect selection" />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Explanation */}
        {hasAnsweredCurrent && (
          <div
            className={`rounded-xl border p-4 space-y-2 ${
              chosenOption === currentQuestion.correctIndex
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-red-50/70 border-red-200 text-red-950'
            }`}
          >
            <p className="text-xs font-bold">
              {chosenOption === currentQuestion.correctIndex
                ? 'Correct!'
                : 'Not quite — here is why:'}
            </p>
            <p className="text-sm leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Restart Quiz</span>
          </button>

          {hasAnsweredCurrent && (
            <button
              type="button"
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
            >
              <span>
                {currentIndex + 1 < totalQuestions ? 'Next Question' : 'View Final Score & Badge'}
              </span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
