import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the app title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Absent Minded');
  });

  test('should show default English content', async ({ page }) => {
    await expect(page.locator('text=The mind-mapping powered to-do list')).toBeVisible();
    await expect(page.locator('text=Get Started')).toBeVisible();
  });

  test('should toggle language to Chinese', async ({ page }) => {
    // Click the language toggle button
    await page.click('button:has-text("中文")');
    
    // Check that content is now in Chinese
    await expect(page.locator('text=一款透過心智圖方式拆解任務的待辦系統')).toBeVisible();
    await expect(page.locator('text=開 始')).toBeVisible();
    
    // Language toggle button should now show "Eng"
    await expect(page.locator('button:has-text("Eng")')).toBeVisible();
  });

  test('should navigate to login page when clicking Get Started', async ({ page }) => {
    await page.click('button:has-text("Get Started")');
    await expect(page).toHaveURL('/login');
  });

  test('should navigate to login page when clicking Chinese start button', async ({ page }) => {
    // Switch to Chinese
    await page.click('button:has-text("中文")');
    
    // Click the Chinese start button
    await page.click('button:has-text("開 始")');
    
    await expect(page).toHaveURL('/login');
  });

  test('should display copyright information', async ({ page }) => {
    await expect(page.locator('text=© 2025 東毅中. All rights reserved.')).toBeVisible();
  });

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('button:has-text("Get Started")')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('button:has-text("Get Started")')).toBeVisible();
  });
});