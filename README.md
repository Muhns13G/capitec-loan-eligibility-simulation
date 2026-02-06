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
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report

# Deployment
docker-compose up        # Build and run with Docker
```

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes (mock endpoints)
│   ├── apply/               # Loan application form wizard
│   ├── calculator/          # Loan calculator page
│   ├── results/             # Eligibility results display
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/               # React components
│   ├── ui/                 # Base UI components
│   ├── wizard/              # Multi-step form wizard
│   ├── calculator/          # Calculator components
│   └── results/            # Results display components
├── lib/                     # Utilities and business logic
│   ├── calculations/        # Financial calculation engine
│   ├── validation/          # Zod validation schemas
│   ├── mocks/              # Mock data factories
│   ├── utils/              # General utilities
│   └── currency-formatter.ts # SA locale currency handling
├── types/                   # TypeScript type definitions
├── hooks/                   # Custom React hooks
└── __tests__/              # Test files
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

- Follow the conventions in `AGENTS.md`
- Use absolute imports with `@/` alias
- Explicit TypeScript typing for all functions
- Client components marked with `'use client'`

### Commit Messages

Follow Conventional Commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `test:` - Tests
- `refactor:` - Code refactoring
- `style:` - Code style changes
- `chore:` - Build process or auxiliary tool changes

### Testing

- Unit tests for utility functions and calculations
- Integration tests for components and wizard
- Accessibility tests with jest-axe
- Target: 85%+ code coverage

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
- Code Coverage: 85%+

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
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Test Coverage:** Currently 192 unit tests passing (100% for tested modules)
