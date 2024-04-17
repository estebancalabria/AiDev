@echo off
setlocal enabledelayedexpansion

REM Limpiar el archivo de salida si existe
type nul > proyecto.txt

REM Buscar todos los archivos .java y .xml en la carpeta actual y sus subcarpetas
for /r %%i in (*.java, *.xml) do (
    REM Obtener el nombre del archivo sin la ruta
    set "filename=%%~nxi"
    REM Escribir el nombre del archivo en el archivo de salida
    echo //!filename! >> proyecto.txt
    REM Concatenar el contenido del archivo en el archivo de salida
    type "%%i" >> proyecto.txt
    REM Añadir una línea en blanco después del contenido de cada archivo
    echo. >> proyecto.txt
)

echo El archivo proyecto.txt ha sido creado con éxito.
