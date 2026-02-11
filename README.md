# Capitec Loan Eligibility Simulator

A Next.js 16 application that simulates loan eligibility checks for Capitec Bank. This is a prototype project demonstrating modern web development practices with a focus on accessibility, performance, and user experience.

## ⚠️ Prototype Notice

This is a **prototype/simulator** for demonstration purposes only:

- All calculations use internal mock data
- No external API calls are made (no credit bureau checks)
- Results are not binding and do not constitute a loan offer
- Contact Capitec Bank directly for official loan applications

## Tech Stack

- **Framework:** Next.js 16.1.6 with App Router
- **React:** 19.2.3 with React Compiler enabled
- **TypeScript:** 5.x with strict mode
- **Styling:** Tailwind CSS v4
- **Forms:** React Hook Form + Zod validation
- **Testing:** Jest, React Testing Library
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd capitec-loan-eligibility-simulation-dev

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors automatically
npm run type-check       # Run TypeScript type checking

# Testing
npm test                 # Run all tests
npm run test:unit        # Run unit tests only
npm run test:integration # Run integration tests
npm run test:e2e         # Run e2e tests with Playwright
npm run test:e2e:ui      # Run e2e tests with UI mode
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run test:ci          # Run tests for CI/CD
npm run test:load        # Run load tests

# Code Formatting
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Analysis
npm run analyze          # Analyze bundle size

# Deployment
docker-compose up        # Build and run with Docker
```

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes (mock endpoints)
│   │   └── loans/          # Loan-related API endpoints
│   ├── apply/               # Loan application form wizard
│   ├── calculator/          # Loan calculator page
│   ├── results/             # Eligibility results display
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/               # React components
│   ├── ui/                  # Base UI components (buttons, inputs, etc.)
│   ├── wizard/              # Multi-step form wizard
│   │   └── steps/          # Wizard step components
│   ├── calculator/          # Calculator components
│   ├── results/             # Results display components
│   ├── features/            # Feature-specific components
│   ├── animate-ui/          # Animated UI components
│   ├── a11y/               # Accessibility components
│   └── elements/           # Shared UI elements
├── lib/                     # Utilities and business logic
│   ├── calculations/        # Financial calculation engine
│   ├── validation/          # Zod validation schemas
│   ├── middleware/          # API middleware
│   ├── utils/              # General utilities
│   └── calculations/       # Loan calculation logic
├── contexts/               # React contexts
├── hooks/                  # Custom React hooks
├── mocks/                  # Mock data factories
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
├── test-utils/            # Test utilities
└── __tests__/             # Test files
    ├── unit/              # Unit tests
    ├── integration/       # Integration tests
    └── pages/            # Page-level tests
```

## Features

### 1. Loan Application Wizard

- Multi-step form with 5 steps (Personal, Employment, Financial, Loan Details, Review)
- Real-time validation with Zod schemas
- Auto-save to localStorage
- Progress tracking
- Financial health check

### 2. Loan Calculator

- Interactive calculator with sliders
- Real-time payment calculations
- Loan term comparison table
- Payment breakdown chart (pie chart)
- Amortization schedule

### 3. Eligibility Results

- Approved/declined views
- Detailed affordability analysis
- Amortization schedule export (CSV)
- Print-friendly layout
- Improvement tips for declined applications

### 4. API Endpoints (Mock)

- `/api/loans/eligibility` - Check loan eligibility
- `/api/loans/products` - Get available loan products
- `/api/loans/calculate-rate` - Calculate interest rate and payment schedule
- `/api/loans/validation-rules` - Get form validation rules

## Development Guidelines

### Code Style

- Use absolute imports with `@/` alias
- Explicit TypeScript typing for all functions
- Client components marked with `'use client'`
- Follow mobile-first responsive design principles

### Commit Messages

Follow Conventional Commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `test:` - Tests
- `refactor:` - Code refactoring
- `style:` - Code style changes
- `chore:` - Build process or auxiliary tool changes

### Testing Standards

- Unit tests for utility functions and calculations
- Integration tests for API endpoints, components and wizard
- E2E tests with Playwright for critical user flows
- Accessibility tests with jest-axe
- Target: 44-45% code coverage

## Deployment

### Docker

```bash
# Build and run with Docker
docker-compose up --build

# Access the application
open http://localhost:3000
```

### Manual Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Performance Targets

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 95+
- Code Coverage: 44-45% (adjusted for mock data modules)

## Security Notes

- Input validation on all endpoints
- Rate limiting (60 requests/minute)
- No external API calls (internal mocks only)
- Secure headers configured
- Dependency scanning recommended

## Contributing

This is a prototype project. Contributions are welcome, but please note:

- No external API integrations (keep it internal)
- Follow existing code conventions
- Add tests for new features
- Update documentation

## License

This is a demonstration project for Capitec Bank recruitment.

## Contact

For official loan applications and inquiries, please visit [Capitec Bank](https://www.capitecbank.co.za).

## Acknowledgments

- Next.js team for the excellent framework
- Capitec Bank for the opportunity to demonstrate skills
- Open source community for valuable tools and libraries

## Testing & Verification

### Client Journey Testing Guide

For recruiters, QA testers, and stakeholders, a comprehensive **Client Journey Testing Guide** is available at:

**[docs/client-journey-testing-guide.md](./docs/client-journey-testing-guide.md)**

This guide provides:

- **Step-by-step test scenarios** for both loan approval and rejection flows
- **Detailed input data** for two complete user journeys:
  1. **Loan Rejected Application** - Low credit profile test case
  2. **Loan Approved Application** - Strong profile test case
- **Validation checkpoints** at each step
- **Expected behaviors** and screen states to verify
- **Troubleshooting guide** for common issues
- **Test results checklist** for recording findings

### Quick Test Summary

| Test Case | Profile                                                   | Expected Result                                                         |
| --------- | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| Test 1    | Low income (R7,500), high debt, low disposable income     | **REJECTED** - Shows decline reasons and improvement tips               |
| Test 2    | Strong income (R35,000), low debt, high disposable income | **APPROVED** - Shows loan details, amortization schedule, share options |

### Running Tests

```bash
# Run all tests (unit + integration)
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

**Test Coverage:** Currently 359+ tests passing (unit, integration, and e2e)
