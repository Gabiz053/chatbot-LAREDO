@echo off
setlocal

REM Check Python 3.13
where python >nul 2>nul
if errorlevel 1 goto install_python
for /f "tokens=2 delims= " %%a in ('python --version 2^>nul') do set "PYTHON_VERSION=%%a"
echo %PYTHON_VERSION% | findstr /b "3.13" >nul
if errorlevel 1 goto install_python

REM Check Node.js
where node >nul 2>nul
if errorlevel 1 goto install_node

REM Check VC++ Redistributable
winget list --id Microsoft.VCRedist.2015+.x64 >nul 2>nul
if errorlevel 1 goto install_vcredist

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
echo Python 3.13 not found. Installing...
winget install --id Python.Python.3.13 --source winget --accept-package-agreements --accept-source-agreements
if errorlevel 1 (
    echo Failed to install Python automatically. Opening download page...
    start https://www.python.org/downloads/
    pause
    exit /b 1
)
echo Please restart the installer.
pause
exit /b 1

:install_node
echo Node.js not found. Installing...
winget install --id OpenJS.NodeJS.LTS --source winget --accept-package-agreements --accept-source-agreements
if errorlevel 1 (
    echo Failed to install Node.js automatically. Opening download page...
    start https://nodejs.org/
    pause
    exit /b 1
)
echo Please restart the installer.
pause
exit /b 1

:install_vcredist
echo VC++ Redistributable not found. Installing...
winget install --id=Microsoft.VCRedist.2015+.x64  -e --accept-package-agreements --accept-source-agreements
if errorlevel 1 (
    echo Failed to install VC++ Redistributable automatically. Opening download page...
    start https://learn.microsoft.com/es-es/cpp/windows/latest-supported-vc-redist?view=msvc-170#latest-microsoft-visual-c-redistributable-version
    pause
    exit /b 1
)
echo Please restart the installer.
pause
exit /b 1
