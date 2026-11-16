import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateModuleProgress,
  getQuizBadge,
  toggleRedFlag,
  evaluateUrlAnswer,
  parseUrlAnatomy,
  toggleChecklistItem,
} from './trainingLogic';

test('calculateModuleProgress handles unique visits and clamping', () => {
  assert.deepEqual(calculateModuleProgress(['m1', 'm1', 'm2'], 8), {
    completedCount: 2,
    percentage: 25,
  });
  assert.deepEqual(calculateModuleProgress(['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'], 8), {
    completedCount: 8,
    percentage: 100,
  });
  assert.deepEqual(calculateModuleProgress([], 0), {
    completedCount: 0,
    percentage: 0,
  });
});

test('getQuizBadge assigns Beginner, Aware, and Phishing Expert accurately', () => {
  assert.equal(getQuizBadge(0, 10).level, 'Beginner');
  assert.equal(getQuizBadge(4, 10).level, 'Beginner');
  assert.equal(getQuizBadge(5, 10).level, 'Aware');
  assert.equal(getQuizBadge(7, 10).level, 'Aware');
  assert.equal(getQuizBadge(8, 10).level, 'Phishing Expert');
  assert.equal(getQuizBadge(10, 10).level, 'Phishing Expert');
});

test('toggleRedFlag adds new flags without duplicating existing ones', () => {
  const first = toggleRedFlag([], 'sender-mismatch');
  assert.deepEqual(first, ['sender-mismatch']);
  const second = toggleRedFlag(first, 'sender-mismatch');
  assert.deepEqual(second, ['sender-mismatch']);
  const third = toggleRedFlag(second, 'urgent-tone');
  assert.deepEqual(third, ['sender-mismatch', 'urgent-tone']);
});

test('evaluateUrlAnswer verifies user choice against actual URL status', () => {
  assert.deepEqual(evaluateUrlAnswer(true, true), { isCorrect: true, label: 'Correct' });
  assert.deepEqual(evaluateUrlAnswer(false, true), { isCorrect: false, label: 'Incorrect' });
  assert.deepEqual(evaluateUrlAnswer(false, false), { isCorrect: true, label: 'Correct' });
});

test('parseUrlAnatomy extracts protocol, subdomain, root domain, and path safely', () => {
  const deceptive = parseUrlAnatomy('https://login.mybank.com.verify-account-now.example/reset');
  assert.equal(deceptive.isHttps, true);
  assert.equal(deceptive.subdomain, 'login.mybank.com');
  assert.equal(deceptive.rootDomain, 'verify-account-now.example');
  assert.equal(deceptive.path, '/reset');

  const insecure = parseUrlAnatomy('http://student-portal.example/fees');
  assert.equal(insecure.isHttps, false);
  assert.equal(insecure.protocol, 'http://');
  assert.equal(insecure.subdomain, '');
  assert.equal(insecure.rootDomain, 'student-portal.example');
});

test('toggleChecklistItem checks and unchecks items cleanly', () => {
  const checked = toggleChecklistItem([], 'tip-1');
  assert.deepEqual(checked, ['tip-1']);
  const unchecked = toggleChecklistItem(checked, 'tip-1');
  assert.deepEqual(unchecked, []);
});
