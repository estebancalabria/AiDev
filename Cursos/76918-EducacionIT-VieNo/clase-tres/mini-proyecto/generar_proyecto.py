import os
import groq

def procesar_archivos_js(ruta_entrada, ruta_salida):
    # Obtener API key
    api_key = input("Ingrese su API key de Groq: ")
    client = groq.Client(api_key=api_key)
    
    # Crear directorio de salida si no existe
    os.makedirs(ruta_salida, exist_ok=True)
    
    # Recorrer archivos JS
    for raiz, dirs, archivos in os.walk(ruta_entrada):
        for archivo in archivos:
            if archivo.endswith('.js'):
                ruta_completa = os.path.join(raiz, archivo)
                
                # Calcular ruta relativa y crear estructura en destino
                ruta_relativa = os.path.relpath(raiz, ruta_entrada)
                ruta_destino = os.path.join(ruta_salida, ruta_relativa)
                os.makedirs(ruta_destino, exist_ok=True)
                
                try:
                    # Leer archivo JS
                    with open(ruta_completa, 'r', encoding='utf-8') as f:
                        codigo_js = f.read()
                    
                    # Procesar con Groq
                    response = client.chat.completions.create(
                        model="llama-3.3-70b-versatile",
                        messages=[
                            {
                                "role": "system",
                                "content": "Eres un traductor especializado en convertir código JavaScript que utiliza require a la sintaxis moderna de import. Tu tarea es recibir un fragmento de código fuente en JavaScript que usa require y devolver el mismo código modificado para que use la sintaxis import .. from .... Responde únicamente con el código convertido, sin agregar explicaciones ni comentarios adicionales y no utilizar markdown."
                            },
                            {
                                "role": "user", 
                                "content": codigo_js
                            }
                        ],
                        temperature=0
                    )
                    
                    # Guardar resultado manteniendo el mismo nombre
                    nombre_salida = os.path.join(ruta_destino, archivo)
                    with open(nombre_salida, 'w', encoding='utf-8') as f:
                        f.write(response.choices[0].message.content)
                        
                    print(f"Procesado: {ruta_completa} -> {nombre_salida}")
                    
                except Exception as e:
                    print(f"Error procesando {ruta_completa}: {str(e)}")

# Ejecutar el proceso
procesar_archivos_js('./proyecto', './proyecto-salida')