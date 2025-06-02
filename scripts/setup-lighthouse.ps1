# This script sets up dependencies for Lighthouse CI local testing

Write-Host "🔍 Setting up Lighthouse CI for local testing..."

# Install global dependencies
npm install -g @lhci/cli serve

# Install local dependencies if needed
npm install

# Build the project
Write-Host "🏗️ Building the project..."
npm run build

# Run Lighthouse test
Write-Host "🚀 Running Lighthouse test on local build..."
npm run lighthouse:local

Write-Host "✅ Setup and testing complete!"
