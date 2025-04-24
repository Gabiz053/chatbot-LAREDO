@echo off
setlocal

REM Obtener la ruta del directorio actual
set "projectRoot=%~dp0"
cd /d "%projectRoot%"

REM Abrir nueva terminal para el setup del frontend
start "Setup Frontend" cmd /k "cd /d %projectRoot%frontend && call setup_frontend.bat"

REM Abrir nueva terminal para el setup del backend
start "Setup Backend" cmd /k "cd /d %projectRoot%backend && call setup_backend.bat"

endlocal
