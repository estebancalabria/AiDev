# Clase 8 - 11 de Septiembre de 2025

## Agentes de Software por IA con el CLI
(*Aka : Ingenieros de Sofware con IA)

Existen alternativas pagas que funcionan como Agetes de Software por IA desde el CLI:
* https://www.anthropic.com/claude-code
* https://codeassist.google/
Alternativa Open Source:
* https://aider.chat/

Pasos
1. Tener Python instalado    
    
2. Instalar Aider
   
```cmd
C:\Temp\aidev>python -m pip install aider-install
Requirement already satisfied: aider-install in c:\coding\python\lib\site-packages (0.1.3)
Requirement already satisfied: uv>=0.5.0 in c:\coding\python\lib\site-packages (from aider-install) (0.6.14)
WARNING: Error parsing dependencies of torchsde: .* suffix can only be used with `==` or `!=` operators
    numpy (>=1.19.*) ; python_version >= "3.7"
           ~~~~~~~^

C:\Temp\aidev>aider-install
Resolved 118 packages in 3.07s
Prepared 1 package in 706ms
```
   
3. Sacar una api key de groq

> https://console.groq.com/keys

4. Ejecutar aider

```cmd
aider --model qroq/llama-3.3-70b-versatile --api-key groq=gsk_ptc...
o bien...
SET GROQ_API_KEY=gsk_...
aider --list-models groq/
aider --model qroq/llama-3.3-70b-versatile
```

5. Prompt utilizado

```
Crear una web bien estrucutrada en distitnos archivos htmls, css, javascript que sea una todo list que se vea elegante y profesional
Que sea responsibe. Que use bootstrap importado de un cdn.
```

## Ides con IA

Algunas IDE con IA:
* https://cursor.com/
* https://windsurf.com/editor

Instalemos cursor. Los creadores de cursor dice que la ventaja es que esta herramienta indexa mejor el fuente.

Mirar como se funciona : https://www.youtube.com/shorts/ATcFq2ajjUI

Cargar el proyecto que hicimos con Aider e ir editandolo con cursor haciendo vive coding

## Ingeniero de software con IA

Tenemos a:
* Devin : https://devin.ai/
* Devika : https://devikaai.org/
* Github Copilot Workspace : https://githubnext.com/projects/copilot-workspace

Generan el codigo a partir de un pull request

Pasos 
1. Crear un repo
2. Subir el proyecto anterior
3. Pedirle un cambio con el girhub copilot worspace (crea un branch para todo el cambio)
4. Confirmar el pull request para hacer merge con el brach principal
