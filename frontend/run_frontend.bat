@echo off
REM === LaredocMind - Frontend Production Start Script ===

REM 1. Check that the build exists
if not exist dist (
    echo Production build not found. Please run setup_frontend.bat first.
    pause
    exit /b 1
)

REM 2. Check if 'serve' is installed locally
if not exist node_modules\.bin\serve (
    echo 'serve' not found locally. Installing it locally...
    npm install serve
)

REM 3. Serve the production build using the local serve
echo Starting frontend server...
call node_modules\.bin\serve -s dist -l 22000

REM The production build will be served in this window