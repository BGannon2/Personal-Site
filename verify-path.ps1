# PATH Setup Verification Script
# Run this to verify that npm and git are properly configured

Write-Host "🔍 Verifying npm and git PATH setup..." -ForegroundColor Green
Write-Host ""

# Test npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found in PATH" -ForegroundColor Red
}

# Test git
try {
    $gitVersion = git --version
    Write-Host "✅ git: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ git not found in PATH" -ForegroundColor Red
}

# Test additional git tools
try {
    $bashVersion = bash --version | Select-Object -First 1
    Write-Host "✅ bash: $bashVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  bash not found (Git bin directory may not be in PATH)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Current PATH contains:" -ForegroundColor Cyan
$env:PATH -split ';' | Where-Object { $_ -like "*git*" -or $_ -like "*node*" } | ForEach-Object {
    Write-Host "   - $_" -ForegroundColor White
}

Write-Host ""
Write-Host "✅ PATH verification complete!" -ForegroundColor Green
