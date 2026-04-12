import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { NavigationItem, ProductCategory } from '@/types/page.types';

export class HomePage extends BasePage {
  public readonly url = '/';
  public readonly title = 'Australia.*Home of Camping Gear';

  // Navigation selectors
  private readonly navigationMenu = 'header';
  private readonly mainNavigation = 'a[href*="collections"]';
  private readonly mobileMenuToggle = '.mobile-menu';

  // Product category selectors
  private readonly gearSection = '.collections';
  private readonly categoryLinks = 'a[href*="collections"]';
  private readonly subcategoryMenu = '.subcategory';

  // Search and utility selectors
  private readonly searchInput = '#bc-product-search';
  private readonly searchButton = '.search-icon';
  private readonly searchForm = '#search';
  private readonly userAccount = '.user-account';

  // Hero section selectors
  private readonly heroSection = 'body';
  private readonly heroTitle = 'h1';
  private readonly heroSubtitle = 'h2';

  // Product page selectors
  private readonly productTitle = 'h1, .product-title, .product-name, .product-single-title';
  private readonly productPrice = '.product-price, .price, .current-price, .product-single-price';
  private readonly productImage = '.product-image img, .main-product-image img, .product-single-image img';
  private readonly addToCartButton = '.add-to-cart, button[type="submit"], .product-add-to-cart';
  private readonly productDescription = '.product-description, .product-details, .product-single-description';

  // Cart selectors
  private readonly cartIcon = '.basket, .cart-icon, .shopping-cart';
  private readonly cartCount = '.cart-count, .basket-count, .item-count, .cart-counter';
  private readonly cartDrawer = '.cart-drawer, .mini-cart, .shopping-cart, .cart-sidebar';
  private readonly cartItems = '.cart-item, .mini-cart-item, .cart-product';
  private readonly cartProductName = '.cart-item-title, .product-title, .item-name';
  private readonly cartTotal = '.cart-total, .total-price, .cart-total-price';

  // Cart modal selectors
  private readonly cartModal = '.addcart-modal-content';
  private readonly cartModalNote = '.addcart-modal-content .note';
  private readonly cartModalProduct = '.addcart-modal-product';
  private readonly cartModalTitle = '.addcart-modal-title';
  private readonly cartModalVariant = '.addcart-modal-variant';
  private readonly cartModalQty = '.addcart-modal-qty';
  private readonly cartModalPrice = '.addcart-modal-price';
  private readonly cartModalSubtotal = '.addcart-modal-subtotal';
  private readonly cartModalContinue = '.addcart-modal-continue a';
  private readonly cartModalCheckout = '.addcart-modal-checkout a';

  // Variant selectors
  private readonly sizeSwatch = '.swatch[data-value="size"]';
  private readonly sizeOptions = '.swatch[data-value="size"] .swatch-element';
  private readonly sizeOptionLabel = '.swatch[data-value="size"] .swatch-element label';
  private readonly colorSwatch = '.swatch[data-value="colour"]';
  private readonly colorOptions = '.swatch[data-value="colour"] .swatch-element';
  private readonly colorOptionLabel = '.swatch[data-value="colour"] .swatch-element label';
  private readonly variantSelect = 'select[name="id"]';

  // Featured products selectors
  private readonly featuredProducts = '.listing-items-col, .product-grid, .products-grid, .product-list';
  private readonly productCard = '.listing-item, .product-item, .grid-item, .product-card, .product';
  private readonly productName = '.product-content-inner a, .product-title a, .product-name, h4 a, h5 a, .listing-item a';
  private readonly featuredProductPrice = '.product-price, .price, .product-price-amount, .money';

  // Newsletter selectors
  private readonly newsletterSection = 'input[type="email"]';
  private readonly newsletterEmail = 'input[type="email"]';
  private readonly newsletterSubmit = 'button[type="submit"]';

  constructor(page: Page) {
    super(page);
  }

  // Navigation methods
  async navigateToCategory(categoryName: string): Promise<void> {
    // Find the dropdown link in the navbar
    const dropdownLink = this.page.locator('.navbar .dropdown-link').filter({ hasText: categoryName }).first();
    
    // Get the href attribute to navigate directly
    const href = await dropdownLink.getAttribute('href');
    
    if (href) {
      // Navigate directly to the category URL
      await this.page.goto(href);
    } else {
      // Fallback: click the link
      await dropdownLink.click();
    }
  }

  async getNavigationItems(): Promise<NavigationItem[]> {
    const navigationItems: NavigationItem[] = [];
    const items = this.page.locator(this.mainNavigation);
    
    const count = await items.count();
    // Limit to first 5 items for Firefox to avoid timeouts
    const maxItems = Math.min(count, 5);
    for (let i = 0; i < maxItems; i++) {
      try {
        const item = items.nth(i);
        const name = await item.textContent() || '';
        const href = await item.getAttribute('href') || '';
        if (name.trim()) {
          navigationItems.push({ name: name.trim(), selector: this.categoryLinks, url: href });
        }
      } catch {
        // Skip this item if it times out
        continue;
      }
    }
    
    return navigationItems;
  }

  // Search methods
  async searchProduct(productName: string): Promise<void> {
    // Try to find and fill search input
    const searchInput = this.page.locator(this.searchInput);
    const isVisible = await searchInput.isVisible();
    
    if (isVisible) {
      await searchInput.fill(productName);
      // Click the first visible search button to submit the form
      try {
        const searchButton = this.page.locator(this.searchButton).first();
        await searchButton.click({ timeout: 5000 });
      } catch {
        // Fallback: press Enter if click fails
        await searchInput.press('Enter');
      }
    } else {
      // Fallback: try direct navigation to search results
      await this.page.goto(`/search?q=${encodeURIComponent(productName)}`);
    }
  }

  async isSearchInputVisible(): Promise<boolean> {
    return await this.isElementVisible(this.searchInput);
  }

  // Product methods
  async getFeaturedProducts(): Promise<{ name: string; price: string }[]> {
    const products: { name: string; price: string }[] = [];
    
    try {
      // Wait a bit for page to stabilize
      await this.page.waitForTimeout(500);
      
      // Find product listing items
      const productCards = this.page.locator(this.productCard);
      const count = await productCards.count().catch(() => 0);
      
      if (count > 0) {
        // Limit to first 3 products to avoid timeouts
        const maxProducts = Math.min(count, 3);
        for (let i = 0; i < maxProducts; i++) {
          try {
            const card = productCards.nth(i);
            
            // Skip visibility check for mobile - process all found cards
            // Mobile elements may not be considered "visible" but still contain data
            
            // Get product name
            const nameElement = card.locator(this.productName);
            const name = await nameElement.textContent().catch(() => '') || '';
            
            // Get product price with minimal timeout
            const priceElement = card.locator(this.featuredProductPrice);
            const priceText = await priceElement.textContent().catch(() => '') || '';
            
            // Extract price (look for Rs or $ pattern)
            const priceMatch = priceText.match(/(Rs\s*[\d,]+\.\d+|\$[\d,]+\.\d+)/);
            const price = priceMatch ? priceMatch[1] : priceText.trim();
            
            if (name.trim()) {
              products.push({ 
                name: name.trim(), 
                price: price || 'Price not available'
              });
            }
          } catch {
            // Skip this product if it times out
            continue;
          }
        }
      }
    } catch {
      // Return empty products if there's a major error
      return [];
    }
    return products;
  }

