# GitHub Pages Setup Guide

## Issue: Repository README showing instead of portfolio website

The workflow is correctly building and attempting to deploy the site, but GitHub Pages needs to be configured to use GitHub Actions as the deployment source.

## Solution: Configure GitHub Pages Settings

### Step 1: Access Repository Settings
1. Go to your repository: https://github.com/BGannon2/Personal-Site
2. Click on the **Settings** tab (near the top right)
3. Scroll down to **Pages** in the left sidebar

### Step 2: Configure Pages Source
1. Under **Source**, you should see a dropdown that currently says "Deploy from a branch"
2. **Change this to "GitHub Actions"**
3. Click **Save**

### Step 3: Verify Configuration
After making this change:
1. The site should deploy from the workflow's `upload-pages-artifact` step
2. Your portfolio website should be available at: https://bgannon2.github.io/Personal-Site/
3. It should show your DevOps portfolio instead of the README.md

## Current Workflow Status ✅
- ✅ Build artifacts are being generated correctly
- ✅ CSS is properly extracted (19.2 KiB main.css file)
- ✅ JavaScript bundles are created
- ✅ HTML template is properly built
- ✅ `upload-pages-artifact` step uploads `./dist` folder
- ✅ `deploy-pages` action is configured correctly

## Expected Result
Once GitHub Pages is configured to use GitHub Actions:
- Portfolio website will load with full styling
- All CSS and JavaScript will work correctly
- Site will be served from the built `dist/` folder instead of repository root

## Troubleshooting
If the site still doesn't work after changing the Pages source:
1. Check the Actions tab for any deployment failures
2. Verify the workflow completed successfully
3. Try a new commit to trigger a fresh deployment
4. Check browser developer tools for any 404 errors on assets

## Files Ready for Deployment
The following files are correctly built and ready:
- `index.html` - Main portfolio page
- `main.8224ba07c0a052656978.css` - Extracted CSS styles (19.2 KiB)
- `main.32d95a19169aeef2b864.js` - Main JavaScript bundle
- `c9c2f9295f7e7c9c6433.svg` - Favicon
- Additional webpack chunks for optimized loading
