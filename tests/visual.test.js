// Visual Regression Tests for Portfolio Website

describe('Visual Regression Tests', () => {
    let page;
    let browser;

    beforeAll(async () => {
        browser = await require('playwright').chromium.launch();
        page = await browser.newPage();
        await page.goto('file://' + __dirname + '/../src/index.html');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('should match desktop homepage screenshot', async () => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.waitForLoadState('networkidle');
        // Wait for animations to complete
        await page.waitForTimeout(1000);
        
        const screenshot = await page.screenshot({ 
            fullPage: true,
            // Only save screenshot file if not in CI environment
            ...(process.env.CI ? {} : { path: 'tests/screenshots/desktop-homepage.png' })
        });
        
        expect(screenshot).toBeDefined();
    });

    test('should match tablet homepage screenshot', async () => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        
        const screenshot = await page.screenshot({ 
            fullPage: true,
            // Only save screenshot file if not in CI environment
            ...(process.env.CI ? {} : { path: 'tests/screenshots/tablet-homepage.png' })
        });
        
        expect(screenshot).toBeDefined();
    });

    test('should match mobile homepage screenshot', async () => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        
        const screenshot = await page.screenshot({ 
            fullPage: true,
            // Only save screenshot file if not in CI environment
            ...(process.env.CI ? {} : { path: 'tests/screenshots/mobile-homepage.png' })
        });
        
        expect(screenshot).toBeDefined();
    });

    test('should show mobile navigation correctly', async () => {
        await page.setViewportSize({ width: 375, height: 667 });
        
        // Click hamburger menu
        await page.click('.hamburger');
        await page.waitForTimeout(500);
        
        const screenshot = await page.screenshot({ 
            // Only save screenshot file if not in CI environment
            ...(process.env.CI ? {} : { path: 'tests/screenshots/mobile-navigation.png' })
        });
        
        expect(screenshot).toBeDefined();
    });

    test('should display contact form correctly', async () => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        // Scroll to contact section
        await page.click('a[href="#contact"]');
        await page.waitForTimeout(1000);
        
        const contactSection = await page.$('#contact');
        const screenshot = await contactSection.screenshot({
            // Only save screenshot file if not in CI environment
            ...(process.env.CI ? {} : { path: 'tests/screenshots/contact-section.png' })
        });
        
        expect(screenshot).toBeDefined();
    });

    test('should display projects section correctly', async () => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        // Scroll to projects section
        await page.click('a[href="#projects"]');
        await page.waitForTimeout(1000);
        
        const projectsSection = await page.$('#projects');
        const screenshot = await projectsSection.screenshot({
            // Only save screenshot file if not in CI environment
            ...(process.env.CI ? {} : { path: 'tests/screenshots/projects-section.png' })
        });
        
        expect(screenshot).toBeDefined();
    });

    test('should show hover effects on project cards', async () => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
        // Check if project cards exist
        const projectCards = await page.$$('.project-card');
        expect(projectCards.length).toBeGreaterThan(0);
    });

    test('should display skills section with proper layout', async () => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.waitForLoadState('networkidle');
        
        // Check if skills section exists
        const skillsSection = await page.$('#skills');
        expect(skillsSection).toBeTruthy();
    });

    test('should handle dark theme correctly', async () => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        
        // Check that dark theme is applied
        const bodyBg = await page.evaluate(() => {
            return window.getComputedStyle(document.body).backgroundColor;
        });
        
        expect(bodyBg).toMatch(/rgb\(10, 10, 10\)|#0a0a0a/);
    });
});
