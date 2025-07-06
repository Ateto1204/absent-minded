import { Page } from '@playwright/test';

/**
 * Helper functions for E2E tests
 */

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Navigate to the application with retry logic
   */
  async navigateToApp(path: string = '/') {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Switch language on the landing page
   */
  async switchLanguage(language: 'en' | 'zh') {
    if (language === 'zh') {
      await this.page.click('button:has-text("中文")');
    } else {
      await this.page.click('button:has-text("Eng")');
    }
    await this.page.waitForTimeout(500); // Wait for language change
  }

  /**
   * Fill login form
   */
  async fillLoginForm(email: string) {
    await this.page.fill('input[type="email"]', email);
    await this.page.click('button:has-text("寄送登入信")');
  }

  /**
   * Switch view mode in the flow page
   */
  async switchViewMode(mode: 'flow' | 'gantt' | 'kanban' | 'pie') {
    const modeButtons = {
      flow: 'Flow',
      gantt: 'Gantt',
      kanban: 'Kanban',
      pie: 'Pie'
    };
    
    await this.page.click(`button:has-text("${modeButtons[mode]}")`);
    await this.page.waitForTimeout(1000); // Wait for mode change
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    await this.page.goto('/flow');
    await this.page.waitForTimeout(2000);
    return !this.page.url().includes('/login');
  }

  /**
   * Mock authentication (for testing purposes)
   */
  async mockAuthentication() {
    // This would set up mock authentication
    // In a real scenario, you might set cookies or localStorage
    await this.page.evaluate(() => {
      localStorage.setItem('supabase.auth.token', 'mock-token');
    });
  }

  /**
   * Clear authentication
   */
  async clearAuthentication() {
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  /**
   * Take screenshot with timestamp
   */
  async takeScreenshot(name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ 
      path: `screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }

  /**
   * Wait for element to be visible with retry
   */
  async waitForElementVisible(selector: string, timeout: number = 10000) {
    await this.page.waitForSelector(selector, { 
      state: 'visible', 
      timeout 
    });
  }

  /**
   * Scroll to element
   */
  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Check page accessibility
   */
  async checkAccessibility() {
    // Basic accessibility checks
    const headings = await this.page.locator('h1, h2, h3, h4, h5, h6').count();
    const buttons = await this.page.locator('button').count();
    const links = await this.page.locator('a').count();
    
    return {
      headings,
      buttons,
      links,
      hasMainLandmark: await this.page.locator('main').count() > 0
    };
  }

  /**
   * Generate test data
   */
  generateTestData() {
    const timestamp = Date.now();
    return {
      email: `test-${timestamp}@example.com`,
      taskTitle: `Test Task ${timestamp}`,
      projectName: `Test Project ${timestamp}`
    };
  }

  /**
   * Test responsive design
   */
  async testResponsiveDesign(selector: string) {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];

    const results = [];
    for (const viewport of viewports) {
      await this.page.setViewportSize(viewport);
      const isVisible = await this.page.locator(selector).isVisible();
      results.push({ viewport: viewport.name, isVisible });
    }
    
    return results;
  }

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation() {
    await this.page.keyboard.press('Tab');
    const focusedElement = await this.page.locator(':focus').count();
    return focusedElement > 0;
  }

  /**
   * Check for console errors
   */
  async getConsoleErrors() {
    const errors: string[] = [];
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    return errors;
  }

  /**
   * Wait for network requests to complete
   */
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Test form validation
   */
  async testFormValidation(formSelector: string, inputs: Record<string, string>) {
    for (const [field, value] of Object.entries(inputs)) {
      await this.page.fill(`${formSelector} input[name="${field}"]`, value);
    }
    
    await this.page.click(`${formSelector} button[type="submit"]`);
    await this.page.waitForTimeout(1000);
  }
}

/**
 * Test data constants
 */
export const TEST_DATA = {
  VALID_EMAIL: 'test@example.com',
  INVALID_EMAIL: 'invalid-email',
  LONG_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10),
  SPECIAL_CHARACTERS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  UNICODE_TEXT: '測試文字 🎉 emoji test',
  
  TASKS: {
    SIMPLE: {
      title: 'Simple Task',
      description: 'A simple test task'
    },
    COMPLEX: {
      title: 'Complex Task with Long Title that might overflow',
      description: 'This is a complex task with a very long description that tests how the application handles large amounts of text and ensures proper rendering across different screen sizes and devices.'
    }
  },
  
  PROJECTS: {
    DEFAULT: {
      name: 'Default Project',
      description: 'A default test project'
    }
  }
};

/**
 * Common assertions
 */
export const ASSERTIONS = {
  PAGE_LOAD_TIMEOUT: 30000,
  ELEMENT_VISIBLE_TIMEOUT: 10000,
  NETWORK_IDLE_TIMEOUT: 5000,
  
  REQUIRED_ELEMENTS: {
    LANDING: ['h1', 'button:has-text("Get Started")', 'button:has-text("中文")'],
    LOGIN: ['h1', 'input[type="email"]', 'button:has-text("寄送登入信")'],
    FLOW: ['main', '[data-testid="project-menu"]', '[data-testid="mode-selector"]']
  }
};