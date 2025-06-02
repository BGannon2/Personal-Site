#!/bin/bash

# This script sets up dependencies for Lighthouse CI local testing
# Execute with: bash scripts/setup-lighthouse.sh

echo "🔍 Setting up Lighthouse CI for local testing..."

# Install global dependencies
npm install -g @lhci/cli serve

# Install local dependencies if needed
npm install

# Build the project
echo "🏗️ Building the project..."
npm run build

# Run Lighthouse test
echo "🚀 Running Lighthouse test on local build..."
npm run lighthouse:local

echo "✅ Setup and testing complete!"
