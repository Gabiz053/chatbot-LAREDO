@echo off
REM === LaredocMind - Backend Setup Script ===

echo =============================================
echo   Starting LaredocMind Backend Setup...
echo =============================================

:venv_check
echo [1/4] Checking for virtual environment...
if not exist ".venv" (
    echo Creating virtual environment with Python 3.11...
    py -3.11 -m venv .venv
)

REM Check if activate script exists
if not exist ".venv\Scripts\activate" (
    echo ERROR: Activation script not found. Deleting and retrying...
    rmdir /s /q .venv
    goto venv_check
) else (
    echo Virtual environment is ready.
)

echo.
echo [2/4] Activating virtual environment...
call .venv\Scripts\activate

echo.
echo [3/4] Checking for Poetry installation...
poetry --version >nul 2>&1
if errorlevel 1 (
    echo Poetry not found. Installing Poetry...
    pip install poetry
    poetry --version >nul 2>&1
    if errorlevel 1 (
        echo ERROR: Poetry installation failed. Please ensure Python Scripts directory is in your PATH.
        exit /b 1
    )
) else (
    echo Poetry is already installed.
)

echo.
echo [4/4] Installing project dependencies with Poetry...
poetry install --no-root

exit /b 0