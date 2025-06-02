# Lighthouse CI Configuration Guide

This document explains how the Lighthouse CI configuration works in this project.

## Local Testing

To run Lighthouse tests locally:

1. Build the project:
   ```
   npm run build
   ```

2. Run Lighthouse tests:
   ```
   npm run lighthouse:local
   ```

Or use the VS Code task "Run Lighthouse Test" that combines both steps.

## Configuration Files

- `.lighthouserc.json`: Original configuration for static file testing
- `.lighthouserc-local.json`: Configuration for testing local builds with a custom server
- `.lighthouserc-ci.json`: Configuration for testing the deployed GitHub Pages site

## CI/CD Pipeline

The GitHub Actions workflow includes:

1. Building the site with webpack
2. Testing against the local build using `lighthouse-server.js`  
3. Testing against the deployed GitHub Pages URL

## Troubleshooting

If you encounter the "no such file or directory, scandir 'dist'" error:

1. Make sure `npm run build` completes successfully
2. Verify the `dist` directory exists and contains the built files
3. Try using the custom test server: `node lighthouse-server.js`

## Debugging

To debug Lighthouse CI:

1. Run with verbose output:
   ```
   LHCI_LOG_LEVEL=verbose npx lhci autorun --config=.lighthouserc-local.json
   ```

2. Check the contents of your dist directory:
   ```
   dir dist
   ```

3. Validate your webpack build output
