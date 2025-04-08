@echo off
:: Establecer PYTHONPATH permanentemente a la carpeta actual
setx PYTHONPATH "%cd%"

:: Verificar que se ha configurado correctamente
echo PYTHONPATH se ha configurado permanentemente a: %cd%