
def ordenar_lista_numeros(lista):
    """
    Ordena una lista de números en orden ascendente.

    Args:
        lista (list): Lista de números a ordenar.

    Returns:
        list: Lista ordenada en orden ascendente.
    """
    return sorted(lista)


# Crear una funcion que recibe una lista de numeros y la devuelve normalizada Ejemplo [1, 2, 3] -> [0.0, 0.5, 1.0]
def normalizar_lista_numeros(lista):
    """
    Normaliza una lista de números entre 0 y 1.

    Args:
        lista (list): Lista de números a normalizar.

    Returns:
        list: Lista normalizada entre 0 y 1.
    """
    if len(lista) == 0:
        return []
    min_val = min(lista)
    max_val = max(lista)
    if min_val == max_val:
        return [0.0] * len(lista)
    return [(x - min_val) / (max_val - min_val) for x in lista]



