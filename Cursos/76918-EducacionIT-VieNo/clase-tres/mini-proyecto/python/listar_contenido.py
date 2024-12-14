import os

def mostrar_archivos_js(ruta):
    for raiz, dirs, archivos in os.walk(ruta):
        for archivo in archivos:
            if archivo.endswith('.js'):
                ruta_completa = os.path.join(raiz, archivo)
                try:
                    with open(ruta_completa, 'r', encoding='utf-8') as f:
                        contenido = f.read()
                        print(f"\nArchivo: {ruta_completa}")
                        print(f"Contenido:\n{contenido}")
                        print("-" * 50)
                except Exception as e:
                    print(f"Error al leer {ruta_completa}: {str(e)}")

# Llamar a la función con la ruta de tu proyecto
mostrar_archivos_js('./proyecto')
