@echo off
REM === LaredocMind - Backend Setup Script ===

:venv_check
echo [1/4] Checking for virtual environment...
if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
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
) else (
    echo Poetry is already installed.
)

echo.
echo [4/4] Installing project dependencies with Poetry...
poetry install --no-root

echo.
echo Setup complete. You can now start the backend with run_backend.bat

echo.
echo Press ENTER to exit...
pause >nul
exit