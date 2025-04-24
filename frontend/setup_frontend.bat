@echo off
REM === LaredocMind - Frontend Final Setup Script ===

echo Installing Node.js dependencies...
call npm install

echo.
echo Building production frontend...
call npm run build

echo.
echo Setup and build complete. You can start the frontend.

echo.
echo Press ENTER to exit...
pause >nul
