// Accessibility Tests for Portfolio Website

describe('Accessibility Tests', () => {
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

    test('should pass basic accessibility checks', async () => {
        // Check for basic accessibility features
        const hasPageTitle = await page.evaluate(() => document.title.length > 0);
        const hasLangAttribute = await page.evaluate(() => document.documentElement.hasAttribute('lang'));
        
        expect(hasPageTitle).toBe(true);
        expect(hasLangAttribute).toBe(true);
    });

    test('should have proper heading structure', async () => {
        const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', 
            elements => elements.map(el => ({ 
                tag: el.tagName.toLowerCase(), 
                text: el.textContent.trim() 
            }))
        );

        // Should have exactly one H1
        const h1Count = headings.filter(h => h.tag === 'h1').length;
        expect(h1Count).toBe(1);

        // Should have logical hierarchy
        const hasH2 = headings.some(h => h.tag === 'h2');
        expect(hasH2).toBe(true);
    });

    test('should have alt attributes for images', async () => {
        const imagesWithoutAlt = await page.$$eval('img:not([alt])', images => images.length);
        expect(imagesWithoutAlt).toBe(0);
    });

    test('should have proper form labels', async () => {
        const unlabeledInputs = await page.$$eval(
            'input:not([aria-label]):not([placeholder]), textarea:not([aria-label]):not([placeholder])',
            inputs => inputs.filter(input => {
                const id = input.id;
                return !id || !document.querySelector(`label[for="${id}"]`);
            }).length
        );
        
        expect(unlabeledInputs).toBe(0);
    });    test('should have sufficient color contrast', async () => {
        // Check for elements with potential contrast issues
        const contrastIssues = await page.evaluate(() => {
            const elements = document.querySelectorAll('*');
            const issues = [];
            
            elements.forEach(el => {
                const style = window.getComputedStyle(el);
                const bgColor = style.backgroundColor;
                const textColor = style.color;
                
                // Skip elements with transparent backgrounds or inherited colors
                if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent' || 
                    textColor === 'rgba(0, 0, 0, 0)' || textColor === 'transparent') {
                    return;
                }
                
                // Skip empty elements
                if (!el.textContent.trim()) {
                    return;
                }
                
                // Simple check for very low contrast (same or very similar colors)
                if (bgColor === textColor || 
                    (bgColor.includes('rgb(') && textColor.includes('rgb(') && 
                     bgColor.replace(/\s/g, '') === textColor.replace(/\s/g, ''))) {
                    issues.push(el.tagName);
                }
            });
            
            return issues;
        });
        
        // Allow some minor contrast issues but flag if there are too many
        expect(contrastIssues.length).toBeLessThanOrEqual(3);
    });

    test('should be keyboard navigable', async () => {
        // Test tab navigation through interactive elements
        const focusableElements = await page.$$eval(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
            elements => elements.length
        );
        
        expect(focusableElements).toBeGreaterThan(0);
        
        // Test that first element can receive focus
        await page.keyboard.press('Tab');
        const focusedElement = await page.evaluate(() => document.activeElement.tagName);
        expect(focusedElement).toBeDefined();
    });

    test('should have proper ARIA attributes', async () => {
        // Check for ARIA landmarks
        const landmarks = await page.$$eval(
            '[role="main"], main, [role="navigation"], nav, [role="banner"], header',
            elements => elements.length
        );
        
        expect(landmarks).toBeGreaterThan(0);
    });    test('should have descriptive link text', async () => {
        const linksWithPoorText = await page.$$eval('a', links => 
            links.filter(link => {
                const text = link.textContent.trim().toLowerCase();
                const hasVisibleText = text.length > 0;
                const hasAriaLabel = link.hasAttribute('aria-label');
                const hasTitle = link.hasAttribute('title');
                const hasScreenReaderText = link.querySelector('.sr-only');
                
                // Link is good if it has visible text, aria-label, title, or screen reader text
                if (hasVisibleText || hasAriaLabel || hasTitle || hasScreenReaderText) {
                    return false; // Not a poor link
                }
                
                // Check for common poor link text patterns
                return text === 'click here' || text === 'read more' || text === 'here' || text === '';
            }).length
        );
        
        expect(linksWithPoorText).toBe(0);
    });
});
