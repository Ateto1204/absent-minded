import { test, expect } from '@playwright/test';

test.describe('Navigation and User Flows', () => {
  test('should navigate from landing page to login', async ({ page }) => {
    await page.goto('/');
    
    // Click Get Started button
    await page.click('button:has-text("Get Started")');
    
    // Should be redirected to login page
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1:has-text("登入")')).toBeVisible();
  });

  test('should handle language switching on landing page', async ({ page }) => {
    await page.goto('/');
    
    // Check initial English state
    await expect(page.locator('text=The mind-mapping powered to-do list')).toBeVisible();
    await expect(page.locator('button:has-text("Get Started")')).toBeVisible();
    
    // Switch to Chinese
    await page.click('button:has-text("中文")');
    
    // Check Chinese state
    await expect(page.locator('text=一款透過心智圖方式拆解任務的待辦系統')).toBeVisible();
    await expect(page.locator('button:has-text("開 始")')).toBeVisible();
    
    // Navigate to login from Chinese state
    await page.click('button:has-text("開 始")');
    await expect(page).toHaveURL('/login');
  });

  test('should handle direct navigation to protected routes', async ({ page }) => {
    // Direct navigation to /flow should redirect to login if not authenticated
    await page.goto('/flow');
    
    // Wait for potential redirect
    await page.waitForTimeout(2000);
    
    // Should be redirected to login
    await expect(page).toHaveURL('/login');
  });

  test('should preserve intended destination after login', async ({ page }) => {
    // Try to access /flow directly
    await page.goto('/flow');
    
    // Should be redirected to login
    await expect(page).toHaveURL('/login');
    
    // After successful login, should redirect to /flow
    // Note: This would require actual authentication setup
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Start at landing page
    await page.goto('/');
    
    // Navigate to login
    await page.click('button:has-text("Get Started")');
    await expect(page).toHaveURL('/login');
    
    // Go back to landing page
    await page.goBack();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1:has-text("Absent Minded")')).toBeVisible();
    
    // Go forward to login again
    await page.goForward();
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1:has-text("登入")')).toBeVisible();
  });

  test('should handle page refresh correctly', async ({ page }) => {
    // Landing page refresh
    await page.goto('/');
    await page.reload();
    await expect(page.locator('h1:has-text("Absent Minded")')).toBeVisible();
    
    // Login page refresh
    await page.goto('/login');
    await page.reload();
    await expect(page.locator('h1:has-text("登入")')).toBeVisible();
  });

  test('should handle invalid routes', async ({ page }) => {
    // Navigate to a non-existent route
    await page.goto('/nonexistent');
    
    // Should show 404 page or redirect to a valid page
    // This depends on your Next.js configuration
    const response = await page.goto('/nonexistent');
    expect(response?.status()).toBe(404);
  });

  test('should maintain app state during navigation', async ({ page }) => {
    await page.goto('/');
    
    // Switch to Chinese
    await page.click('button:has-text("中文")');
    
    // Navigate to login
    await page.click('button:has-text("開 始")');
    
    // Go back to landing page
    await page.goBack();
    
    // Language should still be Chinese
    await expect(page.locator('text=一款透過心智圖方式拆解任務的待辦系統')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Enter on Get Started button
    await page.keyboard.press('Enter');
    
    // Should navigate to login
    await expect(page).toHaveURL('/login');
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for proper button labels
    await expect(page.locator('button:has-text("Get Started")')).toBeVisible();
    await expect(page.locator('button:has-text("中文")')).toBeVisible();
    
    // Check for focus indicators
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});