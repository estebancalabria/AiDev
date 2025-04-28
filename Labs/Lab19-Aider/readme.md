# Laboratorio: Uso de Aider con Claude 3.5 Sonnet para Desarrollo Asistido por IA

## Objetivo

En este laboratorio, aprenderemos a configurar y usar Aider, una herramienta de programación asistida por IA, en conjunto con el modelo de lenguaje Claude 3.5 Sonnet para crear una aplicación web simple.

## Links

* https://aider.chat/
* https://github.com/paul-gauthier/aider
* https://console.anthropic.com/

## Prerrequisitos

- Python instalado en tu sistema
- Visual Studio Code (o tu editor de código preferido)
- Git instalado en tu sistema
- Una cuenta en Anthropic para obtener una clave API

## Paso 1: Instalación de Aider

1. Abre una terminal o línea de comandos.
2. Ejecuta el siguiente comando para instalar Aider:

```
pip install aider-chat
```


## Paso 2: Preparación del proyecto

1. Crea un nuevo directorio para tu proyecto:

```
mkdir mi_proyecto_aider
cd mi_proyecto_aider
```

2. Inicializa un repositorio Git:

```
git init .
```

## Paso 3: Configuración de la clave API de Anthropic

1. Ve al sitio web de Anthropic o Groq y crea una cuenta si aún no tienes una.
2. Genera una clave API en tu panel de control.
3. En tu terminal, configura la variable de entorno con tu clave API:

Para Claude 

```
SET ANTHROPIC_API_KEY=tu_clave_api_aquí
```

Para Groq   

```
SET GROQ_API_KEY =tu_clave_api_aquí
```

## Paso 4: Iniciando Aider

1. En el directorio de tu proyecto, inicia Aider con el siguiente comando:

Para Claude
```
aider --model claude-3-sonnet-20240229
```

Para Groq (Otra opcion es ponerle ahi la api key)

'''
# List models available from Groq
aider --list-models groq/

aider --model aider --model groq/llama3-70b-8192  --api-key groq=<key>
'''

## Paso 5: Creando una aplicación web simple

1. Una vez que Aider esté en ejecución, usa el siguiente prompt para crear una aplicación web simple:

```
Crea una aplicación web simple utilizando HTML, CSS y JavaScript que muestre un contador. La aplicación debe tener un botón para incrementar el contador y otro para decrementarlo.
```

2. Aider generará el código necesario. Revisa los archivos creados en tu directorio de proyecto.

## Paso 6: Refinando la aplicación

1. Después de que Aider haya generado la aplicación inicial, puedes pedir mejoras. Por ejemplo:

```
Añade un botón para resetear el contador a cero.
```

2. Aider modificará el código existente para incluir esta nueva funcionalidad.

## Paso 7: Ejecutando la aplicación

1. Abre el archivo HTML generado en tu navegador para ver y probar la aplicación.

## Paso 8: Experimentación adicional

1. Intenta pedir a Aider que añada más funcionalidades o que modifique el estilo de la aplicación.
2. Experimenta con diferentes tipos de aplicaciones o componentes.

## Conclusión

En este laboratorio, has aprendido a configurar Aider, usarlo con Claude 3.5 Sonnet para generar una aplicación web simple, y cómo hacer refinamientos iterativos. Esta herramienta puede ser muy útil para prototipado rápido y para entender cómo la IA puede asistir en el proceso de desarrollo de software.

## Recursos adicionales

- [Documentación oficial de Aider](https://aider.chat/)
- [Más información sobre Claude 3.5 Sonnet](https://www.anthropic.com)
