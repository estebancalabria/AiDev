## Prompt:
Quiero hacer un script que parado en una carpeta tome todos los archivos .java y .xml de esa carpeta y subcarpetas y genere un unico archivo con el contenido de todos los archivos. El archivo de salida se llama proyecto,txt. Quiero que antes de poner el contenido de cada archivo agregue una linea de la forma //\[nombre del archivo\] que diga a que archivo corresponde el contenido que sigue a continuacion

## Response:
Puedes lograr esto utilizando un script de shell en sistemas Unix o Linux. Aquí tienes un ejemplo de cómo podrías hacerlo usando el comando `find` para buscar todos los archivos `.java` y `.xml`, y luego iterar sobre ellos para concatenar su contenido en un archivo llamado `proyecto.txt`, agregando una línea con el nombre del archivo antes de cada contenido:

```bash
bash#!/bin/bash

# Limpiar el archivo de salida si existe
> proyecto.txt

# Buscar todos los archivos .java y .xml en la carpeta actual y sus subcarpetas
find . -type f \( -name "*.java" -o -name "*.xml" \) | while read -r file; do
    # Obtener el nombre del archivo sin la ruta
    filename=$(basename -- "$file")
    # Escribir el nombre del archivo en el archivo de salida
    echo "//$filename" >> proyecto.txt
    # Concatenar el contenido del archivo en el archivo de salida
    cat "$file" >> proyecto.txt
    # Añadir una línea en blanco después del contenido de cada archivo
    echo >> proyecto.txt
done

echo "El archivo proyecto.txt ha sido creado con éxito."
```

Para usar este script:

1. Copia y pega el código en un archivo de texto.
2. Guarda el archivo con un nombre como `concatenar_archivos.sh`.
3. Abre una terminal en la carpeta donde se encuentra este archivo.
4. Dale permisos de ejecución al script con el comando `chmod +x concatenar_archivos.sh`.
5. Ejecuta el script con `./concatenar_archivos.sh`.

Este script buscará todos los archivos `.java` y `.xml` en la carpeta actual y sus subcarpetas, y creará un archivo llamado `proyecto.txt` que contendrá el contenido de todos esos archivos, con una línea que indica el nombre de cada archivo antes de su contenido.

## Prompt:
migramelo a cmd

## Response:
Por supuesto, en Windows puedes hacerlo utilizando un script por lotes de CMD. Aquí tienes una versión adaptada del script para CMD:

```batch
batch@echo off
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
```

Para usar este script:

1. Copia y pega el código en un archivo de texto.
2. Guarda el archivo con un nombre como `concatenar_archivos.bat`.
3. Abre una ventana del símbolo del sistema en la carpeta donde se encuentra este archivo.
4. Ejecuta el script con `concatenar_archivos.bat`.

Este script buscará todos los archivos `.java` y `.xml` en la carpeta actual y sus subcarpetas, y creará un archivo llamado `proyecto.txt` que contendrá el contenido de todos esos archivos, con una línea que indica el nombre de cada archivo antes de su contenido.

