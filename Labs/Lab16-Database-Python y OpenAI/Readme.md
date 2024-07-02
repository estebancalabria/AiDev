# Laboratorio: Uso de IA y LLM para Trabajar con Bases de Datos

## Objetivo
El objetivo de este laboratorio es utilizar un modelo de lenguaje (LLM) para generar un modelo de datos y realizar consultas sobre una base de datos de una biblioteca.

## Requisitos previos
- Python 3.8+
- Librería `openai` instalada (versión 0.27.0 o superior)
- Acceso a la API de OpenAI (clave API)
- SQLite3

## Pasos

### 1. Configuración del entorno
1.1. Instala la librería de OpenAI:
```bash
pip install openai==0.27.0
```

1.2. Crea un nuevo archivo Python llamado `laboratorio_ia_bbdd.py` y añade el siguiente código para configurar OpenAI:
```python
import openai
import os
import sqlite3

# Configura tu clave API de OpenAI como una variable de entorno por seguridad
openai.api_key = os.getenv("OPENAI_API_KEY")

if not openai.api_key:
    raise ValueError("Por favor, configura la variable de entorno OPENAI_API_KEY con tu clave API de OpenAI")
```

### 2. Definición de funciones auxiliares
Añade las siguientes funciones al archivo `laboratorio_ia_bbdd.py`:

```python
def consultar_llm(prompt):
    try:
        respuesta = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=1000
        )
        return respuesta.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error al consultar el LLM: {e}")
        return None

def ejecutar_sql(cursor, sql):
    try:
        cursor.executescript(sql)
        print("SQL ejecutado correctamente")
    except Exception as e:
        print(f"Error al ejecutar SQL: {e}")
```

### 3. Generación del modelo de datos
Añade el siguiente código a `laboratorio_ia_bbdd.py`:

```python
def generar_modelo_datos():
    prompt_modelo = """
    Genera un modelo de datos SQL para un sistema de gestión de una biblioteca. 
    Incluye tablas para libros, autores, préstamos y usuarios. 
    Proporciona el código SQL para crear las tablas con sus relaciones.
    Asegúrate de incluir claves primarias, claves foráneas y al menos un índice.
    """

    modelo_sql = consultar_llm(prompt_modelo)
    print("Modelo de datos generado:")
    print(modelo_sql)

    conn = sqlite3.connect('biblioteca.db')
    cursor = conn.cursor()

    ejecutar_sql(cursor, modelo_sql)

    conn.commit()
    conn.close()

    return modelo_sql
```

### 4. Realización de consultas
Actualiza la función de realizar consultas para que sea más directa:

```python
def realizar_consulta(consulta_usuario):
    prompt_consulta = f"""
    Basándote en un modelo de datos de biblioteca que incluye tablas para libros, autores, préstamos y usuarios:
    
    Genera una consulta SQL para responder a la siguiente pregunta: "{consulta_usuario}"

    Responde solamente con la consulta SQL, sin explicaciones adicionales.
    """

    consulta_sql = consultar_llm(prompt_consulta)
    print("\nConsulta SQL generada:")
    print(consulta_sql)

    conn = sqlite3.connect('biblioteca.db')
    cursor = conn.cursor()

    try:
        cursor.execute(consulta_sql)
        resultados = cursor.fetchall()
        print("\nResultados de la consulta:")
        print(resultados)

    except Exception as e:
        print(f"Error al ejecutar la consulta: {e}")

    conn.close()
```

### 5. Función principal
Mantén la función principal como estaba:

```python
def main():
    modelo_sql = generar_modelo_datos()

    with open('modelo_datos.sql', 'w') as f:
        f.write(modelo_sql)

    consulta_usuario = "Muestra los 5 libros más prestados en el último mes, incluyendo el nombre del libro, el autor y la cantidad de préstamos"
    realizar_consulta(consulta_usuario)

if __name__ == "__main__":
    main()
```

## Ejecución del laboratorio
Para ejecutar el laboratorio, asegúrate de tener configurada la variable de entorno `OPENAI_API_KEY` con tu clave API de OpenAI y luego ejecuta:

```bash
python laboratorio_ia_bbdd.py
```

## Entregables
1. Archivo `laboratorio_ia_bbdd.py` con el código completo del laboratorio.
2. Archivo `modelo_datos.sql` con el modelo de datos SQL generado.
3. Captura de pantalla o archivo de texto con la salida de la ejecución del laboratorio, que debe incluir:
   - El modelo de datos generado
   - La consulta original del usuario
   - La consulta SQL generada por el LLM
   - Los resultados de la ejecución de la consulta

## Notas adicionales
- Este laboratorio utiliza SQLite por su simplicidad, pero los conceptos se pueden aplicar a otros sistemas de gestión de bases de datos.
- Asegúrate de manejar adecuadamente las excepciones y de no exponer tu clave API de OpenAI en el código.
- Los resultados pueden variar debido a la naturaleza estocástica de los modelos de lenguaje.
- Para consultas más complejas o conjuntos de datos más grandes, considera ajustar los parámetros de la API de OpenAI o utilizar modelos más avanzados.
