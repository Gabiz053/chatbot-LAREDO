@echo off
setlocal

REM Obtener la ruta del directorio actual
set "projectRoot=%~dp0"
cd /d "%projectRoot%"

REM Abrir nueva terminal para el frontend
start "Frontend" powershell -NoExit -Command "cd '%projectRoot%frontend'; npm run dev"

REM Abrir nueva terminal para el backend
start "Backend" powershell -NoExit -Command "cd '%projectRoot%backend'; .\init.bat; .\.venv\Scripts\Activate.ps1; python src/wsgi.py"

endlocal
