# Laboratorio: GitHub Copilot Instructions + Copilot Inline Chat (CTRL+I)

## Resumen
En este laboratorio vas a aprender a:
- Crear un proyecto desde cero.
- Probar Copilot sin instrucciones usando Ctrl+I.
- Agregar un archivo `.github/copilot-instructions.md`.
- Activar el uso de instrucciones en VS Code.
- Forzar la recarga de instrucciones.
- Volver a generar la misma función para ver el “antes” y el “después”.
- Entender por qué el autocompletado no siempre aplica instrucciones.

## 1. Crear el proyecto
1. Crear una carpeta nueva o repo vacío.
2. Abrirla en VS Code.
3. Asegurarse de tener habilitado:
   - GitHub Copilot
   - GitHub Copilot Chat

## 2. Prueba “ANTES”
1. Crear archivo `test.js`.
2. Colocar el cursor en cualquier lugar vacío del archivo.
3. Presionar **Ctrl+I** (Copilot Inline Chat).
4. Escribir:
   Generá una función que ordene números
5. Guardar el resultado como **ANTES**.

## 3. Crear las instrucciones del repositorio
1. Crear la carpeta `.github` en la raíz.
2. Crear el archivo:

```
.github/copilot-instructions.md
```

3. Pegar:

```
# Instrucciones del repositorio

Copilot debe generar siempre funciones:

- bien nombradas comienzan con prefijo fn
- con validaciones de entrada
- sin modificar arrays originales
- con explicación en comentarios arriba de la función

applyTo: "**"
```

4. Guardar el archivo.

## 4. Verificar que las instrucciones estén habilitadas
1. Ir a Settings.
2. Buscar “Use Instruction Files”.
3. Confirmar que esté habilitado en:
   GitHub > Copilot > Chat: Use Instruction Files

## 5. Hacer que Copilot recargue las instrucciones
1. Abrir Copilot Chat.
2. Escribir:

```
reload repository instructions
```

3. Verificar que aparezca:
   “Loaded instructions from .github/copilot-instructions.md”

## 6. Prueba “DESPUÉS”
1. Generar Archivo `test2.js`.
2. Colocar el cursor en un espacio vacío.
3. Presionar **Ctrl+I**.
4. Escribir exactamente el mismo prompt:
   Generá una función que ordene números
5. Guardar el resultado como **DESPUÉS**.

El resultado **DESPUÉS** debería cumplir:
- nombre con prefijo `fn`
- validaciones de entrada
- no modificar el array original
- comentario explicativo encima

## Aclaración importante
En algunos casos, el autocompletado pasivo de Copilot no aplica las instrucciones.  
El método más confiable es usar **Ctrl+I** o **Copilot Chat** para que el archivo `copilot-instructions.md` se aplique realmente.
