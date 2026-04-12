import { test } from '@playwright/test';

test('Analyze ALL products for missing images and zero prices', async ({ page }) => {
  console.log('=== ANALYZING ALL 727 PRODUCTS ===');
  
  // Navigate to collections page
  await page.goto('https://ozcampingwarehouse.com/collections/all');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(5000); // Longer wait for dynamic content
  
  let productsWithMissingImages = 0;
  let productsWithZeroPrice = 0;
  let totalAnalyzed = 0;
  let meg050Found = false;
  
  // Handle pagination to check ALL products without skipping
  let currentPage = 1;
  const maxPages = 50; // Safety limit
  const allProductUrls = new Set<string>();
  
  while (currentPage <= maxPages) {
    console.log(`\n=== PAGE ${currentPage} ===`);
    
    // Wait for page to stabilize
    await page.waitForTimeout(2000);
    
    // Get all products on current page
    const products = page.locator('.product-grid-item');
    const productCount = await products.count();
    console.log(`Found ${productCount} products on page ${currentPage}`);
    
    // Analyze all products on this page
    for (let i = 0; i < productCount; i++) {
      const product = products.nth(i);
      
      try {
        // Get product URL to avoid duplicates
        const linkElement = product.locator('a').first();
        const href = await linkElement.getAttribute('href') || '';
        let productName = href.split('/').pop()?.replace(/-/g, ' ') || `Product ${totalAnalyzed + 1}`;
        
        // Skip if already analyzed (avoid duplicates across pages)
        if (allProductUrls.has(href)) {
          console.log(`Skipping duplicate: ${productName}`);
          continue;
        }
        allProductUrls.add(href);
        
        // OPTIMAL IMAGE DETECTION TECHNIQUE
        let hasImage = false;
        
        // Method 1: Check all img elements comprehensively
        const allImages = product.locator('img');
        const imageCount = await allImages.count();
        
        for (let imgIndex = 0; imgIndex < imageCount; imgIndex++) {
          const img = allImages.nth(imgIndex);
          const src = await img.getAttribute('src') || '';
          const dataSrc = await img.getAttribute('data-src') || '';
          const srcset = await img.getAttribute('srcset') || '';
          
          // Check if any attribute has valid image source
          const validSrc = src && src.trim() !== '' && !src.includes('placeholder') && !src.includes('data:image');
          const validDataSrc = dataSrc && dataSrc.trim() !== '' && !dataSrc.includes('placeholder');
          const validSrcset = srcset && srcset.trim() !== '';
          
          if (validSrc || validDataSrc || validSrcset) {
            hasImage = true;
            break;
          }
        }
        
        // Method 2: Check HTML content for image references if Method 1 fails
        if (!hasImage) {
          const productHtml = await product.innerHTML();
          const imageRefs = productHtml.match(/src="[^"]*\.(jpg|jpeg|png|gif|webp)"/gi) || [];
          const dataSrcRefs = productHtml.match(/data-src="[^"]*\.(jpg|jpeg|png|gif|webp)"/gi) || [];
          const srcsetRefs = productHtml.match(/srcset="[^"]*\.(jpg|jpeg|png|gif|webp)"/gi) || [];
          
          if (imageRefs.length > 0 || dataSrcRefs.length > 0 || srcsetRefs.length > 0) {
            hasImage = true;
          }
        }
        
        // Get price
        const textContent = await product.textContent() || '';
        const priceMatches = textContent.match(/Rs[\d,]+\.?\d*/g) || [];
        const price = priceMatches.length > 0 ? priceMatches[0] : 'NO PRICE';
        
        // Check for zero price
        const isZeroPrice = !price || price === 'Rs0' || price === 'Rs0.00' || price.includes('Rs0');
        
        // Special check for meg050
        if (productName.toLowerCase().includes('meg050')) {
          meg050Found = true;
          console.log(`MEG050: Image="${hasImage ? 'YES' : 'NO'}", Price="${price}"`);
        }
        
        // Log results
        const imageStatus = hasImage ? 'YES' : 'MISSING';
        const priceStatus = isZeroPrice ? 'ZERO' : 'VALID';
        
        console.log(`${totalAnalyzed + 1}. ${productName}`);
        console.log(`    Image: ${imageStatus}`);
        console.log(`    Price: ${priceStatus} (${price})`);
        
        if (!hasImage) productsWithMissingImages++;
        if (isZeroPrice) productsWithZeroPrice++;
        totalAnalyzed++;
        
      } catch (error) {
        console.log(`Error analyzing product: ${error}`);
      }
    }
    
    // Try to find and click Next button
    const nextButton = page.locator('a:has-text("Next"), button:has-text("Next"), .pagination a[rel="next"]');
    const nextButtonExists = await nextButton.count() > 0;
    
    if (nextButtonExists) {
      console.log('Found Next button - clicking to load more products');
      await nextButton.first().click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(3000);
      currentPage++;
    } else {
      console.log('No Next button found - reached end of products');
      break;
    }
  }
  
  // Final summary
  console.log('\n=== FINAL SUMMARY ===');
  console.log(`Total products analyzed: ${totalAnalyzed}`);
  console.log(`Products with missing images: ${productsWithMissingImages}`);
  console.log(`Products with zero prices: ${productsWithZeroPrice}`);
  console.log(`MEG050 found: ${meg050Found ? 'YES' : 'NO'}`);
  console.log(`Pages analyzed: ${currentPage}`);
  
  if (productsWithMissingImages > 0) {
    console.log(`MISSING IMAGES: ${productsWithMissingImages} products`);
  }
  
  if (productsWithZeroPrice > 0) {
    console.log(`ZERO PRICES: ${productsWithZeroPrice} products`);
  }
  
  if (productsWithMissingImages === 0 && productsWithZeroPrice === 0) {
    console.log('All analyzed products have images and valid prices');
  }
  
  console.log('\n=== ANALYSIS COMPLETE ===');
});
