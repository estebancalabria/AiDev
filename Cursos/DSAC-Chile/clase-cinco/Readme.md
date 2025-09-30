# Clase Cinco - 29 de Septiembre del 2025

## Repaso

Herramientas
* Lovable
* Replit
* Base44
* Dabase Build

Extensiones
* Quodo

## Scaffolding De Proyectos

Herramienta
> https://bolt.new/

Caracteristicas
* Integracion con Supabase

Puntaje 5/10 (Por tacanio)

## Ingenieros de Sofware con IA

Ingenieros de Software
* Devin (Quedo un poco deprecado, no cumplio lo que prometia)
* Devika (El devin Open Source)
* Aider (Lo conectas por api key a cualquier llm)
* Github copilot Workspace
* Pagos :(
  * Claude Code (https://claude.com/product/claude-code) : Es una herramienta Paga
  * Gemini Code (https://codeassist.google/?hl=es)
  * Codex de OpenAI (https://openai.com/es-419/index/introducing-codex/)

## Aider

Ver su web oficial:
> https://aider.chat/

Vamos a seguir editando el proyecto de bolt.new con Aider ya que nos podemos loguear...

Requisitos:
1) Tener NodeJS instalado (para el proyecto de bolt.new
2) Tener python (para poder ejecutar aider)
3) Ejecutar el proyecto de bolt.new con npm install y luego npm run dev

Ahora si a trabajar con AIDER
* Instalar Aider : pip install aider-install
* Habilitar aider para el proyecto Actual : aider-install
* Sacar una api key de groq desde : https://console.groq.com/home
* Setear la api key en una variable de entorno : SET GROQ_API_KEY=gsk_iIL...
* Probar que se conecta con Groq : aider --list-models groq/
* Para ejecutarlo : aider --model groq/llama-3.3-70b-versatile
* Luego poner el prompt por linea de comando

Si para crear un proyecto nuevo
```txt
Podes crearme en html javascript y css una aplicacion para manejar una todo list
```

Si es para editar el proyecto de bolt.new
1) Primero aagregar el proyecto al github local que tiene bolt para trabajar
2) git add * y luego git commit -m
```txt
No me puedo loguear. Podes agregar hardcodeado en el codigo el usuario root@root.com con password root y hadcodear el resto de las ventanas sin usar la base de datos si uso ese usuario? Crea mocks para todos los datos que sean necesarios.
```

Puntaje : 5/10 (Porque te gasta rapido todos los tokens, tacanio)

# Github copilot Workspace
