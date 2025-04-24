@echo off
setlocal

REM Obtener la ruta del directorio actual
set "projectRoot=%~dp0"
cd /d "%projectRoot%"

REM Abrir nueva terminal para el frontend (ejecuta run_frontend.bat)
start "Frontend" cmd /k "cd /d %projectRoot%frontend && call run_frontend.bat"

REM Abrir nueva terminal para el backend (ejecuta run_backend.bat)
start "Backend" cmd /k "cd /d %projectRoot%backend && call run_backend.bat"

endlocal
