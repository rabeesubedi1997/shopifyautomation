# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke\collections-all-products.spec.ts >> Analyze ALL 727 products for missing images and zero prices
- Location: tests\smoke\collections-all-products.spec.ts:3:5

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('a:has-text("Next"), button:has-text("Next"), .pagination a[rel="next"]').first()
    - locator resolved to <a itemprop="item" href="/collections/vendors?q=NEXTORCH">…</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    28 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e10]:
          - list [ref=e12]:
            - listitem [ref=e13] [cursor=pointer]:
              - img "phone" [ref=e14]
              - generic [ref=e16]: 03 9101 9843
            - listitem [ref=e17] [cursor=pointer]:
              - img "mail-1" [ref=e18]
              - generic [ref=e20]: hello@ozcampingwarehouse.com
          - list [ref=e22]:
            - listitem [ref=e23] [cursor=pointer]:
              - link "electro-user-icon Register" [ref=e24]:
                - /url: https://shopify.com/61306241250/account?locale=en&region_country=NP
                - img "electro-user-icon" [ref=e25]
                - text: Register
              - generic [ref=e27]: or
              - link "Sign in" [ref=e28]:
                - /url: https://ozcampingwarehouse.com/customer_authentication/redirect?locale=en&region_country=NP
        - generic [ref=e31]:
          - link "OzCampingWarehouse" [ref=e33] [cursor=pointer]:
            - /url: /
            - img "OzCampingWarehouse" [ref=e34]
          - generic [ref=e36]:
            - textbox "Search" [ref=e37]
            - button "electro-search-icon" [ref=e38] [cursor=pointer]:
              - img "electro-search-icon" [ref=e40]
          - list [ref=e43]:
            - listitem [ref=e44] [cursor=pointer]:
              - link "0" [ref=e45]:
                - /url: javascript:;
                - img [ref=e46]
                - generic [ref=e48]: "0"
            - listitem [ref=e49] [cursor=pointer]:
              - link "electro-cart-icon 0 Rs0.00" [ref=e51]:
                - /url: javascript:void(0)
                - img "electro-cart-icon" [ref=e52]
                - generic [ref=e54]:
                  - generic [ref=e55]: "0"
                  - text: Rs0.00
        - generic [ref=e58]:
          - generic [ref=e62] [cursor=pointer]:
            - img [ref=e63]
            - generic [ref=e65]: All Departments
          - generic [ref=e66]:
            - navigation [ref=e69]:
              - list [ref=e71]:
                - listitem [ref=e72]:
                  - link "Home" [ref=e73] [cursor=pointer]:
                    - /url: /
                - listitem [ref=e74]:
                  - link "Shop All" [ref=e75] [cursor=pointer]:
                    - /url: https://ozcampingwarehouse.com/collections/all?sort_by=created-descending
                - listitem [ref=e76]:
                  - link "Contact Us" [ref=e77] [cursor=pointer]:
                    - /url: /pages/contact
                - listitem [ref=e78]:
                  - link "Brands" [ref=e79] [cursor=pointer]:
                    - /url: /pages/brands
                - listitem [ref=e80]:
                  - generic [ref=e81]:
                    - link "Gift Cards" [ref=e82] [cursor=pointer]:
                      - /url: /products/ozcamping-warehouse-gift-card
                    - img [ref=e84] [cursor=pointer]
            - generic [ref=e86]: Australian Family Owned & Operated
    - generic [ref=e90]:
      - list [ref=e93]:
        - listitem [ref=e94]:
          - link "Home" [ref=e95] [cursor=pointer]:
            - /url: /
        - listitem [ref=e96]: NEXTORCH
      - generic [ref=e99]:
        - generic [ref=e100]:
          - generic [ref=e102]:
            - heading "Categories" [level=5] [ref=e103]
            - list [ref=e104]:
              - listitem [ref=e105]:
                - link "GEAR" [ref=e106] [cursor=pointer]:
                  - /url: /collections/gear
                - img [ref=e108] [cursor=pointer]
              - listitem [ref=e110]:
                - link "CLOTHING" [ref=e111] [cursor=pointer]:
                  - /url: /collections/clothing
                - img [ref=e113] [cursor=pointer]
              - listitem [ref=e115]:
                - link "FOOTWEAR" [ref=e116] [cursor=pointer]:
                  - /url: /collections/footwear
                - img [ref=e118] [cursor=pointer]
              - listitem [ref=e120]:
                - link "ACTIVITY" [ref=e121] [cursor=pointer]:
                  - /url: /collections/activity
                - img [ref=e123] [cursor=pointer]
              - listitem [ref=e125]:
                - link "BRANDS" [ref=e126] [cursor=pointer]:
                  - /url: https://ozcampingwarehouse.com/pages/brands
              - listitem [ref=e127]:
                - link "GIFT CARDS" [ref=e128] [cursor=pointer]:
                  - /url: /products/ozcamping-warehouse-gift-card
          - heading "Filter" [level=5] [ref=e131]
        - generic [ref=e132]:
          - heading "NEXTORCH" [level=1] [ref=e134]
          - generic [ref=e136]:
            - generic [ref=e137]:
              - generic "Grid" [ref=e138] [cursor=pointer]:
                - img [ref=e139]
              - generic "Large" [ref=e141] [cursor=pointer]:
                - img [ref=e142]
              - generic "List" [ref=e146] [cursor=pointer]:
                - img [ref=e147]
              - generic "List Small" [ref=e149] [cursor=pointer]:
                - img [ref=e150]
            - generic [ref=e153]:
              - generic [ref=e154]: Sort by
              - button "Name, A-Z" [ref=e156] [cursor=pointer]:
                - link "Name, A-Z" [ref=e158]:
                  - /url: javascript:;
                - img [ref=e159]
            - generic [ref=e162]: Showing all 7 Items
          - generic [ref=e164]:
            - generic [ref=e166]:
              - generic [ref=e169]:
                - link "Dr K3S S-Series Dr Medical Examinaion Penlight 5000K by NEXTORCH":
                  - /url: /collections/vendors/products/nxdrk3s
                  - img "Dr K3S S-Series Dr Medical Examinaion Penlight 5000K by NEXTORCH" [ref=e170] [cursor=pointer]
              - generic [ref=e172]:
                - generic [ref=e173]:
                  - link "NEXTORCH" [ref=e175] [cursor=pointer]:
                    - /url: /collections/vendors?q=NEXTORCH
                  - heading "Dr K3S S-Series Dr Medical Examinaion Penlight 5000K by NEXTORCH" [level=5] [ref=e176]:
                    - link "Dr K3S S-Series Dr Medical Examinaion Penlight 5000K by NEXTORCH" [ref=e177] [cursor=pointer]:
                      - /url: /collections/vendors/products/nxdrk3s
                - generic [ref=e178]:
                  - generic [ref=e179]: Rs3,000.00
                  - link "Add to cart" [ref=e182] [cursor=pointer]:
                    - /url: javascript:void(0)
                    - img [ref=e183]
                - generic [ref=e185]:
                  - generic "View" [ref=e186] [cursor=pointer]:
                    - img [ref=e187]
                    - generic [ref=e189]: View
                  - link "Wishlist" [ref=e191] [cursor=pointer]:
                    - /url: javascript:;
                    - img [ref=e192]
                    - generic [ref=e194]: Wishlist
            - generic [ref=e196]:
              - generic [ref=e199]:
                - link "Nxv10 Tactical Cordura Torch Pouch With Belt Loop by NEXTORCH":
                  - /url: /collections/vendors/products/nxv10
                  - img "Nxv10 Tactical Cordura Torch Pouch With Belt Loop by NEXTORCH" [ref=e200] [cursor=pointer]
              - generic [ref=e202]:
                - generic [ref=e203]:
                  - link "NEXTORCH" [ref=e205] [cursor=pointer]:
                    - /url: /collections/vendors?q=NEXTORCH
                  - heading "Nxv10 Tactical Cordura Torch Pouch With Belt Loop by NEXTORCH" [level=5] [ref=e206]:
                    - link "Nxv10 Tactical Cordura Torch Pouch With Belt Loop by NEXTORCH" [ref=e207] [cursor=pointer]:
                      - /url: /collections/vendors/products/nxv10
                - generic [ref=e208]:
                  - generic [ref=e209]: Rs1,600.00
                  - link "Add to cart" [ref=e212] [cursor=pointer]:
                    - /url: javascript:void(0)
                    - img [ref=e213]
                - generic [ref=e215]:
                  - generic "View" [ref=e216] [cursor=pointer]:
                    - img [ref=e217]
                    - generic [ref=e219]: View
                  - link "Wishlist" [ref=e221] [cursor=pointer]:
                    - /url: javascript:;
                    - img [ref=e222]
                    - generic [ref=e224]: Wishlist
            - generic [ref=e226]:
              - generic [ref=e229]:
                - link "P91 Dual Switch 5000lm Torch by NEXTORCH":
                  - /url: /collections/vendors/products/nxp91
                  - img "P91 Dual Switch 5000lm Torch by NEXTORCH" [ref=e230] [cursor=pointer]
              - generic [ref=e232]:
                - generic [ref=e233]:
                  - link "NEXTORCH" [ref=e235] [cursor=pointer]:
                    - /url: /collections/vendors?q=NEXTORCH
                  - heading "P91 Dual Switch 5000lm Torch by NEXTORCH" [level=5] [ref=e236]:
                    - link "P91 Dual Switch 5000lm Torch by NEXTORCH" [ref=e237] [cursor=pointer]:
                      - /url: /collections/vendors/products/nxp91
                - generic [ref=e238]:
                  - generic [ref=e239]: Rs26,700.00
                  - link "Add to cart" [ref=e242] [cursor=pointer]:
                    - /url: javascript:void(0)
                    - img [ref=e243]
                - generic [ref=e245]:
                  - generic "View" [ref=e246] [cursor=pointer]:
                    - img [ref=e247]
                    - generic [ref=e249]: View
                  - link "Wishlist" [ref=e251] [cursor=pointer]:
                    - /url: javascript:;
                    - img [ref=e252]
                    - generic [ref=e254]: Wishlist
            - generic [ref=e256]:
              - generic [ref=e259]:
                - link "TA30C MAX Ultra Bright Flashlight by NEXTORCH -4%":
                  - /url: /collections/vendors/products/nxta30cmax
                  - img "TA30C MAX Ultra Bright Flashlight by NEXTORCH" [ref=e260] [cursor=pointer]
                  - generic [ref=e263] [cursor=pointer]:
                    - text: "-4"
                    - superscript [ref=e264]: "%"
              - generic [ref=e266]:
                - generic [ref=e267]:
                  - link "NEXTORCH" [ref=e269] [cursor=pointer]:
                    - /url: /collections/vendors?q=NEXTORCH
                  - heading "TA30C MAX Ultra Bright Flashlight by NEXTORCH" [level=5] [ref=e270]:
                    - link "TA30C MAX Ultra Bright Flashlight by NEXTORCH" [ref=e271] [cursor=pointer]:
                      - /url: /collections/vendors/products/nxta30cmax
                - generic [ref=e272]:
                  - generic [ref=e273]:
                    - generic [ref=e274]: Rs32,000.00
                    - text: Rs33,600.00
                  - link "Add to cart" [ref=e277] [cursor=pointer]:
                    - /url: javascript:void(0)
                    - img [ref=e278]
                - generic [ref=e280]:
                  - generic "View" [ref=e281] [cursor=pointer]:
                    - img [ref=e282]
                    - generic [ref=e284]: View
                  - link "Wishlist" [ref=e286] [cursor=pointer]:
                    - /url: javascript:;
                    - img [ref=e287]
                    - generic [ref=e289]: Wishlist
            - generic [ref=e291]:
              - generic [ref=e294]:
                - link "UT10C U-Series Compact Rechargeable Flood Light by NEXTORCH":
                  - /url: /collections/vendors/products/nxut10c
                  - img "UT10C U-Series Compact Rechargeable Flood Light by NEXTORCH" [ref=e295] [cursor=pointer]
              - generic [ref=e297]:
                - generic [ref=e298]:
                  - link "NEXTORCH" [ref=e300] [cursor=pointer]:
                    - /url: /collections/vendors?q=NEXTORCH
                  - heading "UT10C U-Series Compact Rechargeable Flood Light by NEXTORCH" [level=5] [ref=e301]:
                    - link "UT10C U-Series Compact Rechargeable Flood Light by NEXTORCH" [ref=e302] [cursor=pointer]:
                      - /url: /collections/vendors/products/nxut10c
                - generic [ref=e303]:
                  - generic [ref=e304]: Rs7,000.00
                  - link "Add to cart" [ref=e307] [cursor=pointer]:
                    - /url: javascript:void(0)
                    - img [ref=e308]
                - generic [ref=e310]:
                  - generic "View" [ref=e311] [cursor=pointer]:
                    - img [ref=e312]
                    - generic [ref=e314]: View
                  - link "Wishlist" [ref=e316] [cursor=pointer]:
                    - /url: javascript:;
                    - img [ref=e317]
                    - generic [ref=e319]: Wishlist
            - generic [ref=e321]:
              - generic [ref=e324]:
                - link "UT30 Kit U-Series Compact Rechargeable Multi-Function Light by NEXTORCH":
                  - /url: /collections/vendors/products/nxut30kit
                  - img "UT30 Kit U-Series Compact Rechargeable Multi-Function Light by NEXTORCH" [ref=e325] [cursor=pointer]
              - generic [ref=e327]:
                - generic [ref=e328]:
                  - link "NEXTORCH" [ref=e330] [cursor=pointer]:
                    - /url: /collections/vendors?q=NEXTORCH
                  - heading "UT30 Kit U-Series Compact Rechargeable Multi-Function Light by NEXTORCH" [level=5] [ref=e331]:
                    - link "UT30 Kit U-Series Compact Rechargeable Multi-Function Light by NEXTORCH" [ref=e332] [cursor=pointer]:
                      - /url: /collections/vendors/products/nxut30kit
                - generic [ref=e333]:
                  - generic [ref=e334]: Rs10,700.00
                  - link "Add to cart" [ref=e337] [cursor=pointer]:
                    - /url: javascript:void(0)
                    - img [ref=e338]
                - generic [ref=e340]:
                  - generic "View" [ref=e341] [cursor=pointer]:
                    - img [ref=e342]
                    - generic [ref=e344]: View
                  - link "Wishlist" [ref=e346] [cursor=pointer]:
                    - /url: javascript:;
                    - img [ref=e347]
                    - generic [ref=e349]: Wishlist
            - generic [ref=e351]:
              - generic [ref=e354]:
                - link "V10B Tactical Flashlight Holster, Fits Up to 32mm Diameter Torches by NEXTORCH":
                  - /url: /collections/vendors/products/nxv10b
                  - img "V10B Tactical Flashlight Holster, Fits Up to 32mm Diameter Torches by NEXTORCH" [ref=e355] [cursor=pointer]
              - generic [ref=e357]:
                - generic [ref=e358]:
                  - link "NEXTORCH" [ref=e360] [cursor=pointer]:
                    - /url: /collections/vendors?q=NEXTORCH
                  - heading "V10B Tactical Flashlight Holster, Fits Up to 32mm Diameter Torches by NEXTORCH" [level=5] [ref=e361]:
                    - link "V10B Tactical Flashlight Holster, Fits Up to 32mm Diameter Torches by NEXTORCH" [ref=e362] [cursor=pointer]:
                      - /url: /collections/vendors/products/nxv10b
                - generic [ref=e363]:
                  - generic [ref=e364]: Rs1,600.00
                  - link "Add to cart" [ref=e367] [cursor=pointer]:
                    - /url: javascript:void(0)
                    - img [ref=e368]
                - generic [ref=e370]:
                  - generic "View" [ref=e371] [cursor=pointer]:
                    - img [ref=e372]
                    - generic [ref=e374]: View
                  - link "Wishlist" [ref=e376] [cursor=pointer]:
                    - /url: javascript:;
                    - img [ref=e377]
                    - generic [ref=e379]: Wishlist
    - generic [ref=e384]:
      - generic [ref=e385]:
        - heading "Featured products" [level=4] [ref=e386]:
          - link "Featured products" [ref=e387] [cursor=pointer]:
            - /url: /collections/featured-products
        - generic [ref=e389]:
          - generic [ref=e391]:
            - link "CLASSIC Terry Toweling Bucket Hat by OUTBOUND":
              - /url: /collections/featured-products/products/ht0015
              - img "CLASSIC Terry Toweling Bucket Hat by OUTBOUND" [ref=e392] [cursor=pointer]
          - generic [ref=e394]:
            - link "CLASSIC Terry Toweling Bucket Hat by OUTBOUND" [ref=e395] [cursor=pointer]:
              - /url: /collections/featured-products/products/ht0015
            - generic [ref=e396]:
              - generic [ref=e397]: Rs2,000.00
              - text: Rs2,200.00
        - generic [ref=e399]:
          - generic [ref=e401]:
            - link "5 Tube Rubberized Cotton Airbed Mattress by OUTBOUND":
              - /url: /collections/featured-products/products/ab0000
              - img "5 Tube Rubberized Cotton Airbed Mattress by OUTBOUND" [ref=e402] [cursor=pointer]
          - generic [ref=e404]:
            - link "5 Tube Rubberized Cotton Airbed Mattress by OUTBOUND" [ref=e405] [cursor=pointer]:
              - /url: /collections/featured-products/products/ab0000
            - generic [ref=e406]:
              - generic [ref=e407]: Rs7,500.00
              - text: Rs10,700.00
        - generic [ref=e409]:
          - generic [ref=e411]:
            - link "Half Button Pure Cotton Flannelette Shirt by JACKSMITH":
              - /url: /collections/featured-products/products/ws58
              - img "Half Button Pure Cotton Flannelette Shirt by JACKSMITH" [ref=e412] [cursor=pointer]
          - generic [ref=e414]:
            - link "Half Button Pure Cotton Flannelette Shirt by JACKSMITH" [ref=e415] [cursor=pointer]:
              - /url: /collections/featured-products/products/ws58
            - generic [ref=e417]: Rs2,700.00
      - generic [ref=e418]:
        - heading "Onsale Products" [level=4] [ref=e419]:
          - link "Onsale Products" [ref=e420] [cursor=pointer]:
            - /url: /collections/on-sale
        - generic [ref=e422]:
          - generic [ref=e424]:
            - link "Stowaway Jackets by RAINBIRD":
              - /url: /collections/on-sale/products/txt8004
              - img "Stowaway Jackets by RAINBIRD" [ref=e425] [cursor=pointer]
          - generic [ref=e427]:
            - link "Stowaway Jackets by RAINBIRD" [ref=e428] [cursor=pointer]:
              - /url: /collections/on-sale/products/txt8004
            - generic [ref=e429]:
              - generic [ref=e430]: Rs8,600.00
              - text: Rs10,700.00
        - generic [ref=e432]:
          - generic [ref=e434]:
            - link "5 Tube Rubberized Cotton Airbed Mattress by OUTBOUND":
              - /url: /collections/on-sale/products/ab0000
              - img "5 Tube Rubberized Cotton Airbed Mattress by OUTBOUND" [ref=e435] [cursor=pointer]
          - generic [ref=e437]:
            - link "5 Tube Rubberized Cotton Airbed Mattress by OUTBOUND" [ref=e438] [cursor=pointer]:
              - /url: /collections/on-sale/products/ab0000
            - generic [ref=e439]:
              - generic [ref=e440]: Rs7,500.00
              - text: Rs10,700.00
        - generic [ref=e442]:
          - generic [ref=e444]:
            - link "1057 Canvas Drover Hat by BARMAH":
              - /url: /collections/on-sale/products/bar1057
              - img "1057 Canvas Drover Hat by BARMAH" [ref=e445] [cursor=pointer]
          - generic [ref=e447]:
            - link "1057 Canvas Drover Hat by BARMAH" [ref=e448] [cursor=pointer]:
              - /url: /collections/on-sale/products/bar1057
            - generic [ref=e449]:
              - generic [ref=e450]: Rs5,200.00
              - text: Rs5,700.00
      - generic [ref=e451]:
        - heading "Top Rated Products" [level=4] [ref=e452]:
          - link "Top Rated Products" [ref=e453] [cursor=pointer]:
            - /url: /collections/dry-sacks-stuff-sacks
        - generic [ref=e455]:
          - generic [ref=e457]:
            - link "British Army Issue Jungle Compression Bag - MILITARY SURPLUS":
              - /url: /collections/dry-sacks-stuff-sacks/products/sbg990
              - img "British Army Issue Jungle Compression Bag - MILITARY SURPLUS" [ref=e458] [cursor=pointer]
          - generic [ref=e460]:
            - link "British Army Issue Jungle Compression Bag - MILITARY SURPLUS" [ref=e461] [cursor=pointer]:
              - /url: /collections/dry-sacks-stuff-sacks/products/sbg990
            - generic [ref=e463]: Rs2,200.00
        - generic [ref=e465]:
          - generic [ref=e467]:
            - link "Evac Compression Dry Bag UL 5L High Rise by SEA TO SUMMIT":
              - /url: /collections/dry-sacks-stuff-sacks/products/asg011051-031803
              - img "Evac Compression Dry Bag UL 5L High Rise by SEA TO SUMMIT" [ref=e468] [cursor=pointer]
          - generic [ref=e470]:
            - link "Evac Compression Dry Bag UL 5L High Rise by SEA TO SUMMIT" [ref=e471] [cursor=pointer]:
              - /url: /collections/dry-sacks-stuff-sacks/products/asg011051-031803
            - generic [ref=e473]: Rs6,100.00
        - generic [ref=e475]:
          - generic [ref=e477]:
            - link "Heavy Duty Waterproof Gear Bag 30Lt by MARJAQE":
              - /url: /collections/dry-sacks-stuff-sacks/products/bg0060
              - img "Heavy Duty Waterproof Gear Bag 30Lt by MARJAQE" [ref=e478] [cursor=pointer]
          - generic [ref=e480]:
            - link "Heavy Duty Waterproof Gear Bag 30Lt by MARJAQE" [ref=e481] [cursor=pointer]:
              - /url: /collections/dry-sacks-stuff-sacks/products/bg0060
            - generic [ref=e483]: Rs8,600.00
      - link [ref=e486] [cursor=pointer]:
        - /url: /products/shewee
    - generic [ref=e491]:
      - generic [ref=e493]:
        - link "Logo" [ref=e496] [cursor=pointer]:
          - /url: /collections/vendors?q=BACK%20COUNTRY%20CUISINE
          - img "Logo" [ref=e497]
        - link "Logo" [ref=e500] [cursor=pointer]:
          - /url: /collections/vendors?q=BARMAH
          - img "Logo" [ref=e501]
        - link "Logo" [ref=e504] [cursor=pointer]:
          - /url: /collections/vendors?q=CAMELBAK
          - img "Logo" [ref=e505]
        - link "Logo" [ref=e508] [cursor=pointer]:
          - /url: /collections/vendors?q=CARIBEE
          - img "Logo" [ref=e509]
        - link "Logo" [ref=e512] [cursor=pointer]:
          - /url: /collections/vendors?q=BLACKWOLF
          - img "Logo" [ref=e513]
        - link "Logo" [ref=e516] [cursor=pointer]:
          - /url: /collections/vendors?q=JETBOIL
          - img "Logo" [ref=e517]
        - link "Logo" [ref=e520] [cursor=pointer]:
          - /url: /collections/vendors?q=ROSSI
          - img "Logo" [ref=e521]
        - link "Logo" [ref=e524] [cursor=pointer]:
          - /url: /collections/vendors?q=LEDLENSER
          - img "Logo" [ref=e525]
        - link "Logo" [ref=e528] [cursor=pointer]:
          - /url: /collections/vendors?q=MAGLITE
          - img "Logo" [ref=e529]
        - link "Logo" [ref=e532] [cursor=pointer]:
          - /url: /collections/vendors?q=SEA%20TO%20SUMMIT
          - img "Logo" [ref=e533]
      - generic:
        - button [ref=e534] [cursor=pointer]:
          - img [ref=e536]
        - button [ref=e538] [cursor=pointer]:
          - img [ref=e540]
    - contentinfo [ref=e543]:
      - generic [ref=e544]:
        - generic [ref=e548]:
          - generic [ref=e549]:
            - img [ref=e550]
            - generic [ref=e552]: Sign up to Newsletter
          - generic [ref=e553]:
            - textbox "Email address" [ref=e554]:
              - /placeholder: Enter your email address
            - button "Subscribe" [ref=e555] [cursor=pointer]
        - generic [ref=e559]:
          - generic [ref=e561]:
            - generic [ref=e562]:
              - link "OzCampingWarehouse":
                - /url: /
                - img "OzCampingWarehouse" [ref=e563] [cursor=pointer]
            - generic [ref=e564]:
              - img [ref=e565]
              - generic [ref=e567]:
                - generic [ref=e568]: Got questions? Call us 7 Days a Week 10am to 3pm!
                - generic [ref=e569]: 03 9101 9843
            - generic [ref=e571]:
              - generic [ref=e572]: Contact info
              - text: Unit 2/7-9 Holmwood Rd., Tottenham, VIC 3012
          - generic [ref=e574]:
            - heading "Categories" [level=6] [ref=e575]
            - list [ref=e576]:
              - listitem [ref=e577]:
                - link "GEAR" [ref=e578] [cursor=pointer]:
                  - /url: /collections/gear
              - listitem [ref=e579]:
                - link "CLOTHING" [ref=e580] [cursor=pointer]:
                  - /url: /collections/clothing
              - listitem [ref=e581]:
                - link "FOOTWEAR" [ref=e582] [cursor=pointer]:
                  - /url: /collections/footwear
              - listitem [ref=e583]:
                - link "ACTIVITY" [ref=e584] [cursor=pointer]:
                  - /url: /collections/activity
              - listitem [ref=e585]:
                - link "BRANDS" [ref=e586] [cursor=pointer]:
                  - /url: https://ozcampingwarehouse.com/pages/brands
              - listitem [ref=e587]:
                - link "GIFT CARDS" [ref=e588] [cursor=pointer]:
                  - /url: /products/ozcamping-warehouse-gift-card
          - generic [ref=e590]:
            - heading "Get to Know Us" [level=6] [ref=e591]
            - list [ref=e592]:
              - listitem [ref=e593]:
                - link "About us" [ref=e594] [cursor=pointer]:
                  - /url: /pages/our-story
              - listitem [ref=e595]:
                - link "Careers" [ref=e596] [cursor=pointer]:
                  - /url: /pages/careers
              - listitem [ref=e597]:
                - link "Facebook" [ref=e598] [cursor=pointer]:
                  - /url: https://www.facebook.com/OzCamping-Warehouse-106417615304538
              - listitem [ref=e599]:
                - link "Instagram" [ref=e600] [cursor=pointer]:
                  - /url: https://www.instagram.com/ozcampingwarehouse/
          - generic [ref=e602]:
            - heading "Customer Service" [level=6] [ref=e603]
            - list [ref=e604]:
              - listitem [ref=e605]:
                - link "Shipping Policy" [ref=e606] [cursor=pointer]:
                  - /url: /policies/shipping-policy
              - listitem [ref=e607]:
                - link "Terms of Service" [ref=e608] [cursor=pointer]:
                  - /url: /policies/terms-of-service
              - listitem [ref=e609]:
                - link "Refund Policy" [ref=e610] [cursor=pointer]:
                  - /url: /policies/refund-policy
              - listitem [ref=e611]:
                - link "Privacy Policy" [ref=e612] [cursor=pointer]:
                  - /url: /policies/privacy-policy
              - listitem [ref=e613]:
                - link "Size Chart" [ref=e614] [cursor=pointer]:
                  - /url: /pages/size-chart
              - listitem [ref=e615]:
                - link "Contact Us" [ref=e616] [cursor=pointer]:
                  - /url: /pages/contact
          - generic [ref=e618]:
            - heading "Community" [level=6] [ref=e619]
            - list [ref=e620]:
              - listitem [ref=e621]:
                - link "School/Scout Group Partnerships" [ref=e622] [cursor=pointer]:
                  - /url: /pages/school-scout-group-partnerships
              - listitem [ref=e623]:
                - link "Corporate And Group Sales" [ref=e624] [cursor=pointer]:
                  - /url: /pages/corporate-and-group-sales
        - generic [ref=e627]:
          - paragraph [ref=e629]:
            - text: © 2026
            - strong [ref=e630]: OzCampingWarehouse
            - text: . All Rights Reserved
          - list [ref=e632]:
            - listitem [ref=e633]:
              - img "cc-visa" [ref=e634]
            - listitem [ref=e636]:
              - img "cc-paypal" [ref=e637]
            - listitem [ref=e639]:
              - img "cc-discover" [ref=e640]
            - listitem [ref=e642]:
              - img "cc-amex" [ref=e643]
  - generic "Back To Top" [ref=e645] [cursor=pointer]:
    - link [ref=e646]:
      - /url: javascript:;
      - img [ref=e647]
