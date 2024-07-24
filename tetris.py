import pygame
import random

# Configuración de la ventana
ANCHO_VENTANA = 360  # Ancho del tablero: 12 celdas
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

# Función para mover la pieza
def mover_pieza(pieza, x, y, dx, dy):
    nueva_pieza = [[pieza[fila][col] for col in range(len(pieza[fila]))] for fila in range(len(pieza))]
    nueva_x = x + dx * TAMAÑO_BLOQUE
    nueva_y = y + dy * TAMAÑO_BLOQUE
    return nueva_pieza, nueva_x, nueva_y

# Función para rotar la pieza
def rotar_pieza(pieza):
    nueva_pieza = list(map(list, zip(*pieza[::-1])))
    return nueva_pieza

# Función para verificar si la pieza ha llegado al fondo
def pieza_en_fondo(pieza, y):
    for fila in range(len(pieza) - 1, -1, -1):
        for col in range(len(pieza[fila])):
            if pieza[fila][col] != 0:
                if y + (fila + 1) * TAMAÑO_BLOQUE >= ALTO_VENTANA:
                    return True
    return False

# Función para verificar colisiones
def hay_colision(pieza, x, y, tablero):
    for fila in range(len(pieza)):
        for col in range(len(pieza[fila])):
            if pieza[fila][col] != 0:
                nueva_x = x + col * TAMAÑO_BLOQUE
                nueva_y = y + fila * TAMAÑO_BLOQUE
                if nueva_x < 0 or nueva_x >= ANCHO_VENTANA or nueva_y >= ALTO_VENTANA:
                    return True
                if nueva_y // TAMAÑO_BLOQUE < len(tablero) and nueva_x // TAMAÑO_BLOQUE < len(tablero[0]):
                    if tablero[nueva_y // TAMAÑO_BLOQUE][nueva_x // TAMAÑO_BLOQUE] != 0:
                        return True
    return False

# Función principal del juego
def jugar():
    tablero = [[0 for _ in range(ANCHO_VENTANA // TAMAÑO_BLOQUE)] for _ in range(ALTO_VENTANA // TAMAÑO_BLOQUE)]
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
            elif evento.type == pygame.KEYDOWN:
                if evento.key == pygame.K_LEFT:
                    nueva_pieza, nueva_x, nueva_y = mover_pieza(pieza_actual, x_actual, y_actual, -1, 0)
                    if not hay_colision(nueva_pieza, nueva_x, nueva_y, tablero):
                        pieza_actual, x_actual, y_actual = nueva_pieza, nueva_x, nueva_y
                elif evento.key == pygame.K_RIGHT:
                    nueva_pieza, nueva_x, nueva_y = mover_pieza(pieza_actual, x_actual, y_actual, 1, 0)
                    if not hay_colision(nueva_pieza, nueva_x, nueva_y, tablero):
                        pieza_actual, x_actual, y_actual = nueva_pieza, nueva_x, nueva_y
                elif evento.key == pygame.K_DOWN:
                    nueva_pieza, nueva_x, nueva_y = mover_pieza(pieza_actual, x_actual, y_actual, 0, 1)
                    if not hay_colision(nueva_pieza, nueva_x, nueva_y, tablero):
                        pieza_actual, x_actual, y_actual = nueva_pieza, nueva_x, nueva_y
                elif evento.key == pygame.K_SPACE:
                    nueva_pieza = rotar_pieza(pieza_actual)
                    if not hay_colision(nueva_pieza, x_actual, y_actual, tablero):
                        pieza_actual = nueva_pieza

        # Mover la pieza hacia abajo
        nueva_pieza, nueva_x, nueva_y = mover_pieza(pieza_actual, x_actual, y_actual, 0, 1)
        if not hay_colision(nueva_pieza, nueva_x, nueva_y, tablero):
            pieza_actual, x_actual, y_actual = nueva_pieza, nueva_x, nueva_y

        # Verificar si la pieza ha llegado al fondo
        if pieza_en_fondo(pieza_actual, y_actual) or hay_colision(pieza_actual, x_actual, y_actual, tablero):
            # Agregar la pieza al tablero
            for fila in range(len(pieza_actual)):
                for col in range(len(pieza_actual[fila])):
                    if pieza_actual[fila][col] != 0:
                        tablero[y_actual // TAMAÑO_BLOQUE + fila][x_actual // TAMAÑO_BLOQUE + col] = pieza_actual[fila][col]

            # Crear una nueva pieza
            pieza_actual = FORMAS[random.randint(0, len(FORMAS) - 1)]
            x_actual = ANCHO_VENTANA // 2 - len(pieza_actual[0]) * TAMAÑO_BLOQUE // 2
            y_actual = 0

        # Dibujar la cuadrícula, el tablero y la pieza actual
        ventana.fill(NEGRO)
        dibujar_cuadricula()
        for fila in range(len(tablero)):
            for col in range(len(tablero[fila])):
                if tablero[fila][col] != 0:
                    pygame.draw.rect(ventana, COLORES[tablero[fila][col] - 1],
                                     (col * TAMAÑO_BLOQUE, fila * TAMAÑO_BLOQUE, TAMAÑO_BLOQUE, TAMAÑO_BLOQUE))
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
