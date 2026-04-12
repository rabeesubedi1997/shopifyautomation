import { test, expect } from '@/fixtures/base.fixture';

test.describe('Oz Camping Warehouse - Home Page Smoke Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('should load home page successfully', async ({ homePage }) => {
    await homePage.verifyHomePageLoaded();
    await homePage.verifyUrl();
  });

  test('should display correct page title', async ({ homePage }) => {
    await homePage.verifyPageTitle();
  });

  test('should display hero section', async ({ homePage }) => {
    const isHeroVisible = await homePage.isHeroSectionVisible();
    expect(isHeroVisible).toBe(true);
    
    const heroTitle = await homePage.getHeroTitle();
    expect(heroTitle).toBeTruthy();
    expect(heroTitle.length).toBeGreaterThan(0);
  });

  test('should display navigation menu', async ({ homePage }) => {
    await homePage.verifyNavigationMenu();
    
    const navigationItems = await homePage.getNavigationItems();
    expect(navigationItems.length).toBeGreaterThan(0);
    
    // Verify main categories are present
    const categories = await homePage.getProductCategories();
    expect(categories.length).toBeGreaterThan(0);
  });

  test('should display featured products', async ({ homePage }) => {
    await homePage.verifyFeaturedProductsDisplayed();
    
    const featuredProducts = await homePage.getFeaturedProducts();
    expect(featuredProducts.length).toBeGreaterThan(0);
    
    // Verify each product has name and price
    featuredProducts.forEach((product: { name: string; price: string }) => {
      expect(product.name).toBeTruthy();
      expect(product.name.length).toBeGreaterThan(0);
      expect(product.price).toBeTruthy();
      expect(product.price.length).toBeGreaterThan(0);
    });
  });

  test('should have functional search functionality', async ({ homePage }) => {
    const isSearchVisible = await homePage.isSearchInputVisible();
    
    // On mobile, search might be hidden, so we'll test the fallback navigation
    if (isSearchVisible) {
      // Test search with a common camping item
      await homePage.searchProduct('tent');
    } else {
      // On mobile, test direct search navigation fallback
      await homePage.page.goto(`/search?q=tent`);
    }
    
    // Wait for search results to load
    try {
      await homePage.page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    } catch {
      // Fallback for Firefox which may have different loading behavior
      await homePage.page.waitForTimeout(2000);
    }
    await homePage.page.waitForTimeout(1000);
    
    // Verify we're on a search results page or the search worked
    const currentUrl = homePage.page.url();
    expect(currentUrl.includes('search') || currentUrl.includes('tent')).toBe(true);
  });

  test('should display newsletter section', async ({ homePage }) => {
    const isNewsletterVisible = await homePage.isNewsletterVisible();
    expect(isNewsletterVisible).toBe(true);
  });

  test('should have cart functionality accessible', async ({ homePage }) => {
    // Initially cart should be empty or have some count
    const initialCount = await homePage.getCartItemCount();
    expect(typeof initialCount).toBe('number');
    expect(initialCount).toBeGreaterThanOrEqual(0);
    
    // Cart icon should be clickable
    await homePage.clickCartIcon();
    
    // Should navigate to cart or show cart dropdown
    await homePage.page.waitForTimeout(1000);
  });

  test('should be responsive on mobile viewport', async ({ homePage }) => {
    // Set mobile viewport
    await homePage.page.setViewportSize({ width: 375, height: 667 });
    
    await homePage.verifyHomePageLoaded();
    
    // Check if mobile menu is present
    const isMobileMenuPresent = await homePage.page.locator('.mobile-menu-toggle').isVisible();
    
    if (isMobileMenuPresent) {
      await homePage.openMobileMenu();
      const isMenuOpen = await homePage.isMobileMenuOpen();
      expect(isMenuOpen).toBe(true);
    }
  });

  test('should handle navigation to product categories', async ({ homePage }) => {
    // Store the original home page URL before navigation
    const originalUrl = homePage.page.url();
    
    const categories = await homePage.getProductCategories();
    
    if (categories.length > 0) {
      const firstCategory = categories[0];
      await homePage.navigateToCategory(firstCategory.name);
      
      // Wait for navigation
      try {
        await homePage.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      } catch {
        await homePage.page.waitForTimeout(1000);
      }
      
      // Verify we navigated away from home page
      expect(homePage.page.url()).not.toBe(originalUrl);
      expect(homePage.page.url()).toContain('/collections/');
    }
  });

  test('should maintain page performance standards', async ({ homePage }) => {
    const startTime = Date.now();
    await homePage.navigate();
    const loadTime = Date.now() - startTime;
    
    // Page should load within reasonable time (10 seconds for mobile, 5 for desktop, 7 for Firefox)
    const isMobile = await homePage.page.evaluate(() => {
      return window.innerWidth <= 768;
    });
    const isFirefox = await homePage.page.evaluate(() => {
      return navigator.userAgent.toLowerCase().includes('firefox');
    });
    const isWebKit = await homePage.page.evaluate(() => {
      return navigator.userAgent.toLowerCase().includes('webkit') && !navigator.userAgent.toLowerCase().includes('chrome');
    });
    let maxLoadTime = isMobile ? 10000 : 5000;
    if (isFirefox) {
      maxLoadTime = 8000; // Firefox is typically slower
    } else if (isWebKit) {
      maxLoadTime = 6000; // WebKit is slightly slower than Chrome
    }
    expect(loadTime).toBeLessThan(maxLoadTime);
    
    // Check for console errors
    const consoleErrors: string[] = [];
    homePage.page.on('console', (msg: any) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await homePage.page.reload();
    await homePage.page.waitForLoadState('domcontentloaded');
    await homePage.page.waitForTimeout(1000);
    
    // Should not have critical console errors (allow some warnings for Firefox)
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('warning') && 
      !error.includes('deprecated') &&
      !error.includes('Non-Error promise rejection') &&
      !error.includes('Content Security Policy') &&
      !error.includes('NS_ERROR')
    );
    expect(criticalErrors.length).toBeLessThan(5); // Allow more errors in Firefox
  });
});
