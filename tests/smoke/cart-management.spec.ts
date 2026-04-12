import { test, expect } from '@playwright/test';
import { HomePage } from '@/pages/home.page';

test.describe('Cart Page Management', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Setup: Navigate directly to cart page with a product in cart
    // This approach bypasses the verification page issue
    
    // First, try to navigate directly to cart page
    await page.goto('https://ozcampingwarehouse.com/cart');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Check if cart is empty
    const cartItemCount = await homePage.getCartPageItemCount();
    
    if (cartItemCount === 0) {
      console.log('Cart is empty, attempting to add product via alternative method');
      
      // Try to add a product by going directly to product page with full URL
      await page.goto('https://ozcampingwarehouse.com/products/ht0015');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(3000);
      
      // Check if we hit verification page
      const pageTitle = await page.title();
      console.log(`Page title: ${pageTitle}`);
      
      if (pageTitle.includes('verified') || pageTitle.includes('connection')) {
        console.log('Hit verification page, trying alternative approach');
        
        // Try going to a collection page instead
        await page.goto('https://ozcampingwarehouse.com/collections/featured-products');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        
        // Try to find and click a product
        const productLinks = page.locator('a[href*="/products/"]');
        const productCount = await productLinks.count();
        
        if (productCount > 0) {
          console.log(`Found ${productCount} product links, clicking first one`);
          await productLinks.first().click();
          await page.waitForLoadState('domcontentloaded');
          await page.waitForTimeout(3000);
        }
      }
      
      // Try to add to cart with multiple attempts
      let addedToCart = false;
      const maxAttempts = 3;
      
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          console.log(`Attempt ${attempt} to add to cart`);
          
          // Check if we're on a product page
          const currentUrl = page.url();
          if (currentUrl.includes('/products/')) {
            // Try to add to cart
            await homePage.addToCart();
            await page.waitForTimeout(3000);
            
            // Check if cart modal appeared
            const modalVisible = await homePage.isCartModalVisible();
            if (modalVisible) {
              console.log('Cart modal appeared, proceeding to checkout');
              addedToCart = true;
              break;
            }
          }
        } catch (error) {
          console.log(`Attempt ${attempt} failed: ${error}`);
        }
      }
      
      if (addedToCart) {
        // Click Proceed to Checkout
        await homePage.clickProceedToCheckout();
        await page.waitForTimeout(2000);
      }
    }
    
    // Final verification - check if we're on cart page
    const isOnCartPage = await homePage.isCartPage();
    console.log(`Is on cart page: ${isOnCartPage}`);
    
    if (!isOnCartPage) {
      console.log('Not on cart page, navigating directly');
      await page.goto('https://ozcampingwarehouse.com/cart');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
    }
    
    // Verify cart page is loaded
    const cartPageLoaded = await homePage.verifyCartPageLoaded();
    console.log(`Cart page loaded: ${cartPageLoaded}`);
    
    // If still no items, skip the test
    const finalItemCount = await homePage.getCartPageItemCount();
    console.log(`Final cart item count: ${finalItemCount}`);
    
    if (finalItemCount === 0) {
      console.log('WARNING: Cart is empty - some tests may fail');
    }
  });

  test('should increase and decrease item quantity', async ({ page }) => {
    const homePage = new HomePage(page);
    
    console.log('Step 1: Getting initial cart state');
    const initialItemCount = await homePage.getCartPageItemCount();
    expect(initialItemCount).toBeGreaterThan(0);
    
    const initialItemDetails = await homePage.getCartItemDetails(0);
    const initialQuantity = parseInt(initialItemDetails.quantity);
    const initialTotal = await homePage.getCartPageTotal();
    
    console.log(`Initial quantity: ${initialQuantity}`);
    console.log(`Initial total: ${initialTotal}`);
    
    // Increase quantity
    console.log('Step 2: Increasing quantity');
    await homePage.increaseQuantity(0);
    await page.waitForTimeout(1000);
    
    const increasedQuantity = await homePage.getItemQuantity(0);
    const increasedTotal = await homePage.getCartPageTotal();
    
    console.log(`Increased quantity: ${increasedQuantity}`);
    console.log(`Increased total: ${increasedTotal}`);
    
    expect(increasedQuantity).toBe(initialQuantity + 1);
    expect(increasedTotal).not.toBe(initialTotal);
    
    // Decrease quantity
    console.log('Step 3: Decreasing quantity');
    await homePage.decreaseQuantity(0);
    await page.waitForTimeout(1000);
    
    const decreasedQuantity = await homePage.getItemQuantity(0);
    const decreasedTotal = await homePage.getCartPageTotal();
    
    console.log(`Decreased quantity: ${decreasedQuantity}`);
    console.log(`Decreased total: ${decreasedTotal}`);
    
    expect(decreasedQuantity).toBe(initialQuantity);
    expect(decreasedTotal).toBe(initialTotal);
    
    console.log('Quantity management test completed successfully');
  });

  test('should set quantity directly', async ({ page }) => {
    const homePage = new HomePage(page);
    
    console.log('Step 1: Setting quantity to 3');
    await homePage.setQuantity(0, 3);
    await page.waitForTimeout(1000);
    
    const setQuantity = await homePage.getItemQuantity(0);
    const setTotal = await homePage.getCartPageTotal();
    
    console.log(`Set quantity: ${setQuantity}`);
    console.log(`Set total: ${setTotal}`);
    
    expect(setQuantity).toBe(3);
    expect(setTotal).not.toBe('');
    
    // Reset to 1
    console.log('Step 2: Resetting quantity to 1');
    await homePage.setQuantity(0, 1);
    await page.waitForTimeout(1000);
    
    const resetQuantity = await homePage.getItemQuantity(0);
    expect(resetQuantity).toBe(1);
    
    console.log('Direct quantity setting test completed successfully');
  });

  test('should remove item from cart', async ({ page }) => {
    const homePage = new HomePage(page);
    
    console.log('Step 1: Verifying item is in cart');
    const initialItemCount = await homePage.getCartPageItemCount();
    expect(initialItemCount).toBeGreaterThan(0);
    
    const itemDetails = await homePage.getCartItemDetails(0);
    console.log(`Item to remove: ${itemDetails.name}`);
    
    // Remove the item
    console.log('Step 2: Removing item from cart');
    await homePage.removeItem(0);
    await page.waitForTimeout(2000);
    
    // Check if cart is empty
    const finalItemCount = await homePage.getCartPageItemCount();
    console.log(`Final item count: ${finalItemCount}`);
    
    if (finalItemCount === 0) {
      console.log('Cart is now empty');
      expect(await homePage.isCartPageEmpty()).toBe(true);
    } else {
      console.log('Cart still has items');
      expect(finalItemCount).toBeLessThan(initialItemCount);
    }
    
    console.log('Item removal test completed successfully');
  });

  test('should clear entire cart', async ({ page }) => {
    const homePage = new HomePage(page);
    
    console.log('Step 1: Adding another product to test multi-item cart');
    
    // Add a second product to test multi-item cart clearing
    await homePage.navigate();
    await page.waitForLoadState('domcontentloaded');
    
    const featuredProducts = await homePage.getFeaturedProducts();
    if (featuredProducts.length > 1) {
      const secondProduct = featuredProducts[1];
      await homePage.clickProduct(secondProduct.name);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      // Add second product
      const hasVariants = await homePage.hasProductVariants();
      if (hasVariants) {
        await homePage.addToCartWithVariants();
      } else {
        await homePage.addToCart();
      }
      
      await page.waitForTimeout(3000);
      await homePage.clickProceedToCheckout();
      await page.waitForTimeout(2000);
    }
    
    console.log('Step 2: Verifying multiple items in cart');
    const itemCountBeforeClear = await homePage.getCartPageItemCount();
    console.log(`Items before clear: ${itemCountBeforeClear}`);
    
    // Clear cart
    console.log('Step 3: Clearing entire cart');
    await homePage.clearCart();
    await page.waitForTimeout(2000);
    
    // Verify cart is empty
    const itemCountAfterClear = await homePage.getCartPageItemCount();
    console.log(`Items after clear: ${itemCountAfterClear}`);
    
    expect(itemCountAfterClear).toBe(0);
    expect(await homePage.isCartPageEmpty()).toBe(true);
    
    console.log('Clear cart test completed successfully');
  });

  test('should continue shopping from cart page', async ({ page }) => {
    const homePage = new HomePage(page);
    
    console.log('Step 1: Verifying cart has items');
    const cartItemCount = await homePage.getCartPageItemCount();
    expect(cartItemCount).toBeGreaterThan(0);
    
    const cartContents = await homePage.getCartPageContents();
    console.log(`Cart has ${cartContents.length} items`);
    
    // Click continue shopping
    console.log('Step 2: Clicking continue shopping');
    await homePage.clickCartPageContinueShopping();
    await page.waitForTimeout(1000);
    
    // Verify navigation away from cart page
    const currentUrl = page.url();
    console.log(`Current URL after continue shopping: ${currentUrl}`);
    
    expect(currentUrl).not.toContain('/cart');
    
    // Verify we're back to homepage or product listing
    const isHomepage = currentUrl === 'https://ozcampingwarehouse.com/' || 
                      currentUrl === 'https://ozcampingwarehouse.com' ||
                      currentUrl.includes('/collections');
    
    expect(isHomepage).toBe(true);
    
    console.log('Continue shopping test completed successfully');
  });

  test('should proceed to checkout from cart page', async ({ page }) => {
    const homePage = new HomePage(page);
    
    console.log('Step 1: Verifying cart has items');
    const cartItemCount = await homePage.getCartPageItemCount();
    expect(cartItemCount).toBeGreaterThan(0);
    
    const cartTotal = await homePage.getCartPageTotal();
    console.log(`Cart total: ${cartTotal}`);
    
    // Click checkout
    console.log('Step 2: Clicking checkout button');
    await homePage.clickCartPageCheckout();
    await page.waitForTimeout(2000);
    
    // Verify navigation to checkout
    const currentUrl = page.url();
    console.log(`Current URL after checkout: ${currentUrl}`);
    
    // Should be on checkout or payment page
    const isCheckoutPage = currentUrl.includes('/checkout') || 
                           currentUrl.includes('/payment') ||
                           currentUrl.includes('/shipping');
    
    expect(isCheckoutPage).toBe(true);
    
    console.log('Checkout navigation test completed successfully');
  });

  test('should handle complex cart operations', async ({ page }) => {
    const homePage = new HomePage(page);
    
    console.log('Step 1: Getting initial cart state');
    const initialDetails = await homePage.getCartItemDetails(0);
    const initialQuantity = parseInt(initialDetails.quantity);
    const initialTotal = await homePage.getCartPageTotal();
    
    console.log(`Initial state - Quantity: ${initialQuantity}, Total: ${initialTotal}`);
    
    // Increase quantity
    console.log('Step 2: Increasing quantity to 2');
    await homePage.increaseQuantity(0);
    await page.waitForTimeout(1000);
    
    const increasedDetails = await homePage.getCartItemDetails(0);
    const increasedQuantity = parseInt(increasedDetails.quantity);
    const increasedTotal = await homePage.getCartPageTotal();
    
    console.log(`After increase - Quantity: ${increasedQuantity}, Total: ${increasedTotal}`);
    
    expect(increasedQuantity).toBe(initialQuantity + 1);
    expect(increasedTotal).not.toBe(initialTotal);
    
    // Set quantity to 5
    console.log('Step 3: Setting quantity to 5');
    await homePage.setQuantity(0, 5);
    await page.waitForTimeout(1000);
    
    const setDetails = await homePage.getCartItemDetails(0);
    const setQuantity = parseInt(setDetails.quantity);
    const setTotal = await homePage.getCartPageTotal();
    
    console.log(`After setting to 5 - Quantity: ${setQuantity}, Total: ${setTotal}`);
    
    expect(setQuantity).toBe(5);
    
    // Decrease back to 1
    console.log('Step 4: Decreasing back to 1');
    for (let i = 0; i < 4; i++) {
      await homePage.decreaseQuantity(0);
      await page.waitForTimeout(500);
    }
    
    const finalDetails = await homePage.getCartItemDetails(0);
    const finalQuantity = parseInt(finalDetails.quantity);
    const finalTotal = await homePage.getCartPageTotal();
    
    console.log(`Final state - Quantity: ${finalQuantity}, Total: ${finalTotal}`);
    
    expect(finalQuantity).toBe(1);
    expect(finalTotal).toBe(initialTotal);
    
    console.log('Complex cart operations test completed successfully');
  });

  test('should verify cart item details', async ({ page }) => {
    const homePage = new HomePage(page);
    
    console.log('Step 1: Getting cart item details');
    const itemCount = await homePage.getCartPageItemCount();
    expect(itemCount).toBeGreaterThan(0);
    
    const itemDetails = await homePage.getCartItemDetails(0);
    console.log(`Item name: ${itemDetails.name}`);
    console.log(`Item variant: ${itemDetails.variant}`);
    console.log(`Item price: ${itemDetails.price}`);
    console.log(`Item total: ${itemDetails.total}`);
    console.log(`Item quantity: ${itemDetails.quantity}`);
    
    // Verify item details are present
    expect(itemDetails.name).toBeTruthy();
    expect(itemDetails.name.length).toBeGreaterThan(0);
    expect(itemDetails.price).toBeTruthy();
    expect(itemDetails.total).toBeTruthy();
    expect(itemDetails.quantity).toBeTruthy();
    
    // Verify quantity is a number
    const quantity = parseInt(itemDetails.quantity);
    expect(quantity).toBeGreaterThan(0);
    
    // Verify cart total
    const cartTotal = await homePage.getCartPageTotal();
    console.log(`Cart total: ${cartTotal}`);
    expect(cartTotal).toBeTruthy();
    expect(cartTotal.length).toBeGreaterThan(0);
    
    console.log('Cart item details verification completed successfully');
  });
});
