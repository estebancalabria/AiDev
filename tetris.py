import pygame
import random

# Configuración de la ventana
ANCHO_VENTANA = 800
ALTO_VENTANA = 600
TAMAÑO_BLOQUE = 30

# Colores
NEGRO = (0, 0, 0)
BLANCO = (255, 255, 255)
GRIS = (128, 128, 128)

# Formas de las piezas
FORMAS = [
    [[1, 1, 1],
     [0, 1, 0]],

    [[0, 2, 2],
     [2, 2, 0]],

    [[3, 3, 0],
     [0, 3, 3]],

    [[4, 0, 0],
     [4, 4, 4]],

    [[0, 0, 5],
     [5, 5, 5]],

    [[6, 6, 6, 6]],

    [[7, 7],
     [7, 7]]
]

# Inicializar Pygame
pygame.init()

# Crear la ventana
ventana = pygame.display.set_mode((ANCHO_VENTANA, ALTO_VENTANA))
pygame.display.set_caption("Tetris")

# Función para dibujar una pieza
def dibujar_pieza(pieza, x, y):
    for fila in range(len(pieza)):
        for col in range(len(pieza[fila])):
            if pieza[fila][col] != 0:
                pygame.draw.rect(ventana, COLORES[pieza[fila][col] - 1],
                                 (x + col * TAMAÑO_BLOQUE, y + fila * TAMAÑO_BLOQUE, TAMAÑO_BLOQUE, TAMAÑO_BLOQUE))

# Función para dibujar la cuadrícula
def dibujar_cuadricula():
    for x in range(0, ANCHO_VENTANA, TAMAÑO_BLOQUE):
        for y in range(0, ALTO_VENTANA, TAMAÑO_BLOQUE):
            rect = pygame.Rect(x, y, TAMAÑO_BLOQUE, TAMAÑO_BLOQUE)
            pygame.draw.rect(ventana, GRIS, rect, 1)

# Función principal del juego
def jugar():
    pieza_actual = FORMAS[random.randint(0, len(FORMAS) - 1)]
    x_actual = ANCHO_VENTANA // 2 - len(pieza_actual[0]) * TAMAÑO_BLOQUE // 2
    y_actual = 0
    velocidad_caida = 10  # Velocidad de caída de la pieza

    reloj = pygame.time.Clock()
    jugando = True

    while jugando:
        reloj.tick(velocidad_caida)  # Limitar la velocidad del juego

        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                jugando = False

        # Mover la pieza hacia abajo
        y_actual += TAMAÑO_BLOQUE

        # Dibujar la cuadrícula y la pieza actual
        ventana.fill(NEGRO)
        dibujar_cuadricula()
        dibujar_pieza(pieza_actual, x_actual, y_actual)
        pygame.display.update()

    pygame.quit()

# Colores de las piezas
COLORES = [
    (255, 0, 0),   # Rojo
    (0, 255, 0),   # Verde
    (0, 0, 255),   # Azul
    (255, 255, 0), # Amarillo
    (255, 165, 0), # Naranja
    (128, 0, 128), # Púrpura
    (192, 192, 192)# Plateado
]

# Iniciar el juego
jugar()
