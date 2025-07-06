import { test as base } from '@playwright/test';

// Extend the base test with custom fixtures
export const test = base.extend({
  // Add custom fixtures here if needed
  // For example, authenticated user, test data, etc.
  
  // Example: authenticated page
  authenticatedPage: async ({ page }, use) => {
    // This would set up authentication for tests that need it
    // For now, we'll just use the regular page
    await use(page);
  },
  
  // Example: test data
  testData: async ({}, use) => {
    const testData = {
      users: {
        testUser: {
          email: 'test@example.com',
          password: 'testpassword123'
        }
      },
      tasks: {
        sampleTask: {
          title: 'Test Task',
          description: 'This is a test task',
          status: 'active'
        }
      }
    };
    
    await use(testData);
  }
});

export { expect } from '@playwright/test';