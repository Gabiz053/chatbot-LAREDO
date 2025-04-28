@echo off
setlocal

REM Check if Python is installed
where python >nul 2>nul
if errorlevel 1 (
    echo Python is not installed. Opening download page...
    timeout /t 1 /nobreak >nul
    start https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is not installed. Opening download page...
    timeout /t 1 /nobreak >nul
    start https://nodejs.org/
    pause
    exit /b 1
)

REM Get the current directory path
set "projectRoot=%~dp0"
cd /d "%projectRoot%"

REM Check if .env exists in backend
if not exist "%projectRoot%backend\.env" (
    echo ERROR: .env file not found in backend folder.
    pause
    exit /b 1
)

REM Open a new terminal for frontend setup
start "Setup Frontend" cmd /k "cd /d %projectRoot%frontend && call setup_frontend.bat"

REM Open a new terminal for backend setup
start "Setup Backend" cmd /k "cd /d %projectRoot%backend && call setup_backend.bat"

endlocal