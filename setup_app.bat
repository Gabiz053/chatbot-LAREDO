@echo off
setlocal

set "python_installed_now=0"
set "node_installed_now=0"
set "vc_redist_installed_now=0"

REM Check if Python is installed
where python >nul 2>nul
if errorlevel 1 (
    echo Python is not installed. Trying to install Python with winget...
    winget install --id Python.Python.3.13 --source winget --accept-package-agreements --accept-source-agreements
    if errorlevel 1 (
        echo Failed to install Python automatically. Opening download page...
        timeout /t 2 /nobreak >nul
        start https://www.python.org/downloads/
        pause
        exit /b 1
    )
    set "python_installed_now=1"
)

REM Check Python version
for /f "tokens=2 delims= " %%a in ('python --version 2^>nul') do set "PYTHON_VERSION=%%a"

if not defined PYTHON_VERSION (
    echo ERROR: Python installation failed or not found.
    pause
    exit /b 1
)

echo Detected Python version: %PYTHON_VERSION%

REM Check if Python version starts with 3.13
echo %PYTHON_VERSION% | findstr /b "3.13" >nul
if errorlevel 1 (
    echo ERROR: Python 3.13 is required, but found version %PYTHON_VERSION%.
    echo Trying to install correct version with winget...
    winget install --id Python.Python.3.13 --source winget --accept-package-agreements --accept-source-agreements
    if errorlevel 1 (
        echo Failed to install Python 3.13 automatically. Opening download page...
        timeout /t 2 /nobreak >nul
        start https://www.python.org/downloads/
        pause
        exit /b 1
    )
    set "python_installed_now=1"
)

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is not installed. Trying to install Node.js with winget...
    winget install --id OpenJS.NodeJS.LTS --source winget --accept-package-agreements --accept-source-agreements
    if errorlevel 1 (
        echo Failed to install Node.js automatically. Opening download page...
        timeout /t 2 /nobreak >nul
        start https://nodejs.org/
        pause
        exit /b 1
    )
    set "node_installed_now=1"
)

REM If either was installed now, notify and exit
if "%python_installed_now%"=="1" (
    echo Python was just installed or corrected. Please restart the installer.
    pause
    exit /b 1
)

if "%node_installed_now%"=="1" (
    echo Node.js was just installed. Please restart the installer.
    pause
    exit /b 1
)

REM Check if VC++ Redistributable is installed (using winget to check by package ID)
winget list --id Microsoft.VC.Redist.x64 >nul 2>nul
if errorlevel 1 (
    echo VC++ Redistributable is not installed. Trying to install with winget...
    winget install --id Microsoft.VC.Redist.x64 --source winget --accept-package-agreements --accept-source-agreements
    if errorlevel 1 (
        echo Failed to install VC++ Redistributable automatically. Opening download page...
        timeout /t 2 /nobreak >nul
        start https://learn.microsoft.com/es-es/cpp/windows/latest-supported-vc-redist?view=msvc-170
        pause
        exit /b 1
    )
    set "vc_redist_installed_now=1"
)

REM If VC++ Redistributable was installed now, notify and exit
if "%vc_redist_installed_now%"=="1" (
    echo VC++ Redistributable was just installed. Please restart the installer.
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

REM If everything is OK, open terminals for frontend and backend setup
echo All dependencies installed previously and environment files found. Starting setup scripts...

start "Setup Frontend" cmd /k "cd /d %projectRoot%frontend && call setup_frontend.bat"
start "Setup Backend" cmd /k "cd /d %projectRoot%backend && call setup_backend.bat"

endlocal
