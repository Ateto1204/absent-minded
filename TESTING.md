# E2E Testing Setup Guide

This guide will help you set up and run end-to-end tests for the Absent Minded application.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Good internet connection (for downloading browsers)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

   If you encounter issues with the browser download, try:
   ```bash
   npx playwright install --with-deps
   ```

   Or install only Chromium:
   ```bash
   npx playwright install chromium
   ```

## Running Tests

### Quick Start
```bash
# Run all tests
npm run test

# Run tests with browser UI visible
npm run test:headed

# Run tests in interactive mode
npm run test:ui
```

### Advanced Usage
```bash
# Run specific test file
npx playwright test landing.spec.ts

# Run tests in debug mode
npm run test:debug

# Run tests with specific browser
npx playwright test --project=chromium

# Run tests in parallel
npx playwright test --workers=4
```

## Test Structure

```
tests/
├── README.md                 # Test documentation
├── fixtures.ts              # Custom test fixtures
├── helpers.ts               # Utility functions
├── landing.spec.ts          # Landing page tests
├── login.spec.ts            # Login functionality tests
├── flow.spec.ts             # Main application tests
├── kanban.spec.ts           # Kanban board tests
├── navigation.spec.ts       # Navigation tests
├── visual.spec.ts           # Visual/UI tests
├── comprehensive.spec.ts    # Full user journey tests
└── setup-verification.spec.ts # Test setup verification
```

## Test Coverage

### 1. Landing Page (`landing.spec.ts`)
- ✅ App title display
- ✅ Language switching (English/Chinese)
- ✅ Navigation to login page
- ✅ Responsive design
- ✅ Copyright information

### 2. Login Page (`login.spec.ts`)
- ✅ Form validation
- ✅ Email input handling
- ✅ Google OAuth button
- ✅ Loading states
- ✅ Error handling

### 3. Flow Page (`flow.spec.ts`)
- ✅ Authentication redirect
- ✅ Mode switching (Flow, Kanban, Gantt, Pie)
- ✅ Project menu display
- ✅ Responsive layout

### 4. Kanban Board (`kanban.spec.ts`)
- ✅ Column display
- ✅ Task cards and dialog interaction
- ✅ Drag and drop functionality
- ✅ State bar display

### 5. Navigation (`navigation.spec.ts`)
- ✅ Page-to-page navigation
- ✅ Browser back/forward
- ✅ Language state persistence
- ✅ Keyboard navigation

### 6. Visual Tests (`visual.spec.ts`)
- ✅ CSS consistency
- ✅ Hover states and focus indicators
- ✅ Typography and theme application
- ✅ Form styling

### 7. Comprehensive Tests (`comprehensive.spec.ts`)
- ✅ Full user journeys
- ✅ Performance testing
- ✅ Error handling
- ✅ Accessibility compliance

## Configuration

### Environment Variables
You may need to set these environment variables:

```bash
# .env.local
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Browser Configuration
The tests are configured to run on:
- Chrome (Desktop)
- Firefox (Desktop)
- Safari (Desktop)
- Chrome (Mobile)
- Safari (Mobile)

You can modify `playwright.config.ts` to change browser settings.

## Troubleshooting

### Common Issues

1. **Browser installation fails:**
   ```bash
   # Try installing dependencies first
   npx playwright install-deps
   
   # Then install browsers
   npx playwright install
   ```

2. **Font loading errors:**
   The application may show font loading errors due to network restrictions. This doesn't affect functionality.

3. **Tests timeout:**
   - Increase timeout in `playwright.config.ts`
   - Check if the development server is running

4. **Authentication tests fail:**
   - Tests requiring authentication may need proper environment setup
   - Consider using test authentication tokens

### Debug Mode
```bash
# Run tests in debug mode
npm run test:debug

# Run specific test in debug mode
npx playwright test landing.spec.ts --debug
```

### Test Reports
```bash
# Generate and view HTML report
npm run test:report
```

## CI/CD Integration

Tests are automatically run on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

The CI workflow includes:
- Dependency installation
- Browser installation
- Test execution
- Report generation

## Best Practices

### Writing Tests
1. Use descriptive test names
2. Group related tests in `describe` blocks
3. Use `beforeEach` for common setup
4. Include both positive and negative test cases
5. Test responsive design across viewports

### Test Isolation
- Each test should be independent
- Clean up after tests when needed
- Use unique test data to avoid conflicts

### Assertions
- Use specific assertions (`toHaveText` vs `toContain`)
- Wait for elements to be visible before interacting
- Check for both presence and absence of elements

## Contributing

When adding new tests:
1. Follow the existing test structure
2. Add tests for new features
3. Update documentation
4. Ensure tests pass in CI
5. Include both happy path and error scenarios

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Test Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [CI/CD Integration](https://playwright.dev/docs/ci)

---

For more help, see the main README in the `tests/` directory or check the Playwright documentation.