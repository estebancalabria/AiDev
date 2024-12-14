# Quiero descomprimir un archivo. Tengo un archivo zip proyecto.zip y quiero descomprimirlo en la carpeta /proyecto

import zipfile

def descomprimir_zip(archivo_zip, carpeta_destino):
    with zipfile.ZipFile(archivo_zip, 'r') as zip_ref:
        zip_ref.extractall(carpeta_destino)

# Llamada a la función
descomprimir_zip('proyecto.zip', '/proyecto')



