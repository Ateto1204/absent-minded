# E2E Testing with Playwright

This directory contains end-to-end tests for the Absent Minded application using Playwright.

## Test Structure

### Test Files
- `landing.spec.ts` - Tests for the landing page (language switching, navigation)
- `login.spec.ts` - Tests for the login page (form validation, authentication)
- `flow.spec.ts` - Tests for the main flow page (mode switching, authentication)
- `kanban.spec.ts` - Tests for the Kanban board functionality
- `navigation.spec.ts` - Tests for navigation between pages
- `visual.spec.ts` - Tests for visual components and UI consistency
- `comprehensive.spec.ts` - Comprehensive tests covering full user journeys

### Helper Files
- `helpers.ts` - Utility functions and test data
- `fixtures.ts` - Custom test fixtures and extensions

## Running Tests

### Prerequisites
Make sure you have the dependencies installed:
```bash
npm install
```

### Install Playwright Browsers
```bash
npx playwright install
```

### Running Tests

#### Run all tests
```bash
npm run test
```

#### Run tests in headed mode (with browser UI)
```bash
npm run test:headed
```

#### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

#### Run specific test file
```bash
npx playwright test landing.spec.ts
```

#### Run tests in debug mode
```bash
npm run test:debug
```

#### View test report
```bash
npm run test:report
```

## Test Configuration

The tests are configured in `playwright.config.ts` with the following settings:

- **Base URL**: `http://localhost:3000`
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Reporters**: HTML report with screenshots and videos on failure
- **Retry**: 2 retries on CI, 0 locally
- **Timeout**: 30 seconds per test
- **Web Server**: Automatically starts `npm run dev` before tests

## Test Categories

### 1. Landing Page Tests
- Language switching (English/Chinese)
- Navigation to login page
- Responsive design
- Accessibility

### 2. Login Page Tests
- Form validation
- Email input handling
- Google OAuth button
- Error states
- Loading states

### 3. Flow Page Tests
- Authentication redirect
- Mode switching (Flow, Kanban, Gantt, Pie)
- Project menu
- Responsive layout

### 4. Kanban Board Tests
- Column display
- Task cards
- Drag and drop functionality
- Task dialog interaction

### 5. Navigation Tests
- Page-to-page navigation
- Browser back/forward
- Deep linking
- URL state management

### 6. Visual Tests
- CSS consistency
- Hover states
- Focus indicators
- Typography
- Theme application

### 7. Comprehensive Tests
- Full user journeys
- Cross-browser compatibility
- Performance testing
- Error handling
- Accessibility compliance

## Test Data

Test data is defined in `helpers.ts` and includes:
- Valid/invalid email addresses
- Sample task data
- Project data
- Unicode and special character tests

## Continuous Integration

The tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

The CI workflow (`/.github/workflows/e2e.yml`) includes:
- Dependency installation
- Playwright browser installation
- Test execution
- Report artifact upload

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

### Debugging
- Use `page.pause()` to debug interactively
- Take screenshots on failure
- Use `console.log` for debugging information
- Run tests in headed mode for visual debugging

## Troubleshooting

### Common Issues

1. **Tests failing due to authentication**
   - Tests requiring authentication may need mocking
   - Check if the test environment has proper auth setup

2. **Timeouts**
   - Increase timeout for slow operations
   - Use `page.waitForLoadState('networkidle')` for network operations

3. **Element not found**
   - Ensure elements have stable selectors
   - Use `data-testid` attributes for reliable selection

4. **Flaky tests**
   - Add appropriate waits
   - Use `page.waitForSelector` instead of `page.waitForTimeout`

### Environment Variables
You may need to set these environment variables:
- `NEXT_PUBLIC_BASE_URL` - Base URL for the application
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

## Contributing

When adding new tests:
1. Follow the existing test structure
2. Add tests for new features
3. Update this README if needed
4. Ensure tests pass in CI
5. Include both happy path and error scenarios

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Writing Tests](https://playwright.dev/docs/writing-tests)
- [Test Assertions](https://playwright.dev/docs/test-assertions)