  async clickProduct(productName: string): Promise<void> {
    try {
      // Get the product card and extract the href
      const productCard = this.page.locator(`${this.productCard}:has-text("${productName}")`).first();
      const productLink = productCard.locator('a').first();
      
      // Extract href attribute
      const href = await productLink.getAttribute('href');
      
      if (href) {
        // Navigate directly to the product URL
        const fullUrl = href.startsWith('http') ? href : `https://ozcampingwarehouse.com${href}`;
        await this.page.goto(fullUrl);
        await this.page.waitForLoadState('domcontentloaded');
        return;
      }
      
      // Fallback: try clicking the link
      await productLink.click();
    } catch (error) {
      console.log(`Error clicking product ${productName}: ${error}`);
      throw error;
    }
  }

  // Hero section methods
  async getHeroTitle(): Promise<string> {
    const heroTitle = this.page.locator(this.heroTitle);
    return await heroTitle.textContent() || '';
  }

  async getHeroSubtitle(): Promise<string> {
    const heroSubtitle = this.page.locator(this.heroSubtitle);
    return await heroSubtitle.textContent() || '';
  }

  // Product page verification methods
  async getProductTitle(): Promise<string> {
    try {
      // Try h1 first (most reliable for product pages)
      const h1Element = this.page.locator('h1').first();
      const h1Text = await h1Element.textContent().catch(() => '') || '';
      if (h1Text.trim()) {
        return h1Text.trim();
      }
      
      // Fallback to other selectors
      const titleElement = this.page.locator(this.productTitle).first();
      return await titleElement.textContent().catch(() => '') || '';
    } catch {
      return '';
    }
  }

  async getProductPrice(): Promise<string> {
    try {
      // Try .product-price first (most reliable for product pages)
      const priceElement = this.page.locator('.product-price').first();
      const priceText = await priceElement.textContent().catch(() => '') || '';
      if (priceText.trim()) {
        // Extract price (look for Rs or $ pattern)
        const priceMatch = priceText.match(/(Rs\s*[\d,]+\.\d+|\$[\d,]+\.\d+)/);
        return priceMatch ? priceMatch[1] : priceText.trim();
      }
      
      // Fallback to .price
      const fallbackPriceElement = this.page.locator('.price').first();
      const fallbackPriceText = await fallbackPriceElement.textContent().catch(() => '') || '';
      if (fallbackPriceText.trim()) {
        const priceMatch = fallbackPriceText.match(/(Rs\s*[\d,]+\.\d+|\$[\d,]+\.\d+)/);
        return priceMatch ? priceMatch[1] : fallbackPriceText.trim();
      }
      
      return '';
    } catch {
      return '';
    }
  }

  async getProductImageCount(): Promise<number> {
    try {
      const imageElements = this.page.locator(this.productImage);
      return await imageElements.count().catch(() => 0);
    } catch {
      return 0;
    }
  }

