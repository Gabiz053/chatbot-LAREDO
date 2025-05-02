@echo off
setlocal enabledelayedexpansion

REM Check Python 3.11
where python >nul 2>nul
if errorlevel 1 goto install_python
for /f "tokens=2 delims= " %%a in ('python --version 2^>nul') do set "PYTHON_VERSION=%%a"
echo !PYTHON_VERSION! | findstr /b "3.11" >nul
if errorlevel 1 goto install_python

REM Check Node.js
where node >nul 2>nul
if errorlevel 1 goto install_node

REM Check .env
if not exist "%~dp0backend\.env" (
    echo ERROR: .env file not found in backend folder.
    pause
    exit /b 1
)

REM Start setup scripts
echo All dependencies installed. Starting setup scripts...
start "Frontend" cmd /k "cd /d %~dp0frontend && call setup_frontend.bat"
start "Backend" cmd /k "cd /d %~dp0backend && call setup_backend.bat"
endlocal
pause
exit /b 0

:install_python
echo Python 3.11 not found. Installing...
winget install --id Python.Python.3.11 --source winget --accept-package-agreements --accept-source-agreements --silent --scope user
if errorlevel 1 (
    echo Failed to install Python automatically. Opening download page...
    start https://www.python.org/downloads/release/python-3110/
    pause
    exit /b 1
)
REM Add Python to PATH for current session
for /f "delims=" %%p in ('where python') do set "PYTHON_PATH=%%~dpsp"
set "PATH=%PYTHON_PATH%;%PATH%"
echo Python 3.11 installed and PATH updated.
goto :check_node

:install_node
echo Node.js not found. Installing...
winget install --id OpenJS.NodeJS.LTS --source winget --accept-package-agreements --accept-source-agreements --silent --scope user
if errorlevel 1 (
    echo Failed to install Node.js automatically. Opening download page...
    start https://nodejs.org/
    pause
    exit /b 1
)
REM Add Node.js to PATH for current session
for /f "delims=" %%n in ('where node') do set "NODE_PATH=%%~dpn"
set "PATH=%NODE_PATH%;%PATH%"
echo Node.js installed and PATH updated.

:check_node
REM Re-check Node.js after install
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js installation failed or not found in PATH.
    pause
    exit /b 1
)
REM Re-check Python after install
where python >nul 2>nul
if errorlevel 1 (
    echo ERROR: Python installation failed or not found in PATH.
    pause
    exit /b 1
)
goto :eof