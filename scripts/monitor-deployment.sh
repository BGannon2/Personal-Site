#!/bin/bash

# Monitor GitHub Actions deployment status
# Usage: ./monitor-deployment.sh

REPO="BGannon2/Personal-Site"
WORKFLOW="ci-cd.yml"

echo "🚀 Monitoring GitHub Actions deployment for $REPO"
echo "📋 Workflow: $WORKFLOW"
echo ""

# Function to check deployment status
check_status() {
    echo "🔍 Checking latest workflow run..."
    echo "🌐 View full details at: https://github.com/$REPO/actions"
    echo ""
    echo "📊 Key URLs:"
    echo "   - Repository: https://github.com/$REPO"
    echo "   - Actions: https://github.com/$REPO/actions"
    echo "   - Live Site: https://bgannon2.github.io/Personal-Site/"
    echo "   - Settings: https://github.com/$REPO/settings/pages"
    echo ""
}

check_status

echo "✅ Monitoring script complete!"
echo ""
echo "💡 Tips:"
echo "   - Check the Actions tab to see workflow progress"
echo "   - GitHub Pages deployment may take 2-5 minutes after workflow completes"
echo "   - Status badges in README.md will show current build status"
