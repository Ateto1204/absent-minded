import { test, expect } from '@playwright/test';

// Simple test to verify Playwright setup
test.describe('Test Setup Verification', () => {
  test('should verify test framework is working', async ({ page }) => {
    // Mock a simple HTML page for testing
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <h1>Test Title</h1>
          <button>Test Button</button>
        </body>
      </html>
    `);

    // Basic assertions
    await expect(page.locator('h1')).toHaveText('Test Title');
    await expect(page.locator('button')).toHaveText('Test Button');
    
    // Click test
    await page.click('button');
    
    console.log('✅ Playwright setup is working correctly!');
  });
});