import { test, expect } from '@playwright/test';
import { TestHelpers } from './helpers';

/**
 * Example test demonstrating how to use the test framework
 * This test shows best practices for writing E2E tests
 */
test.describe('Example Test Suite', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should demonstrate basic page testing', async ({ page }) => {
    // Navigate to a page
    await helpers.navigateToApp('/');
    
    // Check for required elements
    await expect(page.locator('h1')).toContainText('Absent Minded');
    await expect(page.locator('button:has-text("Get Started")')).toBeVisible();
    
    // Test responsive design
    const responsiveResults = await helpers.testResponsiveDesign('main');
    expect(responsiveResults.every(r => r.isVisible)).toBe(true);
  });

  test('should demonstrate form testing', async ({ page }) => {
    await helpers.navigateToApp('/login');
    
    // Test form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('button:has-text("寄送登入信")')).toBeVisible();
    
    // Test form interaction
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("寄送登入信")');
    
    // Check for loading state
    await expect(page.locator('button:has-text("寄送中...")')).toBeVisible();
  });

  test('should demonstrate language testing', async ({ page }) => {
    await helpers.navigateToApp('/');
    
    // Test language switching
    await helpers.switchLanguage('zh');
    await expect(page.locator('text=一款透過心智圖方式拆解任務的待辦系統')).toBeVisible();
    
    await helpers.switchLanguage('en');
    await expect(page.locator('text=The mind-mapping powered to-do list')).toBeVisible();
  });

  test('should demonstrate accessibility testing', async ({ page }) => {
    await helpers.navigateToApp('/');
    
    // Test accessibility features
    const accessibilityInfo = await helpers.checkAccessibility();
    expect(accessibilityInfo.hasMainLandmark).toBe(true);
    expect(accessibilityInfo.headings).toBeGreaterThan(0);
    
    // Test keyboard navigation
    const keyboardSupport = await helpers.testKeyboardNavigation();
    expect(keyboardSupport).toBe(true);
  });

  test('should demonstrate error handling', async ({ page }) => {
    // Mock network error
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server Error' })
      });
    });
    
    await helpers.navigateToApp('/login');
    await helpers.fillLoginForm('test@example.com');
    
    // Should handle error gracefully
    await page.waitForTimeout(2000);
    // Add specific assertions based on how your app handles errors
  });

  test('should demonstrate performance testing', async ({ page }) => {
    const startTime = Date.now();
    
    await helpers.navigateToApp('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within reasonable time
    expect(loadTime).toBeLessThan(5000);
  });

  test('should demonstrate data persistence', async ({ page }) => {
    await helpers.navigateToApp('/');
    
    // Make a change that should persist
    await helpers.switchLanguage('zh');
    
    // Navigate away and back
    await page.goto('/login');
    await page.goBack();
    
    // Change should be persisted
    await expect(page.locator('text=一款透過心智圖方式拆解任務的待辦系統')).toBeVisible();
  });
});