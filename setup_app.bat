@echo off
setlocal enabledelayedexpansion

REM === Main execution flow ===
set PYTHON_INSTALLED=
set NODE_INSTALLED=
call :check_winget
call :check_python
call :check_node

REM Check if a restart is needed after installations
call :check_need_restart

call :check_env
call :setup_all

echo.
echo All frontend and backend dependencies installed and setup scripts completed.
echo.
echo Press ENTER to exit...
pause >nul
endlocal
exit /b 0

REM === Functions below ===
:check_winget
    for /f "delims=" %%v in ('winget --version 2^>nul') do set "WINGET_VERSION=%%v"
    if not defined WINGET_VERSION (
        echo ERROR: winget App Installer is not installed or not available in PATH.
        echo Please install winget manually from the Microsoft Store and re-run this script.
        pause
        exit 1
    )
    exit /b 0

:check_python
    where python >nul 2>nul
    if errorlevel 1 goto install_python
    for /f "tokens=2 delims= " %%a in ('py -3.11 --version 2^>nul') do set "PYTHON_VERSION=%%a"
    echo !PYTHON_VERSION! | findstr /b "3.11" >nul
    if errorlevel 1 goto install_python
    exit /b 0

:install_python
    echo Python 3.11 not found. Installing...
    winget install --id Python.Python.3.11 --source winget --accept-package-agreements --accept-source-agreements --silent --scope user
    if errorlevel 1 (
        echo Failed to install Python automatically. Opening download page...
        start https://www.python.org/downloads/release/python-3110/
        pause
        exit 1
    )
    set PYTHON_INSTALLED=1
    exit /b 0

:check_node
    where node >nul 2>nul
    if errorlevel 1 goto install_node
    exit /b 0

:install_node
    echo Node.js not found. Installing...
    winget install --id OpenJS.NodeJS.LTS --source winget --accept-package-agreements --accept-source-agreements --silent
    if errorlevel 1 (
        echo Failed to install Node.js automatically. Opening download page...
        start https://nodejs.org/
        pause
        exit 1
    )
    set NODE_INSTALLED=1
    exit /b 0

:check_env
    if not exist "%~dp0backend\.env" (
        echo ERROR: .env file not found in backend folder.
        pause
        exit 1
    )
    exit /b 0

:setup_all
    cd /d "%~dp0frontend"
    call setup_frontend.bat
    cd /d "%~dp0backend"
    call setup_backend.bat
    cd /d "%~dp0"
    exit /b 0

:check_need_restart
    if defined PYTHON_INSTALLED set NEED_RESTART=1
    if defined NODE_INSTALLED set NEED_RESTART=1
    if defined NEED_RESTART (
        echo.
        echo ============================================================
        echo   IMPORTANT: PYTHON AND/OR NODE.JS HAVE JUST BEEN INSTALLED!
        echo ============================================================
        echo.
        echo Please CLOSE this window and RUN setup_app.bat AGAIN
        echo so the new installations are detected and used.
        echo.
        echo Press ENTER to exit...
        pause >nul
        exit 0
    )
    exit /b 0