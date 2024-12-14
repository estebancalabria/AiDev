

import zipfile
import os

def descomprimir_zip(archivo_zip, carpeta_destino):
    # Asegurarse de que la carpeta destino existe
    if not os.path.exists(carpeta_destino):
        os.makedirs(carpeta_destino)
        
    # Descomprimir el archivo
    with zipfile.ZipFile(archivo_zip, 'r') as zip_ref:
        zip_ref.extractall(carpeta_destino)

# Llamada a la función
archivo = 'proyecto.zip'
destino = '/proyecto'
descomprimir_zip(archivo, destino)
