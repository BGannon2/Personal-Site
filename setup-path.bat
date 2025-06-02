@echo off
echo Setting up npm and git in system PATH...
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo ✅ Running as Administrator
) else (
    echo ❌ This script must be run as Administrator!
    echo 🔧 Right-click this file and select "Run as administrator"
    pause
    exit /b 1
)

echo.
echo 🔧 Adding npm and git to system PATH...

REM Add Node.js to PATH
set "NODEJS_PATH=C:\Program Files\nodejs\"
echo Adding Node.js path: %NODEJS_PATH%
setx PATH "%PATH%;%NODEJS_PATH%" /M >nul 2>&1

REM Add Git cmd to PATH  
set "GIT_CMD_PATH=C:\Program Files\Git\cmd"
echo Adding Git cmd path: %GIT_CMD_PATH%
setx PATH "%PATH%;%GIT_CMD_PATH%" /M >nul 2>&1

REM Add Git bin to PATH
set "GIT_BIN_PATH=C:\Program Files\Git\bin"
echo Adding Git bin path: %GIT_BIN_PATH%
setx PATH "%PATH%;%GIT_BIN_PATH%" /M >nul 2>&1

echo.
echo 🎉 PATH updated successfully!
echo.
echo 💡 To verify the setup, open a new Command Prompt or PowerShell and run:
echo    git --version
echo    npm --version
echo.
echo 🔄 You may need to restart your terminal applications for changes to take effect.
echo.
pause
