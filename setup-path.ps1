# PowerShell script to permanently add npm and git to system PATH
# This script must be run as Administrator

# Check if running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "🔧 Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

Write-Host "🔧 Setting up permanent PATH for npm and git..." -ForegroundColor Green

# Get current system PATH
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "Machine")
Write-Host "📋 Current system PATH length: $($currentPath.Length) characters"

# Define paths to add
$pathsToAdd = @(
    "C:\Program Files\nodejs\",
    "C:\Program Files\Git\cmd",
    "C:\Program Files\Git\bin"
)

$pathsAdded = @()
$newPath = $currentPath

foreach ($pathToAdd in $pathsToAdd) {
    if (Test-Path $pathToAdd) {
        if ($newPath -notlike "*$pathToAdd*") {
            $newPath = $newPath.TrimEnd(';') + ";" + $pathToAdd
            $pathsAdded += $pathToAdd
            Write-Host "✅ Will add: $pathToAdd" -ForegroundColor Green
        } else {
            Write-Host "✅ Already exists: $pathToAdd" -ForegroundColor Cyan
        }
    } else {
        Write-Host "⚠️  Path not found: $pathToAdd" -ForegroundColor Yellow
    }
}

if ($pathsAdded.Count -gt 0) {
    try {
        # Set the new PATH
        [Environment]::SetEnvironmentVariable("PATH", $newPath, "Machine")
        Write-Host "🎉 Successfully updated system PATH!" -ForegroundColor Green
        
        # Also update current session PATH
        $env:PATH = $newPath
        Write-Host "🔄 Updated current session PATH" -ForegroundColor Green
        
        Write-Host "`n📋 Added paths:" -ForegroundColor Green
        foreach ($path in $pathsAdded) {
            Write-Host "   - $path" -ForegroundColor White
        }
        
        Write-Host "`n💡 To verify, open a new PowerShell window and run:" -ForegroundColor Yellow
        Write-Host "   git --version" -ForegroundColor White
        Write-Host "   npm --version" -ForegroundColor White
        
    } catch {
        Write-Host "❌ Failed to update PATH: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "✅ All paths already exist in system PATH - no changes needed!" -ForegroundColor Green
}

Write-Host "`n🔍 Testing commands in current session:" -ForegroundColor Yellow
try {
    $gitVersion = & git --version 2>$null
    Write-Host "✅ git: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ git command not found" -ForegroundColor Red
}

try {
    $npmVersion = & npm --version 2>$null
    Write-Host "✅ npm: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm command not found" -ForegroundColor Red
}

Write-Host "`n🎯 Setup complete! You may need to restart your terminal applications." -ForegroundColor Green
