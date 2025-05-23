# 🎮 Laboratorio: Juego de Preguntas y Respuestas con Vibe Coding y Cursor AI

Bienvenido al laboratorio de **Vibe Coding con Cursor**. En este ejercicio vamos a construir, sin escribir todo el código a mano, un **juego de preguntas y respuestas** atractivo, funcional y modular usando:

- 🧠 **Vibe Coding**: guiar a la IA con prompts bien pensados  
- 💻 **HTML + JavaScript + CSS (Bootstrap)**  
- 🧩 **Web Components** para una estructura moderna  
- ⚙️ **Cursor AI** como copiloto de desarrollo  

---

## 🧭 Objetivo

Desarrollar una aplicación web que permita jugar trivia de 10 preguntas elegidas al azar según una **temática** seleccionada. El juego incluye:

- Pantalla de bienvenida con ingreso de nombre y elección de categoría  
- Preguntas tipo multiple choice  
- Indicador de progreso  
- Pantalla final con puntaje y feedback personalizado  

---

## 🧰 Requisitos

- Tener instalado Cursor (https://www.cursor.so/)  
- Crear un nuevo proyecto de HTML/JS  
- Activar la IA y trabajar en modo Vibe Coding  

---

## 🧪 Paso a Paso

### 1. Crear los archivos base del proyecto

> Prompt sugerido para Cursor:
>
> Quiero crear un juego de preguntas y respuestas. Usá HTML, JavaScript y Bootstrap. Las preguntas deben estar almacenadas en un JSON, clasificadas por categorías (Historia, Ciencia, Geografía, etc.). Al iniciar el juego el usuario debe elegir su nombre y la temática. Luego se muestran 10 preguntas al azar de esa categoría, una por una, con opciones multiple choice. Al finalizar se muestra el puntaje y un mensaje personalizado. Que sea atractivo, visual, divertido y fácil de usar.

Cursor te sugerirá crear varios archivos como:

- index.html  
- questions.js  
- styles.css  
- welcome-screen.js  
- game-screen.js  
- results-screen.js  

---

### 2. Organizar las preguntas por categorías

> Prompt sugerido:
>
> Organizá las preguntas en un objeto categories con al menos 6 categorías diferentes. Cada una debe tener 10 preguntas, su nombre y un icono.

---

### 3. Modularizar usando Web Components

> Prompt sugerido:
>
> Quiero que la app esté dividida en Web Components. Uno para la pantalla de bienvenida (input + selección de categoría), uno para el juego y uno para los resultados. Usá Shadow DOM y definí cada componente en su archivo propio.

---

### 4. Ajustes de diseño y experiencia

> Prompt sugerido:
>
> Quiero que el botón "Comenzar juego" ocupe todo el ancho. También quiero que todas las pantallas estén centradas verticalmente, se ajusten al alto de la pantalla y no haya que hacer scroll.

---

## 🧠 Tips de Vibe Coding

- Pensá como diseñador de experiencia: qué quiere ver el usuario  
- Redactá bien tu intención antes de escribir código  
- Usá iteraciones cortas: “ajustá el botón”, “cambiá el color”, “agregá más preguntas”  
- Usá nuevos chats si algo se rompe  
- Documentá los prompts que usás para replicarlos  

---

## ✅ Entregable

Al finalizar deberías tener una estructura como esta:

- 📁 components/  
  ├─ welcome-screen.js  
  ├─ game-screen.js  
  └─ results-screen.js  
- 📄 index.html  
- 📄 questions.js  
- 📄 styles.css  

Y al abrir `index.html`, deberías poder jugar tu trivia personalizada 🧠🎉

---

## 🧑‍🏫 ¿Qué aprendiste?

✔️ Modularizar con Web Components  
✔️ Usar IA para generar y mejorar código  
✔️ Pensar productos desde la experiencia de usuario  
✔️ Redactar especificaciones efectivas para trabajar con IA  

---

¿Querés más labs como este?  
Sígueme en IG 👉 [@tuusuario](https://instagram.com/tuusuario) o LinkedIn 👉 [Esteban Calabria](https://www.linkedin.com/in/tuusuario)