```

# Test source

```ts
  22  |     console.log(`\n=== PAGE ${currentPage} ===`);
  23  |     
  24  |     // Wait for page to stabilize
  25  |     await page.waitForTimeout(2000);
  26  |     
  27  |     // Get all products on current page
  28  |     const products = page.locator('.product-grid-item');
  29  |     const productCount = await products.count();
  30  |     console.log(`Found ${productCount} products on page ${currentPage}`);
  31  |     
  32  |     // Analyze all products on this page
  33  |     for (let i = 0; i < productCount; i++) {
  34  |       const product = products.nth(i);
  35  |       
  36  |       try {
  37  |         // Get product URL to avoid duplicates
  38  |         const linkElement = product.locator('a').first();
  39  |         const href = await linkElement.getAttribute('href') || '';
  40  |         let productName = href.split('/').pop()?.replace(/-/g, ' ') || `Product ${totalAnalyzed + 1}`;
  41  |         
  42  |         // Skip if already analyzed (avoid duplicates across pages)
  43  |         if (allProductUrls.has(href)) {
  44  |           console.log(`Skipping duplicate: ${productName}`);
  45  |           continue;
  46  |         }
  47  |         allProductUrls.add(href);
  48  |         
  49  |         // OPTIMAL IMAGE DETECTION TECHNIQUE
  50  |         let hasImage = false;
  51  |         
  52  |         // Method 1: Check all img elements comprehensively
  53  |         const allImages = product.locator('img');
  54  |         const imageCount = await allImages.count();
  55  |         
  56  |         for (let imgIndex = 0; imgIndex < imageCount; imgIndex++) {
  57  |           const img = allImages.nth(imgIndex);
  58  |           const src = await img.getAttribute('src') || '';
  59  |           const dataSrc = await img.getAttribute('data-src') || '';
  60  |           const srcset = await img.getAttribute('srcset') || '';
  61  |           
  62  |           // Check if any attribute has valid image source
  63  |           const validSrc = src && src.trim() !== '' && !src.includes('placeholder') && !src.includes('data:image');
  64  |           const validDataSrc = dataSrc && dataSrc.trim() !== '' && !dataSrc.includes('placeholder');
  65  |           const validSrcset = srcset && srcset.trim() !== '';
  66  |           
  67  |           if (validSrc || validDataSrc || validSrcset) {
  68  |             hasImage = true;
  69  |             break;
  70  |           }
  71  |         }
  72  |         
  73  |         // Method 2: Check HTML content for image references if Method 1 fails
  74  |         if (!hasImage) {
  75  |           const productHtml = await product.innerHTML();
  76  |           const imageRefs = productHtml.match(/src="[^"]*\.(jpg|jpeg|png|gif|webp)"/gi) || [];
  77  |           const dataSrcRefs = productHtml.match(/data-src="[^"]*\.(jpg|jpeg|png|gif|webp)"/gi) || [];
  78  |           const srcsetRefs = productHtml.match(/srcset="[^"]*\.(jpg|jpeg|png|gif|webp)"/gi) || [];
  79  |           
  80  |           if (imageRefs.length > 0 || dataSrcRefs.length > 0 || srcsetRefs.length > 0) {
  81  |             hasImage = true;
  82  |           }
  83  |         }
  84  |         
  85  |         // Get price
  86  |         const textContent = await product.textContent() || '';
  87  |         const priceMatches = textContent.match(/Rs[\d,]+\.?\d*/g) || [];
  88  |         const price = priceMatches.length > 0 ? priceMatches[0] : 'NO PRICE';
  89  |         
  90  |         // Check for zero price
  91  |         const isZeroPrice = !price || price === 'Rs0' || price === 'Rs0.00' || price.includes('Rs0');
  92  |         
  93  |         // Special check for meg050
  94  |         if (productName.toLowerCase().includes('meg050')) {
  95  |           meg050Found = true;
  96  |           console.log(`MEG050: Image="${hasImage ? 'YES' : 'NO'}", Price="${price}"`);
  97  |         }
  98  |         
  99  |         // Log results
  100 |         const imageStatus = hasImage ? 'YES' : 'MISSING';
  101 |         const priceStatus = isZeroPrice ? 'ZERO' : 'VALID';
  102 |         
  103 |         console.log(`${totalAnalyzed + 1}. ${productName}`);
  104 |         console.log(`    Image: ${imageStatus}`);
  105 |         console.log(`    Price: ${priceStatus} (${price})`);
  106 |         
  107 |         if (!hasImage) productsWithMissingImages++;
  108 |         if (isZeroPrice) productsWithZeroPrice++;
  109 |         totalAnalyzed++;
  110 |         
  111 |       } catch (error) {
  112 |         console.log(`Error analyzing product: ${error}`);
  113 |       }
  114 |     }
  115 |     
  116 |     // Try to find and click Next button
  117 |     const nextButton = page.locator('a:has-text("Next"), button:has-text("Next"), .pagination a[rel="next"]');
  118 |     const nextButtonExists = await nextButton.count() > 0;
  119 |     
  120 |     if (nextButtonExists) {
  121 |       console.log('Found Next button - clicking to load more products');
> 122 |       await nextButton.first().click();
      |                                ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  123 |       await page.waitForLoadState('domcontentloaded');
  124 |       await page.waitForTimeout(3000);
  125 |       currentPage++;
  126 |     } else {
  127 |       console.log('No Next button found - reached end of products');
  128 |       break;
  129 |     }
  130 |   }
  131 |   
  132 |   // Final summary
  133 |   console.log('\n=== FINAL SUMMARY ===');
  134 |   console.log(`Total products analyzed: ${totalAnalyzed}`);
  135 |   console.log(`Products with missing images: ${productsWithMissingImages}`);
  136 |   console.log(`Products with zero prices: ${productsWithZeroPrice}`);
  137 |   console.log(`MEG050 found: ${meg050Found ? 'YES' : 'NO'}`);
  138 |   console.log(`Pages analyzed: ${currentPage}`);
  139 |   
  140 |   if (productsWithMissingImages > 0) {
  141 |     console.log(`MISSING IMAGES: ${productsWithMissingImages} products`);
  142 |   }
  143 |   
  144 |   if (productsWithZeroPrice > 0) {
  145 |     console.log(`ZERO PRICES: ${productsWithZeroPrice} products`);
  146 |   }
  147 |   
  148 |   if (productsWithMissingImages === 0 && productsWithZeroPrice === 0) {
  149 |     console.log('All analyzed products have images and valid prices');
  150 |   }
  151 |   
  152 |   console.log('\n=== ANALYSIS COMPLETE ===');
  153 | });
  154 | 
```