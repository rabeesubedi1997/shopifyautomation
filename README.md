# Oz Camping Warehouse - Playwright Automation Framework

A professional Playwright + TypeScript automation framework for testing the Oz Camping Warehouse e-commerce website.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npm run install-browsers
   ```

4. Run tests:
   ```bash
   npm test
   ```

## 📁 Project Structure

```
OzCampingAutomation/
├── src/
│   ├── pages/                    # Page Object Models
│   │   ├── base.page.ts         # Base page class
│   │   └── home.page.ts         # Home page POM
│   ├── components/               # Reusable UI components
│   ├── fixtures/                 # Custom test fixtures
│   │   └── base.fixture.ts      # Base test fixture
│   ├── helpers/                  # Utility functions
│   ├── data/                     # Test data
│   └── types/                    # TypeScript type definitions
│       └── page.types.ts         # Page-related types
├── tests/                        # Test specifications
│   └── smoke/                    # Smoke tests
│       └── home-page.spec.ts     # Home page smoke tests
├── config/                       # Configuration files
├── reports/                      # Test reports (auto-generated)
├── utils/                        # Build and utility scripts
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── .gitignore
└── README.md
```

## 🧪 Running Tests

### Basic Commands
- **Run all tests**: `npm test`
- **Run tests in headed mode**: `npm run test:headed`
- **Debug tests**: `npm run test:debug`
- **Run tests with UI**: `npm run test:ui`

### Test Categories
- **Smoke tests only**: `npm run test:smoke`
- **Regression tests only**: `npm run test:regression`

### Viewing Reports
- **View HTML report**: `npm run report`

## 🏗️ Architecture

### Page Object Model (POM)
The framework uses the Page Object Model pattern to separate page interactions from test logic:

- **BasePage**: Contains common functionality shared across all pages
- **HomePage**: Specific methods and selectors for the home page

### Custom Fixtures
Custom fixtures provide reusable test setup and teardown functionality.

### TypeScript Integration
Strong typing ensures maintainability and catches errors at compile time.

## 📋 Test Coverage

### Current Tests (Phase 1)
- ✅ Home page loading
- ✅ Page title verification
- ✅ Hero section display
- ✅ Navigation menu functionality
- ✅ Featured products display
- ✅ Search functionality
- ✅ Newsletter section
- ✅ Cart accessibility
- ✅ Mobile responsiveness
- ✅ Category navigation
- ✅ Performance standards

### Future Tests (Phase 2+)
- Product browsing and filtering
- Shopping cart operations
- Checkout process
- User authentication
- API integration tests

## 🔧 Configuration

### Environment Settings
Configuration is managed through `playwright.config.ts` with support for:
- Multiple browsers (Chrome, Firefox, Safari)
- Mobile viewport testing
- Headed and headless execution
- Screenshot and video capture on failure
- HTML and JSON reporting

### Test Data
Test data is managed separately in the `src/data/` directory for easy maintenance.

## 📊 Reporting

The framework generates comprehensive reports:
- **HTML Reports**: Interactive reports with screenshots and videos
- **JSON Reports**: Machine-readable results for CI/CD integration
- **Screenshots**: Automatic capture on test failure
- **Videos**: Screen recordings of test execution

## 🛠️ Development

### Adding New Tests
1. Create a new test file in the appropriate `tests/` subdirectory
2. Use the custom fixtures for consistent setup
3. Follow the existing naming conventions
4. Add appropriate assertions and verifications

### Adding New Pages
1. Create a new page class in `src/pages/`
2. Extend the `BasePage` class
3. Add page-specific selectors and methods
4. Update type definitions as needed

## 🚨 Best Practices

- Use descriptive test names
- Keep tests independent and isolated
- Use data-driven testing where appropriate
- Implement proper wait strategies
- Add meaningful assertions
- Maintain clean, readable code
- Regular refactoring and updates

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Add appropriate TypeScript types
3. Include meaningful test descriptions
4. Update documentation as needed
5. Ensure all tests pass before submitting

## 📞 Support

For questions or issues related to this automation framework, please refer to:
- Playwright documentation: https://playwright.dev/
- TypeScript documentation: https://www.typescriptlang.org/
- Project-specific documentation in this README

---

**Note**: This framework is specifically designed for testing the Oz Camping Warehouse website (https://ozcampingwarehouse.com/) and may require customization for other websites.
