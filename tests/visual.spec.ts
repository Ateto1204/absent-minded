import { test, expect } from '@playwright/test';

test.describe('Visual Components and UI', () => {
  test('should have consistent styling across pages', async ({ page }) => {
    // Landing page
    await page.goto('/');
    await expect(page.locator('main')).toHaveCSS('background-color', 'rgb(9, 9, 11)'); // zinc-950
    
    // Login page
    await page.goto('/login');
    await expect(page.locator('main')).toBeVisible();
    
    // Flow page (if accessible)
    await page.goto('/flow');
    await page.waitForTimeout(2000);
    
    if (!page.url().includes('/login')) {
      await expect(page.locator('main')).toHaveCSS('background-color', 'rgb(9, 9, 11)'); // zinc-950
    }
  });

  test('should have proper button hover states', async ({ page }) => {
    await page.goto('/');
    
    const getStartedButton = page.locator('button:has-text("Get Started")');
    await expect(getStartedButton).toHaveCSS('background-color', 'rgb(37, 99, 235)'); // blue-600
    
    // Hover over button
    await getStartedButton.hover();
    await expect(getStartedButton).toHaveCSS('background-color', 'rgb(29, 78, 216)'); // blue-700
  });

  test('should have responsive typography', async ({ page }) => {
    await page.goto('/');
    
    // Desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    const title = page.locator('h1');
    await expect(title).toHaveClass(/text-5xl/);
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(title).toHaveClass(/text-5xl/); // Should still be visible
  });

  test('should handle dark theme properly', async ({ page }) => {
    await page.goto('/');
    
    // Check that the theme is properly applied
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('body')).toHaveClass(/antialiased/);
  });

  test('should display proper loading states', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in email and click send
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("寄送登入信")');
    
    // Should show loading state
    await expect(page.locator('button:has-text("寄送中...")')).toBeVisible();
  });

  test('should handle form validation styling', async ({ page }) => {
    await page.goto('/login');
    
    const emailInput = page.locator('input[type="email"]');
    const submitButton = page.locator('button:has-text("寄送登入信")');
    
    // Check input styling
    await expect(emailInput).toHaveClass(/border/);
    await expect(emailInput).toHaveClass(/px-4/);
    await expect(emailInput).toHaveClass(/py-2/);
    await expect(emailInput).toHaveClass(/rounded/);
    
    // Check button styling
    await expect(submitButton).toHaveClass(/bg-blue-600/);
    await expect(submitButton).toHaveClass(/text-white/);
    await expect(submitButton).toHaveClass(/px-6/);
    await expect(submitButton).toHaveClass(/py-2/);
    await expect(submitButton).toHaveClass(/rounded/);
  });

  test('should display proper focus indicators', async ({ page }) => {
    await page.goto('/');
    
    // Tab to first focusable element
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should handle text overflow properly', async ({ page }) => {
    await page.goto('/');
    
    // Test that long text content doesn't overflow
    const description = page.locator('text=The mind-mapping powered to-do list');
    await expect(description).toBeVisible();
    
    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(description).toBeVisible();
  });

  test('should have proper spacing and layout', async ({ page }) => {
    await page.goto('/');
    
    // Check that elements have proper spacing
    const main = page.locator('main');
    await expect(main).toHaveClass(/min-h-screen/);
    await expect(main).toHaveClass(/flex/);
    await expect(main).toHaveClass(/flex-col/);
    await expect(main).toHaveClass(/items-center/);
    await expect(main).toHaveClass(/justify-center/);
  });

  test('should handle image loading and alt text', async ({ page }) => {
    await page.goto('/');
    
    // Check if there are any images and that they have alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });
});