@echo off
REM === LaredocMind - Frontend Production Start Script ===

REM 1. Check that the build exists
if not exist dist (
    echo Production build not found. Please run setup_frontend.bat first.
    exit /b 1
)

REM 2. Check if 'serve' is installed globally
where serve >nul 2>nul
if %errorlevel% neq 0 (
    echo 'serve' not found. Installing it globally...
    npm install -g serve
)

REM 3. Serve the production build
serve -s dist -l 22000

REM The production build will be served in this window
