@echo off
REM === LaredocMind - Backend Startup Script ===

REM 1. Check if the virtual environment exists
if not exist ".venv" (
    echo Virtual environment not found. Please run setup_backend.bat first.
    exit /b 1
)

REM 2. Activate the virtual environment
call .venv\Scripts\activate

REM 3. Set PYTHONPATH to the src directory
set PYTHONPATH=%CD%

REM 4. Start the backend server
echo Starting backend server...
python src/wsgi.py

REM The backend server will keep running in this window