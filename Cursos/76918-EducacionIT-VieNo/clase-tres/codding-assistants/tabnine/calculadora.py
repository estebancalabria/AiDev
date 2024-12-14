def sumar(a, b):
    """
    Suma dos números juntos.

    Parámetros:
    a (int o float): El primer número a sumar.
    b (int o float): El segundo número a sumar.

    Devuelve:
    int o float: La suma de a y b.
    """
    return a + b

def multiplicar(a, b):
    """
    Multiplica dos números juntos.

    Parámetros:
    a (int o float): El primer número a multiplicar.
    b (int o float): El segundo número a multiplicar.

    Devuelve:
    int o float: El producto de a y b.
    """
    return a * b

#Quiero una función que calcule el promedio de un array de números
def promedio(array):
    """
    Calcula la media de una lista de números, ignorando los valores no numéricos.

    Parámetros:
    array (list): Una lista de números.

    Devuelve:
    float: La media de los números numéricos en la lista.
    """
    numeric_values = [x for x in array if isinstance(x, (int, float))]
    if not numeric_values:
        return 0
    return sum(numeric_values) / len(numeric_values)
