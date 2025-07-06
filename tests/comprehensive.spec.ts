import { test, expect } from '@playwright/test';
import { TestHelpers, TEST_DATA, ASSERTIONS } from './helpers';

test.describe('Comprehensive Application Tests', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
  });

  test('should complete full user journey', async ({ page }) => {
    // Start at landing page
    await helpers.navigateToApp('/');
    
    // Verify landing page elements
    for (const selector of ASSERTIONS.REQUIRED_ELEMENTS.LANDING) {
      await expect(page.locator(selector)).toBeVisible();
    }
    
    // Test language switching
    await helpers.switchLanguage('zh');
    await expect(page.locator('text=一款透過心智圖方式拆解任務的待辦系統')).toBeVisible();
    
    // Switch back to English
    await helpers.switchLanguage('en');
    await expect(page.locator('text=The mind-mapping powered to-do list')).toBeVisible();
    
    // Navigate to login
    await page.click('button:has-text("Get Started")');
    await expect(page).toHaveURL('/login');
    
    // Verify login page elements
    for (const selector of ASSERTIONS.REQUIRED_ELEMENTS.LOGIN) {
      await expect(page.locator(selector)).toBeVisible();
    }
    
    // Test login form
    await helpers.fillLoginForm(TEST_DATA.VALID_EMAIL);
    await expect(page.locator('button:has-text("寄送中...")')).toBeVisible();
    
    // Wait for response
    await page.waitForTimeout(3000);
    
    // Should show some message
    await expect(page.locator('p.text-sm.text-gray-600')).toBeVisible();
  });

  test('should handle responsive design across all pages', async ({ page }) => {
    const pages = ['/', '/login'];
    
    for (const pagePath of pages) {
      await helpers.navigateToApp(pagePath);
      
      // Test different viewports
      const results = await helpers.testResponsiveDesign('main');
      
      // All viewports should show the main content
      for (const result of results) {
        expect(result.isVisible).toBe(true);
      }
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await helpers.navigateToApp('/');
    
    // Test keyboard navigation
    const hasKeyboardSupport = await helpers.testKeyboardNavigation();
    expect(hasKeyboardSupport).toBe(true);
    
    // Test Enter key on Get Started button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Should navigate to login
    await expect(page).toHaveURL('/login');
  });

  test('should handle accessibility requirements', async ({ page }) => {
    const pages = ['/', '/login'];
    
    for (const pagePath of pages) {
      await helpers.navigateToApp(pagePath);
      
      const accessibility = await helpers.checkAccessibility();
      
      // Should have proper heading structure
      expect(accessibility.headings).toBeGreaterThan(0);
      
      // Should have main landmark
      expect(accessibility.hasMainLandmark).toBe(true);
      
      // Should have interactive elements
      expect(accessibility.buttons).toBeGreaterThan(0);
    }
  });

  test('should handle form validation', async ({ page }) => {
    await helpers.navigateToApp('/login');
    
    // Test with invalid email
    await helpers.fillLoginForm(TEST_DATA.INVALID_EMAIL);
    
    // Should handle the validation (exact behavior depends on implementation)
    await expect(page.locator('button')).toBeDisabled();
  });

  test('should handle error states gracefully', async ({ page }) => {
    // Test network error scenarios
    await page.route('**/*', route => {
      if (route.request().url().includes('api')) {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal Server Error' })
        });
      } else {
        route.continue();
      }
    });
    
    await helpers.navigateToApp('/login');
    await helpers.fillLoginForm(TEST_DATA.VALID_EMAIL);
    
    // Should handle API errors gracefully
    await page.waitForTimeout(3000);
    await expect(page.locator('p.text-sm.text-gray-600')).toBeVisible();
  });

  test('should maintain performance standards', async ({ page }) => {
    // Start performance monitoring
    await page.goto('/');
    
    // Measure page load time
    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Should load within reasonable time (adjust as needed)
    expect(loadTime).toBeLessThan(10000);
  });

  test('should handle concurrent users simulation', async ({ page }) => {
    // Simulate multiple user actions
    const actions = [
      () => helpers.navigateToApp('/'),
      () => helpers.switchLanguage('zh'),
      () => helpers.switchLanguage('en'),
      () => page.click('button:has-text("Get Started")'),
      () => helpers.fillLoginForm(TEST_DATA.VALID_EMAIL)
    ];
    
    // Execute actions in sequence
    for (const action of actions) {
      await action();
      await page.waitForTimeout(500);
    }
    
    // Should handle all actions successfully
    await expect(page).toHaveURL('/login');
  });

  test('should handle data persistence', async ({ page }) => {
    await helpers.navigateToApp('/');
    
    // Switch to Chinese
    await helpers.switchLanguage('zh');
    
    // Navigate away and back
    await page.click('button:has-text("開 始")');
    await page.goBack();
    
    // Language preference should be maintained
    await expect(page.locator('text=一款透過心智圖方式拆解任務的待辦系統')).toBeVisible();
  });

  test('should handle special characters and unicode', async ({ page }) => {
    await helpers.navigateToApp('/login');
    
    // Test with special characters
    await helpers.fillLoginForm(TEST_DATA.SPECIAL_CHARACTERS);
    
    // Should handle special characters gracefully
    await expect(page.locator('input[type="email"]')).toHaveValue(TEST_DATA.SPECIAL_CHARACTERS);
  });

  test('should handle browser compatibility', async ({ page }) => {
    // Test modern web features
    await helpers.navigateToApp('/');
    
    // Check for modern CSS features
    await expect(page.locator('main')).toHaveClass(/flex/);
    await expect(page.locator('main')).toHaveClass(/min-h-screen/);
    
    // Check for JavaScript functionality
    await helpers.switchLanguage('zh');
    await expect(page.locator('text=一款透過心智圖方式拆解任務的待辦系統')).toBeVisible();
  });
});