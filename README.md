# Absent Minded

A mind-mapping powered to-do list application built with Next.js. Break down your tasks into manageable pieces using structured, visual thinking.

## Features

- **Mind-mapping visualization** - Visual task breakdown using React Flow
- **Multi-view support** - Switch between Flow, Kanban, Gantt, and Pie chart views
- **Bilingual support** - English and Chinese language support
- **Task management** - Create, edit, and organize tasks
- **Authentication** - Secure login with Supabase
- **Responsive design** - Works on desktop and mobile devices

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

This project includes comprehensive E2E testing with Playwright.

### Quick Start
```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run test:setup

# Run all tests
npm run test
```

### Test Commands
```bash
npm run test           # Run all tests
npm run test:headed    # Run tests with browser UI
npm run test:ui        # Run tests in interactive mode
npm run test:debug     # Run tests in debug mode
npm run test:report    # View test report
npm run test:verify    # Verify test setup
```

### Test Coverage
- Landing page functionality
- Login and authentication
- Task management features
- Kanban board operations
- Navigation and routing
- Responsive design
- Accessibility compliance

For detailed testing documentation, see [TESTING.md](TESTING.md) or [tests/README.md](tests/README.md).

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── models/          # Data models and services
└── utils/           # Utility functions

tests/               # E2E tests with Playwright
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **React Flow** - Flow diagram visualization
- **Supabase** - Backend and authentication
- **Playwright** - E2E testing

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
