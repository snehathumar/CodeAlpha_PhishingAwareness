export type BadgeLevel = 'Beginner' | 'Aware' | 'Phishing Expert';

export interface UrlAnatomy {
  protocol: string;
  isHttps: boolean;
  subdomain: string;
  rootDomain: string;
  path: string;
}

export function calculateModuleProgress(visitedIds: ReadonlyArray<string>, totalModules: number): {
  completedCount: number;
  percentage: number;
} {
  if (totalModules <= 0) {
    return { completedCount: 0, percentage: 0 };
  }
  const uniqueVisited = new Set(visitedIds);
  const completedCount = Math.min(uniqueVisited.size, totalModules);
  const percentage = Math.round((completedCount / totalModules) * 100);
  return { completedCount, percentage };
}

export function getQuizBadge(score: number, totalQuestions: number): {
  level: BadgeLevel;
  summary: string;
} {
  if (totalQuestions <= 0) {
    return {
      level: 'Beginner',
      summary: 'Complete the quiz to earn your PhishGuard awareness badge.',
    };
  }
  const normalized = Math.max(0, Math.min(score, totalQuestions));
  const ratio = normalized / totalQuestions;

  if (ratio >= 0.8) {
    return {
      level: 'Phishing Expert',
      summary: 'Strong detection instincts across deceptive emails, fake URLs, and social engineering.',
    };
  }
  if (ratio >= 0.5) {
    return {
      level: 'Aware',
      summary: 'Good foundation. Review missed clues around lookalike domains and urgency traps.',
    };
  }
  return {
    level: 'Beginner',
    summary: 'Keep practicing! Revisit the Email Inspector and Fake URL Spotter labs to sharpen your eye.',
  };
}

export function toggleRedFlag(foundIds: ReadonlyArray<string>, flagId: string): string[] {
  if (foundIds.includes(flagId)) {
    return [...foundIds];
  }
  return [...foundIds, flagId];
}

export function evaluateUrlAnswer(
  userSelectedFake: boolean,
  actualIsFake: boolean
): { isCorrect: boolean; label: 'Correct' | 'Incorrect' } {
  const isCorrect = userSelectedFake === actualIsFake;
  return {
    isCorrect,
    label: isCorrect ? 'Correct' : 'Incorrect',
  };
}

export function parseUrlAnatomy(rawUrl: string): UrlAnatomy {
  const trimmed = rawUrl.trim();
  const hasHttps = trimmed.toLowerCase().startsWith('https://');
  const hasHttp = trimmed.toLowerCase().startsWith('http://');
  const protocol = hasHttps ? 'https://' : hasHttp ? 'http://' : 'unknown://';

  const withoutProtocol = trimmed.replace(/^https?:\/\//i, '');
  const slashIndex = withoutProtocol.indexOf('/');
  const host = slashIndex === -1 ? withoutProtocol : withoutProtocol.slice(0, slashIndex);
  const path = slashIndex === -1 ? '/' : withoutProtocol.slice(slashIndex);

  const parts = host.split('.').filter(Boolean);
  if (parts.length <= 2) {
    return {
      protocol,
      isHttps: hasHttps,
      subdomain: '',
      rootDomain: parts.join('.'),
      path,
    };
  }

  const rootDomain = parts.slice(-2).join('.');
  const subdomain = parts.slice(0, -2).join('.');
  return {
    protocol,
    isHttps: hasHttps,
    subdomain,
    rootDomain,
    path,
  };
}

export function toggleChecklistItem(checkedIds: ReadonlyArray<string>, itemId: string): string[] {
  if (checkedIds.includes(itemId)) {
    return checkedIds.filter((id) => id !== itemId);
  }
  return [...checkedIds, itemId];
}