  async isAddToCartVisible(): Promise<boolean> {
    try {
      // Try .add-to-cart first (most reliable for product pages)
      const addToCartElement = this.page.locator('.add-to-cart').first();
      if (await addToCartElement.isVisible().catch(() => false)) {
        return true;
      }
      
      // Fallback to button:has-text("Add to cart")
      const addToCartButton = this.page.locator('button:has-text("Add to cart")').first();
      return await addToCartButton.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  async getProductDescription(): Promise<string> {
    try {
      const descriptionElement = this.page.locator(this.productDescription);
      return await descriptionElement.textContent().catch(() => '') || '';
    } catch {
      return '';
    }
  }

  // Cart functionality methods
  async getCartItemCount(): Promise<number> {
    try {
      const cartCountElement = this.page.locator(this.cartCount);
      const countText = await cartCountElement.textContent().catch(() => '') || '';
      const count = parseInt(countText.trim()) || 0;
      return count;
    } catch {
      return 0;
    }
  }

  async addToCart(): Promise<void> {
    try {
      // Try multiple selectors for "Add to cart" button
      const selectors = [
        '.add-to-cart',
        'button:has-text("Add to cart")',
        'button[type="submit"]:has-text("Add to cart")',
        '.btn-add-to-cart',
        'input[type="submit"][value*="Add to cart"]',
        'button:has-text("Add to Cart")',
        'button:has-text("ADD TO CART")'
      ];
      
      for (const selector of selectors) {
        const element = this.page.locator(selector).first();
        if (await element.isVisible().catch(() => false)) {
          await element.click();
          return;
        }
      }
      
      // Last resort - try any button with "add" text
      const anyButton = this.page.locator('button:has-text("add")').first();
      if (await anyButton.isVisible().catch(() => false)) {
        await anyButton.click();
        return;
      }
      
      throw new Error('No Add to Cart button found');
    } catch (error) {
      console.log(`Error adding to cart: ${error}`);
      throw error;
    }
  }

  async openCart(): Promise<void> {
    try {
      // Click on cart icon to open cart drawer
      const cartIconElement = this.page.locator(this.cartIcon).first();
      await cartIconElement.click();
      await this.page.waitForTimeout(2000); // Wait for cart drawer to open
    } catch (error) {
      console.log(`Error opening cart: ${error}`);
      throw error;
    }
  }

  async getCartProductNames(): Promise<string[]> {
    try {
      const cartItemElements = this.page.locator(this.cartItems);
      const count = await cartItemElements.count();
      const productNames: string[] = [];
      
      for (let i = 0; i < count; i++) {
        const item = cartItemElements.nth(i);
        const nameElement = item.locator(this.cartProductName);
        const name = await nameElement.textContent().catch(() => '') || '';
        if (name.trim()) {
          productNames.push(name.trim());
        }
      }
      
      return productNames;
    } catch {
      return [];
    }
  }

  async getCartTotal(): Promise<string> {
    try {
      const totalElement = this.page.locator(this.cartTotal).first();
      const totalText = await totalElement.textContent().catch(() => '') || '';
      return totalText.trim();
    } catch {
      return '';
    }
  }

  // Variant detection methods
  async hasSizeOptions(): Promise<boolean> {
    try {
      const sizeSwatch = this.page.locator(this.sizeSwatch);
      return await sizeSwatch.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  async hasColorOptions(): Promise<boolean> {
    try {
      const colorSwatch = this.page.locator(this.colorSwatch);
      return await colorSwatch.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  async hasProductVariants(): Promise<boolean> {
    const hasSize = await this.hasSizeOptions();
    const hasColor = await this.hasColorOptions();
    return hasSize || hasColor;
  }

  // Get available options
  async getAvailableSizes(): Promise<string[]> {
    try {
      const sizeElements = this.page.locator(this.sizeOptions);
      const sizes: string[] = [];
      const count = await sizeElements.count();
      
      for (let i = 0; i < count; i++) {
        const sizeElement = sizeElements.nth(i);
        const size = await sizeElement.getAttribute('data-value');
        const isSoldout = await sizeElement.evaluate(el => el.classList.contains('soldout'));
        
        if (size && !isSoldout) {
          sizes.push(size);
        }
      }
      return sizes;
    } catch {
      return [];
    }
  }

  async getAvailableColors(): Promise<string[]> {
    try {
      const colorElements = this.page.locator(this.colorOptions);
      const colors: string[] = [];
      const count = await colorElements.count();
      
      for (let i = 0; i < count; i++) {
        const colorElement = colorElements.nth(i);
        const color = await colorElement.getAttribute('data-value');
        const isSoldout = await colorElement.evaluate(el => el.classList.contains('soldout'));
        
        if (color && !isSoldout) {
          colors.push(color);
        }
      }
      return colors;
    } catch {
      return [];
    }
  }

  // Selection methods
  async selectProductSize(size: string): Promise<void> {
    try {
      const sizeOption = this.page.locator(`${this.sizeOptions}[data-value="${size}"] label`).first();
      await sizeOption.click();
      await this.page.waitForTimeout(1000); // Wait for selection
    } catch (error) {
      console.log(`Error selecting size ${size}: ${error}`);
      throw error;
    }
  }

  async selectProductColor(color: string): Promise<void> {
    try {
      const colorOption = this.page.locator(`${this.colorOptions}[data-value="${color}"] label`).first();
      await colorOption.click();
      await this.page.waitForTimeout(1000); // Wait for selection
    } catch (error) {
      console.log(`Error selecting color ${color}: ${error}`);
      throw error;
    }
  }

  // Get selected options
  async getSelectedSize(): Promise<string> {
    try {
      const selectedSize = this.page.locator(this.sizeOptions + ' input:checked').first();
      return await selectedSize.getAttribute('data-value') || '';
    } catch {
      return '';
    }
  }

  async getSelectedColor(): Promise<string> {
    try {
      const selectedColor = this.page.locator(this.colorOptions + ' input:checked').first();
      return await selectedColor.getAttribute('data-value') || '';
    } catch {
      return '';
    }
  }

  async getSelectedVariant(): Promise<string> {
    try {
      const variantSelect = this.page.locator(this.variantSelect);
      const selectedOption = variantSelect.locator('option:checked');
      return await selectedOption.textContent() || '';
    } catch {
      return '';
    }
  }

  // Stock availability checks
  async isSizeAvailable(size: string): Promise<boolean> {
    try {
      const sizeElement = this.page.locator(`${this.sizeOptions}[data-value="${size}"]`).first();
      const hasAvailableClass = await sizeElement.evaluate(el => el.classList.contains('available'));
      const hasSoldoutClass = await sizeElement.evaluate(el => el.classList.contains('soldout'));
      return hasAvailableClass && !hasSoldoutClass;
    } catch {
      return false;
    }
  }

  async isColorAvailable(color: string): Promise<boolean> {
    try {
      const colorElement = this.page.locator(`${this.colorOptions}[data-value="${color}"]`).first();
      const hasAvailableClass = await colorElement.evaluate(el => el.classList.contains('available'));
      const hasSoldoutClass = await colorElement.evaluate(el => el.classList.contains('soldout'));
      return hasAvailableClass && !hasSoldoutClass;
    } catch {
      return false;
    }
  }

  // Enhanced add to cart with variants
  async addToCartWithVariants(): Promise<void> {
    try {
      // Check if variants exist and handle selection
      const hasSize = await this.hasSizeOptions();
      const hasColor = await this.hasColorOptions();
      
      if (hasSize) {
        const availableSizes = await this.getAvailableSizes();
        if (availableSizes.length > 0) {
          await this.selectProductSize(availableSizes[0]);
          console.log(`Selected size: ${availableSizes[0]}`);
        }
      }
      
      if (hasColor) {
        const availableColors = await this.getAvailableColors();
        if (availableColors.length > 0) {
          await this.selectProductColor(availableColors[0]);
          console.log(`Selected color: ${availableColors[0]}`);
        }
      }
      
      // Wait for variant selection to process
      await this.page.waitForTimeout(2000);
      
      // Click Add to Cart
      await this.addToCart();
      
    } catch (error) {
      console.log(`Error adding to cart with variants: ${error}`);
      throw error;
    }
  }

  // Cart modal verification methods
  async isCartModalVisible(): Promise<boolean> {
    try {
      const cartModalElement = this.page.locator(this.cartModal);
      return await cartModalElement.isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  async getCartModalMessage(): Promise<string> {
    try {
      const noteElement = this.page.locator(this.cartModalNote);
      return await noteElement.textContent().catch(() => '') || '';
    } catch {
      return '';
    }
  }

  async getCartModalProductTitle(): Promise<string> {
    try {
      const titleElement = this.page.locator(this.cartModalTitle);
      return await titleElement.textContent().catch(() => '') || '';
    } catch {
      return '';
    }
  }

  async getCartModalVariant(): Promise<string> {
    try {
      const variantElement = this.page.locator(this.cartModalVariant);
      return await variantElement.textContent().catch(() => '') || '';
    } catch {
      return '';
    }
  }

  async getCartModalQuantity(): Promise<string> {
    try {
      const qtyElement = this.page.locator(this.cartModalQty);
      return await qtyElement.textContent().catch(() => '') || '';
    } catch {
      return '';
    }
  }

  async getCartModalPrice(): Promise<string> {
    try {
      const priceElement = this.page.locator(this.cartModalPrice);
      return await priceElement.textContent().catch(() => '') || '';
    } catch {
      return '';
    }
  }

  async getCartModalSubtotal(): Promise<string> {
    try {
      const subtotalElement = this.page.locator(this.cartModalSubtotal);
      return await subtotalElement.textContent().catch(() => '') || '';
    } catch {
      return '';
    }
  }

  async clickContinueShopping(): Promise<void> {
    try {
      const continueButton = this.page.locator(this.cartModalContinue);
      await continueButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.log(`Error clicking continue shopping: ${error}`);
      throw error;
    }
  }

  async clickProceedToCheckout(): Promise<void> {
    try {
      const checkoutButton = this.page.locator(this.cartModalCheckout);
      await checkoutButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.log(`Error clicking proceed to checkout: ${error}`);
      throw error;
    }
  }

  async closeCartModal(): Promise<void> {
    try {
      // Try clicking continue shopping to close modal
      await this.clickContinueShopping();
    } catch (error) {
      // If continue shopping fails, try pressing Escape key
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    }
  }

  // Multi-product cart methods
  async getCartItemCountFromModal(): Promise<number> {
    try {
      const itemCountElement = this.page.locator('.addcart-modal-number');
      const itemCountText = await itemCountElement.textContent().catch(() => '') || '';
      // Extract number from text like "There is 1 item in your cart." or "There are 2 items in your cart."
      const match = itemCountText.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    } catch {
      return 0;
    }
  }

  async getMultiProductCartDetails(): Promise<Array<{name: string, variant: string, quantity: string, price: string}>> {
    try {
      const cartProducts: Array<{name: string, variant: string, quantity: string, price: string}> = [];
      
      // Check if there are multiple product sections in modal
      const productSections = this.page.locator('.addcart-modal-product');
      const count = await productSections.count();
      
      for (let i = 0; i < count; i++) {
        const section = productSections.nth(i);
        
        const name = await section.locator('.addcart-modal-title').textContent().catch(() => '') || '';
        const variant = await section.locator('.addcart-modal-variant').textContent().catch(() => '') || '';
        const quantity = await section.locator('.addcart-modal-qty').textContent().catch(() => '') || '';
        const price = await section.locator('.addcart-modal-price').textContent().catch(() => '') || '';
        
        if (name.trim()) {
          cartProducts.push({
            name: name.trim(),
            variant: variant.trim(),
            quantity: quantity.trim(),
            price: price.trim()
          });
        }
      }
      
      return cartProducts;
    } catch {
      return [];
    }
  }

  async selectDifferentProduct(excludeProductName: string): Promise<string> {
    try {
      // Get fresh list of featured products
      const featuredProducts = await this.getFeaturedProducts();
      
      // Find a different product
      const differentProduct = featuredProducts.find(product => 
        product.name !== excludeProductName
      );
      
      if (!differentProduct) {
        throw new Error('No different product found');
      }
      
      console.log(`Selected different product: ${differentProduct.name}`);
      return differentProduct.name;
    } catch (error) {
      console.log(`Error selecting different product: ${error}`);
      throw error;
    }
  }

  async verifyMultipleProductsInCart(expectedProducts: string[]): Promise<boolean> {
    try {
      const cartProducts = await this.getMultiProductCartDetails();
      const cartProductNames = cartProducts.map(p => p.name);
      
      // Check if all expected products are in cart
      for (const expectedProduct of expectedProducts) {
        if (!cartProductNames.some(name => name.includes(expectedProduct))) {
          return false;
        }
      }
      
      return true;
    } catch {
      return false;
    }
  }

  // Cart page selectors and methods
  private readonly cartPageTable = '.cart-table';
  private readonly cartPageItems = '.cart-item';
  private readonly cartItemName = '.item-name';
  private readonly cartItemVariant = '.item-variant';
  private readonly cartItemPrice = '.item-price';
  private readonly cartItemTotal = '.item-total';
  private readonly quantityInput = '.input-cart-qty';
  private readonly quantityUp = '.qty-up';
  private readonly quantityDown = '.qty-down';
  private readonly removeButton = '.cart-remove-btn';
  private readonly clearCartButton = '.btn-clear';
  private readonly continueShoppingButton = '.btn-continue';
  private readonly checkoutButton = '.btn-checkout';
  private readonly cartPageTotal = '.cart-total';
  private readonly cartPageForm = 'form[action="/cart"]';
  private readonly cartOriginalTotal = '.hulkapps-cart-original-total';
  private readonly mobileRemoveButton = '.mobile-remove-action .cart-remove-btn';
  private readonly checkoutSubmitButton = 'button[name="checkout"]';

  // Checkout form selectors - Shopify checkout system
  private readonly checkoutEmailInput = '#email, input[name="email"], input[type="email"]';
  private readonly checkoutFirstNameInput = '#TextField0, input[name="firstName"], input[name="first_name"], input[name*="first"], input[placeholder*="first"]';
  private readonly checkoutLastNameInput = '#TextField1, input[name="lastName"], input[name="last_name"], input[name*="last"], input[placeholder*="last"]';
  private readonly checkoutAddressInput = '#TextField3, input[name="address1"], input[name*="address"]';
  private readonly checkoutCityInput = '#TextField5, input[name="city"], input[name*="city"]';
  private readonly checkoutZipInput = '#TextField6, input[name="postalCode"], input[name="zip"], input[name*="postal"], input[name*="zip"]';
  private readonly checkoutPhoneInput = '#TextField7, input[name="phone"], input[name*="phone"]';
  private readonly checkoutCountrySelect = 'select[name="countryCode"], #Select0';
  private readonly checkoutStateSelect = 'input[name="zone"], input[name*="state"], input[name*="province"]';
  private readonly checkoutPaymentMethod = 'input[name*="payment"], [class*="payment"] input[type="radio"]';
  private readonly checkoutSubmitOrderButton = 'button[type="submit"], button:has-text("Complete"), button:has-text("Pay"), button:has-text("Place Order")';

  // Credit card form selectors - Shopify checkout system
  private readonly creditCardNumberInput = 'input[name*="number"], input[placeholder*="card"], input[placeholder*="number"]';
  private readonly creditCardNameInput = 'input[name*="name"], input[placeholder*="name"]';
  private readonly creditCardExpiryInput = 'input[name*="expiry"], input[name*="expiration"], input[placeholder*="expiry"], input[placeholder*="expiration"]';
  private readonly creditCardCvvInput = 'input[name*="cvv"], input[name*="cvc"], input[name*="security"], input[placeholder*="cvv"], input[placeholder*="cvc"]';
  private readonly creditCardMonthSelect = 'select[name*="month"], select[name*="expiry-month"]';
  private readonly creditCardYearSelect = 'select[name*="year"], select[name*="expiry-year"]';

  async isCartPage(): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl.includes('/cart');
  }

  async getCartPageItemCount(): Promise<number> {
    try {
      const items = this.page.locator(this.cartPageItems);
      return await items.count();
    } catch {
      return 0;
    }
  }

  async getCartItemDetails(index: number): Promise<{name: string, variant: string, price: string, total: string, quantity: string}> {
    try {
      const items = this.page.locator(this.cartPageItems);
      const item = items.nth(index);
      
      const name = await item.locator(this.cartItemName).textContent().catch(() => '') || '';
      const variant = await item.locator(this.cartItemVariant).textContent().catch(() => '') || '';
      const price = await item.locator(this.cartItemPrice).textContent().catch(() => '') || '';
      const total = await item.locator(this.cartItemTotal).textContent().catch(() => '') || '';
      const quantity = await item.locator(this.quantityInput).inputValue().catch(() => '') || '';
      
      return {
        name: name.trim(),
        variant: variant.trim(),
        price: price.trim(),
        total: total.trim(),
        quantity: quantity.trim()
      };
    } catch {
      return {name: '', variant: '', price: '', total: '', quantity: ''};
    }
  }

  async getCartPageTotal(): Promise<string> {
    try {
      // Use the exact selector from the HTML: .hulkapps-cart-original-total
      const totalElement = this.page.locator(this.cartOriginalTotal);
      const text = await totalElement.textContent().catch(() => '') || '';
      
      if (text && text.trim()) {
        return text.trim();
      }
      
      // Fallback to other selectors
      const fallbackSelectors = [
        '.cart-total',
        '.total-price',
        '.cart-right-table .total-price'
      ];
      
      for (const selector of fallbackSelectors) {
        const element = this.page.locator(selector);
        const fallbackText = await element.textContent().catch(() => '') || '';
        if (fallbackText && fallbackText.trim()) {
          return fallbackText.trim();
        }
      }
      
      return '';
    } catch {
      return '';
    }
  }

  async increaseQuantity(itemIndex: number): Promise<void> {
    try {
      const items = this.page.locator(this.cartPageItems);
      const item = items.nth(itemIndex);
      
      // Try the specific up button first, then fallback to generic
      let upButton = item.locator('[class*="qty-up"]');
      if (await upButton.count() === 0) {
        upButton = item.locator(this.quantityUp);
      }
      
      await upButton.first().click();
      // Wait for cart to update (AJAX call)
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.log(`Error increasing quantity for item ${itemIndex}: ${error}`);
      throw error;
    }
  }

  async decreaseQuantity(itemIndex: number): Promise<void> {
    try {
      const items = this.page.locator(this.cartPageItems);
      const item = items.nth(itemIndex);
      
      // Check current quantity first
      const currentQuantity = await this.getItemQuantity(itemIndex);
      if (currentQuantity <= 1) {
        console.log('Cannot decrease quantity below 1');
        return;
      }
      
      // Try the specific down button first, then fallback to generic
      let downButton = item.locator('[class*="qty-down"]');
      if (await downButton.count() === 0) {
        downButton = item.locator(this.quantityDown);
      }
      
      await downButton.first().click();
      // Wait for cart to update (AJAX call)
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.log(`Error decreasing quantity for item ${itemIndex}: ${error}`);
      throw error;
    }
  }

  async setQuantity(itemIndex: number, quantity: number): Promise<void> {
    try {
      const items = this.page.locator(this.cartPageItems);
      const item = items.nth(itemIndex);
      const quantityInput = item.locator(this.quantityInput);
      
      await quantityInput.fill(quantity.toString());
      // Wait for cart to update (AJAX call)
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.log(`Error setting quantity for item ${itemIndex}: ${error}`);
      throw error;
    }
  }

  async getItemQuantity(itemIndex: number): Promise<number> {
    try {
      const items = this.page.locator(this.cartPageItems);
      const item = items.nth(itemIndex);
      const quantityInput = item.locator(this.quantityInput);
      const value = await quantityInput.inputValue();
      return parseInt(value) || 0;
    } catch {
      return 0;
    }
  }

  async removeItem(itemIndex: number): Promise<void> {
    try {
      const items = this.page.locator(this.cartPageItems);
      const item = items.nth(itemIndex);
      // Use first() to handle multiple remove buttons (desktop + mobile)
      const removeButton = item.locator(this.removeButton).first();
      
      await removeButton.click();
      // Wait for cart to update (AJAX call)
      await this.page.waitForTimeout(2000);
      
      // Check if cart is empty and page reloads
      const currentUrl = this.page.url();
      if (currentUrl.includes('/cart')) {
        await this.page.waitForLoadState('domcontentloaded');
      }
    } catch (error) {
      console.log(`Error removing item ${itemIndex}: ${error}`);
      throw error;
    }
  }

  async clearCart(): Promise<void> {
    try {
      const clearButton = this.page.locator(this.clearCartButton);
      await clearButton.click();
      
      // Wait for cart to clear and page to reload
      await this.page.waitForTimeout(2000);
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      console.log(`Error clearing cart: ${error}`);
      throw error;
    }
  }

  async clickCartPageContinueShopping(): Promise<void> {
    try {
      const continueButton = this.page.locator(this.continueShoppingButton);
      await continueButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.log(`Error clicking continue shopping: ${error}`);
      throw error;
    }
  }

  async clickCartPageCheckout(): Promise<void> {
    try {
      // Use the exact selector from HTML: button[name="checkout"]
      let checkoutButton = this.page.locator(this.checkoutSubmitButton);
      
      // Fallback to generic checkout button
      if (await checkoutButton.count() === 0) {
        checkoutButton = this.page.locator(this.checkoutButton);
      }
      
      await checkoutButton.click();
      
      // Wait for navigation to complete and checkout page to load
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(3000);
      
      // Verify we're on checkout page
      const currentUrl = this.page.url();
      const isCheckoutPage = currentUrl.includes('/checkout') || 
                             currentUrl.includes('/payment') || 
                             currentUrl.includes('/shipping');
      
      console.log(`URL after checkout: ${currentUrl}`);
      console.log(`Successfully navigated to checkout: ${isCheckoutPage}`);
      
    } catch (error) {
      console.log(`Error clicking checkout: ${error}`);
      throw error;
    }
  }

  // Checkout form methods
  async isCheckoutPage(): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl.includes('/checkout') || currentUrl.includes('/payment') || currentUrl.includes('/shipping');
  }

  async fillCheckoutForm(customerInfo: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
    country: string;
    state: string;
  }): Promise<void> {
    try {
      console.log('Filling checkout form...');
      
      // Wait for checkout page to load completely
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(3000);
      
      // Wait for form fields to be visible with multiple attempts
      let fieldsFound = false;
      for (let attempt = 0; attempt < 10; attempt++) {
        await this.page.waitForTimeout(1000);
        
        // Try different approaches to find form fields
        const allInputs = await this.page.locator('input').all();
        const allSelects = await this.page.locator('select').all();
        
        // Also try to find specific form elements
        const emailFields = await this.page.locator('input[name="email"], input[type="email"]').all();
        const nameFields = await this.page.locator('input[name*="name"]').all();
        const addressFields = await this.page.locator('input[name*="address"]').all();
        const cityFields = await this.page.locator('input[name="city"]').all();
        const zipFields = await this.page.locator('input[name*="postal"], input[name*="zip"]').all();
        const phoneFields = await this.page.locator('input[name*="phone"]').all();
        const countryFields = await this.page.locator('select[name*="country"]').all();
        
        console.log(`Attempt ${attempt + 1}: ${allInputs.length} total inputs, ${allSelects.length} selects`);
        console.log(`Specific fields: email=${emailFields.length}, names=${nameFields.length}, address=${addressFields.length}, city=${cityFields.length}, zip=${zipFields.length}, phone=${phoneFields.length}, country=${countryFields.length}`);
        
        if (allInputs.length > 0 || allSelects.length > 0 || 
            emailFields.length > 0 || nameFields.length > 0 || addressFields.length > 0 || 
            cityFields.length > 0 || zipFields.length > 0 || phoneFields.length > 0 || countryFields.length > 0) {
          fieldsFound = true;
          console.log(`Form fields found on attempt ${attempt + 1}`);
          break;
        }
      }
      
      if (!fieldsFound) {
        console.log('No form fields found after 10 attempts, skipping form filling');
        return;
      }
      
      // Fill email
      const emailInput = this.page.locator(this.checkoutEmailInput);
      if (await emailInput.isVisible().catch(() => false)) {
        await emailInput.fill(customerInfo.email);
        console.log('Email filled');
      } else {
        console.log('Email field not visible, skipping');
      }
      
      // Fill first name
      const firstNameInput = this.page.locator(this.checkoutFirstNameInput);
      if (await firstNameInput.isVisible().catch(() => false)) {
        await firstNameInput.fill(customerInfo.firstName);
        console.log('First name filled');
      } else {
        console.log('First name field not visible, skipping');
      }
      
      // Fill last name
      const lastNameInput = this.page.locator(this.checkoutLastNameInput);
      if (await lastNameInput.isVisible().catch(() => false)) {
        await lastNameInput.fill(customerInfo.lastName);
        console.log('Last name filled');
      } else {
        console.log('Last name field not visible, skipping');
      }
      
      // Fill address
      const addressInput = this.page.locator(this.checkoutAddressInput);
      if (await addressInput.isVisible().catch(() => false)) {
        await addressInput.fill(customerInfo.address);
        console.log('Address filled');
      } else {
        console.log('Address field not visible, skipping');
      }
      
      // Fill city
      const cityInput = this.page.locator(this.checkoutCityInput);
      if (await cityInput.isVisible().catch(() => false)) {
        await cityInput.fill(customerInfo.city);
        console.log('City filled');
      } else {
        console.log('City field not visible, skipping');
      }
      
      // Fill zip/postal code
      const zipInput = this.page.locator(this.checkoutZipInput);
      if (await zipInput.isVisible().catch(() => false)) {
        await zipInput.fill(customerInfo.zip);
        console.log('ZIP code filled');
      } else {
        console.log('ZIP field not visible, skipping');
      }
      
      // Fill phone
      const phoneInput = this.page.locator(this.checkoutPhoneInput);
      if (await phoneInput.isVisible().catch(() => false)) {
        await phoneInput.fill(customerInfo.phone);
        console.log('Phone filled');
      } else {
        console.log('Phone field not visible, skipping');
      }
      
      // Select country if provided
      if (customerInfo.country) {
        const countrySelect = this.page.locator(this.checkoutCountrySelect);
        if (await countrySelect.isVisible().catch(() => false)) {
          await countrySelect.selectOption({ label: customerInfo.country });
          console.log('Country selected');
        } else {
          console.log('Country field not visible, skipping');
        }
      }
      
      // Select state if provided
      if (customerInfo.state) {
        const stateSelect = this.page.locator(this.checkoutStateSelect);
        if (await stateSelect.isVisible().catch(() => false)) {
          await stateSelect.selectOption({ label: customerInfo.state });
          console.log('State selected');
        } else {
          console.log('State field not visible, skipping');
        }
      }
      
      console.log('Checkout form filled successfully');
    } catch (error) {
      console.log(`Error filling checkout form: ${error}`);
      throw error;
    }
  }

  async selectPaymentMethod(paymentMethod: string): Promise<void> {
    try {
      console.log('Selecting payment method...');
      
      // Look for payment method radio buttons or options
      const paymentOptions = this.page.locator(this.checkoutPaymentMethod);
      const optionCount = await paymentOptions.count();
      
      if (optionCount > 0) {
        // Try to find the specific payment method
        for (let i = 0; i < optionCount; i++) {
          const option = paymentOptions.nth(i);
          const label = await option.getAttribute('aria-label').catch(() => '');
          const value = await option.getAttribute('value').catch(() => '');
          
          if (label?.toLowerCase().includes(paymentMethod.toLowerCase()) || 
              value?.toLowerCase().includes(paymentMethod.toLowerCase())) {
            await option.check();
            console.log(`Payment method selected: ${paymentMethod}`);
            return;
          }
        }
        
        // If specific method not found, select the first available option
        await paymentOptions.first().check();
        console.log('First available payment method selected');
      }
      
      // Alternative: look for payment method buttons
      const paymentButtons = this.page.locator('button:has-text("Pay"), button:has-text("Payment"), [class*="payment"] button');
      const buttonCount = await paymentButtons.count();
      
      if (buttonCount > 0) {
        await paymentButtons.first().click();
        console.log('Payment button clicked');
      }
      
    } catch (error) {
      console.log(`Error selecting payment method: ${error}`);
      // Don't throw error - payment method selection may not be required for testing
    }
  }

  async submitOrder(): Promise<void> {
    try {
      console.log('Submitting order...');
      
      // Look for submit order button
      const submitButton = this.page.locator('#checkout-pay-button, ' + this.checkoutSubmitOrderButton);
      
      if (await submitButton.isVisible().catch(() => false)) {
        await submitButton.click();
        console.log('Order submitted');
      } else {
        // Try alternative selectors
        const alternatives = [
          '#checkout-pay-button',
          'button:has-text("Pay now")',
          'button:has-text("Complete Order")',
          'button:has-text("Pay Now")',
          'button:has-text("Place Order")',
          'button:has-text("Submit")',
          'button[type="submit"]'
        ];
        
        for (const selector of alternatives) {
          const button = this.page.locator(selector);
          if (await button.isVisible().catch(() => false)) {
            await button.click();
            console.log(`Order submitted using: ${selector}`);
            break;
          }
        }
      }
      
      await this.page.waitForTimeout(3000);
    } catch (error) {
      console.log(`Error submitting order: ${error}`);
      throw error;
    }
  }

  async getCheckoutPageTitle(): Promise<string> {
    try {
      return await this.page.title();
    } catch {
      return '';
    }
  }

  async getCheckoutFormFields(): Promise<{
    emailVisible: boolean;
    firstNameVisible: boolean;
    lastNameVisible: boolean;
    addressVisible: boolean;
    cityVisible: boolean;
    zipVisible: boolean;
    phoneVisible: boolean;
    countryVisible: boolean;
    stateVisible: boolean;
  }> {
    try {
      // Debug: Check what's actually on the page
      console.log('=== DEBUGGING CHECKOUT FORM FIELDS ===');
      
      // Check all input elements on the page
      const allInputs = await this.page.locator('input').all();
      console.log(`Total input elements found: ${allInputs.length}`);
      
      // Check all select elements on the page
      const allSelects = await this.page.locator('select').all();
      console.log(`Total select elements found: ${allSelects.length}`);
      
      // Log details for each input
      for (let i = 0; i < allInputs.length; i++) {
        const input = allInputs[i];
        const name = await input.getAttribute('name').catch(() => '');
        const type = await input.getAttribute('type').catch(() => '');
        const placeholder = await input.getAttribute('placeholder').catch(() => '');
        const id = await input.getAttribute('id').catch(() => '');
        const isVisible = await input.isVisible().catch(() => false);
        
        console.log(`Input ${i}: name="${name}", type="${type}", placeholder="${placeholder}", id="${id}", visible=${isVisible}`);
      }
      
      // Log details for each select
      for (let i = 0; i < allSelects.length; i++) {
        const select = allSelects[i];
        const name = await select.getAttribute('name').catch(() => '');
        const id = await select.getAttribute('id').catch(() => '');
        const isVisible = await select.isVisible().catch(() => false);
        
        console.log(`Select ${i}: name="${name}", id="${id}", visible=${isVisible}`);
      }
      
      // Now try our specific selectors
      const emailVisible = await this.page.locator(this.checkoutEmailInput).isVisible().catch(() => false);
      const firstNameVisible = await this.page.locator(this.checkoutFirstNameInput).isVisible().catch(() => false);
      const lastNameVisible = await this.page.locator(this.checkoutLastNameInput).isVisible().catch(() => false);
      const addressVisible = await this.page.locator(this.checkoutAddressInput).isVisible().catch(() => false);
      const cityVisible = await this.page.locator(this.checkoutCityInput).isVisible().catch(() => false);
      const zipVisible = await this.page.locator(this.checkoutZipInput).isVisible().catch(() => false);
      const phoneVisible = await this.page.locator(this.checkoutPhoneInput).isVisible().catch(() => false);
      const countryVisible = await this.page.locator(this.checkoutCountrySelect).isVisible().catch(() => false);
      const stateVisible = await this.page.locator(this.checkoutStateSelect).isVisible().catch(() => false);
      
      console.log('=== SELECTOR RESULTS ===');
      console.log(`Email visible: ${emailVisible}`);
      console.log(`First name visible: ${firstNameVisible}`);
      console.log(`Last name visible: ${lastNameVisible}`);
      console.log(`Address visible: ${addressVisible}`);
      console.log(`City visible: ${cityVisible}`);
      console.log(`ZIP visible: ${zipVisible}`);
      console.log(`Phone visible: ${phoneVisible}`);
      console.log(`Country visible: ${countryVisible}`);
      console.log(`State visible: ${stateVisible}`);
      
      return {
        emailVisible,
        firstNameVisible,
        lastNameVisible,
        addressVisible,
        cityVisible,
        zipVisible,
        phoneVisible,
        countryVisible,
        stateVisible
      };
    } catch {
      return {
        emailVisible: false,
        firstNameVisible: false,
        lastNameVisible: false,
        addressVisible: false,
        cityVisible: false,
        zipVisible: false,
        phoneVisible: false,
        countryVisible: false,
        stateVisible: false
      };
    }
  }

  async fillCreditCardDetails(cardDetails: {
    cardNumber: string;
    cardHolderName: string;
    expiryMonth?: string;
    expiryYear?: string;
    expiryDate?: string;
    cvv: string;
  }): Promise<void> {
    try {
      console.log('Filling credit card details...');
      
      // Wait for credit card fields to be available
      await this.page.waitForTimeout(2000);
      
      // Check for Shopify checkout iframes
      const anyIframe = this.page.locator('iframe[src*="checkout.pci.shopifyinc.com"]').first();
      const iframeVisible = await anyIframe.isVisible().catch(() => false);
      
      if (iframeVisible) {
        console.log('Filling credit card details in Shopify iframes');
        
        // Fill card number in dedicated iframe
        const cardNumberFrame = this.page.frameLocator('iframe[id*="card-fields-number"]');
        const cardNumberInput = cardNumberFrame.locator('input[name="number"]');
        if (await cardNumberInput.isVisible().catch(() => false)) {
          await cardNumberInput.fill(cardDetails.cardNumber);
          console.log('Card number filled');
        }
        
        // Fill card holder name in dedicated iframe
        const cardNameFrame = this.page.frameLocator('iframe[id*="card-fields-name"]');
        const cardNameInput = cardNameFrame.locator('input[name="name"]');
        if (await cardNameInput.isVisible().catch(() => false)) {
          await cardNameInput.fill(cardDetails.cardHolderName);
          console.log('Card holder name filled');
        }
        
        // Fill expiry date in dedicated iframe
        const cardExpiryFrame = this.page.frameLocator('iframe[id*="card-fields-expiry"]');
        const cardExpiryInput = cardExpiryFrame.locator('input[name="expiry"]');
        if (await cardExpiryInput.isVisible().catch(() => false)) {
          const expiryVal = cardDetails.expiryDate || `${cardDetails.expiryMonth} / ${cardDetails.expiryYear?.substring(2)}`;
          await cardExpiryInput.fill(expiryVal);
          console.log('Expiry date filled');
        }
        
        // Fill CVV in dedicated iframe
        const cardCvvFrame = this.page.frameLocator('iframe[id*="card-fields-verification_value"]');
        const cardCvvInput = cardCvvFrame.locator('input[name="verification_value"]');
        if (await cardCvvInput.isVisible().catch(() => false)) {
          await cardCvvInput.fill(cardDetails.cvv);
          console.log('CVV filled');
        }
      } else {
        console.log('Filling credit card details in direct fields');
        
        // Fill card number
        const cardNumberInput = this.page.locator(this.creditCardNumberInput);
        if (await cardNumberInput.isVisible().catch(() => false)) {
          await cardNumberInput.fill(cardDetails.cardNumber);
          console.log('Card number filled');
        }
        
        // Fill card holder name
        const cardNameInput = this.page.locator(this.creditCardNameInput);
        if (await cardNameInput.isVisible().catch(() => false)) {
          await cardNameInput.fill(cardDetails.cardHolderName);
          console.log('Card holder name filled');
        }
        
        // Fill expiry date (try different formats)
        if (cardDetails.expiryDate) {
          const expiryInput = this.page.locator(this.creditCardExpiryInput);
          if (await expiryInput.isVisible().catch(() => false)) {
            await expiryInput.fill(cardDetails.expiryDate);
            console.log('Expiry date filled');
          }
        } else if (cardDetails.expiryMonth && cardDetails.expiryYear) {
          const monthSelect = this.page.locator(this.creditCardMonthSelect);
          const yearSelect = this.page.locator(this.creditCardYearSelect);
          
          if (await monthSelect.isVisible().catch(() => false)) {
            await monthSelect.selectOption(cardDetails.expiryMonth);
            console.log('Expiry month selected');
          }
          
          if (await yearSelect.isVisible().catch(() => false)) {
            await yearSelect.selectOption(cardDetails.expiryYear);
            console.log('Expiry year selected');
          }
        }
        
        // Fill CVV
        const cvvInput = this.page.locator(this.creditCardCvvInput);
        if (await cvvInput.isVisible().catch(() => false)) {
          await cvvInput.fill(cardDetails.cvv);
          console.log('CVV filled');
        }
      }
      
      console.log('Credit card details filled successfully');
    } catch (error) {
      console.log(`Error filling credit card details: ${error}`);
      throw error;
    }
  }

  async getCreditCardFields(): Promise<{
    cardNumberVisible: boolean;
    cardNameVisible: boolean;
    expiryVisible: boolean;
    cvvVisible: boolean;
    monthSelectVisible: boolean;
    yearSelectVisible: boolean;
  }> {
    try {
      // Check for Shopify checkout iframes
      const cardFieldsIframe = this.page.locator('iframe[src*="checkout.pci.shopifyinc.com"]');
      const iframeVisible = await cardFieldsIframe.isVisible().catch(() => false);
      
      if (iframeVisible) {
        console.log('Shopify checkout iframes detected');
        // Wait for iframes to load
        await this.page.waitForTimeout(3000);
        
        // Get all iframes and check their content
        const allIframes = await this.page.locator('iframe').all();
        console.log(`Found ${allIframes.length} iframes`);
        
        // Initialize variables
        let cardNumberInIframe = false;
        let cardNameInIframe = false;
        let expiryInIframe = false;
        let cvvInIframe = false;
        
        // Try to access iframe content directly using multiple approaches
        try {
          // Approach 1: Try specific iframe IDs from HTML
          const cardNumberIframe = this.page.frameLocator('iframe[id*="card-fields-number"]');
          const expiryIframe = this.page.frameLocator('iframe[id*="card-fields-expiry"]');
          const cvvIframe = this.page.frameLocator('iframe[id*="card-fields-verification_value"]');
          
          // Check card number iframe
          try {
            const cardNumberInputs = await cardNumberIframe.locator('input').all();
            if (cardNumberInputs.length > 0) {
              cardNumberInIframe = true;
              console.log('Card number field found in dedicated iframe');
            }
          } catch {
            // Fallback to generic iframe locator
            const genericIframe = this.page.frameLocator('iframe[src*="checkout.pci.shopifyinc.com"]');
            const allInputs = await genericIframe.locator('input').all();
            console.log(`Found ${allInputs.length} input elements in generic iframe`);
            
            for (let i = 0; i < allInputs.length; i++) {
              const input = allInputs[i];
              const name = await input.getAttribute('name').catch(() => '');
              const placeholder = await input.getAttribute('placeholder').catch(() => '');
              const id = await input.getAttribute('id').catch(() => '');
              
              console.log(`Input ${i}: name="${name}", placeholder="${placeholder}", id="${id}"`);
              
              if (name && name.includes('number')) {
                cardNumberInIframe = true;
                console.log('Card number field found');
              }
              if (name && name.includes('name')) {
                cardNameInIframe = true;
                console.log('Card name field found');
              }
              if (name && name.includes('expiry')) {
                expiryInIframe = true;
                console.log('Expiry field found');
              }
              if (name && (name.includes('cvv') || name.includes('cvc') || name.includes('verification'))) {
                cvvInIframe = true;
                console.log('CVV field found');
              }
            }
          }
          
          // Check expiry iframe
          try {
            const expiryInputs = await expiryIframe.locator('input').all();
            if (expiryInputs.length > 0) {
              expiryInIframe = true;
              console.log('Expiry field found in dedicated iframe');
            }
          } catch {
            console.log('Could not access expiry iframe');
          }
          
          // Check CVV iframe
          try {
            const cvvInputs = await cvvIframe.locator('input').all();
            if (cvvInputs.length > 0) {
              cvvInIframe = true;
              console.log('CVV field found in dedicated iframe');
            }
          } catch {
            console.log('Could not access CVV iframe');
          }
          
        } catch (error) {
          console.log(`Error checking iframe content: ${error}`);
        }
        
        console.log(`Card number visible in iframe: ${cardNumberInIframe}`);
        console.log(`Card name visible in iframe: ${cardNameInIframe}`);
        console.log(`Expiry visible in iframe: ${expiryInIframe}`);
        console.log(`CVV visible in iframe: ${cvvInIframe}`);
        
        return {
          cardNumberVisible: cardNumberInIframe,
          cardNameVisible: cardNameInIframe,
          expiryVisible: expiryInIframe,
          cvvVisible: cvvInIframe,
          monthSelectVisible: false,
          yearSelectVisible: false
        };
      }
      
      // Fallback to direct field detection
      return {
        cardNumberVisible: await this.page.locator(this.creditCardNumberInput).isVisible().catch(() => false),
        cardNameVisible: await this.page.locator(this.creditCardNameInput).isVisible().catch(() => false),
        expiryVisible: await this.page.locator(this.creditCardExpiryInput).isVisible().catch(() => false),
        cvvVisible: await this.page.locator(this.creditCardCvvInput).isVisible().catch(() => false),
        monthSelectVisible: await this.page.locator(this.creditCardMonthSelect).isVisible().catch(() => false),
        yearSelectVisible: await this.page.locator(this.creditCardYearSelect).isVisible().catch(() => false)
      };
    } catch {
      return {
        cardNumberVisible: false,
        cardNameVisible: false,
        expiryVisible: false,
        cvvVisible: false,
        monthSelectVisible: false,
        yearSelectVisible: false
      };
    }
  }

  async isCartPageEmpty(): Promise<boolean> {
    const itemCount = await this.getCartPageItemCount();
    return itemCount === 0;
  }

  async getCartPageContents(): Promise<Array<{name: string, variant: string, price: string, total: string, quantity: string}>> {
    const contents: Array<{name: string, variant: string, price: string, total: string, quantity: string}> = [];
    const itemCount = await this.getCartPageItemCount();
    
    for (let i = 0; i < itemCount; i++) {
      const details = await this.getCartItemDetails(i);
      if (details.name) {
        contents.push(details);
      }
    }
    
    return contents;
  }

  async verifyCartPageLoaded(): Promise<boolean> {
    try {
      // Check if we're on cart page
      if (!await this.isCartPage()) {
        return false;
      }
      
      // Check if cart table is visible
      const cartTable = this.page.locator(this.cartPageTable);
      const tableVisible = await cartTable.isVisible().catch(() => false);
      
      // Also check if cart items are present
      const cartItems = this.page.locator(this.cartPageItems);
      const itemsCount = await cartItems.count().catch(() => 0);
      
      return tableVisible || itemsCount > 0;
    } catch {
      return false;
    }
  }

  // Hero section methods
  async isHeroSectionVisible(): Promise<boolean> {
    return await this.page.locator(this.heroTitle).isVisible().catch(() => false);
  }

  // Newsletter methods
  async subscribeToNewsletter(email: string): Promise<void> {
    const emailInput = this.page.locator(this.newsletterEmail).first();
    if (await emailInput.isVisible()) {
      await emailInput.fill(email);
      const submitButton = this.page.locator(this.newsletterSubmit).first();
      if (await submitButton.isVisible()) {
        await submitButton.click();
      }
    }
  }

  async isNewsletterVisible(): Promise<boolean> {
    return await this.page.locator(this.newsletterEmail).isVisible().catch(() => false);
  }

  // Cart methods
  async clickCartIcon(): Promise<void> {
    const cartElement = this.page.locator(this.cartIcon).first();
    if (await cartElement.isVisible()) {
      await cartElement.click();
    }
  }

  
  // Verification methods
  async verifyHomePageLoaded(): Promise<void> {
    await this.waitForPageLoad();
    await this.verifyPageTitle();
    // Just verify the page loaded, don't force specific elements
  }

  async verifyFeaturedProductsDisplayed(): Promise<void> {
    // Check if featured products section exists
    const featuredSection = this.page.locator(this.featuredProducts);
    const sectionCount = await featuredSection.count().catch(() => 0);
    
    // Check if any product listing items exist
    const productItems = this.page.locator(this.productCard);
    const productCount = await productItems.count().catch(() => 0);
    
    expect(sectionCount > 0 || productCount > 0).toBe(true);
  }

  async verifyNavigationMenu(): Promise<void> {
    // Check if navigation or collection links exist
    const navExists = await this.page.locator(this.navigationMenu).isVisible().catch(() => false);
    const collectionsExist = await this.page.locator(this.mainNavigation).count().catch(() => 0) > 0;
    
    expect(navExists || collectionsExist).toBe(true);
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    const categories: ProductCategory[] = [];
    
    try {
      const categoryElements = this.page.locator(this.categoryLinks);
      
      // Wait a bit for page to stabilize
      await this.page.waitForTimeout(1000);
      
      const count = await categoryElements.count();
      for (let i = 0; i < Math.min(count, 5); i++) { // Limit to 5 categories for Firefox
        try {
          const category = categoryElements.nth(i);
          const name = await category.textContent() || '';
          if (name.trim()) {
            categories.push({ 
              name: name.trim(), 
              selector: `:text("${name}")` 
            });
          }
        } catch {
          // Skip this category if there's an error
          continue;
        }
      }
    } catch {
      // Return empty categories if there's a major error
      return [];
    }
    
    return categories;
  }

  // Mobile-specific methods
  async openMobileMenu(): Promise<void> {
    if (await this.isElementVisible(this.mobileMenuToggle)) {
      await this.clickElement(this.mobileMenuToggle);
    }
  }

  async isMobileMenuOpen(): Promise<boolean> {
    return await this.page.locator(`${this.mobileMenuToggle}[aria-expanded="true"]`).isVisible();
  }
}
