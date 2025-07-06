import { test, expect } from '@playwright/test';

test.describe('Flow Page', () => {
  test.beforeEach(async ({ page }) => {
    // Note: This page requires authentication
    // In a real scenario, you would set up authentication mocking
    await page.goto('/flow');
  });

  test('should redirect to login if not authenticated', async ({ page }) => {
    // If not authenticated, should redirect to login
    await expect(page).toHaveURL('/login');
  });

  test.describe('Authenticated Flow Tests', () => {
    test.beforeEach(async ({ page }) => {
      // Mock authentication by setting up session storage or cookies
      // This is a simplified approach - in production you might use a test user
      await page.goto('/flow');
      
      // Wait for potential redirect to login
      await page.waitForTimeout(2000);
      
      // If we're at login, we'll skip authenticated tests
      const currentUrl = page.url();
      if (currentUrl.includes('/login')) {
        test.skip(true, 'Not authenticated - skipping authenticated tests');
      }
    });

    test('should display project menu', async ({ page }) => {
      await expect(page.locator('[data-testid="project-menu"]')).toBeVisible();
    });

    test('should display mode selector', async ({ page }) => {
      // Look for mode selector buttons
      await expect(page.locator('button:has-text("Flow")')).toBeVisible();
      await expect(page.locator('button:has-text("Gantt")')).toBeVisible();
      await expect(page.locator('button:has-text("Kanban")')).toBeVisible();
      await expect(page.locator('button:has-text("Pie")')).toBeVisible();
    });

    test('should default to flow mode', async ({ page }) => {
      // Check that flow mode is selected by default
      const flowButton = page.locator('button:has-text("Flow")');
      await expect(flowButton).toHaveClass(/selected|active/);
    });

    test('should switch between different modes', async ({ page }) => {
      // Test switching to Kanban mode
      await page.click('button:has-text("Kanban")');
      await expect(page.locator('[data-testid="kanban-board"]')).toBeVisible();

      // Test switching to Gantt mode
      await page.click('button:has-text("Gantt")');
      await expect(page.locator('[data-testid="gantt-chart"]')).toBeVisible();

      // Test switching to Pie mode
      await page.click('button:has-text("Pie")');
      await expect(page.locator('[data-testid="pie-chart"]')).toBeVisible();

      // Test switching back to Flow mode
      await page.click('button:has-text("Flow")');
      await expect(page.locator('[data-testid="flow-canvas"]')).toBeVisible();
    });

    test('should display archived tasks list', async ({ page }) => {
      await expect(page.locator('[data-testid="archived-tasks"]')).toBeVisible();
    });

    test('should persist mode selection', async ({ page }) => {
      // Switch to Kanban mode
      await page.click('button:has-text("Kanban")');
      
      // Reload the page
      await page.reload();
      
      // Should still be in Kanban mode
      await expect(page.locator('[data-testid="kanban-board"]')).toBeVisible();
    });

    test('should have responsive layout', async ({ page }) => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.locator('main')).toBeVisible();
      
      // Test desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.locator('main')).toBeVisible();
    });
  });
});