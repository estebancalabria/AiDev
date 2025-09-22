# 🎮 Shooter 3D - Juego con Three.js

Un juego shooter en primera persona desarrollado con Three.js y JavaScript vanilla.

## 🚀 Características

- **Gráficos 3D** - Renderizado con Three.js
- **Controles FPS** - Movimiento WASD + mouse
- **Sistema de armas** - Disparo, recarga y munición
- **Enemigos AI** - Enemigos que persiguen al jugador
- **Sistema de puntuación** - Puntos por eliminar enemigos
- **Múltiples niveles** - Dificultad progresiva
- **Efectos visuales** - Partículas, sombras y iluminación
- **UI completa** - HUD con información del juego

## 🎯 Objetivo del Juego

Elimina a todos los enemigos rojos que aparecen en el mapa mientras evitas que te toquen. Cada enemigo eliminado te da puntos, y cada nivel aumenta la dificultad.

## 🎮 Controles

- **W, A, S, D** - Moverse
- **Mouse** - Mirar alrededor
- **Click izquierdo** - Disparar
- **R** - Recargar arma
- **ESC** - Pausar/Reanudar juego

## 🛠️ Instalación y Ejecución

### Prerrequisitos
- Node.js (opcional, para servidor local)
- Navegador web moderno con soporte para WebGL

### Método 1: Servidor Local (Recomendado)
```bash
# Instalar dependencias
npm install

# Ejecutar servidor local
npm start
```

### Método 2: Servidor HTTP Simple
```bash
# Si tienes Python instalado
python -m http.server 8080

# O con Node.js
npx http-server . -p 8080 -o
```

### Método 3: Abrir directamente
Simplemente abre `index.html` en tu navegador (puede tener limitaciones de CORS).

## 📁 Estructura del Proyecto

```
shooter-3d-game/
├── index.html          # Página principal
├── package.json        # Dependencias y scripts
├── README.md          # Este archivo
└── js/                # Código JavaScript
    ├── main.js        # Punto de entrada
    ├── Game.js        # Lógica principal del juego
    ├── Player.js      # Control del jugador
    ├── Enemy.js       # IA de enemigos
    ├── Weapon.js      # Sistema de armas
    ├── Scene.js       # Escena 3D y entorno
    ├── Input.js       # Manejo de controles
    └── UI.js          # Interfaz de usuario
```

## 🎨 Características Técnicas

### Gráficos
- **Three.js** para renderizado 3D
- **Sombras dinámicas** con PCF Soft Shadow Map
- **Iluminación** ambiental y direccional
- **Efectos de partículas** para explosiones
- **Skybox** con gradiente de colores

### Física
- **Gravedad** realista para el jugador
- **Detección de colisiones** entre balas, enemigos y jugador
- **Sistema de salto** con verificación de suelo

### IA de Enemigos
- **Persecución** del jugador
- **Barras de vida** visuales
- **Efectos de muerte** con partículas
- **Spawn** aleatorio alrededor del jugador

### Sistema de Armas
- **Munición limitada** con recarga
- **Retroceso** visual
- **Fogonazo** de disparo
- **Cooldown** entre disparos

## 🔧 Personalización

### Ajustar Dificultad
En `js/Game.js`, modifica:
```javascript
// Tiempo entre spawn de enemigos (menos = más difícil)
setInterval(() => {
    if (this.gameState === 'playing') {
        this.spawnEnemy();
    }
}, 2000 - (this.level * 100)); // Ajusta estos valores
```

### Cambiar Velocidad del Jugador
En `js/Player.js`:
```javascript
this.speed = 5; // Velocidad de movimiento
this.jumpSpeed = 8; // Velocidad de salto
```

### Modificar Armas
En `js/Weapon.js`:
```javascript
this.fireRate = 0.1; // Tiempo entre disparos
this.ammo = 30; // Munición inicial
this.maxAmmo = 30; // Munición máxima
```

## 🐛 Solución de Problemas

### El juego no carga
- Verifica que estés usando un servidor HTTP local
- Asegúrate de que tu navegador soporte WebGL
- Revisa la consola del navegador para errores

### Controles no funcionan
- Haz click en la pantalla para activar el pointer lock
- Verifica que el navegador permita el pointer lock

### Rendimiento lento
- Reduce la calidad de las sombras en `js/Scene.js`
- Disminuye el número de enemigos simultáneos
- Cierra otras pestañas del navegador

## 🚀 Próximas Mejoras

- [ ] Múltiples tipos de armas
- [ ] Power-ups y mejoras
- [ ] Sonidos y música
- [ ] Múltiples mapas
- [ ] Modo multijugador
- [ ] Sistema de guardado
- [ ] Más tipos de enemigos
- [ ] Efectos de post-procesamiento

## 📝 Licencia

MIT License - Puedes usar este código libremente para tus propios proyectos.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el juego, no dudes en hacer un fork y enviar un pull request.

---

¡Disfruta jugando! 🎮
