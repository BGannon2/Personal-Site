#!/bin/bash

# Simple validation script for CI/CD pipeline
# This script validates that the build artifacts are created correctly

set -e

echo "🔍 Validating build artifacts..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist directory not found"
    exit 1
fi

# Check if index.html exists
if [ ! -f "dist/index.html" ]; then
    echo "❌ Error: dist/index.html not found"
    exit 1
fi

# Check if JavaScript bundle exists
if ! ls dist/*.js 1> /dev/null 2>&1; then
    echo "❌ Error: No JavaScript bundles found in dist/"
    exit 1
fi

# Validate HTML structure
if ! grep -q "<title>" dist/index.html; then
    echo "❌ Error: No title tag found in index.html"
    exit 1
fi

# Check file sizes (basic performance check)
HTML_SIZE=$(wc -c < dist/index.html)
if [ $HTML_SIZE -lt 100 ]; then
    echo "❌ Error: HTML file seems too small ($HTML_SIZE bytes)"
    exit 1
fi

echo "✅ All validation checks passed!"
echo "📊 Build statistics:"
echo "   - HTML size: $HTML_SIZE bytes"
echo "   - Files in dist/: $(ls -1 dist/ | wc -l)"
echo "   - JavaScript bundles: $(ls -1 dist/*.js | wc -l)"

exit 0
