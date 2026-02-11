/**
 * Lighthouse CI Configuration
 *
 * Defines performance budgets and assertions
 */
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/calculator',
        'http://localhost:3000/apply',
      ],
      startServerCommand: 'npm start',
      startServerReadyTimeout: 120000,
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.80 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'total-blocking-time': ['warn', { maxNumericValue: 400 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.2 }],
        interactive: ['warn', { maxNumericValue: 4500 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
