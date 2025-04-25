@echo off
setlocal

REM Get the current directory path
set "projectRoot=%~dp0"
cd /d "%projectRoot%"

REM Open a new terminal for the frontend (runs run_frontend.bat)
start "Frontend" cmd /k "cd /d %projectRoot%frontend && call run_frontend.bat"

REM Open a new terminal for the backend (runs run_backend.bat)
start "Backend" cmd /k "cd /d %projectRoot%backend && call run_backend.bat"

endlocal
