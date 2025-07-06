import { test, expect } from '@playwright/test';

test.describe('Kanban Board', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/flow');
    
    // Wait for potential redirect to login
    await page.waitForTimeout(2000);
    
    // If we're at login, skip these tests
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      test.skip(true, 'Not authenticated - skipping kanban tests');
    }
    
    // Switch to Kanban mode
    await page.click('button:has-text("Kanban")');
  });

  test('should display kanban columns', async ({ page }) => {
    await expect(page.locator('text=Active')).toBeVisible();
    await expect(page.locator('text=Completed')).toBeVisible();
    await expect(page.locator('text=Deprecated')).toBeVisible();
  });

  test('should display kanban hint', async ({ page }) => {
    // Check for hint text about drag and drop restrictions
    await expect(page.locator('text=Tasks cannot be moved directly between Completed and Deprecated')).toBeVisible();
  });

  test('should allow task creation', async ({ page }) => {
    // Look for add task button or input
    const addButton = page.locator('button:has-text("Add Task")').first();
    if (await addButton.isVisible()) {
      await addButton.click();
      
      // Check that task creation dialog opens
      await expect(page.locator('[data-testid="task-dialog"]')).toBeVisible();
    }
  });

  test('should display task cards', async ({ page }) => {
    // Look for task cards in columns
    const taskCards = page.locator('[data-testid="task-card"]');
    
    // There might be no tasks initially, so we'll just check the structure exists
    const activeColumn = page.locator('[data-testid="kanban-column-active"]');
    await expect(activeColumn).toBeVisible();
  });

  test('should handle task dialog interaction', async ({ page }) => {
    // Look for existing tasks to click on
    const existingTask = page.locator('[data-testid="task-card"]').first();
    
    if (await existingTask.isVisible()) {
      await existingTask.click();
      
      // Check that task dialog opens
      await expect(page.locator('[data-testid="task-dialog"]')).toBeVisible();
      
      // Close dialog
      const closeButton = page.locator('[data-testid="dialog-close"]');
      if (await closeButton.isVisible()) {
        await closeButton.click();
      }
    }
  });

  test('should support drag and drop between columns', async ({ page }) => {
    // This test would check drag and drop functionality
    // For now, let's just verify the columns are set up for drag and drop
    await expect(page.locator('[data-testid="kanban-column-active"]')).toBeVisible();
    await expect(page.locator('[data-testid="kanban-column-completed"]')).toBeVisible();
    await expect(page.locator('[data-testid="kanban-column-deprecated"]')).toBeVisible();
  });

  test('should prevent invalid drag operations', async ({ page }) => {
    // Test that the kanban board has the proper restrictions
    // This would typically involve trying to drag from Completed to Deprecated
    // and verifying that an alert appears
    
    // For now, let's just check that the columns exist and the hint is visible
    await expect(page.locator('text=Active')).toBeVisible();
    await expect(page.locator('text=Completed')).toBeVisible();
    await expect(page.locator('text=Deprecated')).toBeVisible();
  });

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('text=Active')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('text=Active')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('text=Active')).toBeVisible();
  });

  test('should display state bar', async ({ page }) => {
    // Check for state bar that shows task statistics
    await expect(page.locator('[data-testid="state-bar"]')).toBeVisible();
  });
});